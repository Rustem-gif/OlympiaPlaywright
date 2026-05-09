import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import TournamentCard from './Component/TournamentCard';
import TournamentList from './Component/TournamentList';

export default class TournamentsPage extends ContentPage {
  readonly tournamentCard: TournamentCard;
  readonly tournamentList: TournamentList;
  readonly title: Locator = this.pageHeading(/running tournaments/i);

  constructor(page: Page) {
    super(page);
    this.tournamentCard = new TournamentCard(page);
    this.tournamentList = new TournamentList(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Tournaments);
  }
}
