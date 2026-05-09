import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';

export default class CryptoWalletPage extends ContentPage {
  readonly createWalletHeading: Locator = this.pageHeading(/how to create crypto blockchain wallet/i);
  readonly depositHeading: Locator = this.sectionHeading(/how to deposit your casino account via blockchain/i);
  readonly withdrawalHeading: Locator = this.sectionHeading(/how to withdraw your winnings to blockchain wallet/i);

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.CryptoWallet);
  }
}
