import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import FeaturedGames from './Component/FeaturedGames';
import GameCategoryMenu from './Component/GameCategoryMenu';
import PromoSection from './Component/PromoSection';

export default class HomePage extends ContentPage {
  readonly promoSection: PromoSection;
  readonly featuredGames: FeaturedGames;
  readonly gameCategoryMenu: GameCategoryMenu;
  readonly heroHeading: Locator = this.pageHeading(/olympia best australia online casino/i);
  readonly whyChooseHeading: Locator = this.sectionHeading(/why choose olympia online casino/i);

  constructor(page: Page) {
    super(page);
    this.promoSection = new PromoSection(page);
    this.featuredGames = new FeaturedGames(page);
    this.gameCategoryMenu = new GameCategoryMenu(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Home);
  }
}
