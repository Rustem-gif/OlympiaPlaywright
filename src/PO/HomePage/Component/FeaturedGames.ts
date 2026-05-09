import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class FeaturedGames extends BaseComponent {
  readonly firstGameLink: Locator = this.root.locator('a[href*="/game/"]').first();
  readonly playButtons: Locator = this.root.getByRole('button', { name: /play!/i });
  readonly freeGameButtons: Locator = this.root.getByRole('button', { name: /free game/i });

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  gameLink(name: string): Locator {
    return this.root.getByRole('link', { name: this.exactPattern(name) }).first();
  }

  async openGame(name: string): Promise<void> {
    await this.gameLink(name).click();
  }
}
