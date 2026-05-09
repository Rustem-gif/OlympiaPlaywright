import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class ProviderFilter extends BaseComponent {
  readonly providerLogos: Locator = this.root.locator('a[href*="/games/all/"]');

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }

  providerLink(providerSlug: string): Locator {
    return this.root.locator(`a[href*="/games/all/${providerSlug.toLowerCase()}"]`).first();
  }
}
