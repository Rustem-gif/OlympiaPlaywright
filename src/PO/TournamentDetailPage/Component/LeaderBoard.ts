import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class LeaderBoard extends BaseComponent {
  readonly leaderboardHeading: Locator = this.root.getByText(/current leaderboard/i).first();
  readonly rows: Locator = this.root.locator('tr');

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
