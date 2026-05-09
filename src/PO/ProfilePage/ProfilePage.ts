import { Locator, Page } from '@playwright/test';
import { BASE_URL } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import DepositHistory from './Component/DepositHistory';
import PersonalInfo from './Component/PersonalInfo';
import SecuritySettings from './Component/SecuritySettings';
import WithdrawalHistory from './Component/WithdrawalHistory';

export default class ProfilePage extends ContentPage {
  readonly personalInfo: PersonalInfo;
  readonly securitySettings: SecuritySettings;
  readonly depositHistory: DepositHistory;
  readonly withdrawalHistory: WithdrawalHistory;
  readonly accountTitle: Locator = this.page.getByText(/^Account$/i);
  readonly depositLink: Locator = this.page.getByRole('link', { name: /^deposit$/i }).first();
  readonly promoNavLink: Locator = this.page.getByRole('link', { name: /promo/i }).first();
  readonly profileNavLink: Locator = this.page.getByRole('link', { name: /profile/i }).first();
  readonly walletNavLink: Locator = this.page.getByRole('link', { name: /^wallet$/i }).first();
  readonly gameHistoryNavLink: Locator = this.page.getByRole('link', { name: /game history/i }).first();
  readonly responsibleGamblingNavLink: Locator = this.page.getByRole('link', { name: /responsible gambling/i }).first();
  readonly generalLink: Locator = this.page.getByRole('link', { name: /^general$/i }).first();
  readonly verificationLink: Locator = this.page.getByRole('link', { name: /^verification$/i }).first();
  readonly securityLink: Locator = this.page.getByRole('link', { name: /^security$/i }).first();
  readonly balanceLink: Locator = this.page.getByRole('link', { name: /^balance$/i }).first();
  readonly walletDepositLink: Locator = this.page.getByRole('link', { name: /^deposit$/i }).last();
  readonly walletWithdrawalLink: Locator = this.page.getByRole('link', { name: /^withdrawal$/i }).first();
  readonly transactionsHistoryLink: Locator = this.page.getByRole('link', { name: /transactions history/i }).first();

  constructor(page: Page) {
    super(page);
    this.personalInfo = new PersonalInfo(page);
    this.securitySettings = new SecuritySettings(page);
    this.depositHistory = new DepositHistory(page);
    this.withdrawalHistory = new WithdrawalHistory(page);
  }

  async open(): Promise<void> {
    await this.navTo(`${BASE_URL}/profile`);
  }

  async openGeneralInfo(): Promise<void> {
    await this.navTo(`${BASE_URL}/profile/general/info`);
  }

  async openVerification(): Promise<void> {
    await this.navTo(`${BASE_URL}/profile/general/verification`);
  }

  async openSecurity(): Promise<void> {
    await this.navTo(`${BASE_URL}/profile/general/security`);
  }

  async openWalletBalance(): Promise<void> {
    await this.navTo(`${BASE_URL}/profile/wallet/balance`);
  }

  async openWalletDeposit(): Promise<void> {
    await this.navTo(`${BASE_URL}/profile/wallet/deposit`);
  }

  async openWalletWithdrawal(): Promise<void> {
    await this.navTo(`${BASE_URL}/profile/wallet/withdrawal`);
  }

  async openTransactionsHistory(): Promise<void> {
    await this.navTo(`${BASE_URL}/profile/wallet/transactions`);
  }

  async requiresAuthentication(): Promise<boolean> {
    if (this.page.url().includes('sign-in=modal')) {
      return true;
    }

    return !(await this.accountTitle.isVisible().catch(() => false));
  }
}
