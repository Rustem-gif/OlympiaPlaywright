import { Locator, Page } from '@playwright/test';
import BaseComponent from './BaseComponent';

export default class SignInModal extends BaseComponent {
  readonly emailInput: Locator = this.root.locator('input[name="email"]');
  readonly passwordInput: Locator = this.root.locator('input[name="password"]');
  readonly submitButton: Locator = this.root.locator('button[type="submit"], input[type="submit"]').first();
  readonly forgotPasswordLink: Locator = this.page.getByRole('link', { name: /forgot password/i }).first();

  constructor(page: Page) {
    super(page, page.locator('form').filter({ has: page.locator('input[name="password"]') }).first());
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
