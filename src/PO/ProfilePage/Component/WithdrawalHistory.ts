import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class WithdrawalHistory extends BaseComponent {
  readonly section: Locator = this.root;
  readonly walletHeading: Locator = this.root.getByRole('heading', { name: /^wallet$/i }).first();
  readonly balanceLink: Locator = this.page.getByRole('link', { name: /^balance$/i }).first();
  readonly depositLink: Locator = this.page.getByRole('link', { name: /^deposit$/i }).last();
  readonly withdrawalLink: Locator = this.page.getByRole('link', { name: /^withdrawal$/i }).first();
  readonly transactionsHistoryLink: Locator = this.page.getByRole('link', { name: /transactions history/i }).first();
  readonly emptyState: Locator = this.root.getByText(/no transactions/i).first();
  readonly rows: Locator = this.root.locator('tr').filter({ hasText: /withdraw/i });

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
