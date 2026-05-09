import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class PrivacyPolicyPage extends ContentPage {
  readonly title: Locator = this.pageHeading(/privacy policy/i);
  readonly generalInformationHeading: Locator = this.sectionHeading(/1\.general information/i);
  readonly supportEmailLink: Locator = this.inlineLink(/support@olympia\.casino/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.PrivacyPolicy);
  }
}
