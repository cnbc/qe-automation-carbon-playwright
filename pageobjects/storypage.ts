import {
  BasePage,
  WaitHelpers,
  BrowserActions,
  MouseActions,
} from "@cnbc/playwright-sdk";
import { expect, type Locator, type Page } from "@playwright/test";

export class StoryPage {
  private readonly base: BasePage;

  constructor(private readonly page: Page) {
    this.base = new BasePage(page, "StoryPage");
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

  //Story Page Objects
  createFromScratchButton(): Locator {
    return this.page.locator('//i[@class="icon icon-plus"]');
  }
  selectAssetType(assetType: string): Locator {
    return this.page.locator(
      `//span[@class="c-grid-text" and text()="${assetType}"]`,
    );
  }
  lockedAssetOldConfig(): Locator {
    return this.page.locator('//i[@class="icon icon-lock2"]');
  }
  lockedAssetNewConfig(): Locator {
    return this.page.locator('//mat-icon[contains(text(),"lock")]');
  }
  unlockAsset(): Locator {
    return this.page.locator('(//*[contains(text(),"Unlock")])[2]');
  }

  Headline(): Locator {
    return this.page.locator("//div[@class='c-paper-input-controller']");
  }
  lnkLockSymbol(): Locator {
    return this.page.locator("//i[@class='icon icon-lock2']");
  }

  Headline_Editable(): Locator {
    return this.page.locator(
      "(//div[@id='c_title']//*[@contenteditable='true'])[1]",
    );
  }

  Headline_Type(): Locator {
    return this.page.locator("//div[@id='c_title']//textarea");
  }

  Internal_Title(): Locator {
    return this.page.locator("//div[@id='c_slug']//textarea");
  }

  Internal_Title_new(): Locator {
    return this.page.locator("//carbon-input[@id='field_slug']//textarea");
  }

  Headline_Type2(): Locator {
    return this.page.locator(
      "(//div[@id='c_title']//following::div[contains(@class,'c-paper-input-control ng-star-inserted')])[2]",
    );
  }

  Scroll_Section(): Locator {
    return this.page.locator("(//*[contains(text(),'Section')])[2]");
  }

  Keywords(): Locator {
    return this.page.locator("(//*[contains(text(),'Keywords')])[1]");
  }

  Source(): Locator {
    return this.page.locator("//div[@id='c_source']//input");
  }

  source_newassets(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[11]",
    );
  }

  source(): Locator {
    return this.page.locator(
      "//h4[text()='Source']//following::carbon-autocomplete[@id='field_assets']//input",
    );
  }

  CNBC_US(): Locator {
    return this.page.locator("(//*[contains(text(),'CNBC US')])");
  }

  Section(): Locator {
    return this.page.locator("//div[@id='c_section']//button");
  }

  AdditionalSection(): Locator {
    return this.page.locator("//div[@id='c_additional_sections']//button");
  }

  section_newassets(): Locator {
    return this.page.locator(
      "(//carbon-section-picker[@id='field_assets']//mat-icon)[1]",
    );
  }
  Additionalsection_newassets(): Locator {
    return this.page.locator(
      "(//carbon-section-picker[@id='field_assets']//mat-icon)[2]",
    );
  }

  Actions_Tab(): Locator {
    return this.page.locator("//*[text()=' Actions ']");
  }

  Actions_Button(): Locator {
    return this.page.locator("(//*[contains(@class,'angle-down')])[2]");
  }

  Actions_Button_wildcard(): Locator {
    return this.page.locator("(//*[contains(@class,'angle-down')])[1]");
  }

  Save_As_Template(): Locator {
    return this.page.locator("//li[text()=' Save as template ']");
  }

  Save_As_Template_OtherAssets(): Locator {
    return this.page.locator("//button[text()=' Save as Template ']");
  }

  Create_Template(): Locator {
    return this.page.locator("(//*[text()='Create Template'])[1]");
  }

  Create_Template_OtherAssets(): Locator {
    return this.page.locator("//span[text()='Create Template']");
  }

  Active_Template_Bookmark(): Locator {
    return this.page.locator("(//*[contains(@class,'active-blue')])[1]");
  }

  Click_Here(): Locator {
    return this.page.locator("//a[contains(text(),'click here')]");
  }

  Right_Template(): Locator {
    return this.page.locator(
      "//*[contains(@class,'global-bar')]//*[contains(@class,'icon-template-asset')]",
    );
  }

  Latest_Temp(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'c-sticky-drawer-body')]//*[contains(text(),'AutoType')])[1]",
    );
  }

  MoreOptions(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'c-actions')]//*[@mattooltip='More Options'])[1]",
    );
  }

  EditTemplate(): Locator {
    return this.page.locator("//*[contains(text(),'Edit template')]");
  }

  Additional_Sec(): Locator {
    return this.page.locator("//*[contains(text(),'Additional Sections')]");
  }

  Save(): Locator {
    return this.page.locator("//*[contains(text(),'Save')]");
  }

  SEO_Title(): Locator {
    return this.page.locator("//div[@id='c_seoTitle']//textarea");
  }

  Promo_Title(): Locator {
    return this.page.locator("//div[@id='c_linkHeadline']//textarea");
  }

  Social_Message(): Locator {
    return this.page.locator("//div[@id='c_tweetOverride']//textarea");
  }

  Name_Title(): Locator {
    return this.page.locator("//div[@id='c_fullName']//textarea");
  }

  Short_Title(): Locator {
    return this.page.locator("//div[@id='c_shorterHeadline']//textarea");
  }

  Template_Plus_Drop(): Locator {
    return this.page.locator("(//*[@class='ng-star-inserted'])[1]");
  }

  Template_Success(): Locator {
    return this.page.locator("(//*[contains(@class,'success')])[2]");
  }

  Template_Success_New_Assets(): Locator {
    return this.page.locator("//*[contains(@class,'snackbar-success')]");
  }

  Settings(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='tune']",
    );
  }

  Usage_Rules(): Locator {
    return this.page.locator("//div[@id='c_usageRule']//input");
  }
  Usage_Rules1(): Locator {
    return this.page.locator(
      "//input[@placeholder='Type to select a usage rule']",
    );
  }
  Native_Web_Only(): Locator {
    return this.page.locator("//h5[text()='Native Web Only']");
  }

  Evergreen(): Locator {
    return this.page.locator("//h5[text()='Evergreen']");
  }

  section_Icon(): Locator {
    return this.page.locator(
      "//*[contains(@class,'status-Publish')]//*[contains(@class,'icon-section-asset')]",
    );
  }

  name_WebResource_Textfield(): Locator {
    return this.page.locator("//carbon-input[@id='field_title']//textarea");
  }

  saveAsTemplate_WebResource_Btn(): Locator {
    return this.page.locator("//button[text()=' Save as Template ']");
  }

  modifyingTemplateMsg_Link(): Locator {
    return this.page.locator(
      "//a[contains(text(),'You are modifying this template.')]",
    );
  }

  createTemplate_Button(): Locator {
    return this.page.locator("//carbon-dialog//button[@color='primary']");
  }

  Template_RightRail(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='file_copy']",
    );
  }

  Headline_NewAssets(): Locator {
    return this.page.locator("//carbon-input[@id='field_title']//textarea");
  }

  bookmark_WebResource_Icon(): Locator {
    return this.page.locator("(//carbon-button//button)[1]");
  }

  close_WebResource_Icon(): Locator {
    return this.page.locator("(//carbon-button//button)[3]");
  }

  copy_icon(): Locator {
    return this.page.locator("//*[@class='icon icon-copy']");
  }

  copy_icon_usedIn(): Locator {
    return this.page.locator(
      "(//mat-sidenav//mat-icon[text()='filter_none'])[1]",
    );
  }

  copy_id(): Locator {
    return this.page.locator("//button[text()='Copy Id']");
  }

  copy_url(): Locator {
    return this.page.locator("//*[text()='Copy Url']");
  }

  copy_preview_url(): Locator {
    return this.page.locator("//*[text()='Copy Preview Url']");
  }

  bookmark_Icon(): Locator {
    return this.page.locator("//mat-icon[text()='bookmark_border']");
  }

  bookmark_webresource(): Locator {
    return this.page.locator("(//section)[1]//button)[2]");
  }

  bookmark(): Locator {
    return this.page.locator(
      "(//div[contains(@id,'desktopView')]//button)[14]",
    );
  }

  bookmark_RightRail_Icon(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='bookmarks']",
    );
  }

  bookmark_RightRail_Icon_Active(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='bookmarks']",
    );
  }

  readonly(): Locator {
    return this.page.locator("//li[text()=' Open in read-only ')]");
  }

  unlocktoedit(): Locator {
    return this.page.locator("//button[text()=' Unlock to edit ')]");
  }

  lockicon(): Locator {
    return this.page.locator("//mat-icon[text()='lock']");
  }

  close(): Locator {
    return this.page.locator("//div[@title='CLOSE']");
  }

  autotag(): Locator {
    return this.page.locator("//*[contains(@class,'icon icon-add-tag')]");
  }

  tags(): Locator {
    return this.page.locator("//*[@class='c-tag-relation c-picker']");
  }

  tagsafter(): Locator {
    return this.page.locator(
      "//*[@class='wrapper']//div[contains(@class,'tag-relation')]",
    );
  }

  warning(): Locator {
    return this.page.locator("//*[contains(@class,'paper-field-warning')]");
  }

  seoURLErrorOldConfig(): Locator {
    return this.page.locator("//span[text()='Url must be unique']");
  }
  sectionWarningOldConfig(): Locator {
    return this.page.locator("(//a[text()='section'])[1]");
  }
  sourceWarningOldConfig(): Locator {
    return this.page.locator("(//a[text()='source'])[1]");
  }
  publishAnywayOldConfig(): Locator {
    return this.page.locator("(//a[text()='Publish Anyway'])[1]");
  }

  seoURLError(): Locator {
    return this.page.locator("//span[text()='URL']");
  }
  linkError(): Locator {
    return this.page.locator("//span[text()='link']");
  }
  headlineerror(): Locator {
    return this.page.locator("//span[text()='Headline']");
  }
  seoTitleWarning(): Locator {
    return this.page.locator("//span[text()='Seo Title']");
  }

  sectionWarningUrlError(): Locator {
    return this.page.locator("(//span[text()='section'])[1]");
  }
  sourceWarningUrlError(): Locator {
    return this.page.locator("(//span[text()='source'])[1]");
  }

  sectionWarning(): Locator {
    return this.page.locator("(//span[text()='section'])[3]");
  }
  sourceWarning(): Locator {
    return this.page.locator("(//span[text()='source'])[3]");
  }
  goBack(): Locator {
    return this.page.locator("(//span[text()='Go back'])[2]");
  }
  publishAnyway(): Locator {
    return this.page.locator("(//span[text()='Publish anyway'])[2]");
  }

  sectionTypeError(): Locator {
    return this.page.locator("//span[text()='Section Type']");
  }
  analyticsIDError(): Locator {
    return this.page.locator("//span[text()='Analytics ID']");
  }

  addrte(): Locator {
    return this.page.locator("//*[@class='icon icon-plus-circle']");
  }

  info(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='info']",
    );
  }

  draft_info(): Locator {
    return this.page.locator("//span[@class='c-status c-status-Draft']");
  }

  bookmark_Icon2(text: string): Locator {
    return this.page.locator(
      "(//*[text()='Bookmarks']//following::*[contains(text(),'" +
        text +
        "')]//following::*[contains(@class,'more-menu')])[1]",
    );
  }

  bookmark_Icon3(): Locator {
    return this.page.locator("//button[text()=' Remove from Bookmarks ']");
  }

  verifyAsset(text: string): Locator {
    return this.page.locator(
      "(//div[@class='c-quick-sidebar c-drawer-Bookmarks']//following::a[contains(text(),'" +
        text +
        "')])[1]",
    );
  }

  cross_WebResource_Btn(): Locator {
    return this.page.locator("(//carbon-button//button)[3]");
  }

  createdTemplate_loc(text: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'cdk-drop-list')]//a[text()='" + text + "']",
    );
  }

  myTemplates_loc(text: string): Locator {
    return this.page.locator("(//a[contains(text(),'" + text + "')])[1]");
  }

  successMsg(text: string): Locator {
    return this.page.locator(
      "//*[contains(text(),'A version of " +
        text +
        " has been saved successfully')]",
    );
  }

  newsuccessMsg(text: string): Locator {
    return this.page.locator("//*[contains(text(),'A version of')]");
  }

  paragraph1_Body_new(): Locator {
    return this.page.locator("//div[@class='ProseMirror']");
  }

  paragraph1_Body(): Locator {
    return this.page.locator(
      "(//*[@class='c-rte-base-content']//div[contains(@class,'Prose')])[2]//p",
    );
  }

  paraPros(): Locator {
    return this.page.locator("//*[@id='field_pros']/app-rte//ul/li");
  }

  cons_Body_CreditCard(): Locator {
    return this.page.locator("//*[@id='field_cons']/app-rte//ul/li");
  }

  cons_Body_CreditCard_text(): Locator {
    return this.page.locator("//*[@id='field_cons']/app-rte//ul/li");
  }

  description_Body_new_assets(): Locator {
    return this.page.locator(
      "(//*[@class='c-rte-base-content']//div[contains(@class,'Prose')])[6]",
    );
  }

  description_Body_new_assets_text(): Locator {
    return this.page.locator(
      "(//*[@class='c-rte-base-content']//div[contains(@class,'Prose')])[6]",
    );
  }

  link_Textfield_CreditCard(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Link to application page')]//following::*[contains(@id,'mat-input')][1]",
    );
  }

  link_Textfield_Credit(): Locator {
    return this.page.locator("(//textarea[contains(@id,'mat-input')][1])[4]");
  }

  source_Textfield_CreditCard(): Locator {
    return this.page.locator(
      "(//*[@class='c-rte-base-content']//div[contains(@class,'Prose')])[7]//p",
    );
  }

  features_Body_CreditCard(): Locator {
    return this.page.locator(
      "(//*[@class='c-rte-base-content']//div[contains(@class,'Prose')])[1]",
    );
  }

  features_Body_CreditCard_text(): Locator {
    return this.page.locator(
      "(//*[@class='c-rte-base-content']//div[contains(@class,'Prose')])[1]//p",
    );
  }

  header_Icon(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-header']",
    );
  }

  description_header_icon_new_assets(): Locator {
    return this.page.locator("(//*[contains(@class,'icon-header')])[2]");
  }

  header_Icon_feature_CreditCard(): Locator {
    return this.page.locator("(//*[contains(@class,'icon-header')])[1]");
  }

  bold_Icon_Feature(): Locator {
    return this.page.locator("(//*[contains(@class,'icon-bold')])[1]");
  }

  bold_Icon(): Locator {
    return this.page.locator("//*[contains(@class,'icon-bold')]");
  }

  bold_Icon_Description(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Description')]//following::*[contains(@class,'icon-bold')][1]",
    );
  }

  italic_Icon(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Body')]//following::*[contains(@class,'icon-italic')]",
    );
  }

  italic_Icon_Feature(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Features')]//following::*[contains(@class,'icon-italic')][1]",
    );
  }

  bulletedList_Icon_Feature(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Features')]//following::*[contains(@class,'icon-list')][1]",
    );
  }

  numberedList_Icon_Feature(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Features')]//following::*[contains(@class,'icon-list-ol')][1]",
    );
  }

  description_italic_icon(): Locator {
    return this.page.locator("(//*[contains(@class,'icon-italic')])[2]");
  }

  bulletedList_Icon(): Locator {
    return this.page.locator(
      "(//*[contains(text(),'Body')]//following::*[@class='icon-list'])",
    );
  }

  Body_Icon(): Locator {
    return this.page.locator("//label[text()='Body']");
  }

  description_bulletedlist_icon(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Description')]//following::*[contains(@class,'icon-list')][1]",
    );
  }

  numberList_Icon(): Locator {
    return this.page.locator(
      "(//*[contains(text(),'Body')]//following::*[@class='icon-list-ol'])",
    );
  }

  description_numberList_Icon(): Locator {
    return this.page.locator("(//*[contains(@class,'icon-list-ol')])[2]");
  }

  blockQuote_Icon(): Locator {
    return this.page.locator("//*[contains(@class,'icon-comment-o')]");
  }

  pullQuote_Icon(): Locator {
    return this.page.locator(
      "//*[@class='c-rte-menuicon']//*[contains(@class,'icon-quote-right')]",
    );
  }

  promoCutOff_Icon(): Locator {
    return this.page.locator(
      "//*[@class='c-rte-menuicon']//*[contains(@class,'icon-scissors')]",
    );
  }

  superScript_Icon(): Locator {
    return this.page.locator(
      "//*[@class='c-rte-menuicon']//*[contains(@class,'icon-superscript')]",
    );
  }

  superScript_Icon_Feature(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Features')]//following::*[contains(@class,'icon-superscript')][1]",
    );
  }

  description_superScript_Icon(): Locator {
    return this.page.locator(
      "(//*[@class='c-rte-menuicon']//*[contains(@class,'icon-superscript')])[2]",
    );
  }

  subScript_Icon(): Locator {
    return this.page.locator(
      "//*[@class='c-rte-menuicon']//*[contains(@class,'icon-subscript')]",
    );
  }

  description_subscript_Icon(): Locator {
    return this.page.locator(
      "(//*[@class='c-rte-menuicon']//*[contains(@class,'icon-subscript')])[2]",
    );
  }

  subscript_Icon_Feature(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Features')]//following::*[contains(@class,'icon-subscript')][1]",
    );
  }

  omega_Icon_Feature(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Features')]//following::*[contains(@class,'icon-omega2')][1]",
    );
  }

  omega_Icon(): Locator {
    return this.page.locator("//*[contains(@class,'icon-omega2')]");
  }

  description_omega_Icon(): Locator {
    return this.page.locator("(//*[contains(@class,'icon-omega2')])[2]");
  }

  specialChar(): Locator {
    return this.page.locator("//td[contains(text(),'″')]");
  }

  contentGroup_Icon(): Locator {
    return this.page.locator("//*[contains(@class,'icon-object-ungroup')]");
  }

  body(text: string): Locator {
    return this.page.locator("//p[contains(text(),'" + text + "')]");
  }

  cancel(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-button-wrapper') and text()='Cancel'])[2]",
    );
  }

  clone_Link(): Locator {
    return this.page.locator("//*[contains(text(),'Clone')]");
  }

  click_Headline(): Locator {
    return this.page.locator("(//*[contains(@class,'input-c')])[1]");
  }

  slug(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'c-paper-input-control ng-star-inserted')])[1]",
    );
  }

  rte_plus(): Locator {
    return this.page.locator("//*[contains(@class,'plus-circle')]");
  }

  pull_quote(): Locator {
    return this.page.locator("//*[contains(@ngbtooltip,'Pull Quote')]");
  }

  pull_quote_text(): Locator {
    return this.page.locator("//*[contains(@class,'pullquote_quote')]");
  }

  pull_quote_attribution(): Locator {
    return this.page.locator("//*[contains(@class,'pullquote_attribution')]");
  }

  pull_quote_title(): Locator {
    return this.page.locator("//*[contains(@class,'pullquote_title')]");
  }

  first_image(): Locator {
    return this.page.locator("(//*[@class='img-fluid'])[1]");
  }

  second_image(): Locator {
    return this.page.locator("(//*[@class='img-fluid'])[2]");
  }

  third_image(): Locator {
    return this.page.locator("(//*[@class='img-fluid'])[3]");
  }

  fourth_image(): Locator {
    return this.page.locator("(//*[@class='img-fluid'])[4]");
  }

  fifth_image(): Locator {
    return this.page.locator("(//*[@class='img-fluid'])[5]");
  }

  rte_image(): Locator {
    return this.page.locator("(//*[contains(@ngbtooltip,'Image')])");
  }

  rte_video(): Locator {
    return this.page.locator("(//*[contains(@ngbtooltip,'Video')])");
  }

  insert_media(): Locator {
    return this.page.locator("(//*[contains(text(),'Insert media')])");
  }

  confirmtags(): Locator {
    return this.page.locator("(//*[contains(text(),'Confirm all tags')])");
  }

  featured_image(): Locator {
    return this.page.locator(
      "(//span[@ngbtooltip='Add from Media Gallery']//button[@class='c-button-wrapper'])[1]",
    );
  }

  toggle_1(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'mat-slide-toggle') and @aria-checked='true'])[1]",
    );
  }

  toggle_2(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'mat-slide-toggle') and @aria-checked='true'])[2]",
    );
  }

  toggle_3(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'mat-slide-toggle') and @aria-checked='true'])[3]",
    );
  }

  toggle_4(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'mat-slide-toggle') and @aria-checked='true'])[4]",
    );
  }

  toggle_5(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'mat-slide-toggle') and @aria-checked='true'])[5]",
    );
  }
  toggle_6(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'mat-slide-toggle') and @aria-checked='true'])[6]",
    );
  }
  //video settings
  videotoggle_1(): Locator {
    return this.page.locator("(//div[@class='c-switch c-switch-No'])[1]");
  }
  videotoggle_2(): Locator {
    return this.page.locator("(//div[@class='c-switch c-switch-No'])[2]");
  }
  videotoggle_3(): Locator {
    return this.page.locator("(//div[@class='c-switch c-switch-No'])[3]");
  }
  videotoggle_4(): Locator {
    return this.page.locator("(//div[@class='c-switch c-switch-No'])[4]");
  }
  videotoggle_5(): Locator {
    return this.page.locator("(//div[@class='c-switch c-switch-No'])[5]");
  }

  video_errors(): Locator {
    return this.page.locator(
      "//*[contains(@class,'c-error c-message-block ')]//a[contains(@class,'star-inserted')]",
    );
  }

  sectionerrors(): Locator {
    return this.page.locator(
      "//li[contains(@class,'warning-field ng-star-inserted')]//span",
    );
  }

  video_error_message(): Locator {
    return this.page.locator(
      "//*[contains(@class,'c-notice c-message')]//ul//a",
    );
  }

  video_error_message_video(): Locator {
    return this.page.locator(
      "//*[contains(@class,'c-error c-message-block ')]//Span[contains(@class,'star-inserted')]",
    );
  }

  seo_title_field(): Locator {
    return this.page.locator("//carbon-input[@id='field_seoTitle']//textarea");
  }

  seonewassets(): Locator {
    return this.page.locator("(//*[contains(@id,'mat-input')])[5]");
  }
  seonewassetsAfterPub(): Locator {
    return this.page.locator("(//*[contains(@id,'mat-input')])[6]");
  }

  internal_newassets(): Locator {
    return this.page.locator("(//*[contains(@id,'mat-input')])[2]");
  }

  promo_newassets(): Locator {
    return this.page.locator("(//*[contains(@id,'mat-input')])[6]");
  }

  shorter_newassets(): Locator {
    return this.page.locator(" (//*[contains(@id,'mat-input')])[7]");
  }

  shortest_newassets(): Locator {
    return this.page.locator(" (//*[contains(@id,'mat-input')])[8]");
  }

  section_type(): Locator {
    return this.page.locator("(//*[contains(@id,'mat-select-value')])");
  }

  section_option(): Locator {
    return this.page.locator("(//*[@class='mat-option-text'])[1]");
  }

  section_option2(): Locator {
    return this.page.locator("(//*[@class='mat-option-text'])[2]");
  }

  licensed_label(): Locator {
    return this.page.locator("(//span[contains(text(),'Licensed')])[1]");
  }

  section_text(): Locator {
    return this.page.locator("(//*[text()='Section'])[3]");
  }

  section(): Locator {
    return this.page.locator(
      "(//input[contains(@class,'c-paper-input-search')])[5])",
    );
  }

  uploadvideo(): Locator {
    return this.page.locator(
      "(//*[@class='upload-button-wrapper']//button)[1]",
    );
  }

  thumbnail(): Locator {
    return this.page.locator("(//*[@id='c_promo']//button)[1]");
  }

  ThumbnailBucket_search(): Locator {
    return this.page.locator("//*[@id='mat-chip-list-input-7']");
  }

  FeaturedMediaBucket_search(): Locator {
    return this.page.locator("//*[@id='mat-chip-list-input-6']");
  }

  uploadvideo_input(): Locator {
    return this.page.locator("(//input[@accept='video/mp4'])[1]");
  }

  upload_alert(): Locator {
    return this.page.locator("//*[@role='alert']");
  }

  request_video(): Locator {
    return this.page.locator("//button[contains(text(),' Request a video')]");
  }

  clip_intime(): Locator {
    return this.page.locator("//div[@id='c_inTime']//textarea");
  }

  clip_outtime(): Locator {
    return this.page.locator("//div[@id='c_outTime']//textarea");
  }

  cliprequest_submit(): Locator {
    return this.page.locator("//button[text()='Submit']");
  }

  save_button(): Locator {
    return this.page.locator("//button[text()='Save']");
  }

  save(): Locator {
    return this.page.locator("//li[text()=' Save ']");
  }

  save_unscheduled(): Locator {
    return this.page.locator("//li[text()=' Save as Unscheduled ']");
  }

  save_scheduled(): Locator {
    return this.page.locator("//li[text()=' Save as Scheduled ']");
  }

  btnVMRefresh(): Locator {
    return this.page.locator("//b[contains(@class,'icon icon-refresh')]");
  }

  btnVMRefreshResult(): Locator {
    return this.page.locator(
      "//span[@class='c-result-refresh ng-star-inserted']//button",
    );
  }

  videomanagement_Metadata(headline: string, arg: string): Locator {
    if (arg === "Scheduled") {
      return this.page.locator(
        "//following::a[contains(text(),'" +
          headline +
          "')]//preceding::span[1][contains(text(),'Scheduled')]",
      );
    } else if (arg === "Unscheduled") {
      return this.page.locator(
        "//following::a[contains(text(),'" +
          headline +
          "')]//preceding::span[1][contains(text(),'Unscheduled')]",
      );
    } else if (arg === "title") {
      return this.page.locator("//*[contains(text(),'" + headline + "')]");
    } else {
      return this.page.locator(
        "(//*//following::*[contains(text(),'" +
          headline +
          "')]//following::*[contains(text(),'" +
          arg +
          "')])[1]",
      );
    }
  }

  bookmark_firstitem(): Locator {
    return this.page.locator(
      "((//div[@id='cdk-drop-list-5'])//div[@class='c-title-inline']//a[@class='ng-star-inserted'])[1]",
    );
  }

  mytemplates_firstitem(): Locator {
    return this.page.locator(
      "(//div[@class='c-summary-title c-grid-view'])[7]//a",
    );
  }

  videomgmt_search(): Locator {
    return this.page.locator("//input[contains(@placeholder,'Search Videos')]");
  }

  videomgmt_status(): Locator {
    return this.page.locator("(//*[contains(@id,'mat-select')])[1]");
  }

  videomgmt_region(): Locator {
    return this.page.locator("(//*[contains(@id,'mat-select')])[2]");
  }

  videomgmt_type(): Locator {
    return this.page.locator("(//*[contains(@id,'mat-select')])[3]");
  }

  videomgmt_section(): Locator {
    return this.page.locator("//input[contains(@placeholder,'Section')]");
  }

  videomgmt_datepicker(): Locator {
    return this.page.locator("//*[@dateformat]");
  }

  vidoemgmt_sortby(): Locator {
    return this.page.locator("//*[contains(@class,'c-sort-by')]");
  }

  video_type(): Locator {
    return this.page.locator("//*[contains(@id,'mat-select')]");
  }

  videouploading_txt(): Locator {
    return this.page.locator(
      "//*[text()='This video file is currently being processed. You will be able to publish when it’s done.']",
    );
  }

  videomgmt_popup(): Locator {
    return this.page.locator(
      "//*[contains(text(),'This video is still processing and can’t be ingested into Carbon yet.')]",
    );
  }

  first_grid_item(): Locator {
    return this.page.locator(
      "(//div[@class='c-summary-title c-grid-view'])[1]//a",
    );
  }

  publish_seo(): Locator {
    return this.page.locator("(//ul[@class='c-fields'])[1]//a");
  }

  Native(): Locator {
    return this.page.locator("(//*[text()='Native'])");
  }

  Usage_Rules_new(): Locator {
    return this.page.locator(
      "(//input[contains(@id,'mat-chip-list-input')])[17]",
    );
  }

  urldomain(): Locator {
    return this.page.locator("//*[@class='url-domain']");
  }

  urlpath(): Locator {
    return this.page.locator("//*[@class='url-path']");
  }

  publish_anyway(): Locator {
    return this.page.locator(
      "(//div[@class='notice-buttons']//button[@class='c-button-wrapper'])[2]",
    );
  }

  default_template(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-drawer-wrapper']//div[@id='c_template']//span[contains(@class,'c-title')]",
    );
  }

  default_skin(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-drawer-wrapper']//div[contains(@id,'c_skin')]//span[contains(@class,'title')]",
    );
  }

  authorerrors(): Locator {
    return this.page.locator("//*[contains(@class,'c-fields')]//li");
  }

  copy_idrightrail(): Locator {
    return this.page.locator("(//button[@mattooltip='Copy ID'])[1]");
  }

  default_skinandtemplate(): Locator {
    return this.page.locator(
      "//*[contains(@class,'c-quick-sidebar')]//*[contains(@mattooltip,'More Options')]",
    );
  }

  job_title(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'c-paper-input-control ng-star-inserted')])[7]",
    );
  }

  email(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'c-paper-input-control ng-star-inserted')])[8]",
    );
  }

  contributor_checkbox(): Locator {
    return this.page.locator("(//span[@class='mat-checkbox-label'])[3]");
  }

  contributor_label(): Locator {
    return this.page.locator("(//*[contains(@class,'mat-checkbox-label')])[3]");
  }

  writer_checkbox(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-ripple-element mat-checkbox-persistent-ripple')])[4]",
    );
  }

  producer_checkbox(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-ripple-element mat-checkbox-persistent-ripple')])[5]",
    );
  }

  guest_checkbox(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-ripple-element mat-checkbox-persistent-ripple')])[7]",
    );
  }

  host_checkbox(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-ripple-element mat-checkbox-persistent-ripple')])[9]",
    );
  }

  section_author(): Locator {
    return this.page.locator(
      "(//input[contains(@class,'c-paper-input-search')])[2]",
    );
  }

  CNBC_Anchor(): Locator {
    return this.page.locator(
      "//span[contains(text(),'CNBC Anchors and Reporters')]",
    );
  }

  short_title(): Locator {
    return this.page.locator(
      "//*[contains(@id,'c_shorterHeadline')]//*[contains(@class,'c-paper-input-control ng-star-inserted')]",
    );
  }

  bookmarks_rightrail_iconnew(): Locator {
    return this.page.locator(
      "//*[contains(@class,'c-item')]//*[contains(@class,'icon icon-bookmark')]",
    );
  }

  copytoclipboard(): Locator {
    return this.page.locator("//*[@class='c-copy-confirm']");
  }

  video_sources(): Locator {
    return this.page.locator(
      "//*[contains(@id,'ngb-typeahead-5-')]//span[contains(@class,'c-title c-nolink ng-star-inserted')]",
    );
  }

  ResetFilters(): Locator {
    return this.page.locator(
      '//*[contains(@class,"icon icon-refresh la-2x mr-2")]',
    );
  }

  LayOut_Template(): Locator {
    return this.page.locator("mat-chip-list-input-8");
  }

  Live_Blog_Template(): Locator {
    return this.page.locator("//h5[text()='Live Blog Template']");
  }

  Icon_Close(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'sidebar')]//i[contains(@class,'icon icon-close')])[1]",
    );
  }

  About_Text_Field(): Locator {
    return this.page.locator("(//div[contains(@class,'ProseMirror')])[1]");
  }

  About_Link(): Locator {
    return this.page.locator("(//i[contains(@class,'icon-chain')])[1]");
  }

  About_Link_Input(): Locator {
    return this.page.locator(
      "((//input-dropdown[contains(@class,'')])//input)[1]",
    );
  }

  Check_Circle(): Locator {
    return this.page.locator(
      "((//i[contains(@class,'icon icon-check-circle')]))[1]",
    );
  }

  Featured_Content_Text_Field(): Locator {
    return this.page.locator("((//div[contains(@class,'ProseMirror')])//p)[2]");
  }

  Featured_Media(): Locator {
    return this.page.locator("(//i[contains(@class,'icon-photo')])[2]");
  }

  Infographic_Media(): Locator {
    return this.page.locator("(//span[contains(text(),'Infographic')])[2]");
  }

  Infographics_Placeholder(): Locator {
    return this.page.locator(
      "(//input[contains(@placeholder,'Search Infographics')])[1]",
    );
  }

  Image(): Locator {
    return this.page.locator("//img[contains(@src,'MM')]");
  }

  Insert_Media(): Locator {
    return this.page.locator("//button[contains(text(),'Insert')]");
  }

  Inserted_Media(): Locator {
    return this.page.locator(
      "//div[contains(@class,'Publish expanded')]//img[contains(@class,'img-fluid')]",
    );
  }

  Text(): Locator {
    return this.page.locator("(//div[contains(@class,'ProseMirror')]//p)[2]");
  }

  Featured_Italic_Button(): Locator {
    return this.page.locator("(//i[contains(@class,'italic')])[2]");
  }
  Bulleted_List(): Locator {
    return this.page.locator("(//i[contains(@class,'icon-list')])[3]");
  }
  Bulleted_Text(): Locator {
    return this.page.locator("(//div[contains(@class,'ProseMirror')]//ul)[3]");
  }

  Live_Feed(): Locator {
    return this.page.locator("(//h4[contains(text(),'Live Feed')])");
  }

  Add_Draft(): Locator {
    return this.page.locator("((//*[contains(@id,'field_liveFeed')])//i)[1]");
  }

  New_Draft(): Locator {
    return this.page.locator(
      "((//*[contains(@id,'field_liveFeed')]))//div[@class='add-post']//i",
    );
  }

  Add_Post(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'post_add')]");
  }

  Launch_Post(): Locator {
    return this.page.locator(
      "(//mat-card//mat-icon[contains(text(),'launch')])[1]",
    );
  }

  Launch_Post_New(): Locator {
    return this.page.locator(
      "(//mat-card//mat-icon[contains(text(),'launch')])[1]",
    );
  }

  Launch_Post_Latest(): Locator {
    return this.page.locator(
      "(//mat-card//mat-icon[contains(text(),'launch')])[2]",
    );
  }

  Launch_Post_Third(): Locator {
    return this.page.locator(
      "(//mat-card//mat-icon[contains(text(),'launch')])[4]",
    );
  }

  Featured_Content_Text(): Locator {
    return this.page.locator(
      "The coronavirus outbreak across the U.S. continues to grow with the country reporting another record single-day spike of more than 63,200 new cases on Thursday, according to data collected by Johns Hopkins University.",
    );
  }

  Author(): Locator {
    return this.page.locator("(//h4[contains(text(),'Author')])[1]");
  }

  Author_Field(): Locator {
    return this.page.locator(
      "((//h4[contains(text(),'Author')])[1]//ancestor::div)[4]//following-sibling::div[contains(@class,'control')]//mat-form-field//input",
    );
  }

  Test_Author(): Locator {
    return this.page.locator("(//span[contains(text(),'TestAuthor')])[1]");
  }

  Source_Field(): Locator {
    return this.page.locator(
      "((//h4[contains(text(),'Source')])[1]//ancestor::div)[4]//following-sibling::div[contains(@class,'control')]//mat-form-field//input",
    );
  }

  Section_Field(): Locator {
    return this.page.locator(
      "((//h4[contains(text(),'Section')])[1]//ancestor::div)[4]//following-sibling::div[contains(@class,'control')]//mat-form-field//input",
    );
  }

  CoronaVirus(): Locator {
    return this.page.locator("(//*[contains(text(),'Coronavirus')])");
  }

  Link(): Locator {
    return this.page.locator("(//*[contains(@class,'icon icon-link')])");
  }

  Desktop_Live_Button(): Locator {
    return this.page.locator("(//button[contains(text(),'Desktop - Live')])");
  }

  Draft_Image_1(): Locator {
    return this.page.locator("(//i[contains(@class,'icon-photo')])[1]");
  }

  Image_Placeholder(): Locator {
    return this.page.locator(
      "(//input[contains(@placeholder,'Search Photos')])[1]",
    );
  }

  Image_ID(): Locator {
    return this.page.locator("//img[contains(@src,'106600406')]");
  }

  Paragraph_with_Media(): Locator {
    return this.page.locator("//div[@class='ProseMirror']/p");
  }

  Paragraph_with_Media_inFullscreen(): Locator {
    return this.page.locator("//div[contains(@class,'ProseMirror')]//p");
  }

  More(): Locator {
    return this.page.locator("(//button[@mattooltip='More Options'])[3]");
  }

  More_Latest(): Locator {
    return this.page.locator(
      "((//div[@class='ProseMirror'])//button[@mattooltip='More Options'])[3]",
    );
  }

  Publish(): Locator {
    return this.page.locator("(//button[contains(text(),'Publish')])");
  }

  Pop_Up_Publish(): Locator {
    return this.page.locator(
      "(//mat-dialog-container//span[contains(text(),'Publish')])",
    );
  }

  Publish_Post(): Locator {
    return this.page.locator("(//button[contains(text(),'Publish Post')])");
  }
  Published_Post_2(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'c-status-Published')])[2]",
    );
  }

  Draft_Video_1(): Locator {
    return this.page.locator("(//i[contains(@class,'icon-video-asset')])[2]");
  }

  Video_Placeholder(): Locator {
    return this.page.locator(
      "(//input[contains(@placeholder,'Search Videos')])[1]",
    );
  }

  Video_ID(): Locator {
    return this.page.locator("//img[contains(@src,'106600426')]");
  }

  Inserted_Video(): Locator {
    return this.page.locator(
      "//div[contains(@class,'Publish')]//img[contains(@src,'106600426')]",
    );
  }

  PublishStoryandPost(): Locator {
    return this.page.locator(
      "(//button[contains(text(),'Publish Story and Post')])",
    );
  }

  Text_2(): Locator {
    return this.page.locator("(//div[contains(@class,'ProseMirror')]//p)[3]");
  }

  rte_InteractiveChartIcon(): Locator {
    return this.page.locator(
      "//button[@mattooltip='Interactive Chart']/span/mat-icon",
    );
  }
  rte_InteractiveChartIcon2(): Locator {
    return this.page.locator(
      "(//button[@mattooltip='Interactive Chart']/span/mat-icon)[2]",
    );
  }
  interactiveChartModal_Cancel(): Locator {
    return this.page.locator(
      "//app-rte-interactive-chart//button//span[text()='Cancel']",
    );
  }
  interactiveChartModal_SaveChart(): Locator {
    return this.page.locator(
      "//app-rte-interactive-chart//button//span[text()='Save Chart']",
    );
  }
  interactiveChartModal_PrimaryAssetInput(): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart//mat-icon[text()='attach_money'])[1]/following-sibling::input",
    );
  }
  interactiveChartModal_PrimaryAssetLabel(): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart//mat-icon[text()='attach_money'])[1]/following-sibling::mat-chip",
    );
  }

  interactiveChartModal_ComparisonAssetInput(): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart//mat-icon[text()='attach_money'])[2]/following-sibling::input",
    );
  }
  interactiveChartModal_ComparisonAssetLabel(): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart//mat-icon[text()='attach_money'])[2]/following-sibling::mat-chip",
    );
  }
  interactiveChartModal_Mountain(): Locator {
    return this.page.locator(
      "//app-rte-interactive-chart//mat-icon[@svgicon='mountain']",
    );
  }
  interactiveChartModal_Bar(): Locator {
    return this.page.locator(
      "//app-rte-interactive-chart//mat-icon[text()='bar_chart']",
    );
  }
  interactiveChartModal_Line(): Locator {
    return this.page.locator(
      "//app-rte-interactive-chart//mat-icon[text()='stacked_line_chart']",
    );
  }

  interactiveChartModal_Range(range: string): Locator {
    return this.page.locator(
      "//*[@id='field_range']//span[contains(text(),'" + range + "')]",
    );
  }

  interactiveChartModal_CustomRangeCHKInput(): Locator {
    return this.page.locator(
      "//*[@id='custom-range']//input[@type='checkbox']",
    );
  }
  interactiveChartModal_CustomRangeCheckbox(): Locator {
    return this.page.locator("//*[@id='custom-range']//mat-checkbox/label");
  }
  interactiveChartModal_CustomeDateInput(): Locator {
    return this.page.locator(
      "//app-rte-interactive-chart//carbon-datepicker//input[@type='date']",
    );
  }
  interactiveChartModal_FallBackImgSlider(): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart//mat-slide-toggle//*[contains(@class,'slide-toggle-')])[1]",
    );
  }
  interactiveChartModal_FallBackImgInput(): Locator {
    return this.page.locator(
      "//app-rte-interactive-chart//mat-icon[text()='image']",
    );
  }
  interactiveChartModal_Description(): Locator {
    return this.page.locator("//*[@id='field_alttext']//textarea");
  }

  interactiveChartRteView_Header(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" + index + "]//h4",
    );
  }

  interactiveChartRteView_ChartIcon(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" +
        index +
        "]//mat-icon[contains(@class,'ichart-display')]",
    );
  }

  interactiveChartRteView_TimeFrame(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" +
        index +
        "]//div[@class='ic-content-timeframe']/span[2]",
    );
  }

  interactiveChartRteView_ComparisonAssets(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" +
        index +
        "]//div[@class='ic-content-comparison-assets']/span[2]",
    );
  }

  interactiveChartRteView_ChartType(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" +
        index +
        "]//div[@class='ic-content-chart-type']/span[2]",
    );
  }

  interactiveChartRteView_ChartImage(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" +
        index +
        "]//div[@class='fallback-image-holder']/img",
    );
  }

  interactiveChartRteView_Description(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" +
        index +
        "]//span[@class='description']",
    );
  }

  interactiveChartRteView_EditChart(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" +
        index +
        "]//mat-icon[text()='edit']",
    );
  }

  interactiveChartRteView_DeleteChart(index: number): Locator {
    return this.page.locator(
      "(//app-rte-interactive-chart-view)[" +
        index +
        "]//mat-icon[text()='close']",
    );
  }

  SEOUrl(): Locator {
    return this.page.locator(
      "//*[contains(@id,'link')]//span[contains(text(),'cnbc')]",
    );
  }

  SEOUrl_add(): Locator {
    return this.page.locator("//*[@id='c_link']/span[2]");
  }
  SEOUrl_add_New(): Locator {
    return this.page.locator("//span[@class='uneditable-url-part']");
  }

  SEOUrl_name(): Locator {
    return this.page.locator("//*[@id='c_link']//div[@class='c-note-edit']");
  }
  SEOUrl_advertorialText(): Locator {
    return this.page.locator(
      "//carbon-url-input//span[@class='uneditable-url-part']",
    );
  }
  complete_SEOUrl_New(): Locator {
    return this.page.locator(
      "(//mat-form-field[contains(@class,'editable-url-part')]//input)[2]",
    );
  }
  complete_SEOUrl_New_WithoutDateHtml(): Locator {
    return this.page.locator(
      "(//mat-form-field[contains(@class,'editable-url-part')]//input)[1]",
    );
  }
  Extention(): Locator {
    return this.page.locator("//*[@id='c_link']/span[3]");
  }

  OldPublish(): Locator {
    return this.page.locator("//*[text()='Publish']");
  }
  OldPublishBR(): Locator {
    return this.page.locator("//*[text()='Publish ']");
  }
  OldPublish1(): Locator {
    return this.page.locator("//*[@class='c-icon icon icon-angle-down'])[1]");
  }

  Success_MSG(): Locator {
    return this.page.locator("//*[contains(@class,'c-success-msg-body')]");
  }

  Success_Pop(): Locator {
    return this.page.locator(
      "//*[contains(@class,'c-success-pop')]//*[contains(@class,'icon-close')]",
    );
  }

  Dateline(): Locator {
    return this.page.locator("//*[text()='Dateline']");
  }

  Unpublish(): Locator {
    return this.page.locator("//*[text()=' Unpublish ']");
  }
  Unpublishnew1(): Locator {
    return this.page.locator("(//*[contains(text(),'Unpublish')])[2]");
  }

  Unpublishnew(): Locator {
    return this.page.locator("(//*[contains(text(),'Unpublish')])[1]");
  } //By.xpath("//*[text()='Unpublish']");}

  Confirm_Unpublish(): Locator {
    return this.page.locator("//*[text()='Confirm']");
  }

  Unpublished(): Locator {
    return this.page.locator("//strong[text()=' Un-Published ']");
  }
  UnpublishedNew(): Locator {
    return this.page.locator("//strong[text()=' Un-Published ']");
  }

  ModifiedTemplate(): Locator {
    return this.page.locator("//*[contains(text(),'modifying this template')]");
  }

  Bookmark(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'bookmark')]");
  }
  BookmarkNewConfig(): Locator {
    return this.page.locator("(//mat-icon[contains(text(),'bookmark')])[1]");
  }
  BookmarkOldConfig(): Locator {
    return this.page.locator(
      "//span[@class='c-btn c-btn-icon c-btn-active-blue']",
    );
  }

  RevertAsset(): Locator {
    return this.page.locator("//*[contains(text(),'Revert to Asset')]");
  }

  Home(): Locator {
    return this.page.locator("(//*[contains(@href,'/dashboard/home')])[1]");
  }

  cross_Btn(): Locator {
    return this.page.locator("//*[@title='CLOSE']");
  }

  cross_Btn2(): Locator {
    return this.page.locator("//*[@class='btn c-close pull-right p-1']");
  }

  featuredMedia_AddImage_Button(): Locator {
    return this.page.locator(
      "//h4[text()='Featured Media']/../following-sibling::div//button",
    );
  }
  thumbnail_AddImage_Button(): Locator {
    return this.page.locator(
      "//h4[text()='Thumbnail']/../following-sibling::div//button",
    );
  }
  rte_LaunchImageAssetButton(): Locator {
    return this.page.locator(
      "//app-rte//assets//image-view//button//mat-icon[text()='launch']",
    );
  }
  featuredMedia_LaunchImageAssetButton(): Locator {
    return this.page.locator(
      "//featured-media-view//a//mat-icon[text()='launch']",
    );
  }
  thumbnail_LaunchImageAssetButton(): Locator {
    return this.page.locator(
      "//h4[text()='Thumbnail']/../following-sibling::div//carbon-summary-view//a//mat-icon[text()='launch']",
    );
  }
  EvergreenToggleButton(): Locator {
    return this.page.locator("//*[@id='mat-slide-toggle-6']");
  }
  settings(): Locator {
    return this.page.locator("//*[text()='tune']");
  }
  EvergreenHeader(): Locator {
    return this.page.locator("(//*[text()='Evergreen'])[2]");
  }
  EvergreenUsageRule(): Locator {
    return this.page.locator("(//*[text()='Evergreen'])[1]");
  }
  CloseUsageRule(): Locator {
    return this.page.locator(
      "//carbon-autocomplete[@id='field_usageRule']//mat-icon[text()='close']",
    );
  }
  ToggleFalse(): Locator {
    return this.page.locator(
      "//carbon-slide-toggle[@id='field_seoTitle']//input[@aria-checked='false']",
    );
  }
  ToggleTrue(): Locator {
    return this.page.locator("//*[text()=' Make evergreen ']");
  }
  SectionTree(): Locator {
    return this.page.locator("(//*[@id='field_assets'])[1]");
  }
  SelectSection(): Locator {
    return this.page.locator("//*[text()=' Select ']");
  }
  Publish_Anyway(): Locator {
    return this.page.locator("(//*[text()='Publish anyway'])[2]");
  }

  //Tiktok FAQ Card Interactive Chart
  newlineMenu_TikTok(): Locator {
    return this.page.locator("//button[@mattooltip='TikTok']");
  }
  newlineMenu_TikTokURL(): Locator {
    return this.page.locator("//input[@title='Social Media Embed']");
  }
  newlineMenu_FAQCard(): Locator {
    return this.page.locator("//button[@mattooltip='FAQ Card']");
  }
  newlineMenu_FAQCardTitle(): Locator {
    return this.page.locator("//card[@type='question-answer']//h2");
  }
  newlineMenu_FAQCardQuestion(question: number): Locator {
    return this.page.locator(
      "(//div[@class='question-answer']//question)[" + question + "]",
    );
  }

  newlineMenu_FAQCardAnswer(question: number): Locator {
    return this.page.locator(
      "(//div[@class='question-answer']//answer)[" + question + "]",
    );
  }

  newlineMenu_FAQCardAddQuestion(): Locator {
    return this.page.locator("//div[@class='add-question']");
  }
  newlineMenu_InteractiveChart(): Locator {
    return this.page.locator("//button[@mattooltip='Interactive Chart']");
  }
  interactiveChart_PrimaryAsset(): Locator {
    return this.page.locator(
      "(//mat-chip-list[contains(@id,'mat-chip-list')]//input)[1]",
    );
  }
  interactiveChart_ComparisonAsset(): Locator {
    return this.page.locator(
      "(//mat-chip-list[contains(@id,'mat-chip-list')]//input)[2]",
    );
  }
  interactiveChart_Timeframe(timeframe: string): Locator {
    return this.page.locator(
      "//input[@class='mat-radio-input' and @value='" + timeframe + "']",
    );
  }

  interactiveChart_Cancel(): Locator {
    return this.page.locator(
      "//mat-dialog-container[contains(@id,'mat-dialog')]//button[span/span[text()='Cancel']]",
    );
  }
  interactiveChart_Save(): Locator {
    return this.page.locator(
      "//mat-dialog-container[contains(@id,'mat-dialog')]//button[span/span[text()='Save Chart']]",
    );
  }
  interactiveChart_CustomRange(): Locator {
    return this.page.locator(
      "//mat-checkbox[contains(@id,'mat-checkbox')]//span[contains(text(),'Custom Range')]",
    );
  }
  interactiveChart_gridTileMountain(): Locator {
    return this.page.locator(
      "//mat-grid-tile[.//mat-grid-tile-footer[contains(text(),'Mountain')]]",
    );
  }
  interactiveChart_gridTileBar(): Locator {
    return this.page.locator(
      "//mat-grid-tile[.//mat-grid-tile-footer[contains(text(),'Bar')]]",
    );
  }
  interactiveChart_gridTileLine(): Locator {
    return this.page.locator(
      "//mat-grid-tile[.//mat-grid-tile-footer[contains(text(),'Line')]]",
    );
  }
  interactiveChart_DateField(): Locator {
    return this.page.locator(
      "//input[@type='date' and contains(@id,'mat-input')]",
    );
  }
  interactiveChart_fallbackImageToggle(): Locator {
    return this.page.locator(
      "//div[contains(@class,'ic-fallback-image')]//mat-slide-toggle//input[@type='checkbox']",
    );
  }
  interactiveChart_altTextTextareaById(): Locator {
    return this.page.locator("//carbon-input[@id='field_alttext']//textarea");
  }

  //Wordcount
  wordCount(): Locator {
    return this.page.locator("//*[@data-mat-icon-name='word-count']");
  }
  wordsCount(): Locator {
    return this.page.locator("//div[@class='word-counter']");
  }
  wordsValue(): Locator {
    return this.page.locator(
      "//div[@class='row']//div[@class='col left' and normalize-space()='Words']/following-sibling::div[@class='col right']",
    );
  }
  charSpacesLabel(): Locator {
    return this.page.locator(
      "//div[@class='row']//div[@class='col left' and normalize-space()='Characters & Spaces']",
    );
  }
  charSpacesValue(): Locator {
    return this.page.locator(
      "//div[@class='row']//div[@class='col left' and normalize-space()='Characters & Spaces']/following-sibling::div[@class='col right']",
    );
  }
  charOnlyLabel(): Locator {
    return this.page.locator(
      "//div[@class='row']//div[@class='col left' and normalize-space()='Characters Only']",
    );
  }
  charOnlyValue(): Locator {
    return this.page.locator(
      "//div[@class='row']//div[@class='col left' and normalize-space()='Characters Only']/following-sibling::div[@class='col right']",
    );
  }
  displayWordCountCheckbox(): Locator {
    return this.page.locator(
      "//input[@type='checkbox' and contains(@class,'checkbox-margin')]",
    );
  }
  cancelButton(): Locator {
    return this.page.locator("//button[normalize-space()='Cancel']");
  }
  okButton(): Locator {
    return this.page.locator("//button[normalize-space()='OK']");
  }
  wordCountTextaboveRTE(): Locator {
    return this.page.locator(
      "(//div[@class='word-counter ng-star-inserted'])[1]",
    );
  }
  wordCountTextBelowRTE(): Locator {
    return this.page.locator(
      "(//div[@class='word-counter ng-star-inserted'])[2]",
    );
  }

  //User Alert
  alertModalCancel(): Locator {
    return this.page.locator(
      "(//div[contains(@id,'mat-dialog-title')]//following::span[text()='Cancel'])[2]",
    );
  }
  alertModalContinue(): Locator {
    return this.page.locator(
      "(//div[contains(@id,'mat-dialog-title')]//following::span[text()='Continue'])[2]",
    );
  }
  alertModalText(): Locator {
    return this.page.locator("(//h2[contains(@id,'mat-dialog-title')])[2]");
  }
  usedInDialogTitle(): Locator {
    return this.page.locator("//*[contains(@id,'mat-dialog-title')]");
  }
  usedInTitleInVideoPage(): Locator {
    return this.page.locator("//div[@class='c-block ng-star-inserted']");
  }

  usageRule_Options(usageRule: string): Locator {
    return this.page.locator(
      "//h5[@class='mat-tooltip-trigger summary-title' and text()='" +
        usageRule +
        "']",
    );
  }

  removeTag(tagName: string): Locator {
    return this.page.locator(
      "//span[text()='" + tagName + "']//following-sibling::*[text()='close']",
    );
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

  commentMoreOptions(value: number): Locator {
    return this.page.locator(
      "(//button[@mattooltip='Comment Edit Actions']//mat-icon[text()='more_vert'])[" +
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
  commentContent(value: number): Locator {
    return this.page.locator(
      "(//div[contains(@class,'comment-content')])[" + value + "']",
    );
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
