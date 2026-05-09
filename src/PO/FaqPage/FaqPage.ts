import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class FaqPage extends ContentPage {
  readonly title: Locator = this.pageHeading(/frequently asked questions/i);
  readonly supportEmailLink: Locator = this.inlineLink(/support@olympia\.casino/i);
  readonly forgotPasswordLink: Locator = this.inlineLink(/forgot password page/i);

  constructor(page: Page) {
    super(page);
  }

  question(text: string): Locator {
    return this.content.getByText(this.exactPattern(text));
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Faq);
  }
}
