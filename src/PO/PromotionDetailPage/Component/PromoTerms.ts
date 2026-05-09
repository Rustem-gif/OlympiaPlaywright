import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class PromoTerms extends BaseComponent {
  readonly wheelOfFortuneLink: Locator = this.root.getByRole('link', { name: /wheel of fortune/i }).first();
  readonly generalBonusPolicyText: Locator = this.root.getByText(/general bonus policy applies/i).first();
  readonly rulesItems: Locator = this.root.locator('li');

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
