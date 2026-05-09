import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class LotteryPage extends ContentPage {
  readonly heroHeading: Locator = this.pageHeading(/elvis on olympus lottery/i);
  readonly prizesHeading: Locator = this.sectionHeading(/lottery prizes/i);
  readonly ticketsHeading: Locator = this.sectionHeading(/how to get tickets/i);
  readonly gamesHeading: Locator = this.sectionHeading(/lottery games/i);
  readonly joinNowLink: Locator = this.inlineLink(/join now/i);
  readonly getTicketsLink: Locator = this.inlineLink(/get the tickets/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Lottery);
  }
}
