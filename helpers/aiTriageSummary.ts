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
  const total = summaryResults.tests.length;
  return [
    `A Playwright visual suite (Olympia deposit modal) just finished in ${cwd}.`,
    `Each test is one (locale, user type) pair comparing the deposit-methods list against a`,
    `baseline screenshot. ${total} tests total, ${passed} passed, ${failing.length} failed.`,
    '',
    'Failing tests:',
    ...failing,
    '',
    'Investigate the failures:',
    `- Look in ${cwd}/test-results/. Each failing test has a directory named`,
    '  `depModalTest-Check-<locale>-<type>-<hash>-...-chromium`, plus the same name with a',
    '  `-retry1` suffix when Playwright retried it.',
    '- Read the `-actual.png`, `-expected.png` and `-diff.png` from the first attempt AND from',
    '  `-retry1` (when present). If the two attempts disagree — e.g. attempt 1 timed out or shows',
    '  a different diff than retry1 — that case is "confirmed only on the second attempt"; note',
    '  it. Base your root-cause conclusion on the retry1 diff when it exists.',
    '- Pull the exact pixel-diff figure Playwright reports (the "ratio X of all image pixels"',
    '  line in the failure reason or error-context.md) for every case — you need it below.',
    '- Read the images closely enough to name the SPECIFIC change: which payment method',
    '  appeared/disappeared, which minimum-deposit amount changed (old value → new value), or',
    '  how the method order/modal height shifted. Never describe a diff only as "visual mismatch".',
    '',
    'Write the report in Russian, as plain Slack text (single asterisks for bold, no `#`',
    'headers, no code fences), in this exact shape:',
    '',
    '1. One opening line: `Итог: <failed> из <total> кейсов упали, все — по <common failure',
    '   type, in a few words>.` If any case was confirmed only on retry (see above), append a',
    '   second sentence: `<N> кейса(ов) подтвердились только со второй попытки (см. п. <ref>).`',
    '   — <ref> is the number of whichever cause below covers those cases.',
    '2. A numbered list (`1.`, `2.`, ...), one entry per DISTINCT ROOT CAUSE, not per test —',
    '   fold every locale/test that shares a cause into the same number. For each number:',
    '   - A short bold title naming the cause, e.g. `*Изменились минимальные суммы по всей',
    '     крипте*`.',
    '   - If the cause is a value change (min-deposit amounts, etc.), one `•` bullet per',
    '     distinct value with old → new, e.g. `• Bitcoin: Min 100 µBTC → Min 360 µBTC`. Note',
    '     unaffected values in one closing line if relevant (e.g. fiat minimums unchanged).',
    '   - If the cause is a composition/layout change (method added/removed/reordered, modal',
    '     height changed), group affected locales that behave identically into one line each,',
    '     e.g. `IE (regular, divine, titan): пропал CashtoCode (Min 25 AUD), 9 методов вместо',
    '     10.` — end that line with the pixel-diff figure as `Разница <ratio> от площади.`',
    '   - If a failure genuinely does not fit a value/composition pattern (real bug, infra',
    '     flake, stale baseline unrelated to a product change), give it its own numbered cause',
    '     and say so plainly instead of forcing it into the shape above.',
    '3. End with this exact line, nothing after it:',
    '   https://qa-temple-of-serenity.cc/visual.html?type=olympia-dep-modal',
    '',
    'Keep the whole message under 1400 characters. Output ONLY the Slack message text: no',
    'preamble, no character counts, no commentary.',
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
