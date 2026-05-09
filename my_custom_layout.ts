import { Block, KnownBlock } from '@slack/types';
import { SummaryResults } from 'playwright-slack-report/dist/src';
import { WebClient } from '@slack/web-api';
import { USERS_DEPOSIT_MODAL } from './src/Data/testDepositData/depositModalTestUsers';
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

  blocks.push({ type: 'divider' });

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `📊 <https://qa-temple-of-serenity.cc|View All Test Reports Archive>`,
    },
    block_id: 'reports-archive-link',
  });

  blocks.push({ type: 'divider' });

  blocks.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*All Tests:*\n${summaryResults.tests
        .map(t => `${t.status === 'failed' ? '❌' : t.status === 'skipped' ? '⏩' : '✅'} ${t.name}`)
        .join('\n')}`,
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

  return blocks;
}
