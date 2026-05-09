import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

export default class ContentPage extends BasePage {
  readonly content: Locator = this.mainContent;
  readonly homeBreadcrumb: Locator = this.mainContent.getByRole('link', { name: /^home$/i });
  readonly primaryHeading: Locator = this.mainContent.locator('h1, h2').first();
  readonly paragraphs: Locator = this.mainContent.locator('p');

  constructor(page: Page) {
    super(page);
  }

  breadcrumb(name: string | RegExp): Locator {
    return this.mainContent.getByRole('link', { name }).first();
  }

  pageHeading(name: string | RegExp): Locator {
    return this.mainContent.getByRole('heading', { name }).first();
  }

  sectionHeading(name: string | RegExp): Locator {
    return this.pageHeading(name);
  }

  inlineLink(name: string | RegExp): Locator {
    return this.mainContent.getByRole('link', { name }).first();
  }
}
