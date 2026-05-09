import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class GameFilters extends BaseComponent {
  readonly searchLink: Locator = this.root.getByRole('link', { name: /search/i }).first();
  readonly categoryCombobox: Locator = this.root.getByRole('combobox').first();
  readonly providerCombobox: Locator = this.root.getByRole('combobox').last();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
