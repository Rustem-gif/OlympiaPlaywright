import { Locator, Page } from '@playwright/test';
import { LINKS } from '../../Data/Links/Links';
import ContentPage from '../BasePage/ContentPage';
import ContactForm from './Component/ContactForm';
import LiveChat from './Component/LiveChat';

export default class SupportPage extends ContentPage {
  readonly contactForm: ContactForm;
  readonly liveChat: LiveChat;
  readonly title: Locator = this.pageHeading(/casino support/i);

  constructor(page: Page) {
    super(page);
    this.contactForm = new ContactForm(page);
    this.liveChat = new LiveChat(page);
  }

  async open(): Promise<void> {
    await this.navTo(LINKS.Support);
  }
}
