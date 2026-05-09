import { Locator, Page } from '@playwright/test';
import BaseComponent from './BaseComponent';
import SignInModal from './SignInModal';
import DepositModal from './DepositModal';

export default class Header extends BaseComponent {
  readonly logoLink: Locator = this.root.locator('a[href$="/en-AU"]').first();
  readonly allGamesLink: Locator = this.link(/all games/i);
  readonly promotionsLink: Locator = this.link(/promotions/i);
  readonly tournamentsLink: Locator = this.link(/tournaments/i);
  readonly lotteryLink: Locator = this.link(/lottery/i);
  readonly paymentsLink: Locator = this.link(/payments/i);
  readonly searchLink: Locator = this.root.locator('a[href*="search-modal=modal"]').first();
  readonly logInLink: Locator = this.link(/log in/i);
  readonly signUpLink: Locator = this.link(/sign up/i);
  readonly localeSwitcher: Locator = this.root.getByRole('combobox').first();
  readonly depositButton: Locator = this.page.locator('header .deposit-button');
  readonly signInModal: SignInModal = new SignInModal(this.page);

  constructor(page: Page) {
    super(page, page.getByRole('banner'));
  }

  navigationLink(name: string): Locator {
    return this.link(this.exactPattern(name)).first();
  }

  async openNavigationLink(name: string): Promise<void> {
    await this.navigationLink(name).click();
  }

  async openSignInModal(): Promise<SignInModal> {
    await this.logInLink.click();
    return this.signInModal;
  }

  async clickDepositButton(): Promise<DepositModal> {
    await this.page.locator('div.modal__backdrop').waitFor({ state: 'hidden' });
    await this.depositButton.click();
    return new DepositModal(this.page);
  }
}
