import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class LoyaltyPoints extends BaseComponent {
  readonly learnMoreLink: Locator = this.root.getByRole('link', { name: /learn more about our loyalty program/i }).first();
  readonly rulesHeading: Locator = this.root.getByText(/loyalty program rules/i).first();
  readonly signUpLink: Locator = this.root.getByRole('link', { name: /sign up/i }).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
