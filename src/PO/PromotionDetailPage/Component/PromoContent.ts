import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class PromoContent extends BaseComponent {
  readonly playItLink: Locator = this.root.getByRole('link', { name: /play it!/i }).first();
  readonly getBonusLink: Locator = this.root.getByRole('link', { name: /get bonus/i }).first();
  readonly promoPageLink: Locator = this.root.getByRole('link', { name: /promo page/i }).first();
  readonly spinWheelButton: Locator = this.root.getByRole('button', { name: /spin the wheel/i }).first();
  readonly promoCode: Locator = this.root.getByText(/^WHEEL$/).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
