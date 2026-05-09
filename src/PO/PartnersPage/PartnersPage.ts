import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class PartnersPage extends ContentPage {
  readonly title: Locator = this.pageHeading(/olympia\u2019s partners/i);
  readonly partnersListHeading: Locator = this.sectionHeading(/list of partners/i);
  readonly safeGamblingHeading: Locator = this.sectionHeading(/responsible and safe gambling/i);
  readonly marketHeading: Locator = this.sectionHeading(/why bother with information about our partners/i);
  readonly missionHeading: Locator = this.sectionHeading(/let\u2019s change the world together/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Partners);
  }
}
