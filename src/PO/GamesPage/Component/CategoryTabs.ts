import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class CategoryTabs extends BaseComponent {
  readonly allGamesLink: Locator = this.tabLink('All games');
  readonly popularLink: Locator = this.tabLink('popular');
  readonly newGamesLink: Locator = this.tabLink('New Games');
  readonly slotsLink: Locator = this.tabLink('Slots');

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  tabLink(name: string): Locator {
    return this.root.getByRole('link', { name: this.exactPattern(name) }).first();
  }
}
