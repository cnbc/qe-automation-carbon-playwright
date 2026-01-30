import {
  BasePage,
  WaitHelpers,
  BrowserActions,
  MouseActions,
} from "@cnbc/playwright-sdk";
import { expect, type Locator, type Page } from "@playwright/test";

export class LiveBlogPostPage {
  private readonly base: BasePage;

  constructor(private readonly page: Page) {
    this.base = new BasePage(page, "LiveBlogPostPage");
  }

  logStep(message: string) {
    this.base.logStep(message);
  }

  logInfo(message: string) {
    this.base.logInfo(message);
  }

  async waitForLoaded(wait: WaitHelpers) {
    this.logStep("Waiting for page to load completely");
    await wait.forDomLoad();
  }

  BlogStatus(): Locator {
    return this.page.locator("//carbon-asset-status/div");
  }
  OpenLiveFeedQueueDrawer(): Locator {
    return this.page.locator("//mat-icon[text()='post_add']");
  }
  LiveFeedQueueDrawer(): Locator {
    return this.page.locator("(//mat-sidenav//mat-icon[text()='close'])[1]");
  }
  NewPostsTab(): Locator {
    return this.page.locator(
      "//carbon-live-feed-queue//span[text()='New Posts']",
    );
  }
  UpdatesTab(): Locator {
    return this.page.locator(
      "//carbon-live-feed-queue//span[text()='Updates']",
    );
  }
  HistoryTab(): Locator {
    return this.page.locator(
      "//carbon-live-feed-queue//span[text()='History']",
    );
  }

  NewPostQueuePlusButton1(): Locator {
    return this.page.locator(
      "(//button[contains(@class,'add-post')]//mat-icon[text()='add_circle_outline'])[1]",
    );
  }
  NewPostQueueCopyIdButton1(): Locator {
    return this.page.locator("(//button[@mattooltip='Copy ID']//mat-icon)[1]");
  }
  NewPostQueueEditButton1(): Locator {
    return this.page.locator("(//button//mat-icon[text()='edit'])[1]");
  }

  NewPostQueuePlusButton(index: number): Locator {
    return this.page.locator(
      "(//button[contains(@class,'add-post')]//mat-icon[text()='add_circle_outline'])[" +
        index +
        "]",
    );
  }
  NewPostQueueCopyIdButton(index: number): Locator {
    return this.page.locator(
      "(//button[@mattooltip='Copy ID']//mat-icon)[" + index + "]]",
    );
  }
  NewPostQueueEditButton(index: number): Locator {
    return this.page.locator(
      "(//button//mat-icon[text()='edit'])[" + index + "]",
    );
  }
  Snack_Bar(): Locator {
    return this.page.locator("//simple-snack-bar/span");
  }
  AddPostButton(): Locator {
    return this.page.locator("//button[text()='Add Post']");
  }
  LiveFeedCardHeadline1(): Locator {
    return this.page.locator(
      "(//carbon-live-feed//mat-card//mat-card-title)[1]",
    );
  }
  LiveFeedCardStatus1(): Locator {
    return this.page.locator(
      "(//carbon-live-feed//mat-card//mat-card-subtitle//span)[1]",
    );
  }

  PostEditorModal_AddPostButton(): Locator {
    return this.page.locator(
      "//carbon-modal-post-editor//button/span[contains(text(),'Add Post')]",
    );
  }
  PostEditorModal_PublishButton(): Locator {
    return this.page.locator(
      "//carbon-modal-post-editor//button/span[contains(text(),'Publish')]",
    );
  }
  PostEditorModal_PublishPostButton(): Locator {
    return this.page.locator("(//button[contains(text(),'Publish Post')])[1]");
  }
  PostEditorModal_PublishPostAndStoryButton(): Locator {
    return this.page.locator(
      "(//button[contains(text(),'Publish Post and Story')])[1]",
    );
  }
  PostEditorModal_AddAndPublishPostButton(): Locator {
    return this.page.locator(
      "(//button[contains(text(),'Add and Publish Post')])[1]",
    );
  }
  PostEditorModal_AddAndPublishPostAndStoryButton(): Locator {
    return this.page.locator(
      "(//button[contains(text(),'Add and Publish Post and Story')])[1]",
    );
  }

  ConfirmationSnackBar(): Locator {
    return this.page.locator("//carbon-confirmation/div/p");
  }
  //	Public

  // Post Page Objects
  SendPostsForReviewButton(): Locator {
    return this.page.locator("//button/span[text()=' Send post for review ']");
  }
  SubmittedtoLiveSToryButton(): Locator {
    return this.page.locator(
      "//button/span[text()=' Submitted to Live Story ']",
    );
  }
  SubmitUpdatestoLiveStoryButton(): Locator {
    return this.page.locator(
      "//button/span[text()=' Submit updates to Live Story ']",
    );
  }

  SubmitUpdatesButton(): Locator {
    return this.page.locator(
      "//button/span[text()=' Submit updates to Live Story ']",
    );
  }
  LiveStorySearch(): Locator {
    return this.page.locator("//carbon-autocomplete[@id='field_more']//input");
  }
  LiveStorySelectByName(name: string): Locator {
    return this.page.locator("//span[text()='" + name + "']");
  }
  ConnectedLiveStoryTitle(): Locator {
    return this.page.locator(
      "//carbon-autocomplete[@id='field_more']//carbon-card-horizontal//mat-card-title/a",
    );
  }
  PostHeadLine(): Locator {
    return this.page.locator("//carbon-input[@id='field_title']//textarea");
  }
  totalPostInSubmissionQueue(): Locator {
    return this.page.locator(
      "(//button[@mattooltip='Edit this post']//mat-icon[text()='edit'])",
    );
  }
  liveFeedPostTitle(index: number): Locator {
    return this.page.locator(
      "(//carbon-live-feed[@id='field_liveFeed']//mat-card-title[@class='mat-card-title'])[" +
        index +
        "]",
    );
  }
  liveFeedPostPlaceHolder(): Locator {
    return this.page.locator(
      "//div[@class='cdk-overlay-pane']//mat-icon[contains(text(),'post_add')]",
    );
  }
  liveFeedQucikPost(): Locator {
    return this.page.locator(
      "//div[@class='cdk-overlay-pane']//mat-icon[@svgicon='post']//*[@id='Layer_1']",
    );
  }
  btnClearCalendar(): Locator {
    return this.page.locator(
      "//div[contains(@class,'cdk-overlay-pane')]//div[@class='c-calendar-footer']//button[text()='Clear']",
    );
  }
  fieldAboutBodyRTE(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_about']//div[@class='ProseMirror']//p",
    );
  }
}
