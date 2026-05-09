import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class LiveChat extends BaseComponent {
  readonly launcher: Locator = this.page.getByText(/chat/i).last();

  constructor(page: Page) {
    super(page);
  }
}
