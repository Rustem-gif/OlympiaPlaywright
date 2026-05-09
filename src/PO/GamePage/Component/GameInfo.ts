import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class GameInfo extends BaseComponent {
  readonly title: Locator = this.root.getByRole('heading', { name: /play .* online/i }).first();
  readonly findYourGameLink: Locator = this.root.getByRole('link', { name: /find your game/i }).first();
  readonly signUpLink: Locator = this.root.getByRole('link', { name: /sign up/i }).first();
  readonly logInLink: Locator = this.root.getByRole('link', { name: /log in/i }).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
