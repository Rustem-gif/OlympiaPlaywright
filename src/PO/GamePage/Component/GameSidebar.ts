import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class GameSidebar extends BaseComponent {
  readonly newButton: Locator = this.root.getByRole('button', { name: /^new$/i }).first();
  readonly playedGamesButton: Locator = this.root.getByRole('button', { name: /played games/i }).first();
  readonly topGamesButton: Locator = this.root.getByRole('button', { name: /top games/i }).first();
  readonly tournamentsButton: Locator = this.root.getByRole('button', { name: /tournaments/i }).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  tab(name: string): Locator {
    return this.root.getByRole('button', { name: this.exactPattern(name) }).first();
  }
}
