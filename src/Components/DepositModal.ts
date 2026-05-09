import { Locator, LocatorScreenshotOptions, Page } from '@playwright/test';
import BaseComponent from './BaseComponent';

export default class DepositModal extends BaseComponent {
  readonly bonusCodeInput: Locator = this.root.locator('input[placeholder*="code" i], input[name*="bonus"]').first();
  readonly addBonusCodeButton: Locator = this.page.getByRole('button', { name: /bonus code/i }).first();

  constructor(page: Page) {
    super(
      page,
      page
        .locator('form')
        .filter({ has: page.locator('input[placeholder*="code" i], input[name*="bonus"]') })
        .first()
    );
  }

  readonly depMethodsList: Locator = this.page.locator('.spi-payment-methods__main');
}
