import { Block, KnownBlock } from '@slack/types';
import { SummaryResults } from 'playwright-slack-report/dist/src';
import { WebClient } from '@slack/web-api';
import { USERS_DEPOSIT_MODAL } from './src/Data/testDepositData/depositModalTestUsers';
import generateAiTriageBlocks from './helpers/aiTriageSummary';
import 'dotenv/config';

export default async function generateCustomLayoutAsync(
  summaryResults: SummaryResults
): Promise<Array<KnownBlock | Block>> {
  const slackClient = new WebClient(process.env.SLACK_BOT_USER_OAUTH_TOKEN);
  const blocks: Array<KnownBlock | Block> = [];

  blocks.push({
    type: 'header',
    text: {
      type: 'plain_text',
      text: '🎭 Olympia Deposit Modal Test',
      emoji: true,
    },
  });

  const passedCount = summaryResults.tests.filter(t => t.status === 'passed').length;
  const failedCount = summaryResults.tests.filter(
    t => t.status === 'failed' || t.status === 'timedOut'
  ).length;
  const skippedCount = summaryResults.tests.filter(t => t.status === 'skipped').length;
  const totalCount = summaryResults.tests.length;

  const passedPercentage = totalCount > 0 ? Math.round((passedCount / totalCount) * 100) : 0;
  const failedPercentage = totalCount > 0 ? Math.round((failedCount / totalCount) * 100) : 0;

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*Summary:*\n> ✅ *Passed:* ${passedCount} (${passedPercentage}%)   ❌ *Failed:* ${failedCount} (${failedPercentage}%)   ⏩ *Skipped:* ${skippedCount}   🧪 *Total:* ${totalCount}`,
    },
    block_id: 'summary-block',
  });

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `📊 <https://qa-temple-of-serenity.cc|View All Test Reports Archive>`,
    },
    block_id: 'reports-archive-link',
  });

  const formatTestLine = (t: (typeof summaryResults.tests)[0]): string => {
    const icon =
      t.status === 'failed' || t.status === 'timedOut'
        ? '❌'
        : t.status === 'skipped'
          ? '⏩'
          : '✅';
    if ((t.status === 'failed' || t.status === 'timedOut') && t.reason) {
      const reasonLines = t.reason
        .split('\n')
        .map(l => `  ${l}`)
        .join('\n');
      return `${icon} *${t.name}*\n${reasonLines}`;
    }
    return `${icon} ${t.name}`;
  };

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      // Slack hard-caps a text object at 3000 chars; many locales x user types
      // plus failure reasons can blow past it and make the post fail.
      text: `*All Tests:*\n${summaryResults.tests.map(formatTestLine).join('\n')}`.slice(0, 2800),
    },
    block_id: 'all-tests',
  });

  blocks.push({ type: 'divider' });
  blocks.push({
    type: 'section',
    text: { type: 'mrkdwn', text: '*🔑 Test User Credentials:*' },
    block_id: 'test-users-header',
  });

  const availableLocales = Object.entries(USERS_DEPOSIT_MODAL);
  if (availableLocales.length > 0) {
    availableLocales.forEach(([localeCode, localeData]) => {
      const userLines = Object.entries(localeData.user)
        .map(([type, creds]) => `• *${type}:* \`${creds.email.trim()}\` / \`${creds.password}\``)
        .join('\n');

      blocks.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${localeData.location}:*\n${userLines}`,
        },
        block_id: `test-users-${localeCode}`,
      });
    });
  } else {
    blocks.push({
      type: 'section',
      text: { type: 'mrkdwn', text: '_No test user credentials configured._' },
      block_id: 'no-test-users',
    });
  }

  // Failure analysis: headless Claude Code root-causes the failures from test-results/
  // screenshots and diffs. Pushed last so it lands at the very end of the thread
  // (blocks past sendCustomBlocksInThreadAfterIndex go into the thread reply).
  // Best-effort — returns [] on a green run and never throws.
  blocks.push(...(await generateAiTriageBlocks(summaryResults)));

  if (!Array.isArray(blocks)) {
    return [];
  }
  return blocks;
}
