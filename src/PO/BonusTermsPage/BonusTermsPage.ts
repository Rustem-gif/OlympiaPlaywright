import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class BonusTermsPage extends ContentPage {
  readonly welcomeBonusPackageHeading: Locator = this.pageHeading(/welcome bonus package/i);
  readonly generalBonusTermsHeading: Locator = this.sectionHeading(/general bonus terms and conditions/i);
  readonly currentBonusLink: Locator = this.inlineLink(/see the current one/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.BonusTerms);
  }
}
