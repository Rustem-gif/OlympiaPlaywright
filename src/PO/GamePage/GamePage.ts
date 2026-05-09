import { Locator, Page } from '@playwright/test';
import { BASE_URL } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import GameFrame from './Component/GameFrame';
import GameInfo from './Component/GameInfo';
import GameSidebar from './Component/GameSidebar';

export default class GamePage extends ContentPage {
  readonly gameFrame: GameFrame;
  readonly gameInfo: GameInfo;
  readonly gameSidebar: GameSidebar;
  readonly gameHeading: Locator = this.pageHeading(/play .* online/i);

  constructor(page: Page) {
    super(page);
    this.gameFrame = new GameFrame(page);
    this.gameInfo = new GameInfo(page);
    this.gameSidebar = new GameSidebar(page);
  }

  async open(slug = '4-pots-riches-hold-and-win'): Promise<void> {
    await this.navTo(`${BASE_URL}/en-AU/game/${slug}`);
  }
}
