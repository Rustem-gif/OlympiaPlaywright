import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class PersonalInfo extends BaseComponent {
  readonly section: Locator = this.root;
  readonly generalLink: Locator = this.page.getByRole('link', { name: /^general$/i }).first();
  readonly verificationLink: Locator = this.page.getByRole('link', { name: /^verification$/i }).first();
  readonly securityLink: Locator = this.page.getByRole('link', { name: /^security$/i }).first();
  readonly title: Locator = this.root.getByRole('heading', { name: /^profile$/i }).first();
  readonly subscriptionsHeading: Locator = this.root.getByRole('heading', { name: /subscriptions/i }).first();
  readonly firstNameInput: Locator = this.root.locator('input[name="first_name"]').first();
  readonly lastNameInput: Locator = this.root.locator('input[name="last_name"]').first();
  readonly emailInput: Locator = this.root.locator('input[name="email"]').first();
  readonly birthDayInput: Locator = this.root.locator('input[placeholder="DD"]').first();
  readonly birthMonthInput: Locator = this.root.locator('input[placeholder="MM"]').first();
  readonly birthYearInput: Locator = this.root.locator('input[placeholder="YYYY"]').first();
  readonly genderInput: Locator = this.root.locator('input[placeholder="Gender"]').first();
  readonly countryInput: Locator = this.root.locator('input[placeholder="Country"]').first();
  readonly cityInput: Locator = this.root.locator('input[name="city"]').first();
  readonly addressInput: Locator = this.root.locator('input[name="address"]').first();
  readonly postalCodeInput: Locator = this.root.locator('input[name="postal_code"]').first();
  readonly mobilePhoneInput: Locator = this.root.locator('input[name="mobile_phone"]').first();
  readonly verifyPhoneLink: Locator = this.root.getByRole('link', { name: /^verify$/i }).first();
  readonly saveChangesButton: Locator = this.root.getByRole('button', { name: /save changes/i }).first();
  readonly receivePromosCheckbox: Locator = this.root.locator('input[name="receive_promos"]').first();
  readonly receiveSmsPromosCheckbox: Locator = this.root.locator('input[name="receive_sms_promos"]').first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
