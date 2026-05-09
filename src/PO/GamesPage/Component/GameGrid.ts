import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class GameGrid extends BaseComponent {
  readonly firstGameLink: Locator = this.root.locator('a[href*="/game/"]').first();
  readonly firstPlayButton: Locator = this.root.getByRole('button', { name: /play!/i }).first();
  readonly firstFreeGameButton: Locator = this.root.getByRole('button', { name: /free game/i }).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  gameLink(name: string): Locator {
    return this.root.getByRole('link', { name: this.exactPattern(name) }).first();
  }
}
