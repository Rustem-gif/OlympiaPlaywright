import { Page, Locator } from '@playwright/test';

export default class BaseComponent {
  constructor(protected readonly page: Page) {}
}
