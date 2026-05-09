import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class TournamentContent extends BaseComponent {
  readonly prizesHeading: Locator = this.root.getByRole('heading', { name: /tournament prizes/i }).first();
  readonly prizePoolText: Locator = this.root.getByText(/prize pool/i).first();
  readonly showMoreButton: Locator = this.root.getByRole('button', { name: /show more/i }).first();
  readonly tournamentGamesHeading: Locator = this.root.getByRole('heading', { name: /tournament games/i }).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
