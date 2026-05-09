import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class PromoSection extends BaseComponent {
  readonly getMyShareLink: Locator = this.root.getByRole('link', { name: /get my share!/i }).first();
  readonly signUpLink: Locator = this.root.getByRole('link', { name: /sign up/i }).first();
  readonly wheelRulesLink: Locator = this.root.getByRole('link', { name: /to wheel rules/i }).first();
  readonly playNowLink: Locator = this.root.getByRole('link', { name: /play now/i }).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  slideIndicator(index: number): Locator {
    return this.root.getByRole('button', { name: String(index) });
  }
}
