import { Locator, Page } from '@playwright/test';
import BaseComponent from './BaseComponent';

export default class SignUpModal extends BaseComponent {
  readonly bonusActivationCheckbox: Locator = this.root.locator('input[name="bonus_activation"]');
  readonly phoneCodeInput: Locator = this.root.locator('input[name="mobile_phone-code"]');
  readonly phoneNumberInput: Locator = this.root.locator('input[name="mobile_phone-number"]');
  readonly emailInput: Locator = this.root.locator('input[name="email"]');
  readonly passwordInput: Locator = this.root.locator('input[name="password_single"]');
  readonly currencyInput: Locator = this.root.locator('input[name="currency"]');
  readonly countryInput: Locator = this.root.locator('input[name="country"]');
  readonly receivePromosCheckbox: Locator = this.root.locator('input[name="receive_promos"]');
  readonly receiveSmsPromosCheckbox: Locator = this.root.locator('input[name="receive_sms_promos"]');
  readonly ageTermsAcceptanceCheckbox: Locator = this.root.locator('input[name="age_terms_acceptance"]');
  readonly submitButton: Locator = this.root.locator('button[type="submit"], input[type="submit"]').first();

  constructor(page: Page) {
    super(page, page.locator('form').filter({ has: page.locator('input[name="password_single"]') }).first());
  }

  async fillRegistrationForm(details: {
    phoneCode?: string;
    phoneNumber?: string;
    email: string;
    password: string;
  }): Promise<void> {
    if (details.phoneCode) {
      await this.phoneCodeInput.fill(details.phoneCode);
    }

    if (details.phoneNumber) {
      await this.phoneNumberInput.fill(details.phoneNumber);
    }

    await this.emailInput.fill(details.email);
    await this.passwordInput.fill(details.password);
  }
}
