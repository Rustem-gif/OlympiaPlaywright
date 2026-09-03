import { execFile } from 'child_process';
import { existsSync } from 'fs';
import path from 'path';
import { promisify } from 'util';
import type { Block, KnownBlock } from '@slack/types';
import type { SummaryResults } from 'playwright-slack-report/dist/src';

const execFileAsync = promisify(execFile);

const AI_TRIAGE_TIMEOUT_MS = 210_000;
const AI_TRIAGE_MAX_BUFFER = 10 * 1024 * 1024;
// Slack hard limit is 3000 chars per text object; stay under it.
const SLACK_TEXT_LIMIT = 2900;

type SlackBlock = KnownBlock | Block;

/**
 * Resolve the Claude Code CLI binary.
 * CLAUDE_BIN wins; otherwise fall back to `claude` on PATH, then the default
 * user-local install path used by the self-hosted runner.
 */
function resolveClaudeBin(): string {
  if (process.env.CLAUDE_BIN) {
    return process.env.CLAUDE_BIN;
  }
  const home = process.env.HOME;
  if (home) {
    const userLocal = path.join(home, '.local', 'bin', 'claude');
    if (existsSync(userLocal)) {
      return userLocal;
    }
  }
  return 'claude';
}

/** Strip ANSI escape codes and collapse a Playwright failure reason to a short snippet. */
function cleanReason(reason: string | undefined): string {
  if (!reason) {
    return '';
  }
  // eslint-disable-next-line no-control-regex
  const noAnsi = reason.replace(/\[[0-9;]*m/g, '');
  const meaningful = noAnsi
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);
  return meaningful.join(' ').slice(0, 200);
}

const FAILURE_ANALYSIS_TITLE = '*🔍 Failure analysis*';

function analysisBlock(body: string): SlackBlock {
  return {
    type: 'context',
    elements: [{ type: 'mrkdwn', text: `${FAILURE_ANALYSIS_TITLE}\n${body}` }],
    block_id: 'failure-analysis',
  };
}

function buildPrompt(summaryResults: SummaryResults, failing: string[], cwd: string): string {
  const passed = summaryResults.tests.filter(t => t.status === 'passed').length;
  return [
    `A Playwright visual suite (Olympia deposit modal) just finished in ${cwd}.`,
    `Each test is one (locale, user type) pair comparing the deposit-methods list against a`,
    `baseline screenshot. ${summaryResults.tests.length} tests total, ${passed} passed, ${failing.length} failed.`,
    '',
    'Failing tests:',
    ...failing,
    '',
    'Investigate the failures:',
    `- Look in ${cwd}/test-results/. Each failing test has a directory named`,
    '  `depModalTest-Check-<locale>-<type>-<hash>-...-chromium`, plus the same name with a',
    '  `-retry1` suffix. When both exist, use the `-retry1` directory — that is the final attempt.',
    '- In each read `*-diff.png`, `*-actual.png`, `*-expected.png` and `error-context.md` if',
    '  present. Compare actual vs expected.',
    '',
    'Then produce a Slack message (mrkdwn: single asterisks for bold, no `#` headers,',
    'no code fences). Structure:',
    '- One line per failing test: `*<locale> <type>*: <one-sentence root cause>`.',
    '  Group locales together if the cause is identical.',
    '- A final `*Verdict:*` line: is this a real product regression, stale baselines, or',
    '  infra/flake? Recommend the next step — regenerate baselines with',
    '  `npx playwright test --config=playwright.config.dep-modal.ts --update-snapshots`,',
    '  or escalate to the payments team.',
    'Keep the whole message under 1400 characters. Be concrete — name the specific',
    'payment methods, min-deposit amounts or layout changes you see in the diffs.',
    'Output ONLY the Slack message text: no preamble, no character counts, no commentary.',
  ].join('\n');
}

/**
 * Ask headless Claude Code to triage the current run's failures and return Slack blocks
 * to place directly under the report summary (as a context block). Best-effort: any failure
 * returns a single "unavailable" block (or nothing) and never throws, so the post is never blocked.
 */
export default async function generateAiTriageBlocks(
  summaryResults: SummaryResults
): Promise<SlackBlock[]> {
  if (process.env.DISABLE_AI_TRIAGE) {
    return [];
  }

  const failing = summaryResults.tests
    .filter(t => t.status === 'failed' || t.status === 'timedOut')
    .map(t => `- ${t.name}: ${cleanReason(t.reason)}`);

  if (failing.length === 0) {
    return [];
  }

  const cwd = process.cwd();
  const bin = resolveClaudeBin();
  const model = process.env.CLAUDE_TRIAGE_MODEL ?? 'claude-sonnet-5';
  const prompt = buildPrompt(summaryResults, failing, cwd);

  try {
    const { stdout } = await execFileAsync(
      bin,
      ['-p', prompt, '--model', model, '--allowedTools', 'Read,Grep,Glob'],
      { cwd, timeout: AI_TRIAGE_TIMEOUT_MS, maxBuffer: AI_TRIAGE_MAX_BUFFER }
    );

    const summary = stdout.trim();
    if (!summary) {
      console.warn('Failure analysis: claude returned empty output');
      return [analysisBlock('_unavailable: empty output_')];
    }

    return [analysisBlock(summary.slice(0, SLACK_TEXT_LIMIT))];
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`Failure analysis: skipped (${message})`);
    return [analysisBlock(`_unavailable: ${message}_`)];
  }
}
