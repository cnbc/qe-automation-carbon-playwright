import { expect, type Locator, type Page } from '@playwright/test';
import type { BrowserActions, MouseActions, WaitHelpers } from '@cnbc/playwright-sdk';
import { BasePage } from '@cnbc/playwright-sdk';

export class FieldLevelCommentPage {
  private readonly base: BasePage;

  constructor(private readonly page: Page) {
      this.base = new BasePage(page, 'FieldLevelCommentPage');
  }

  /**
   * Safely quote arbitrary text for XPath string literals.
   * Handles cases where the text contains single and/or double quotes.
   */
  private xpathTextLiteral(text: string): string {
    if (!text.includes("'")) return `'${text}'`;
    if (!text.includes('"')) return `"${text}"`;
    // Fallback: concat('foo', '"', 'bar', "'", 'baz')
    const parts = text.split("'").flatMap((p, i, arr) => (i < arr.length - 1 ? [p, "'"] : [p]));
    return `concat(${parts
      .map((p) => (p === "'" ? `"'"` : `'${p}'`))
      .join(', ')})`;
  }

  logStep(message: string) {
    this.base.logStep(message);
  }

  logInfo(message: string) {
    this.base.logInfo(message);
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

  //Field Level Comment Page Objects
  btnCommentContainer(): Locator {
    return this.page.locator('//button[@mattooltip="Comments"]//mat-icon[@matbadgesize="small"]');
  }
  commentedText(): Locator {
    return this.page.locator('//mat-panel-title[contains(@class,"mat-expansion-panel-header-title")]//b');
  }
  commentedBy(): Locator {
    return this.page.locator('//div[@class="comment-header"]//b');
  }
  commentedDate(): Locator {
    return this.page.locator('(//div[@class="comment-header"]//span)[1]');
  }
  commentActions(): Locator {
    return this.page.locator('//div[@class="comment-header"]//span[@class="comment-action"]//button');
  }
  commentContent(): Locator {
    return this.page.locator('//div[@class="comment-content-inner"]//p');
  }
  commentProseMirror(): Locator {
    return this.page.locator('//div[@class="comment-editor"]//div[@class="ProseMirror"]//p');
  }
  commentCancelButton(): Locator {
    return this.page.locator('//div[contains(@class,"comment-edit-actions")]//span[contains(text(),"Cancel")]');
  }
  commentPostButton(): Locator {
    return this.page.locator('//div[contains(@class,"comment-edit-actions")]//span[contains(text(),"Post")]');
  }
  
  commentEditActionsMarkAsResolved(): Locator {
    return this.page.locator('//button[@role="menuitem" and contains(text(),"Mark as resolved")]');
  }
  commentEditActionsDelete(): Locator {
    return this.page.locator('//button[@role="menuitem" and contains(text(),"Delete")]');
  }
  commentEditActionsEdit(): Locator {
    return this.page.locator('//button[@role="menuitem" and contains(text(),"Edit")]');
  }

  commentResolveThisThread(): Locator {
    return this.page.locator('//button[@mattooltip="Resolve this thread"]//mat-icon');
  }
  
  commentResolvedTooltip(): Locator {
    return this.page.locator('//span[@mattooltipclass="resolved-tooltip"]');
  }

  commentsPurpleDot(): Locator {
    return this.page.locator('//span[contains(@class,"purple-dot")]');
  }
  noOfComments(): Locator {
    return this.page.locator('//mat-panel-description');
  }
  expandComments(): Locator {
    return this.page.locator('//mat-icon[contains(text(),"keyboard_arrow_right")]');
  }
  collapseComments(): Locator {
    return this.page.locator('//mat-icon[contains(text(),"keyboard_arrow_down")]');
  }

  editedCommentTimestamp(): Locator {
    return this.page.locator('//span[contains(@class,"comment-time") and contains(text(),"Edited")]');
  }

  commentHighlightedTextPrimary(highlightedText: string): Locator {
    const lit = this.xpathTextLiteral(highlightedText);
    return this.page.locator(
      `//span[contains(@class,"comment-highlight-primary") and text()=${lit}]`
    );
  }
  commentHighlightedTextSecondary(highlightedText: string): Locator {
    const lit = this.xpathTextLiteral(highlightedText);
    return this.page.locator(
      `//span[contains(@class,"comment-highlight-secondary") and text()=${lit}]`
    );
  }

  /**
   * Sticky drawer (outer container) shown in your provided outerHTML:
   * `<div class="c-sticky-drawer-body"> ... </div>`
   */
  stickyDrawerBody(): Locator {
    return this.page.locator('div.c-sticky-drawer-body').first();
  }

  /** `<div class="c-sticky-drawer-form ...">` inside the sticky drawer */
  stickyDrawerForms(): Locator {
    return this.stickyDrawerBody().locator('div.c-sticky-drawer-form');
  }


}

