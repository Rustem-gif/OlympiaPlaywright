import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import CategoryTabs from './Component/CategoryTabs';
import GameFilters from './Component/GameFilters';
import GameGrid from './Component/GameGrid';
import ProviderFilter from './Component/ProviderFilter';

export default class GamesPage extends ContentPage {
  readonly categoryTabs: CategoryTabs;
  readonly gameFilters: GameFilters;
  readonly providerFilter: ProviderFilter;
  readonly gameGrid: GameGrid;
  readonly introHeading: Locator = this.pageHeading(/olympia offers a variety of casino games/i);
  readonly whyChooseHeading: Locator = this.sectionHeading(/why choose olympia online casino games/i);

  constructor(page: Page) {
    super(page);
    this.categoryTabs = new CategoryTabs(page);
    this.gameFilters = new GameFilters(page);
    this.providerFilter = new ProviderFilter(page);
    this.gameGrid = new GameGrid(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Games);
  }
}
