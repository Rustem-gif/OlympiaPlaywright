import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class PromoList extends BaseComponent {
  readonly moreLinks: Locator = this.root.locator('a[href*="/promotions/"]').filter({ hasText: 'More' });

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  moreLink(slug: string): Locator {
    return this.root.locator(`a[href$="/promotions/${slug}"]`).first();
  }

  async openPromotion(slug: string): Promise<void> {
    await this.moreLink(slug).click();
  }
}
