import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import LoyaltyPoints from './Component/LoyaltyPoints';
import LoyaltyTiers from './Component/LoyaltyTiers';

export default class LoyaltyPage extends ContentPage {
  readonly loyaltyPoints: LoyaltyPoints;
  readonly loyaltyTiers: LoyaltyTiers;
  readonly title: Locator = this.content.getByText(/olympia loyalty program/i).first();

  constructor(page: Page) {
    super(page);
    this.loyaltyPoints = new LoyaltyPoints(page);
    this.loyaltyTiers = new LoyaltyTiers(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Loyalty);
  }
}
