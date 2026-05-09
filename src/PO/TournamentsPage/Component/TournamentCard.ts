import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class TournamentCard extends BaseComponent {
  readonly showMoreLinks: Locator = this.root.getByRole('link', { name: /show more/i });

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  showMoreLink(pathFragment: string): Locator {
    return this.root.locator(`a[href*="${pathFragment}"]`).first();
  }
}
