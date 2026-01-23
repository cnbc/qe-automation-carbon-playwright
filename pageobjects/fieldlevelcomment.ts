import { expect, type Locator, type Page } from '@playwright/test';
import type { BrowserActions, MouseActions, WaitHelpers } from '@cnbc/playwright-sdk';
import { BasePage } from '@cnbc/playwright-sdk';

export class FieldLevelCommentPage {
  private readonly base: BasePage;

  constructor(private readonly page: Page) {
      this.base = new BasePage(page, 'FieldLevelCommentPage');
  }

  logStep(message: string) {
    this.base.logStep(message);
  }

  logInfo(message: string) {
    this.base.logInfo(message);
  }

  /**
   * Opens a path using Playwright `baseURL` (configured via ENV/BASE_URL).
   * Pass an absolute URL only when you intentionally want to bypass baseURL.
   */
  async open(pathOrUrl: string = '/', browserActions?: BrowserActions) {
    this.logStep(`Opening ${pathOrUrl}`);
    await this.base.goto(pathOrUrl);
    // Browser is maximized in the fixture; no per-test viewport sizing needed here.
    void browserActions;
  }

  async waitForLoaded(wait: WaitHelpers) {
    this.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
  }

  async loadLazyModules(msa: MouseActions, wait: WaitHelpers, pixels: number = 1000) {
    this.logStep('Scrolling to load lazy-loaded modules');
    await msa.scroll(0, pixels);
    await wait.forMilliseconds(2000);
  }

  riverModule(): Locator {
    // Avoid XPath: use class-substring selectors to handle multi-class elements.
    return this.page.locator("[class*='RiverPlus-riverPlusContainer']");
  }

  riverStories(): Locator {
    return this.riverModule().locator("[class*='RiverPlusCard-container']");
  }

  breakerStories(): Locator {
    return this.page.locator(
      "[class*='RiverPlusBreaker-container'] [class*='RiverPlusCard-breakerCardContainer']"
    );
  }

  firstStoryTitleLink(): Locator {
    return this.riverModule().locator("[class*='RiverHeadline'] a").first();
  }

  firstStoryThumbnail(): Locator {
    // Some pages wrap the thumbnail in an anchor; we just need it visible.
    return this.riverModule().locator("[class*='RiverThumbnail-imageThumbnail']").first();
  }

  firstStoryAuthorLink(): Locator {
    return this.riverModule().locator("[class*='RiverByline-authorByline'] a").first();
  }

  async expectRiverVisible(timeoutMs: number = 20_000) {
    this.logStep('Verifying River Module is displayed');
    await expect(this.riverModule()).toBeVisible({ timeout: timeoutMs });
  }

  async expectFirstStoryElementsVisible() {
    this.logStep('Verifying first story elements');
    await expect(this.firstStoryTitleLink()).toBeVisible();
    this.logInfo('Story 1 Title is displayed');

    await expect(this.firstStoryThumbnail()).toBeVisible();
    this.logInfo('Story 1 Thumbnail is displayed');

    await expect(this.firstStoryAuthorLink()).toBeVisible();
    this.logInfo('Story 1 Author is displayed');
  }
}

