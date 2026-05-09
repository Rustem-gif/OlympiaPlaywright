import { FrameLocator, Locator, Page } from '@playwright/test';

export default class BaseComponent {
  protected readonly root: Locator;

  constructor(
    protected readonly page: Page,
    root?: Locator
  ) {
    this.root = root ?? page.locator('body');
  }

  protected button(name: string | RegExp): Locator {
    return this.root.getByRole('button', { name });
  }

  protected link(name: string | RegExp): Locator {
    return this.root.getByRole('link', { name });
  }

  protected textbox(name: string | RegExp): Locator {
    return this.root.getByRole('textbox', { name });
  }

  protected heading(name?: string | RegExp): Locator {
    if (name === undefined) {
      return this.root.locator('h1, h2, h3, h4, h5, h6').first();
    }

    return this.root.getByRole('heading', { name }).first();
  }

  protected frame(selector = 'iframe'): FrameLocator {
    return this.page.frameLocator(selector);
  }

  protected exactPattern(value: string): RegExp {
    return new RegExp(`^${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i');
  }
}
