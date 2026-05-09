import { Locator, Page } from '@playwright/test';
import BaseComponent from './BaseComponent';

export default class SearchModal extends BaseComponent {
  readonly searchInput: Locator = this.page.locator('input[name="games-search"]');
  readonly results: Locator = this.page.locator('a[href*="/game/"]');

  constructor(page: Page) {
    super(page, page.locator('input[name="games-search"]').first());
  }

  gameResult(name: string): Locator {
    return this.page.getByRole('link', { name: this.exactPattern(name) }).first();
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }
}
