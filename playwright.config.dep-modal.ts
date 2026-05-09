import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

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
  ],

  timeout: 120_000,

  use: {
    baseURL: 'https://www.olympia.casino',
    trace: 'on',
    headless: true,
    screenshot: 'only-on-failure',
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
