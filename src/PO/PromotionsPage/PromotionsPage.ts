import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import PromoCard from './Component/PromoCard';
import PromoList from './Component/PromoList';

export default class PromotionsPage extends ContentPage {
  readonly promoCard: PromoCard;
  readonly promoList: PromoList;
  readonly title: Locator = this.pageHeading(/promotions/i);
  readonly introHeading: Locator = this.sectionHeading(/olympia casino gives casino bonus/i);

  constructor(page: Page) {
    super(page);
    this.promoCard = new PromoCard(page);
    this.promoList = new PromoList(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Promotions);
  }
}
