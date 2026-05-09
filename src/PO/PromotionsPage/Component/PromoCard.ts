import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class PromoCard extends BaseComponent {
  readonly signUpLinks: Locator = this.root.locator('a[href*="sign-up=modal"]');

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  promotionLink(slug: string): Locator {
    return this.root.locator(`a[href$="/promotions/${slug}"]`).first();
  }

  filterButton(name: string): Locator {
    return this.root.getByRole('button', { name: this.exactPattern(name) }).first();
  }
}
