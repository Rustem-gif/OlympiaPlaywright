import { FrameLocator, Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class GameFrame extends BaseComponent {
  readonly iframe: Locator = this.page.locator('iframe').first();
  readonly contentFrame: FrameLocator = this.frame('iframe');

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
