import { Locator, Page } from '@playwright/test';
import BaseComponent from './BaseComponent';

export default class BurgerMenu extends BaseComponent {
  readonly menuToggle: Locator = this.page.locator('button[aria-label*="menu" i], [data-testid*="menu" i]').first();
  readonly navigationDrawer: Locator = this.page.locator('[role="dialog"], nav').filter({
    has: this.page.getByRole('link', { name: /all games|promotions|tournaments/i }).first(),
  }).first();

  constructor(page: Page) {
    super(page);
  }

  navigationLink(name: string): Locator {
    return this.page.getByRole('link', { name: this.exactPattern(name) }).first();
  }

  async open(): Promise<void> {
    await this.menuToggle.click();
  }
}
