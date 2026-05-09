import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class PaymentsPage extends ContentPage {
  readonly title: Locator = this.pageHeading(/payments/i);
  readonly depositMethodsHeading: Locator = this.sectionHeading(/deposit methods/i);
  readonly withdrawalMethodsHeading: Locator = this.sectionHeading(/withdrawal methods/i);
  readonly signUpLinks: Locator = this.content.getByRole('link', { name: /sign up/i });

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Payments);
  }
}
