import { Locator, Page } from '@playwright/test';
import BaseComponent from './BaseComponent';

export default class Footer extends BaseComponent {
  readonly copyrightNotice: Locator = this.page.getByText(/Copyright ©/i);
  readonly responsibleGamingNotice: Locator = this.page.getByRole('link', { name: /gambling can be addictive/i });
  readonly termsAndConditionsLink: Locator = this.footerLink('Terms and Conditions');
  readonly bonusTermsAndConditionsLink: Locator = this.footerLink('Bonus Terms and Conditions');
  readonly privacyPolicyLink: Locator = this.footerLink('Privacy Policy');
  readonly cookiePolicyLink: Locator = this.footerLink('Cookie Policy');
  readonly kycPolicyLink: Locator = this.footerLink('KYC policy');
  readonly supportLink: Locator = this.footerLink('Support');
  readonly faqLink: Locator = this.footerLink('FAQ');
  readonly aboutUsLink: Locator = this.footerLink('About Us');
  readonly responsibleGamingLink: Locator = this.footerLink('Responsible Gaming');
  readonly cryptoWalletLink: Locator = this.footerLink('Crypto Wallet');
  readonly complaintsLink: Locator = this.footerLink('Complaints');
  readonly partnersLink: Locator = this.footerLink('Partners');

  constructor(page: Page) {
    super(page);
  }

  footerLink(name: string): Locator {
    return this.page.getByRole('link', { name: this.exactPattern(name) }).last();
  }
}
