import { Locator, Page } from '@playwright/test';
import BaseComponent from '../../../Components/BaseComponent';

export default class ContactForm extends BaseComponent {
  readonly emailLink: Locator = this.root.getByRole('link', { name: /support@olympia\.casino/i }).first();
  readonly telegramLink: Locator = this.root.getByRole('link', { name: /telegram/i }).first();
  readonly whatsAppLink: Locator = this.root.getByRole('link', { name: /whatsapp/i }).first();
  readonly faqLink: Locator = this.root.getByRole('link', { name: /^faq$/i }).first();

  constructor(page: Page) {
    super(page, page.getByRole('main'));
  }
}
