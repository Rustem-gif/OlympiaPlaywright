import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class ResponsibleGamingPage extends ContentPage {
  readonly title: Locator = this.pageHeading(/responsible gambling policy/i);
  readonly assistanceHeading: Locator = this.sectionHeading(/assistance for problem gaming/i);
  readonly personalLimitsHeading: Locator = this.sectionHeading(/personal limits/i);
  readonly selfExclusionHeading: Locator = this.sectionHeading(/self-exclusion by request/i);
  readonly supportEmailLinks: Locator = this.content.getByRole('link', { name: /support@olympia\.casino/i });

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.ResponsibleGaming);
  }
}
