import { Locator, Page } from '@playwright/test';
import { BASE_URL } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import PromoContent from './Component/PromoContent';
import PromoTerms from './Component/PromoTerms';

export default class PromotionDetailPage extends ContentPage {
  readonly promoContent: PromoContent;
  readonly promoTerms: PromoTerms;
  readonly heroText: Locator = this.content.getByText(/spin the wheel!/i).first();

  constructor(page: Page) {
    super(page);
    this.promoContent = new PromoContent(page);
    this.promoTerms = new PromoTerms(page);
  }

  async open(slug = 'wheel-of-fortune'): Promise<void> {
    await this.navTo(`${BASE_URL}/en-AU/promotions/${slug}`);
  }
}
