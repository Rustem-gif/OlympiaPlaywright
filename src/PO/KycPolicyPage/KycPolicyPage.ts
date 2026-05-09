import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class KycPolicyPage extends ContentPage {
  readonly title: Locator = this.pageHeading(/kyc policy/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.KycPolicy);
  }
}
