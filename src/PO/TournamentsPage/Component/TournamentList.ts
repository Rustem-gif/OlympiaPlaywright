import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class TournamentList extends BaseComponent {
  readonly showMoreLinks: Locator = this.root.getByRole('link', { name: /show more/i });

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  tournamentLink(pathFragment: string): Locator {
    return this.root.locator(`a[href*="${pathFragment}"]`).first();
  }

  async openTournament(pathFragment: string): Promise<void> {
    await this.tournamentLink(pathFragment).click();
  }
}
