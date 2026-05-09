import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../Components/BaseComponent';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import BurgerMenu from '../../Components/BurgerMenu';
import SignInModal from '../../Components/SignInModal';
import SignUpModal from '../../Components/SignUpModal';
import DepositModal from '../../Components/DepositModal';
import SearchModal from '../../Components/SearchModal';

export default class BasePage extends BaseComponent {
  readonly header: Header;
  readonly footer: Footer;
  readonly burgerMenu: BurgerMenu;
  readonly signInModal: SignInModal;
  readonly signUpModal: SignUpModal;
  readonly depositModal: DepositModal;
  readonly searchModal: SearchModal;
  readonly getPage: Page = this.page;
  protected readonly mainContent: Locator = this.page.getByRole('main');
  readonly acceptCookiesButton: Locator = this.page.getByRole('button', { name: /accept/i }).last();

  readonly welcomeModal: Locator = this.page.locator('.welcome-modal__wrap');
  readonly welcomeModalCloseButton: Locator = this.page.locator('.modal__close-button');

  constructor(page: Page) {
    super(page);
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.burgerMenu = new BurgerMenu(page);
    this.signInModal = new SignInModal(page);
    this.signUpModal = new SignUpModal(page);
    this.depositModal = new DepositModal(page);
    this.searchModal = new SearchModal(page);
    // Register automatic handler for welcome modal
    this.page.addLocatorHandler(this.welcomeModal, async () => {
      await this.welcomeModalCloseButton.click();
    });
  }

  async navTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async acceptCookiesIfVisible(): Promise<void> {
    const isVisible = await this.acceptCookiesButton.isVisible().catch(() => false);

    if (isVisible) {
      await this.acceptCookiesButton.click();
    }
  }

  async sleep(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }

  // Handler to close the welcome modal if visible
  async closeWelcomeModalIfVisible(): Promise<void> {
    const isVisible = await this.welcomeModal.isVisible().catch(() => false);
    if (isVisible) {
      await this.welcomeModalCloseButton.click();
    }
  }
}
