import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class LoyaltyTiers extends BaseComponent {
  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  tier(name: string): Locator {
    return this.root.getByText(this.exactPattern(name)).first();
  }
}
