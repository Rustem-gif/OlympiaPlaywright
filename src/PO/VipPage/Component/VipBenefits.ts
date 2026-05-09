import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class VipBenefits extends BaseComponent {
  readonly learnMoreLink: Locator = this.root.getByRole('link', { name: /learn more about our vip program/i }).first();
  readonly signUpLink: Locator = this.root.getByRole('link', { name: /sign up/i }).first();
  readonly statusPointsText: Locator = this.root.getByText(/status points/i).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
