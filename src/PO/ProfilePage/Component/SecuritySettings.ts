import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class SecuritySettings extends BaseComponent {
  readonly section: Locator = this.root;
  readonly title: Locator = this.root.getByRole('heading', { name: /^profile$/i }).first();
  readonly generalLink: Locator = this.page.getByRole('link', { name: /^general$/i }).first();
  readonly verificationLink: Locator = this.page.getByRole('link', { name: /^verification$/i }).first();
  readonly securityLink: Locator = this.page.getByRole('link', { name: /^security$/i }).first();
  readonly twoFactorCodeInput: Locator = this.root.locator('input[placeholder="Type it here"]').first();
  readonly turnOn2faButton: Locator = this.root.getByRole('button', { name: /turn on/i }).first();
  readonly copySecretCodeButton: Locator = this.root.getByRole('button', { name: /copy secret code/i }).first();
  readonly currentPasswordInput: Locator = this.root.locator('input[placeholder="Old password"]').first();
  readonly newPasswordInput: Locator = this.root.locator('input[placeholder="New password"]').first();
  readonly confirmPasswordInput: Locator = this.root.locator('input[placeholder="Password confirm"]').first();
  readonly updateButton: Locator = this.root.getByRole('button', { name: /update/i }).first();
  readonly sessionHistory: Locator = this.root.getByText(/session history/i).first();
  readonly terminateSessionLinks: Locator = this.root.getByText(/terminate/i);

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
