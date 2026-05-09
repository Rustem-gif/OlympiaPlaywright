import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class TermsPage extends ContentPage {
  readonly generalInformationHeading: Locator = this.pageHeading(/1\. general information/i);
  readonly eligibilityHeading: Locator = this.sectionHeading(/2\. eligibility and restrictions/i);
  readonly paymentHeading: Locator = this.sectionHeading(/4\. payments and currencies/i);
  readonly disputesEmailLink: Locator = this.inlineLink(/disputes@egis-adr\.com/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Terms);
  }
}
