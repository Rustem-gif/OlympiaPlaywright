import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import VipBenefits from './Component/VipBenefits';
import VipTierCard from './Component/VipTierCard';

export default class VipPage extends ContentPage {
  readonly vipBenefits: VipBenefits;
  readonly vipTierCard: VipTierCard;
  readonly title: Locator = this.content.getByText(/olympia vip program/i).first();

  constructor(page: Page) {
    super(page);
    this.vipBenefits = new VipBenefits(page);
    this.vipTierCard = new VipTierCard(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Vip);
  }
}
