import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class ComplaintsPage extends ContentPage {
  readonly title: Locator = this.content.getByText(this.exactPattern('Complaints')).last();
  readonly askGamblersLink: Locator = this.inlineLink(/askgamblers casino complaints service/i);
  readonly supportTeamLink: Locator = this.inlineLink(/contact our support team/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Complaints);
  }
}
