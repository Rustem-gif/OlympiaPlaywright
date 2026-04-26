import { test as base } from '@playwright/test';
import Olympia from '../PageManager/Olympia';

type TestFixtures = {
  olympia: Olympia;
};

export const test = base.extend<TestFixtures>({
  olympia: async ({ page }, use) => {
    await use(new Olympia(page));
  },
});

export { expect } from '@playwright/test';
