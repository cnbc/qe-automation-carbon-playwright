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
  commentedFieldName(value: String): Locator {
    return this.page.locator('//mat-panel-title[contains(@class,"mat-expansion-panel-header-title")]//b[text()="' + value + '"]');
  }
  commentedTextInBody(value: String): Locator {
    return this.page.locator('//mat-panel-title[contains(@class,"mat-expansion-panel-header-title")]//i[contains(text(),"' + value + '")]');
  }
  commentedBy(value: String | number): Locator {
    return this.page.locator('(//div[@class="comment-header"]//b)[' + value + ']');
  }
  commentedDate(value: String | number): Locator {
    return this.page.locator('(//div[@class="comment-header"]//span)[' + value + ']');
  }
  commentActions(value: String | number): Locator {
    return this.page.locator('(//div[@class="comment-header"]//span[@class="comment-action"]//button)[' + value + ']');
  }
  commentContent(value: String | number): Locator {
    return this.page.locator('(//div[@class="comment-content-inner"]//p)[' + value + ']');
  }
  commentProseMirror(): Locator {
    // ProseMirror is a rich-text editor; target the actual contenteditable container (not the inner <p>).
    return this.page.locator(
      "//div[contains(@class,'comment-editor')]//div[contains(@class,'ProseMirror') and @contenteditable='true']",
    );
  }
  commentCancelButton(): Locator {
    return this.page.locator('//div[contains(@class,"comment-edit-actions")]//span[contains(text(),"Cancel")]');
  }
  commentPostButton(): Locator {
    return this.page.locator('//div[contains(@class,"comment-edit-actions")]//span[contains(text(),"Post")]');
  }
  commentSaveButton(): Locator {
    return this.page.locator('//div[contains(@class,"comment-edit-actions")]//span[contains(text(),"Save")]');
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

   // Page Object Locators for Field Level Commenting
  // TODO: Update these locators based on actual HTML structure
  btnAddComment(value: number): Locator {
    return this.page.locator(
      "(//carbon-comment-dialog-launcher[contains(@class,'comment-widget')]//button//mat-icon[@role='img'])[" +
        value +
        "]",
    );
  }

  commentBadge(value: number): Locator {
    return this.page.locator(
      "(//carbon-comment-dialog-launcher[contains(@class,'comment-widget')]//button//mat-icon[@role='img'])[" +
        value +
        "]//span[contains(@id,'mat-badge-content')]",
    );
  }

  /**
   * Returns the numeric badge count for a comment icon.
   * Important: the inner `mat-badge-content` span may be absent when the count is 0/empty,
   * so this method reads it safely without waiting on the span to exist.
   */
  async commentBadgeCount(value: number): Promise<number> {
    const icon = this.btnAddComment(value);
    await icon.waitFor({ state: 'attached', timeout: 30_000 });

    const raw = await icon.evaluate((el) => {
      const span =
        (el as HTMLElement).querySelector('span[id*="mat-badge-content"]') ??
        (el as HTMLElement).querySelector('span.mat-badge-content');
      return (span?.textContent ?? '').trim();
    });

    const n = Number.parseInt(raw || '0', 10);
    return Number.isFinite(n) ? n : 0;
  }

  commentMoreOptions(value: number): Locator {
    return this.page.locator(
      "(//span[@class='comment-action']//mat-icon[text()='more_horiz'])[" +
        value +
        "]",
    );
  }

  noOfCommentContentOptions(): Locator {
    return this.page.locator("//div[contains(@class,'comment-content')]");
  }
  noOfCommentContentOptionsEdited(): Locator {
    return this.page.locator(
      "//div[contains(@class,'comment-content edited')]",
    );
  }
  noOfCommentContentOptionsResolved(): Locator {
    return this.page.locator(
      "//div[contains(@class,'comment-content resolved')]",
    );
  }
  commentAllResolvedGreenCircle(): Locator {
    return this.page.locator("//mat-icon[@matbadgesize='small' and contains(text(),'check_circle_outline')]");
  }
  commentResolvedGreenCircleIndividual(commentText: String): Locator {
    return this.page.locator("//div[contains(@class,'comment-content resolved')]//div//p[text()='" + commentText + "']");
  }

  commentHighlight(value: string): Locator {
    return this.page.locator(
      "//span[@class='comment-highlight' and text()='" + value + "']",
    );
  }

  noOfMoreMenuOptions(): Locator {
    return this.page.locator(
      "(//button[@mattooltip='Comment Edit Actions']//mat-icon[text()='more_vert'])",
    );
  }
  commentMarkAsResolved(): Locator {
    return this.page.locator(
      "//div[@class='cdk-overlay-pane']//button[contains(text(),'Mark as resolved')]",
    );
  }
  commentEdit(): Locator {
    return this.page.locator(
      "//div[@class='cdk-overlay-pane']//button[contains(text(),'Edit')]",
    );
  }
  commentDelete(): Locator {
    return this.page.locator(
      "//div[@class='cdk-overlay-pane']//button[contains(text(),'Delete')]",
    );
  }
  commentList(): Locator {
    return this.page.locator(
      "(//button[@mattooltip='Comment Edit Actions']//mat-icon[text()='more_vert'])",
    );
  }
  txtCommentInput(): Locator {
    return this.page.locator(
      "//div[contains(@class,'comment-editor')]//div[contains(@class,'ProseMirror') and @contenteditable='true']",
    );
  }
  btnPostComment(): Locator {
    return this.page.locator(
      "//div[@class='comment-edit-actions']//button//span[text()='Post']",
    );
  }
  btnSaveComment(): Locator {
    return this.page.locator(
      "//div[contains(@class,'comment-edit-actions')]//button//span[text()='Save']",
    );
  }
  btnCancelComment(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'comment-edit-actions')]//button//span[text()='Cancel'])[1]",
    );
  }
  btnResolveAllComment(): Locator {
    return this.page.locator(
      "//mat-chip[@mattooltip='Resolve this thread']//span[text()='Resolve all']",
    );
  }
  btnComment_RTESelectionMenu(): Locator {
    return this.page.locator(
      "//div[@class='c-rte-floating-menu']//button[contains(@mattooltip,'Comment')]",
    );
  }
  btnComment_RTEMenu(): Locator {
    return this.page.locator(
      "//rte-mainmenu//button[contains(@mattooltip,'Comment')]",
    );
  }
  lockedUserName(): Locator {
    return this.page.locator(
      "//carbon-user-indicator[@class='ng-star-inserted']//span[text()='c']",
    );
  }

  comment_Highlight(value: string): Locator {
    return this.page.locator(
      "//span[@class='comment-highlight' and text()='" + value + "']",
    );
  }

  comment_AfterSelectedOnce(value: string): Locator {
    return this.page.locator(
      "(//span[@class='comment-highlight'])[" + value + "]",
    );
  }


}

