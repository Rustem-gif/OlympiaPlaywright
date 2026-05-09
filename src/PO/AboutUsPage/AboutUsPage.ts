import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class AboutUsPage extends ContentPage {
  readonly title: Locator = this.pageHeading(/about us/i);
  readonly lightningFastPaymentsHeading: Locator = this.sectionHeading(/lightning fast payments and support/i);
  readonly impressiveGamesLibraryHeading: Locator = this.sectionHeading(/impressive games library/i);
  readonly godGivenBonusesHeading: Locator = this.sectionHeading(/god-given bonuses/i);
  readonly promotionsSectionLink: Locator = this.inlineLink(/promotions section/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.AboutUs);
  }
}
