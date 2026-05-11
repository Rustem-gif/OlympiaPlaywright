import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import generateCustomLayoutAsync from './my_custom_layout';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests/DepModal',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 1,
  workers: 1,
  

  reporter: [
    ['list'],
    ['html'],
    [
      './node_modules/playwright-slack-report/dist/src/SlackReporter.js',
      {
        slackOAuthToken: process.env.SLACK_BOT_USER_OAUTH_TOKEN,
        channels: ['test-reporter', 'gt1-payment-reports'],
        sendResults: 'always',
        layoutAsync: generateCustomLayoutAsync,
        showInThread: true,
        sendCustomBlocksInThreadAfterIndex: 3,
      },
    ],
  ],

  timeout: 120_000,

  use: {
    baseURL: 'https://www.olympia.casino',
    trace: 'retain-on-failure',
    headless: true,
    screenshot: 'on',
    video: 'retain-on-failure',
  },

  expect: {
    toHaveScreenshot: {
      threshold: 0.3,
      maxDiffPixelRatio: 0.1,
      animations: 'disabled',
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
