import { Locator, Page } from '@playwright/test';
import { BASE_URL } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import LeaderBoard from './Component/LeaderBoard';
import TournamentContent from './Component/TournamentContent';

export default class TournamentDetailPage extends ContentPage {
  readonly leaderBoard: LeaderBoard;
  readonly tournamentContent: TournamentContent;
  readonly title: Locator = this.content.getByText(/newbie prize draw/i).last();

  constructor(page: Page) {
    super(page);
    this.leaderBoard = new LeaderBoard(page);
    this.tournamentContent = new TournamentContent(page);
  }

  async open(slug = 'newbie-prize-draw'): Promise<void> {
    await this.navTo(`${BASE_URL}/en-AU/tournaments/${slug}`);
  }
}
