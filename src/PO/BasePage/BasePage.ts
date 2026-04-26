import { Page } from '@playwright/test';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import BurgerMenu from '../../Components/BurgerMenu';
import SignInModal from '../../Components/SignInModal';
import SignUpModal from '../../Components/SignUpModal';
import DepositModal from '../../Components/DepositModal';
import SearchModal from '../../Components/SearchModal';

export default class BasePage {
  readonly header: Header;
  readonly footer: Footer;
  readonly burgerMenu: BurgerMenu;
  readonly signInModal: SignInModal;
  readonly signUpModal: SignUpModal;
  readonly depositModal: DepositModal;
  readonly searchModal: SearchModal;

  constructor(protected readonly page: Page) {
    this.header = new Header(page);
    this.footer = new Footer(page);
    this.burgerMenu = new BurgerMenu(page);
    this.signInModal = new SignInModal(page);
    this.signUpModal = new SignUpModal(page);
    this.depositModal = new DepositModal(page);
    this.searchModal = new SearchModal(page);
  }

  async navTo(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async sleep(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms);
  }
}
