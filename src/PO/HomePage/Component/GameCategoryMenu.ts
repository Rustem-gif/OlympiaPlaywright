import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class GameCategoryMenu extends BaseComponent {
  readonly searchLink: Locator = this.root.locator('a[href*="search-modal=modal"]').first();
  readonly providerCombobox: Locator = this.root.getByRole('combobox').last();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  categoryLink(name: string): Locator {
    return this.root.getByRole('link', { name: this.exactPattern(name) }).first();
  }

  async openCategory(name: string): Promise<void> {
    await this.categoryLink(name).click();
  }
}
