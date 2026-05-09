import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class CookiePolicyPage extends ContentPage {
  readonly sampleCookiePolicyHeading: Locator = this.pageHeading(/sample cookie policy/i);
  readonly introductionHeading: Locator = this.sectionHeading(/1\. introduction/i);
  readonly aboutCookiesLink: Locator = this.inlineLink(/aboutcookies\.org/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.CookiePolicy);
  }
}
