import {
  BasePage,
  WaitHelpers,
  BrowserActions,
  MouseActions,
} from "@cnbc/playwright-sdk";
import { expect, type Locator, type Page } from "@playwright/test";

export class SITPage {
  private readonly base: BasePage;

  constructor(private readonly page: Page) {
    this.base = new BasePage(page, "SITPage");
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

  edtUserName(): Locator {
    return this.page.locator("//input[@id='edit-name-1']");
  }
  edtPassword(): Locator {
    return this.page.locator("//*[@id='edit-pass-1']");
  }
  btnLoginButton(): Locator {
    return this.page.locator("//*[@id='edit-submit-1']");
  }
  lnkContentLibrary(): Locator {
    return this.page.locator("//a[contains(@href,'content-library')]");
  }
  tabMyHistory(): Locator {
    return this.page.locator("//li[contains(text(),'My History')]");
  }
  loadMoreButtoninHistory(): Locator {
    return this.page.locator("//span[contains(text(),'Load more')]");
  }
  loadMoreButtoninHistorySideDrawer(): Locator {
    return this.page.locator(
      "//sticky-drawer//history//span[contains(text(),'Load more')]",
    );
  }
  loadMoreBtn_TopHeaderTemplate(): Locator {
    return this.page.locator("//app-top-header//a[text()='Load more']");
  }
  loadMoreBtn_HomeDashboardTemplate(): Locator {
    return this.page.locator(
      "//div[@id='c_dashboard_templates']//a[text()='Load more']",
    );
  }
  loadMoreBtn_SideDrawerTemplate(): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-quick-sidebar')]//a[text()='Load more']",
    );
  }
  btnCreateFromScratch(): Locator {
    return this.page.locator("//i[@class='icon icon-plus']");
  }
  edtSeoTitle(): Locator {
    return this.page.locator(
      "//div[@id='c_seoTitle']//div[@class='c-paper-input-control ng-star-inserted']",
    );
  }
  edtSocialMessage(): Locator {
    return this.page.locator("//div[@class='c-note-edit']");
  }
  edtPromoTitle(): Locator {
    return this.page.locator(
      "//div[@id='c_linkHeadline']//div[@class='c-paper-input-control ng-star-inserted']",
    );
  }
  edtShortTitle(): Locator {
    return this.page.locator("//div[@id='c_shorterHeadline']//textarea");
  }
  edtSummary(): Locator {
    return this.page.locator("//div[@id='c_summary']//textarea");
  }
  edtShortSummary(): Locator {
    return this.page.locator("//div[@id='c_shorterDescription']//textarea");
  }
  edtKeyPoints(): Locator {
    return this.page.locator(
      "//div[@class='ProseMirror c-hideList c-rte-keypoints']",
    );
  }
  edtBody(): Locator {
    return this.page.locator("//div[@class='ProseMirror']");
  }
  edtFeaturedMediaSearch(): Locator {
    return this.page.locator(
      "//div[@id='c_featured_media']//input[@placeholder='Click icon to launch Media Gallery OR type to search images']",
    );
  }
  edtFeaturedMediaButton(): Locator {
    return this.page.locator(
      "//div[@id='c_featured_media']//span[@class='c-btn c-btn-icon']",
    );
  }
  edtThumbnailSearch(): Locator {
    return this.page.locator(
      "//div[@id='c_promo']//input[@placeholder='Click icon to launch Media Gallery OR type to search images']",
    );
  }
  edtThumbnailButton(): Locator {
    return this.page.locator(
      "//div[@id='c_promo']//span[@class='c-btn c-btn-icon']",
    );
  }
  edtAdditionalSection(): Locator {
    return this.page.locator(
      "//div[@id='c_additional_sections']//input[contains(@placeholder,' type to search sections')]",
    );
  }
  edtTagging(): Locator {
    return this.page.locator(
      "//input[@placeholder='Click icon for auto-tags-autocomplete OR type to search tags-autocomplete']",
    );
  }
  edtKeywords(): Locator {
    return this.page.locator(
      "//div[@id='c_keywords']//div[@class='c-paper-input-control ng-star-inserted']",
    );
  }
  edtUpNext(): Locator {
    return this.page.locator(
      "//input[@placeholder='Type to search all story content types, video']",
    );
  }
  tabSettings(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='tune']",
    );
  }
  tabInformation(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='info']",
    );
  }

  tabInformationVideo(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='info']",
    );
  }
  tabInformationOnly(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='info']",
    );
  }
  tabInformationAfterRefresh(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='info']",
    );
  }
  edtSubhead(): Locator {
    return this.page.locator(
      "//div[@id='c_deck']//div[@class='c-paper-input-control ng-star-inserted']",
    );
  }
  edtTeam(): Locator {
    return this.page.locator("//input[@placeholder='Type to select a team']");
  }
  edtProject(): Locator {
    return this.page.locator(
      "//input[@placeholder='Type to select a project']",
    );
  }
  edtTemplate(): Locator {
    return this.page.locator(
      "//input[@placeholder='Type to select a template']",
    );
  }
  edtSkin(): Locator {
    return this.page.locator("//input[@placeholder='Type to select a skin']");
  }
  edtUsageRule(): Locator {
    return this.page.locator(
      "//input[@placeholder='Type to select a usage rule']",
    );
  }
  btnSave(): Locator {
    return this.page.locator("//button[contains(text(),'Save')]");
  }
  btnVideoSave(): Locator {
    return this.page.locator("//li[text()=' Save ']");
  }
  btnActions(): Locator {
    return this.page.locator("//*[contains(text(),'Actions')]");
  }
  lnkViewEditHistory(): Locator {
    return this.page.locator("//*[contains(text(),'View edit history')]");
  }
  lnkCopyIDMoreMenu(): Locator {
    return this.page.locator("//*[contains(text(),'Copy Id')]");
  }
  lnkCopyIDOption(): Locator {
    return this.page.locator(
      "//*[@class='col c-cell c-actions']//*[contains(text(),'filter_none')]",
    );
  }
  lnkCopyIDMediaLibrary(): Locator {
    return this.page.locator(
      "//div[@id='carbon-media-card']//button[@mattooltip='Copy ID']",
    );
  }
  lnkCopyEditURL(): Locator {
    return this.page.locator("//*[contains(text(),'Copy Edit Url')]");
  }
  lnkCopyLiveURL(): Locator {
    return this.page.locator("//*[contains(text(),'Copy Live Url')]");
  }
  lnkEditURL(): Locator {
    return this.page.locator(
      "//*[@class='internal-link']//*[contains(text(),'Edit')]",
    );
  }
  lnkViewLiveURL(): Locator {
    return this.page.locator("//*[contains(text(),'View live')]");
  }
  lnkEditTemplate(): Locator {
    return this.page.locator("//*[contains(text(),'Edit Template')]");
  }
  lnkViewinReadOnly(): Locator {
    return this.page.locator("//*[contains(text(),'View in read-only')]");
  }
  lnkSaveAsTemplate(): Locator {
    return this.page.locator("//*[contains(text(),'Save as template')]");
  }
  lnkSaveAsTemplateNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Save as Template')]");
  }
  lnkUnpublish(): Locator {
    return this.page.locator("//*[contains(text(),'Unpublish')]");
  }
  lnkUnpublish1(): Locator {
    return this.page.locator("(//*[text()=' Unpublish '])[1]");
  }
  lnkUnpublishLater(): Locator {
    return this.page.locator("//*[contains(text(),'Unpublish Later')]");
  }
  lnkHold(): Locator {
    return this.page.locator("//*[contains(text(),'Hold')]");
  }
  btnHold(): Locator {
    return this.page.locator("//button[contains(text(),'Hold')]");
  }
  lnkHold1(): Locator {
    return this.page.locator("//li[contains(text(),'Hold')]");
  }
  btnCopyIcon(): Locator {
    return this.page.locator(
      "//span[@class='c-btn c-btn-icon dropdown-toggle' and @ngbtooltip='Copy']",
    );
  }
  btnPreviewLinks(): Locator {
    return this.page.locator(
      "//span[@class='c-btn c-btn-icon dropdown-toggle' and @ngbtooltip='Preview links']",
    );
  }
  btnLivelinks(): Locator {
    return this.page.locator(
      "//span[@class='c-btn c-btn-icon dropdown-toggle' and @ngbtooltip='Live links']",
    );
  }
  //do this for all the locators
  btnAddToBookmark(): Locator {
    return this.page.locator(
      "//span[@class='ng-star-inserted']//span[@class='c-btn c-btn-icon']",
    );
  }
  btnCopyID(): Locator {
    return this.page.locator(
      "//span[@class='ng-star-inserted show dropdown']//span[1]",
    );
  }
  btnCopyURL(): Locator {
    return this.page.locator(
      "//span[@class='ng-star-inserted show dropdown']//span[2]",
    );
  }
  btnCopyPreviewURL(): Locator {
    return this.page.locator(
      "//span[@class='ng-star-inserted show dropdown']//span[3]",
    );
  }
  btnSubHeadingSelectionMenu(): Locator {
    return this.page.locator(
      "//rte-selectionmenu[@class='ng-star-inserted']//rte-menuitem[1]//span[1]",
    );
  }
  btnBoldSelectionMenu(): Locator {
    return this.page.locator(
      "//rte-selectionmenu[@class='ng-star-inserted']//rte-menuitem[2]//span[1]",
    );
  }
  btnItalicSelectionMenu(): Locator {
    return this.page.locator(
      "//rte-selectionmenu[@class='ng-star-inserted']//rte-menuitem[3]//span[1]",
    );
  }
  btnLinkSelectionMenu(): Locator {
    return this.page.locator(
      "//rte-selectionmenu[@class='ng-star-inserted']//rte-menuitem[4]//span[1]",
    );
  }
  btnStockQuoteSelectionMenu(): Locator {
    return this.page.locator(
      "//rte-selectionmenu[@class='ng-star-inserted']//rte-menuitem[5]//span[1]",
    );
  }
  btnBlockQuoteSelectionMenu(): Locator {
    return this.page.locator(
      "//rte-selectionmenu[@class='ng-star-inserted']//rte-menuitem[6]//span[1]",
    );
  }
  RTEToolbarMenuSubHeading(): Locator {
    return this.page.locator(
      "//span[@class='c-rte-menuicon']//*[@class='icon-header']",
    );
  }
  RTEToolbarLink(): Locator {
    return this.page.locator(
      "(//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-chain'])[1]",
    );
  }
  RTEToolbarmenuStockQuote(): Locator {
    return this.page.locator(
      "(//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-dollar'])[1]",
    );
  }
  RTEToolbarLink2(): Locator {
    return this.page.locator(
      "(//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-chain'])[2]",
    );
  }
  RTEToolbarmenuStockQuote2(): Locator {
    return this.page.locator(
      "(//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-dollar'])[2]",
    );
  }
  edtInlineLink(): Locator {
    return this.page.locator("(//input[@autocomplete='off'])[2]");
  }
  btnInlineOK(): Locator {
    return this.page.locator(
      "//button[contains(@class,'btn')]//i[contains(@class,'icon-check-circle')]",
    );
  }
  btnInlineOKStock(): Locator {
    return this.page.locator(
      "//button[contains(@class,'btn')]//i[contains(@class,'icon-check-circle')]",
    );
  }
  btnInlineEdit(): Locator {
    return this.page.locator(
      "//button[contains(@class,'btn')]//i[contains(@class,'icon icon-pencil-square')]",
    );
  }
  btnRTEMenuImage(): Locator {
    return this.page.locator(
      "//span[@class='c-rte-menuicon']//i[@class='icon-photo']",
    );
  }
  BodyPlusIcon(): Locator {
    return this.page.locator("//i[@class='la la-plus-circle']");
  }
  btnInsertMedia(): Locator {
    return this.page.locator("//button[contains(text(),'Insert media')]");
  }
  btnSelectChartFile(): Locator {
    return this.page.locator("//button[@type='button']");
  }
  btnInsertChart(): Locator {
    return this.page.locator(
      "//span[@class='c-rte-chart-submit btn btn-secondary col']",
    );
  }
  edtEmbedCodeEditor(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'cm-activeLine cm-line')])[1]",
    );
  }
  edtEmbedCodeEditor2(): Locator {
    return this.page.locator("(//pre[contains(@class,'CodeMirror-line')])[2]");
  }
  edtPullQuoteEditor(): Locator {
    return this.page.locator("//textarea[@placeholder='Enter quote...']");
  }
  edtPullQuoteEditorBy(): Locator {
    return this.page.locator("//input[@placeholder='By']");
  }
  edtPullQuoteEditorTitle(): Locator {
    return this.page.locator("//input[@placeholder='Title']");
  }
  edtSearchwithNodeIdinRTE(): Locator {
    return this.page.locator("//input[@placeholder='Search or enter ID']");
  }
  lstAssetSearchResultinRTE(): Locator {
    return this.page.locator(
      "//summary-view[@class='ng-star-inserted']//div[@class='c-summary-row']",
    );
  }
  txtSuccessMessagepopup(): Locator {
    return this.page.locator("//div[@class='c-success-msg-body']");
  }
  btnCreateVideo(): Locator {
    return this.page.locator(
      "//div[@class='c-col-body c-scratch']//div[5]//a[1]",
    );
  }
  btnUploadVideo(): Locator {
    return this.page.locator("//span[contains(text(),'Upload Video')]");
  }
  btnRequestaVideo(): Locator {
    return this.page.locator("//button[contains(text(),'Request a video')]");
  }
  btnUploadImage(): Locator {
    return this.page.locator(
      "//file-upload[@buttonlabel='Upload image']//button[@class='c-btn c-btn-primary mat-button ng-star-inserted']",
    );
  }
  btnRequestaVideoDisabled(): Locator {
    return this.page.locator(
      "//span[@class='c-btn c-btn-primary c-action-button ml-2 disabled']",
    );
  }
  edtMainSearch(): Locator {
    return this.page.locator("//div[@id='app_shell_search_field']//input");
  }
  btnReplaceVideo(): Locator {
    return this.page.locator("//span[contains(text(),'Replace Video')]");
  }
  edtvideoTitle(): Locator {
    return this.page.locator(
      "/html[1]/body[1]/div[1]/dashboard[1]/div[1]/div[1]/div[1]/div[1]/div[2]/form[1]/app-form[1]/div[4]/input-control[1]/div[1]/div[1]/div[1]/div[2]/div[1]",
    );
  }
  btnHeaderFromRTE(): Locator {
    return this.page.locator(
      "//rte-selectionmenu-menu[@class='ng-star-inserted']//rte-menuitem[1]",
    );
  }
  btnBoldFromRTE(): Locator {
    return this.page.locator(
      "//rte-selectionmenu-menu[@class='ng-star-inserted']//rte-menuitem[2]",
    );
  }
  btnItalicFromRTE(): Locator {
    return this.page.locator(
      "//rte-selectionmenu-menu[@class='ng-star-inserted']//rte-menuitem[3]",
    );
  }
  btnLinkFromRTE(): Locator {
    return this.page.locator(
      "//*[@class='ng-star-inserted']//rte-menuitem//*[@class='icon-chain']",
    );
  }
  btnStockQuoteFromRTE(): Locator {
    return this.page.locator(
      "//rte-selectionmenu-menu[@class='ng-star-inserted']//rte-menuitem[5]",
    );
  }
  btnBlockQuoteFromRTE(): Locator {
    return this.page.locator(
      "//rte-selectionmenu-menu[@class='ng-star-inserted']//rte-menuitem[6]",
    );
  }
  lnkPreviewLinks(): Locator {
    return this.page.locator("//*[@ngbtooltip='Preview links']");
  }
  btnSaveNow(): Locator {
    return this.page.locator("//button[contains(text(),'Save Now')]");
  }
  lblProgressBar(): Locator {
    return this.page.locator("//div[@class='c-loader-bar']");
  }
  lstAppleResults(): Locator {
    return this.page.locator(
      "//span[@class='c-dropdown-result-field col ng-star-inserted']",
    );
  }
  lnkShrinkImage(): Locator {
    return this.page.locator("//div[@class='c-expand-controls']//span[3]");
  }
  lblEmbedCodeNID(): Locator {
    return this.page.locator("(//*[contains(text(),'filter_none')])[7]");
  }
  btnMoreMenuCodeSnippet(): Locator {
    return this.page.locator(
      "(//asset[@type='wildcard']//following::mat-icon[text()='more_vert'])[1]",
    );
  }
  btnEditTemplateCodeSnippet(): Locator {
    return this.page.locator("//a[contains(text(),'Edit')]");
  }
  btnEditCodeSnippet(): Locator {
    return this.page.locator(
      "(//asset[@type='wildcard']//following::mat-icon[text()='launch'])[1]",
    );
  }
  edtVideoSummary(): Locator {
    return this.page.locator(
      "/html[1]/body[1]/div[1]/dashboard[1]/div[1]/div[1]/div[1]/div[1]/div[2]/form[2]/app-form[1]/div[9]/input-control[1]/div[1]/div[1]/div[1]/div[2]/div[1]",
    );
  }
  edtVideoAdditionalSection(): Locator {
    return this.page.locator(
      "/html[1]/body[1]/div[1]/dashboard[1]/div[1]/div[1]/div[1]/div[1]/div[2]/form[2]/app-form[1]/div[11]/autocomplete-control[1]/div[1]/div[1]/div[1]/div[2]/input[1]",
    );
  }
  lnkHome(): Locator {
    return this.page.locator(
      "//i[@class='c-nav-icon icon icon-home2 ng-star-inserted']",
    );
  }
  lnkMediaLibrary(): Locator {
    return this.page.locator(
      "//i[@class='c-nav-icon icon icon-image2 ng-star-inserted']",
    );
  }
  lnkSearchMenu(): Locator {
    return this.page.locator(
      "//i[@class='c-nav-icon icon icon-search ng-star-inserted']",
    );
  }
  lnkVideoManagement(): Locator {
    return this.page.locator("//a[contains(@href,'video-management')]");
  }
  btnUpload(): Locator {
    return this.page.locator("//i[@class='c-icon icon icon-angle-down']");
  }
  lnkSinglePhoto(): Locator {
    return this.page.locator("//button[contains(text(),'Single Photo')]");
  }
  lnkMultiplePhoto(): Locator {
    return this.page.locator("//button[contains(text(),'Multiple Photos')]");
  }
  edtPhotoUploadTitle(): Locator {
    return this.page.locator("//div[@placeholder='Enter unique slug']");
  }
  btnUploadDropdown(): Locator {
    return this.page.locator("//*[text()='arrow_drop_down']");
  }
  btnUploadAll(): Locator {
    return this.page.locator("//button[contains(text(),'Upload All')]");
  }
  btnPublishAll(): Locator {
    return this.page.locator("//button[contains(text(),'Publish All')]");
  }
  tdCopyRightSign(): Locator {
    return this.page.locator("//td[@title='copyright sign']");
  }
  tdPoundSign(): Locator {
    return this.page.locator("//td[@title='pound sign']");
  }
  btnSpecialCharsClose(): Locator {
    return this.page.locator("//button[contains(text(),'Close')]");
  }
  edtContentGroupSearch(): Locator {
    return this.page.locator("//input[@placeholder='Search']");
  }
  btnTweetonPublish(): Locator {
    return this.page.locator(
      "//div[@class='c-switch c-switch-0']//div[@class='c-switch-control']",
    );
  }
  edtUsernameNONSSO(): Locator {
    return this.page.locator("//input[@id='edit-name-1']");
  }
  edtPasswordNONSSO(): Locator {
    return this.page.locator("//*[@id='edit-pass-1']");
  }
  edtLoginNONSSO(): Locator {
    return this.page.locator("//*[@id='edit-submit-1']");
  }
  edtUsernameSSO(): Locator {
    return this.page.locator("//*[@id='username']");
  }
  edtPasswordSSO(): Locator {
    return this.page.locator("//*[@id='password']");
  }
  edtLoginSSO(): Locator {
    return this.page.locator("//button[@class='button-main-text']");
  }
  lblAutoSaved(): Locator {
    return this.page.locator("//span[@class='c-no-break']");
  }
  imgCopyIcon(): Locator {
    return this.page.locator("//*[@ngbtooltip='Copy']");
  }
  imgPreviewLink(): Locator {
    return this.page.locator("//*[@ngbtooltip='Preview links']");
  }
  imgLiveLinks(): Locator {
    return this.page.locator("//*[@ngbtooltip='Live links']");
  }
  imgBookmarks(): Locator {
    return this.page.locator(
      "//span[@class='ng-star-inserted']//span[@class='c-btn c-btn-icon']",
    );
  }
  lnkCopyID(): Locator {
    return this.page.locator(
      "/html[1]/body[1]/div[1]/dashboard[1]/div[1]/div[1]/div[1]/div[1]/div[1]/asset-edit-control[1]/div[1]/div[1]/div[1]/div[2]/div[1]/span[1]/div[2]/span[1]",
    );
  }
  lnkCopyURL(): Locator {
    return this.page.locator(
      "//span[@class='ng-star-inserted show dropdown']//span[2]",
    );
  }
  lnkCopyPreviewURL(): Locator {
    return this.page.locator(
      "//span[@class='ng-star-inserted show dropdown']//span[3]",
    );
  }
  btnImageAssetinRTE(): Locator {
    return this.page.locator(
      "//div[@class='c-flex c-flex-first c-expand-maintain']//li[@class='c-content-item c-asset-image']",
    );
  }
  btnChartAsseticoninRTE(): Locator {
    return this.page.locator("//li[@class='c-content-item c-asset-chart']");
  }
  btnThumbnailImageAssetIcon(): Locator {
    return this.page.locator(
      "//div[@class='c-flex c-flex-first']//li[@class='c-content-item c-asset-image']",
    );
  }
  chkThumbnailChecked(): Locator {
    return this.page.locator(
      "//div[@class='c-thumbnail-control active']//span[@class='c-checkbox']",
    );
  }
  btnFeatureMediaImageAsset(): Locator {
    return this.page.locator(
      "//featured-media-view[@class='ng-star-inserted']//li[@class='c-content-item c-asset-image']",
    );
  }
  btnThumbnailIamgeAsset(): Locator {
    return this.page.locator(
      "//expanded-view[@class='ng-star-inserted']//li[@class='c-content-item c-asset-image']",
    );
  }
  btnFeatureMediaVideoAsset(): Locator {
    return this.page.locator(
      "//featured-media-view[@class='ng-star-inserted']//li[@class='c-content-item c-asset-cnbcvideo']",
    );
  }
  lnkSettings(): Locator {
    return this.page.locator(
      "//ul[@class='c-nav-sticky c-sticky-single-tab ng-star-inserted']//li[1]",
    );
  }
  tglSettingsSponsoredLinks(): Locator {
    return this.page.locator(
      "//div[9]//checkbox-control[1]//div[1]//div[1]//div[1]//div[1]",
    );
  }
  tglSettingsByline(): Locator {
    return this.page.locator(
      "//div[10]//checkbox-control[1]//div[1]//div[1]//div[1]//div[1]",
    );
  }
  tglSettingsSocialTools(): Locator {
    return this.page.locator(
      "//div[11]//checkbox-control[1]//div[1]//div[1]//div[1]//div[1]",
    );
  }
  tglSettingsDateline(): Locator {
    return this.page.locator(
      "//div[12]//checkbox-control[1]//div[1]//div[1]//div[1]//div[1]",
    );
  }
  tglSettingsSource(): Locator {
    return this.page.locator(
      "//div[13]//checkbox-control[1]//div[1]//div[1]//div[1]//div[1]",
    );
  }
  txtListicleTemplate(): Locator {
    return this.page.locator("//span[contains(text(),'listicle template')]");
  }
  datDateline(): Locator {
    return this.page.locator("//i[@class='icon icon-calendar']");
  }
  datDateline2(): Locator {
    return this.page.locator("(//i[@class='icon icon-calendar'])[2]");
  }
  pubDateTxtBox(): Locator {
    return this.page.locator("//date-time-picker/div/span");
  }
  datPublicationTimeNewConfig(): Locator {
    return this.page.locator(
      "//carbon-datepicker[@id='field_publicationTime']",
    );
  }
  datExpirationTimeNewConfig(): Locator {
    return this.page.locator("//carbon-datepicker[@id='field_expirationTime']");
  }
  datDatelineNewConfig(): Locator {
    return this.page.locator("//carbon-datepicker[@id='field_dateline']");
  }
  datDatelineNewConfig2(): Locator {
    return this.page.locator("(//carbon-datepicker[@id='field_dateline'])[2]");
  }
  lnkRightRailInfo(): Locator {
    return this.page.locator(
      "//ul[@class='c-nav-sticky c-sticky-single-tab ng-star-inserted']//li[2]//a[1]",
    );
  }
  lnkRightRailHistory(): Locator {
    return this.page.locator(
      "//ul[@class='c-nav-sticky c-sticky-global-bar']//li[1]",
    );
  }
  lnkRightRailBookMarks(): Locator {
    return this.page.locator(
      "//ul[@class='c-nav-sticky c-sticky-global-bar']//li[2]",
    );
  }
  lnkRightRailTemplates(): Locator {
    return this.page.locator(
      "//ul[@class='c-nav-sticky c-sticky-global-bar']//li[3]",
    );
  }
  btnPhotoTypeFilter(): Locator {
    return this.page.locator("//button[contains(text(),'Photo Type')]");
  }
  btnSourceFilter(): Locator {
    return this.page.locator(
      "//button[@class='btn dropdown-toggle w-100 text-left dropdown-toggle'][contains(text(),'Source')]",
    );
  }
  btnUsageRightsFilter(): Locator {
    return this.page.locator("//button[contains(text(),'Usage Rights')]");
  }
  btnLicensingFilter(): Locator {
    return this.page.locator("//button[contains(text(),'Licensing')]");
  }
  btnDateFilter(): Locator {
    return this.page.locator("//select[@class='form-control']");
  }
  btnResetMediaFilter(): Locator {
    return this.page.locator("//b[@mattooltip='Reset to defaults']");
  }
  btnRemoveAssetFromRTE(): Locator {
    return this.page.locator(
      "//div[@class='c-flex c-summary-remove ng-star-inserted']//span",
    );
  }
  menuVideoManagement(): Locator {
    return this.page.locator("//i[@class='c-nav-icon icon icon-video-camera']");
  }
  Searchplus1Asset(): Locator {
    return this.page.locator(
      "//*[@id='c_rte_newlinemenu_asset-panel']/div/input-dropdown/div/p-autocomplete/span/div/ul/li[1]/summary-view/relation-view/div/div/div[2]",
    );
  }
  edtSearchPhotos(): Locator {
    return this.page.locator("//input[@placeholder='Search Photos']");
  }
  edtSearchVideos(): Locator {
    return this.page.locator("//input[@placeholder='Search ']");
  }
  edtSearchVideosPhotos(): Locator {
    return this.page.locator("//input[@placeholder='Search ']");
  }
  edtSearchVideo(): Locator {
    return this.page.locator("//input[@placeholder='Search Videos']");
  }
  edtSearchInfographics(): Locator {
    return this.page.locator("//input[@placeholder='Search Infographics']");
  }
  lblLoggedInUserName(): Locator {
    return this.page.locator("//app-top-toolbar-header/button[1]/span[1]");
  } //span[@class='c-profile-username c-table-cell']
  topToolbar(): Locator {
    return this.page.locator("//app-top-toolbar-header");
  }
  edtFullName(): Locator {
    return this.page.locator(
      "//div[@id='c_fullName']//div[@class='c-paper-input-control ng-star-inserted']",
    );
  }
  edtJobTitle(): Locator {
    return this.page.locator("//div[@id='c_jobTitle']//textarea");
  }
  edtAuthorEmail(): Locator {
    return this.page.locator("//div[@id='c_email']//textarea");
  }
  edtAuthorPhone(): Locator {
    return this.page.locator("//div[@id='c_phone']//textarea");
  }
  edtHeadshot(): Locator {
    return this.page.locator(
      "//input[@placeholder='Click icon to launch Media Gallery OR type to search images']",
    );
  }
  btnAddHeadshot(): Locator {
    return this.page.locator("//i[@class='icon icon-add-photo']");
  }
  edtTwitterName(): Locator {
    return this.page.locator("//div[@id='c_twitterUserName']//textarea");
  }
  edtFacebookName(): Locator {
    return this.page.locator("//div[@id='c_facebookUserName']//textarea");
  }
  edtGooglePlusName(): Locator {
    return this.page.locator("//div[@id='c_googlePlusUserName']//textarea");
  }
  edtLinkedinName(): Locator {
    return this.page.locator("//div[@id='c_linkedinUserName']//textarea");
  }
  radSlackNotification(): Locator {
    return this.page.locator(
      "//label[text()='Slack Notifications']//following::div[@class='c-switch-button']",
    );
  } //By.xpath("//div[5]//checkbox-control[1]//div[1]//div[1]//div[1]//div[1]");}
  radEmailNotification(): Locator {
    return this.page.locator(
      "//label[text()='Email Notifications']//following::div[@class='c-switch-button']",
    );
  } //By.xpath("//div[6]//checkbox-control[1]//div[1]//div[1]//div[1]//div[1]");}
  btnBreakingNewsPublish(): Locator {
    return this.page.locator(
      "//span[@id='publishBtn']//button[@class='c-button-wrapper'][contains(text(),'Publish')]",
    );
  }
  btnBreakingNewsCopyID(): Locator {
    return this.page.locator("//button[contains(text(),'Copy ID')]");
  }
  btnBreakingNewsClose(): Locator {
    return this.page.locator("//button[@class='mat-button']");
  }
  btnBreakingNewsOpenStory(): Locator {
    return this.page.locator("//button[contains(text(),'Open Story')]");
  }
  radBNTech(): Locator {
    return this.page.locator("//div[contains(text(),'Technology')]");
  }
  radBNMarkets(): Locator {
    return this.page.locator("//div[contains(text(),'Markets')]");
  }
  radBNPolitics(): Locator {
    return this.page.locator("//div[contains(text(),'Politics')]");
  }
  radBNEconomy(): Locator {
    return this.page.locator("//div[contains(text(),'Economy')]");
  }
  radBNInvesting(): Locator {
    return this.page.locator("//div[contains(text(),'Investing')]");
  }
  chkBNMarkets(): Locator {
    return this.page.locator("(//span[contains(text(),'Markets')])[2]");
  }
  chkBNPolitics(): Locator {
    return this.page.locator("//span[contains(text(),'Politics')]");
  }
  chkBNEconomy(): Locator {
    return this.page.locator("//span[contains(text(),'Economy')]");
  }
  chkBNInvesting(): Locator {
    return this.page.locator("//span[contains(text(),'Investing')]");
  }
  chkBNBusiness(): Locator {
    return this.page.locator("//span[contains(text(),'Business')]");
  }
  chkBNEurope(): Locator {
    return this.page.locator("//span[contains(text(),'Europe')]");
  }
  chkBNMajor(): Locator {
    return this.page.locator("//span[contains(text(),'Major')]");
  }
  chkBNAlertAll(): Locator {
    return this.page.locator("//span[contains(text(),'Alert All')]");
  }
  chkBNApps(): Locator {
    return this.page.locator("//span[contains(text(),'Apps')]");
  }
  chkBNEmail(): Locator {
    return this.page.locator("//span[contains(text(),'Email')]");
  }
  edtLinkedTag(): Locator {
    return this.page.locator(
      "//input[@placeholder='Type to select a person tag']",
    );
  }
  edtInternalTitleImage(): Locator {
    return this.page.locator("//*[@placeholder='Enter unique slug']");
  }
  edtPhotoCaption(): Locator {
    return this.page.locator("//div[@placeholder='Photo caption']");
  }
  lstUsageRights(): Locator {
    return this.page.locator(
      "//select[@class='form-control ng-untouched ng-pristine ng-valid']",
    );
  }
  edtImageAltfield(): Locator {
    return this.page.locator("//div[@placeholder='Enter an Image title.']");
  }
  edtPhotoAttribution(): Locator {
    return this.page.locator("//div[@placeholder='Enter photo credit line']");
  }
  edtImageKeywords(): Locator {
    return this.page.locator(
      "//div[@placeholder='Separate keywords with commas']",
    );
  }
  edtImageSource(): Locator {
    return this.page.locator("//input[@placeholder='Type to search sources']");
  }
  edtImageSourceID(): Locator {
    return this.page.locator("//div[@placeholder='External ID of the asset']");
  }
  lstImagePhotoType(): Locator {
    return this.page.locator(
      "//select[@class='form-control ng-valid ng-dirty ng-touched']",
    );
  }
  lstImageLicensing(): Locator {
    return this.page.locator("//select[@name='licensed']");
  }
  btnImageDownloadOriginal(): Locator {
    return this.page.locator("//button[contains(text(),'Download Original')]");
  }
  btnUploadMediaLib(): Locator {
    return this.page.locator("//uploader[@label='Upload']");
  }
  lnkFileUploader1(): Locator {
    return this.page.locator("//*[contains(text(),' Single Photo ')]");
  } //(//*[contains(text(),'Upload')])[1]
  lnkFileUploader11(): Locator {
    return this.page.locator("//*[text()='Upload']");
  }
  lnkFileUploaderNew(): Locator {
    return this.page.locator("(//input[@type='file'])[1]");
  }
  btnUploadFile(): Locator {
    return this.page.locator("//button[@role='button']");
  }
  lnkFileUploader2(): Locator {
    return this.page.locator("(//input[@type='file'])[2]");
  }
  lnkFileUploader3(): Locator {
    return this.page.locator("(//input[@type='file'])[3]");
  }
  btnUploadAnyway(): Locator {
    return this.page.locator("//span[contains(text(),'Upload anyway')]");
  }
  imgPlaceholder(): Locator {
    return this.page.locator("(//img[contains(@src,'PlaceHolder.png')])[1]");
  }
  lstSourceType(): Locator {
    return this.page.locator("//div[contains(@class,'mat-select-value')]");
  }
  lstSourceType2(): Locator {
    return this.page.locator("(//div[contains(@class,'mat-select-value')])[2]");
  }
  viewInfoButton(): Locator {
    return this.page.locator(
      "(//carbon-summary-view-actions//button//mat-icon[text()='info'])[1]",
    );
  }
  UploadMedia(): Locator {
    return this.page.locator("//*[contains(text(),' Upload ')]");
  }

  btnCloneNC(): Locator {
    return this.page.locator("//button[contains(text(),'Clone')]");
  }
  btnSaveAsTemplateNC(): Locator {
    return this.page.locator("//button[contains(text(),'Save as Template')]");
  }
  btnUnpublishNC(): Locator {
    return this.page.locator("(//button[contains(text(),'Unpublish')])[1]");
  }
  lnkCloseNC(): Locator {
    return this.page.locator("//i[@class='icon icon-close']");
  }
  lnkCloseRightRailTab(): Locator {
    return this.page.locator(
      "(//*[@class='mat-button-wrapper']//following::mat-icon[contains(text(),'close')])[1]",
    );
  }
  tabInformationNewConfig(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='info']",
    );
  }
  lnkFilepath(): Locator {
    return this.page.locator("//a[contains(@href,'fm.cnbc.com')]");
  }
  edtSlackChannel(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_slackChannel']//textarea",
    );
  }
  edtEventLocation(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_eventLocation']//textarea",
    );
  }
  edtEventLandingPage(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_eventLandingPage']//textarea",
    );
  }
  edtEventStartDate(): Locator {
    return this.page.locator(
      "//carbon-datepicker[@id='field_eventStartDate']//input",
    );
  }
  edtFieldAssetField1(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[1]",
    );
  }
  edtFieldAssetField2(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[2]",
    );
  }
  edtFieldAssetField3(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[3]",
    );
  }
  edtFieldAssetField4(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[4]",
    );
  }
  edtFieldAssetField5(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[5]",
    );
  }
  edtFieldAssetField6(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[6]",
    );
  }
  edtFieldAssetField7(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[7]",
    );
  }
  edtFieldAssetField8(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[8]",
    );
  }
  edtFieldAssetField9(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[9]",
    );
  }
  edtFieldAssetField10(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[10]",
    );
  }
  edtFieldAssetField11(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[11]",
    );
  }
  edtFieldAssetField12(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[12]",
    );
  }
  edtFieldAssetField13(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[13]",
    );
  }
  edtFieldAssetField14(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[14]",
    );
  }
  edtFieldAssetField15(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[15]",
    );
  }
  edtFieldAssetField16(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[16]",
    );
  }
  edtFieldAssetField17(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_assets']//input)[17]",
    );
  }
  btnwithinFieldAsset(): Locator {
    return this.page.locator("//button[@class='mat-icon-button mat-primary']");
  }
  edtWRLinkAddress(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_webResourceAttributeUrl']//textarea",
    );
  }
  edtWRLinkTarget(): Locator {
    return this.page.locator("//div[contains(@class,'mat-select-value')]");
  }
  edtWRLinkText(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_webResourceLinkText']//textarea",
    );
  }
  edtWRTitleAttribute(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_webResourceAttributeTitle']//textarea",
    );
  }
  edtWRRelAttribute(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_webResourceAttributeRel']//textarea",
    );
  }
  edtWRClassAttribute(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_webResourceAttributeClass']//textarea",
    );
  }
  edtWRIDAttribute(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_webResourceAttributeId']//textarea",
    );
  }
  btnMediaLauncherNewConfig1(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'image_search')])[1]",
    );
  }
  btnMediaLauncherNewConfig2(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'image_search')])[2]",
    );
  }
  btnMediaLauncherNewConfig3(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'image_search')])[3]",
    );
  }
  btnMediaLauncherNewConfig4(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'image_search')])[4]",
    );
  }
  btnMediaLauncherNewConfig5(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'image_search')])[5]",
    );
  }
  upNextInputField(): Locator {
    return this.page.locator(
      "//h4[text()='Up next']/../following-sibling::div//input",
    );
  }
  btnSelectImgVideoNC(): Locator {
    return this.page.locator("(//div[@class='c-asset-title'])[1]");
  }
  edtSearchPhotosNC(): Locator {
    return this.page.locator("(//input[@placeholder='Search Photos'])[2]");
  }
  edtSearchVideosNC(): Locator {
    return this.page.locator("(//input[@placeholder='Search Videos'])[2]");
  }
  edtSearchInfographicsNC(): Locator {
    return this.page.locator(
      "(//input[@placeholder='Search Infographics'])[1]",
    );
  }
  tabVideoNewConfig(): Locator {
    return this.page.locator(
      "(//div[@class='mat-tab-label-content'][contains(text(),'Video')])[2]",
    );
  }
  tabInfographicNewConfig(): Locator {
    return this.page.locator(
      "(//div[@class='mat-tab-label-content'][contains(text(),'Infographic')])[2]",
    );
  }
  RTECCFeatures(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_bodyStructured']//div[@class='ProseMirror']",
    );
  }
  RTECCPros(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_pros']//div[@class='ProseMirror c-hideList c-rte-keypoints']",
    );
  }
  RTECCCons(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_cons']//div[@class='ProseMirror c-hideList c-rte-keypoints']",
    );
  }
  RTECCDescription(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_description']//div[@class='ProseMirror']",
    );
  }
  txtCCLinktoApp(): Locator {
    return this.page.locator("//carbon-input[@id='field_linkToApp']//textarea");
  }
  edtLinktoLearnMore(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_linkToLearnMore']//textarea",
    );
  }
  txtCCSourceText(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_source']//div[@contenteditable='true']",
    );
  }
  btnCCFeaturesLink(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_bodyStructured']//span[@class='c-rte-menuicon']//*[@class='icon-chain']",
    );
  }
  btnCCFeaturesStock(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_bodyStructured']//span[@class='c-rte-menuicon']//*[@class='icon-dollar']",
    );
  }
  btnCCDescriptionLink(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_description']//span[@class='c-rte-menuicon']//*[@class='icon-chain']",
    );
  }
  btnCCDescriptionStock(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_description']//span[@class='c-rte-menuicon']//*[@class='icon-dollar']",
    );
  }
  txtSEOURLNC(): Locator {
    return this.page.locator("//div[@id='field_link']//input");
  }
  selDropDown(): Locator {
    return this.page.locator("//div[contains(@class,'mat-select-value')]");
  }
  edtMainSearchCarbon(): Locator {
    return this.page.locator(
      "//input[@class='form-control ng-pristine ng-valid ng-touched']",
    );
  }
  articleHeaderValidation(): Locator {
    return this.page.locator("//h1[@class='ArticleHeader-headline']");
  }
  selectHeaderValidation(): Locator {
    return this.page.locator("//h1[contains(@class,'select-headline')]");
  }
  acornsHeaderValidation(): Locator {
    return this.page.locator("//h1[contains(@class,'acorns-headline')]");
  }
  liveBlogHeaderValidation(): Locator {
    return this.page.locator("//h1[@class='LiveBlogHeader-headline']");
  }
  articleheaderVal(): Locator {
    return this.page.locator("//h1[@class='title']");
  }
  articleheaderVal1(): Locator {
    return this.page.locator("//h1[@class='ArticleHeader-headline']");
  }
  articleHeaderValidationMAKEIT(): Locator {
    return this.page.locator(
      "//h1[contains(@class,'ArticleHeader-styles-makeit-headline')]",
    );
  }
  videoHeaderValidation(): Locator {
    return this.page.locator("//div[@class='ClipPlayer-clipPlayerIntro']//h1");
  }
  videoHeaderValidationNative(): Locator {
    return this.page.locator("//h1[@id='video-title']");
  }
  edtSectionSummary(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_sectionSummary']//textarea",
    );
  }
  edtSectionColor(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_sectionColor']//textarea",
    );
  }
  tabMarketDataChart(): Locator {
    return this.page.locator("//div[contains(text(),'Market Data Table')]");
  }
  tabTableChart(): Locator {
    return this.page.locator("//div[contains(text(),'CSV Table')]");
  }

  //Breaking news from PCM
  btnBreakingNewsinPCM(): Locator {
    return this.page.locator("//button[@id='breakingNewsBtn']");
  }
  btnSignIninPCM(): Locator {
    return this.page.locator("//button[@id='editPublishBtn_Edit_breaking']");
  }
  btnYesInPCM(): Locator {
    return this.page.locator("//button[@id='breakingNewsConfirmBtn']");
  }
  edtBNTitle(): Locator {
    return this.page.locator(
      "(//div[@class='c-paper-input-control ng-star-inserted'])[1]",
    );
  }
  edtBNInternalTitle(): Locator {
    return this.page.locator(
      "(//div[@class='c-paper-input-control ng-star-inserted'])[2]",
    );
  }
  edtBNSEOTitle(): Locator {
    return this.page.locator(
      "(//div[@class='c-paper-input-control ng-star-inserted'])[3]",
    );
  }
  edtBNSEOUrl(): Locator {
    return this.page.locator("(//div[@class='c-note-edit'])[1]");
  }
  lnkMoreOptionsInBNList(): Locator {
    return this.page.locator("(//span[@id='storyEllipsis']//i)[2]");
  }
  lnkMoreOptionsInBNRefresh(): Locator {
    return this.page.locator(
      "(//div[@class='actionIconsDraft']//span[@class='refreshBtn']//button[@id='refreshButton']//span[1])[2]",
    );
  }
  lnkMoreOptionsInBNExpand(): Locator {
    return this.page.locator(
      "(//div[@class='actionIconsDraft']//span[@class='arrowBtns']//i[text()='expand_more'])[2]",
    );
  }
  lnkMoreOptionsInBNCollapse(): Locator {
    return this.page.locator(
      "(//div[@class='actionIconsDraft']//span[@class='arrowBtns']//i[text()='expand_less'])[1]",
    );
  }
  chkAlertAllPCM(): Locator {
    return this.page.locator("//input[@id='dest_0']");
  }
  chkBannerPCM(): Locator {
    return this.page.locator("//input[@id='dest_1']");
  }
  chkAppsPCM(): Locator {
    return this.page.locator("//input[@id='dest_2']");
  }
  chkEmailPCM(): Locator {
    return this.page.locator("//input[@id='dest_3']");
  }

  edtSelectTickers(): Locator {
    return this.page.locator(
      "//carbon-autocomplete[@id='field_chartIssueId']//input",
    );
  }
  lstDataPoints(): Locator {
    return this.page.locator(
      "//*[@id='field_chartColumn']//input[contains(@id,'mat-chip-list-input')]",
    );
  }
  chartTimeFrameDropdown(): Locator {
    return this.page.locator(
      '//carbon-select[@id="field_timeFrame"]//mat-select',
    );
  }
  chkColumnHeader(): Locator {
    return this.page.locator(
      "(//carbon-dynamic-component[1]/carbon-checkbox[1]/mat-checkbox[1]/label[1]/span[1])[1]",
    );
  }
  chkRowHeader(): Locator {
    return this.page.locator(
      "(//carbon-dynamic-component[1]/carbon-checkbox[1]/mat-checkbox[1]/label[1]/span[1])[2]",
    );
  }
  edtWidgetParams(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_widgetParam']//textarea",
    );
  }
  tabInformationOnlyCC(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='info']",
    );
  }
  //	  edtTuneIn  (): Locator{ return this.page.locator("//carbon-input[@id='field_tuneIn']//textarea");}
  edtTuneIn(): Locator {
    return this.page.locator('(//div[@class="ProseMirror"]//p)[1]');
  }
  edtAdLogoText1(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_adLogoText1']//textarea",
    );
  }
  edtAdLogoText2(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_adLogoText2']//textarea",
    );
  }
  rteAboutThisSection(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_sectionSummaryStructured']//div[@class='ProseMirror']",
    );
  }
  rteShowtime(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_showTime']//div[@class='ProseMirror']",
    );
  }
  rteSubHeadline(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-header']",
    );
  }
  rteBold(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-bold']",
    );
  }
  rteItalic(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-italic']",
    );
  }
  rteBulletedList(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-list']",
    );
  }
  rteNumberedList(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-list-ol']",
    );
  }
  rteSuperscript(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-superscript']",
    );
  }
  rteSubscript(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-subscript']",
    );
  }
  rteBlockQuote(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-comment-o']",
    );
  }
  rtePullQuote(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-quote-right']",
    );
  }
  rtePromoCutOff(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-scissors']",
    );
  }
  rteSpecialChar(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-omega2']",
    );
  }
  rteSpecialCharCopyRight(): Locator {
    return this.page.locator("//td[@title='copyright sign']");
  }
  rteSpecialCharRestricted(): Locator {
    return this.page.locator("//td[@title='registered sign']");
  }
  rteSpecialCharTradeMark(): Locator {
    return this.page.locator("//td[@title='trade mark sign']");
  }
  rteContentGroup(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-object-ungroup']",
    );
  }
  rteExpand(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-expand']",
    );
  }
  Chart(): Locator {
    return this.page.locator(
      "//rte-menuitem[@class='ng-star-inserted']//i[@class='icon-toolbelt-chart']",
    );
  }
  sectionTreeOldConfig(): Locator {
    return this.page.locator("(//i[@class='icon icon-section-asset'])[1]");
  }
  additionalsectionTreeOldConfig(): Locator {
    return this.page.locator("(//i[@class='icon icon-section-asset'])[2]");
  }
  btnChooseThumbnail(): Locator {
    return this.page.locator("//span[contains(text(),'CHOOSE THUMBNAIL')]");
  }
  btnSelectFromVideo(): Locator {
    return this.page.locator("//button[contains(text(),'Select from video')]");
  }
  btnVideo(): Locator {
    return this.page.locator("//video[contains(@poster,'assets/app/media')]");
  }
  btnVideoThumbnail(): Locator {
    return this.page.locator("//video[contains(@poster,'api/v1/image')]");
  }
  btnSelectThisFrame(): Locator {
    return this.page.locator("//button[text()='Select this frame']");
  }
  thumbnailCreationSuccessfulMsg(): Locator {
    return this.page.locator(
      "//video-upload//span[text()='Thumbnail creation successful']",
    );
  }
  lnkVideoImage(): Locator {
    return this.page.locator("//a[contains(text(),'Video image for')]");
  }
  lnkVideoImagePreview(): Locator {
    return this.page.locator("//img[contains(@src,'/api/v1/image')]");
  }

  btnManualAutoTag(): Locator {
    return this.page.locator("//*[name()='polygon' and @id='Fill-1']");
  }
  btnConfirmAllTags(): Locator {
    return this.page.locator("//span[contains(text(),'Confirm all tags')]");
  }
  moremenuVMpage(): Locator {
    return this.page.locator(
      "(//a[contains(text(),'Killer')]//following::*[contains(@class,'more-menu')])[1]",
    );
  }

  chkThumbnailinBodyRTEFeature(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'c-thumbnail-control')]//mat-icon)[1]",
    );
  }
  chkAutoPlayBodyRTE(): Locator {
    return this.page.locator("//span[text()=' Autoplay ']//mat-icon");
  }
  lnkMinimizeImageinBodyRTE(): Locator {
    return this.page.locator("//i[@class='icon icon-minimize-2']");
  }
  lnkHighTouch(): Locator {
    return this.page.locator("//i[contains(@class,'icon-high-touch')]");
  }
  lnkMediumTouch(): Locator {
    return this.page.locator("//i[contains(@class,'icon-medium-touch')]");
  }
  tglExcludeTickers(): Locator {
    return this.page.locator(
      "(//*[@id='field_tags']//span[contains(@class,'mat-slide-toggle-thumb')])[1]",
    );
  }
  tglAutoTagging(): Locator {
    return this.page.locator(
      "(//*[@id='field_tags']//span[contains(@class,'mat-slide-toggle-thumb')])[3]",
    );
  }
  ipExcludeTickers(): Locator {
    return this.page.locator(
      "(//*[@id='field_tags']//following::input[@role='switch'])[1]",
    );
  }
  ipAutoTagging(): Locator {
    return this.page.locator(
      "(//*[@id='field_tags']//following::input[@role='switch'])[2]",
    );
  }
  lblGettyTab(): Locator {
    return this.page.locator("//div[@class='mat-tab-label-content']//img");
  }
  btnResettoDefault(): Locator {
    return this.page.locator("//b[@mattooltip='Reset to defaults']");
  }
  gtyFirstImage(): Locator {
    return this.page.locator("(//h4[@class='title'])[2]");
  }
  btnLicenseGetty(): Locator {
    return this.page.locator("(//button[contains(@class,'getty-license')])[2]");
  }
  btnLicenseGettyagain(): Locator {
    return this.page.locator("//button[contains(text(),'License')]");
  }
  spanImageLicenseStatus(): Locator {
    return this.page.locator(
      "(//span[@class='meta-info ng-star-inserted'])[1]",
    );
  }
  lblLastUsed(): Locator {
    return this.page.locator(
      "//div[contains(text(),'Last used  a few seconds ago')]",
    );
  }
  lblRevisions(): Locator {
    return this.page.locator(
      "//div[@class='c-revision mb-2 d-flex ng-star-inserted']",
    );
  }
  lnkView(): Locator {
    return this.page.locator("//a[contains(@href,'/dashboard/editor')]");
  }
  linkViewGlobalSearch(): Locator {
    return this.page.locator(
      "//mat-option//a[contains(@href,'/dashboard/editor') or contains(@href,'/dashboard/page')]",
    );
  }
  openAssetGlobalSearchLink(nodeId: string): Locator {
    return this.page.locator(`//mat-option//a[contains(@href,'/${nodeId}')]`);
  }

  lblInfoDraft(): Locator {
    return this.page.locator("//span[@class='c-status c-status-Draft']");
  }
  lblInfoPublish(): Locator {
    return this.page.locator("//span[@class='c-status c-status-Publish']");
  }
  lblPublishedInfo(): Locator {
    return this.page.locator("//span[2]//b[(text()='Published')]");
  }
  lblDraftInfo(): Locator {
    return this.page.locator("//span[2]//b[(text()='Draft')]");
  }
  lblPublishedRevision(): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-revisions')]//div[2]//div[2]//b[1]",
    );
  }
  lnkView2(): Locator {
    return this.page.locator("(//a[contains(@href,'/dashboard/editor')])[2]");
  }
  lnkView2WithBodyRTE(): Locator {
    return this.page.locator(
      "(//a[contains(@href,'/dashboard/editor') and contains(text(),'View')])[2]",
    );
  }
  btnRevertVersion(): Locator {
    return this.page.locator("//*[contains(text(),'Revert version')]");
  }
  lnkLock(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'lock')]");
  }
  lnkLockOldConfig(): Locator {
    return this.page.locator("//i[@class='icon icon-lock2']");
  }
  lnkContemplate(): Locator {
    return this.page.locator("//a[@class='contemplate-link']");
  }
  lblViewingVersion(): Locator {
    return this.page.locator(
      "//*[contains(text(),'You are currently viewing revision')]",
    );
  }
  lnktoeditCurrentVersion(): Locator {
    return this.page.locator(
      "//a[@class='link' and contains(text(),'Click here to edit the current version')]",
    );
  }
  edtLinkedTagAuthor(): Locator {
    return this.page.locator(
      "(//carbon-tags-autocomplete[@id='field_relations.tags.assets']//input)[2]",
    );
  }
  tabInfographic(): Locator {
    return this.page.locator(
      "//div[@class='mat-tab-label-content'][contains(text(),'Infographic')]",
    );
  }
  tabInfographic4(): Locator {
    return this.page.locator(
      "(//div[@class='mat-tab-label-content'][contains(text(),'Infographic')])[2]",
    );
  }
  tabVideo4(): Locator {
    return this.page.locator(
      "(//div[@class='mat-tab-label-content'][contains(text(),'Video')])[2]",
    );
  }
  tabPhoto4(): Locator {
    return this.page.locator(
      "(//div[@class='mat-tab-label-content'][contains(text(),'Photo')])[2]",
    );
  }
  btnUploadInfographic2(): Locator {
    return this.page.locator(
      "(//uploader[contains(text(),'Upload Infographic')])",
    );
  }
  btnUploadInfographicDataViz(): Locator {
    return this.page.locator(
      "(//uploader[contains(text(),'Upload Infographic')])[2]",
    );
  }
  btnUploadImageThumbMedia2(): Locator {
    return this.page.locator(
      "(//uploader[contains(text(),'Upload Image')])[2]",
    );
  }
  btnUploadImageThumbMedia4(): Locator {
    return this.page.locator(
      "(//uploader[contains(text(),'Upload Image')])[2]",
    );
  }
  tabInfographic2(): Locator {
    return this.page.locator(
      "(//div[@class='mat-tab-label-content'][contains(text(),'Infographic')])[2]",
    );
  }
  nativePill(): Locator {
    return this.page.locator("//*[contains(@class,'pill-native')]");
  }
  proPill(): Locator {
    return this.page.locator("//*[contains(@class,'pill-pro')]");
  }
  btnUploadInfographic(): Locator {
    return this.page.locator(
      "//uploader[contains(text(),'Upload Infographic')]",
    );
  }
  btnUploadImageThumbMedia(): Locator {
    return this.page.locator("//uploader[contains(text(),'Upload Image')]");
  }
  edtSEOURLEditableOld(): Locator {
    return this.page.locator("//*[@class='c-note-edit']");
  }
  lnkDataPreview(): Locator {
    return this.page.locator(
      "(//carbon-dropdown-menu[1]/button[1]/span[1]/mat-icon[1])[2]",
    );
  }
  lnkLivePreview(): Locator {
    return this.page.locator(
      "(//carbon-dropdown-menu[1]/button[1]/span[1]/mat-icon[1])[3]",
    );
  }
  lnkLivePreviewOldConfig(): Locator {
    return this.page.locator("//i[@class='icon icon-link']");
  }
  lnkDataPreviewOldConfig(): Locator {
    return this.page.locator("//i[@class='icon icon-eye2']");
  }
  lnkCopyOldConfig(): Locator {
    return this.page.locator("//i[@class='icon icon-copy']");
  }
  btnDesktopPreview(): Locator {
    return this.page.locator("//button[contains(text(),'Desktop preview')]");
  }
  btnDesktopLive(): Locator {
    return this.page.locator("//button[contains(text(),'Desktop - Live')]");
  }
  btnDesktopLiveVideo(): Locator {
    return this.page.locator("//*[contains(text(),'Desktop - Live')]");
  }
  btnCopyIDOldConfig(): Locator {
    return this.page.locator("//button[text()='Copy Id']");
  }
  btnCopyVCPSIdConfig(): Locator {
    return this.page.locator("//button[text()='Copy VCPS Id']");
  }
  btnCopyURLOldConfig(): Locator {
    return this.page.locator("//button[text()='Copy Url']");
  }
  btnCopyLiveURLOldConfig(): Locator {
    return this.page.locator("//button[text()='Copy Live Url']");
  }
  btnCopyPreviewUrlOldConfig(): Locator {
    return this.page.locator("//button[text()='Copy Preview Url']");
  }
  btnCopyFilenameOldConfig(): Locator {
    return this.page.locator("//button[text()='Copy Filename']");
  }
  lnkDesktopPreviewOldConfig(): Locator {
    return this.page.locator("//a[text()=' Desktop ']");
  }
  lnkLegacyPreviewOldConfig(): Locator {
    return this.page.locator("//a[text()=' Desktop - Legacy']");
  }
  lnkMobileWebPreviewOldConfig(): Locator {
    return this.page.locator("//a[text()='Mobile web ']");
  }
  lnkMobileAppsPreviewOldConfig(): Locator {
    return this.page.locator("//a[text()='Mobile apps ']");
  }
  lnkDesktopLiveOldConfig(): Locator {
    return this.page.locator("//a[contains(text(),'Desktop - Live')]");
  }
  lnkMobileWebLiveOldConfig(): Locator {
    return this.page.locator("//a[contains(text(),'Mobile web - Live')]");
  }
  lnkMobileAppsLiveOldConfig(): Locator {
    return this.page.locator("//a[contains(text(),'Mobile apps - Live')]");
  }
  h4VideoTitleLegacy(): Locator {
    return this.page.locator("//h1[@id='video-title']");
  }
  h4VideoTitleMobileAppsLive(): Locator {
    return this.page.locator("//div[@class='ClipPlayer-clipPlayerIntro']//h1");
  }
  edtSEOURLEditableNew(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'editable-url-part')]//input)[1]",
    );
  }
  btnArchiveNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Archive')]");
  }
  txtArchivedNewConfig(): Locator {
    return this.page.locator("//strong[contains(@class,'state-archived')]");
  }
  iconANewConfig(): Locator {
    return this.page.locator("//span[contains(@class,'status-Archived')]");
  }
  infoTabArchivedNewConfig(): Locator {
    return this.page.locator("(//b[text()='Archived'])[1]");
  }
  revisionArchivedNewConfig(): Locator {
    return this.page.locator("(//b[text()='Archived'])[2]");
  }

  btnChangeSEOurlchange(): Locator {
    return this.page.locator("//span[contains(text(),'Change')]");
  }
  btnCancelSEOurlchange(): Locator {
    return this.page.locator("//span[contains(text(),'Cancel')]");
  }
  btnConfirmSEOurlchange(): Locator {
    return this.page.locator("//button//span[text()='Confirm']");
  }
  //info tab status validation
  lblInfoTabStateDraft(): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-asset-status')]//b[contains(text(),'Draft')]",
    );
  }
  lblInfoTabRevisionStateDraft(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'c-revision')]//b[contains(text(),'Draft')])[1]",
    );
  }
  lblInfoTabStatePublish(): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-asset-status')]//b[text()='Published']",
    );
  }
  lblInfoTabRevisionStatePublish(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'c-revision')]//b[contains(text(),'Published')])[1]",
    );
  }
  lblInfoTabStateUnpublish(): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-asset-status')]//b[contains(text(),'Unpublished')]",
    );
  }
  lblInfoTabRevisionStateUnpublish(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'c-revision')]//b[contains(text(),'Un-Published')])[1]",
    );
  }
  lblInfoTabStateEmbargo(): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-asset-status')]//b[contains(text(),'Hold')]",
    );
  }
  lblInfoTabRevisionStateEmbargo(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'c-revision')]//b[contains(text(),'Embargo')])[1]",
    );
  }

  //Newline objects
  newlineInfographic(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'insert_chart')])[1]",
    );
  }
  newlineInfographic_New(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'insert_chart')])[1]",
    );
  }
  rteNewlineImageUpload(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='image'])[1]",
    );
  }
  rteNewlineVideoUpload(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='videocam'])[1]",
    );
  }
  rteNewlineEmbedCode(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='code']",
    );
  }
  rteNewlinePullQuote(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='format_quote'])[1]",
    );
  }
  lnkYoutubeIcon(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[@svgicon='youtube']//*[local-name()='svg'])[1]",
    );
  }
  lnkTwitterIcon(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[@svgicon='twitter']//*[local-name()='svg'])[1]",
    );
  }
  lnkInstagramIcon(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[@svgicon='instagram']//*[local-name()='svg'])[1]",
    );
  }
  lnkNewlineHistory(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='history'])[1]",
    );
  }
  lnkNewlineMoreMenu(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='more_vert']",
    );
  }
  lnkNewlineMoreMenu1(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='more_vert'])[1]",
    );
  }
  lnkNewlineMoreMenu2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='more_vert'])[2]",
    );
  }
  lnkNewlineSearch(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[contains(text(),'search')]",
    );
  }
  edtNewlineSearch(): Locator {
    return this.page.locator("//div[@class='newline-menu']//input");
  }
  lnkNewlineBulletList(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='format_list_bulleted']",
    );
  }
  lnkNewlineNumberList(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='format_list_numbered']",
    );
  }
  lnkNewlinePromoCutoff(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='horizontal_rule']",
    );
  }
  lnkNewlineContentGroup(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='table_rows']",
    );
  }
  lnkNewlineInfoCard(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='info']",
    );
  }
  lnkNewlineQACard(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[@svgicon='question']//*[local-name()='svg'])[1]",
    );
  }
  lnkNewlineReadMoreCard(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='list_alt']",
    );
  }
  rteNewlineLinkFromHeadline(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//button[@mattooltip='Headline Link']//mat-icon[text()='link'])[1]",
    );
  }
  edtNewlineLinkFromHeadline(): Locator {
    return this.page.locator("//input[@placeholder='Enter Internal URL']");
  }
  //  btnMiniMizeinRTE  (): Locator{ return this.page.locator("//mat-icon[text()='close_fullscreen']");}
  //  btnMiniMizeinRTE2  (): Locator{ return this.page.locator("(//mat-icon[text()='close_fullscreen'])[2]");}

  lnkNewlineHistory2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='history'])[2]",
    );
  }
  rteNewlineLinkFromHeadline2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//button[@mattooltip='Headline Link']//mat-icon[text()='link'])[2]",
    );
  }
  edtNewlineLinkFromHeadline2(): Locator {
    return this.page.locator("(//input[@placeholder='Enter Internal URL'])[1]");
  }
  lnkInstagramIcon2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[@svgicon='instagram']//*[local-name()='svg'])[2]",
    );
  }
  lnkYoutubeIcon2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[@svgicon='youtube']//*[local-name()='svg'])[2]",
    );
  }
  lnkTwitterIcon2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[@svgicon='twitter']//*[local-name()='svg'])[2]",
    );
  }
  newlineInfographic2(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'insert_chart')])[2]",
    );
  }
  rteNewlineImageUpload2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='image'])[2]",
    );
  }
  rteNewlineVideoUpload2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='videocam'])[2]",
    );
  }
  rteNewlineEmbedCode2(): Locator {
    return this.page.locator(
      "//div[@class='newline-menu']//mat-icon[text()='code']",
    );
  }
  rteNewlinePullQuote2(): Locator {
    return this.page.locator(
      "(//div[@class='newline-menu']//mat-icon[text()='format_quote'])[2]",
    );
  }

  lstShowHistory3rdItem(): Locator {
    return this.page.locator(
      "(//span[contains(@class,'mat-tooltip-trigger c-title c-nolink ng-star-inserted')])[4]",
    );
  }
  title_History(): Locator {
    return this.page.locator(
      "(//*[text()='History']//following::app-smart-link[@class='ng-star-inserted']//a[contains(@href,'/dashboard')])",
    );
  }
  title_historyinbodyRTE(): Locator {
    return this.page.locator(
      "(//span[contains(@class,'mat-tooltip-trigger c-title c-nolink ng-star-inserted')])",
    );
  }

  //Content library
  ipSelectContent(): Locator {
    return this.page.locator(
      "//input[contains(@placeholder,'Select content types')]",
    );
  }
  btnStoryCheck(): Locator {
    return this.page.locator("(//i[@class='icon icon-check'])[1]");
  }
  chkDraft(): Locator {
    return this.page.locator(
      "//div[@class='c-accordion-wrapper open']//li[2]//div[1]//input[1]",
    );
  }
  lnkRefresh(): Locator {
    return this.page.locator("//i[@class='icon icon-refresh']");
  }
  lnkFilter(): Locator {
    return this.page.locator("//i[@class='icon icon-filter2']");
  }
  btnBrand(): Locator {
    return this.page.locator(
      "//div[@class='c-dropdown-wrapper']//button[@class='c-button-wrapper'][contains(text(),'Brand')]",
    );
  }
  btnSection(): Locator {
    return this.page.locator(
      "//div[@class='c-dropdown-wrapper']//button[@class='c-button-wrapper'][contains(text(),'Section')]",
    );
  }
  btnCNBC(): Locator {
    return this.page.locator("//li[contains(text(),'CNBC')]");
  }
  edtSectionFilter(): Locator {
    return this.page.locator("//input[@class='c-autocomplete-filter']");
  }
  divEconomy(): Locator {
    return this.page.locator(
      "//div[@class='c-search-bar']//li[text()=' Economy ']",
    );
  }
  sortbyDate(): Locator {
    return this.page.locator("//button[@class='btn p-0 col-auto ml-auto']");
  }
  btnEdit(): Locator {
    return this.page.locator("(//mat-icon[contains(text(),'launch')])[1]");
  }

  //infographic objects
  lnkInfographic(): Locator {
    return this.page.locator("//span[contains(text(),'Infographic')]");
  }
  edtAltText(): Locator {
    return this.page.locator("//carbon-input[@id='field_altText']//textarea");
  }
  edtKeywordsNewConfig(): Locator {
    return this.page.locator("//carbon-input[@id='field_keywords']//textarea");
  }
  edtCaptionNewConfig(): Locator {
    return this.page.locator("//carbon-input[@id='field_caption']//textarea");
  }
  edtSourceNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_creatorOverwrite']//textarea",
    );
  }
  edtExpirationDate(): Locator {
    return this.page.locator(
      "//carbon-datepicker[@id='field_expirationDate']//input",
    );
  }
  calendarElement(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'calendar_today')]");
  }
  btnClearCalendar(): Locator {
    return this.page.locator("//button[contains(text(),'Clear')]");
  }
  calendarElement1(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'calendar_today')])[1]",
    );
  }
  calendarElement2(): Locator {
    return this.page.locator(
      "(//mat-icon[contains(text(),'calendar_today')])[2]",
    );
  }

  //Social Embeds
  edtSocialEmbed1(): Locator {
    return this.page.locator("(//input[@title='Social Media Embed'])[1]");
  }
  edtSocialEmbed2(): Locator {
    return this.page.locator("(//input[@title='Social Media Embed'])[2]");
  }
  edtSocialEmbed3(): Locator {
    return this.page.locator("(//input[@title='Social Media Embed'])[3]");
  }

  //RTE SelectionMenu items

  lnkSelectionMenuHeader(): Locator {
    return this.page.locator(
      "(//rte-menuitem[1]//button[1]//span[1]//mat-icon[1]//*[local-name()='svg'])[1]",
    );
  }
  lnkSelectionMenuH3(): Locator {
    return this.page.locator(
      "(//rte-menuitem[2]//button[1]//span[1]//mat-icon[1]//*[local-name()='svg'])[1]",
    );
  }
  lnkSelectionMenuBold(): Locator {
    return this.page.locator("(//mat-icon[text()='format_bold'])[1]");
  }
  lnkSelectionInternalLink(): Locator {
    return this.page.locator("(//mat-icon[text()='anchor'])[1]");
  }
  lnkSelectionMenuItalic(): Locator {
    return this.page.locator("(//mat-icon[text()='format_italic'])[1]");
  }
  lnkSelectionMenuChain(): Locator {
    return this.page.locator("(//mat-icon[text()='link'])[1]");
  }
  lnkSelectionMenuDollar(): Locator {
    return this.page.locator("(//mat-icon[text()='attach_money'])[1]");
  }
  lnkSelectionMenuBlockQuote(): Locator {
    return this.page.locator("(//mat-icon[text()='insert_comment'])[1]");
  }
  lnkSelectionMenuAnchor(): Locator {
    return this.page.locator("(//mat-icon[text()='anchor'])[1]");
  }
  lnkJumpLinkOption1(): Locator {
    return this.page.locator(
      "//span[@class='mat-option-text']//div//span[contains(text(),'Headline2')]",
    );
  }
  lnkJumpLinkOption2(): Locator {
    return this.page.locator(
      "//span[@class='mat-option-text']//div//span[contains(text(),'Headline4')]",
    );
  }
  lnkAnchor1(): Locator {
    return this.page.locator("//a[text()='Anchor1']");
  }
  lnkAnchor2(): Locator {
    return this.page.locator("//a[text()='Anchor2']");
  }
  lnkSelectionMenuHistory(): Locator {
    return this.page.locator("(//mat-icon[text()='history'])[1]");
  }

  lnkInternalLinkOptions(option: string): Locator {
    return this.page.locator(
      "//span[@class='mat-option-text']//div//span[contains(text(),'" +
        option +
        "')]",
    );
  }
  btnQuickPostSave(): Locator {
    return this.page.locator("(//span[contains(text(),'Save')])[2]");
  }
  btnQuickPostPublish(): Locator {
    return this.page.locator("(//span[contains(text(),'Publish')])[2]");
  }
  btnQuickPostPublishPost(): Locator {
    return this.page.locator("(//button[contains(text(),'Publish Post')])[1]");
  }
  btnQuickPostPublishStoryandPost(): Locator {
    return this.page.locator(
      "(//button[contains(text(),'Publish Story and Post')])[1]",
    );
  }
  btnQuickPostCancel(): Locator {
    return this.page.locator("(//span[contains(text(),'Cancel')])[1]");
  }

  txtPostPublished1(): Locator {
    return this.page.locator(
      "(//div[@class='c-status-Published']//span[contains(text(),'PUBLISHED')])[1]",
    );
  }
  txtPostPublished2(): Locator {
    return this.page.locator(
      "(//div[@class='c-status-Published']//span[contains(text(),'PUBLISHED')])[2]",
    );
  }
  txtPostPublished3(): Locator {
    return this.page.locator(
      "(//div[@class='c-status-Published']//span[contains(text(),'PUBLISHED')])[3]",
    );
  }
  txtPostDraft1(): Locator {
    return this.page.locator(
      "(//div[@class='c-status-Draft']//span[contains(text(),'DRAFT')])[1]",
    );
  }
  txtPostSavedat(): Locator {
    return this.page.locator(
      "(//div[@class='updated-time'][contains(text(),'Saved at')])[1]",
    );
  }
  txtPostPublishedOn(): Locator {
    return this.page.locator(
      "(//div[@class='updated-time'][contains(text(),'Published at')])[1]",
    );
  }
  txtPostPublishedOn1(): Locator {
    return this.page.locator(
      "(//div[@class='updated-time'][contains(text(),'Published on')])[1]",
    );
  }
  txtPostByline(): Locator {
    return this.page.locator("(//div[contains(@class,'byline')])[1]");
  }
  lnkPostLaunch(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'launch')]");
  }
  lnkPostExpand(): Locator {
    return this.page.locator(
      "//mat-icon[contains(text(),'keyboard_arrow_down')]",
    );
  }
  lnkPostCollapse(): Locator {
    return this.page.locator(
      "//mat-icon[contains(text(),'keyboard_arrow_up')]",
    );
  }
  btnPostCopyID(): Locator {
    return this.page.locator(
      "(//mat-card-content[1]/div[1]/carbon-summary-view-actions[1]/div[1]/button[1]/span[1]/mat-icon[1])[1]",
    );
  }

  btnPostMoreMenu(): Locator {
    return this.page.locator(
      "//div[@class='menu']//mat-icon[contains(text(),'more_vert')]",
    );
  }
  lnkCopyInternalLink(): Locator {
    return this.page.locator("//*[contains(text(),'Copy Internal Link')]");
  }
  btnPostPublish(): Locator {
    return this.page.locator("//button[contains(text(),'Publish')]");
  }
  btnPopupPublish(): Locator {
    return this.page.locator("//button[@color='warn']//span");
  }
  btnPublishOnlyPost(): Locator {
    return this.page.locator("//button[contains(text(),'Publish Post')]");
  }
  btnPublishPostandStory(): Locator {
    return this.page.locator(
      "//button[contains(text(),'Publish Story and Post')]",
    );
  }
  datCoverageEndDate(): Locator {
    return this.page.locator(
      "//carbon-datepicker[@id='field_coverageEndDate']//input",
    );
  }
  txtDraftLiveStory(): Locator {
    return this.page.locator("//strong[contains(text(),'Draft')]");
  }
  txtPublishLiveStory(): Locator {
    return this.page.locator("//strong[contains(text(),'Published')]");
  }

  rteHeader1(): Locator {
    return this.page.locator(
      "(//rte-menuitem[1]//button[1]//span[1]//mat-icon[1]//*[local-name()='svg'])[1]",
    );
  }
  rteBold1(): Locator {
    return this.page.locator("(//mat-icon[text()='format_bold'])[1]");
  }
  rteItalic1(): Locator {
    return this.page.locator("(//mat-icon[text()='format_italic'])[1]");
  }
  rteBulletedList1(): Locator {
    return this.page.locator("(//mat-icon[text()='format_list_bulleted'])[1]");
  }
  rteNumberedList1(): Locator {
    return this.page.locator("(//mat-icon[text()='format_list_numbered'])[1]");
  }
  rteBlockQuote1(): Locator {
    return this.page.locator("(//mat-icon[text()='insert_comment'])[1]");
  }
  rtePullQuote1(): Locator {
    return this.page.locator("(//mat-icon[text()='format_quote'])[1]");
  }
  rtePromoCutoff1(): Locator {
    return this.page.locator("(//mat-icon[text()='horizontal_rule'])[1]");
  }
  rteSuperscript1(): Locator {
    return this.page.locator("(//mat-icon[text()='superscript'])[1]");
  }
  rteSubscript1(): Locator {
    return this.page.locator("(//mat-icon[text()='subscript'])[1]");
  }
  rtechain1(): Locator {
    return this.page.locator("(//rte-menuitem//mat-icon[text()='link'])[1]");
  }
  rteDollar1(): Locator {
    return this.page.locator("(//mat-icon[text()='attach_money'])[1]");
  }
  rteSpecialChar1(): Locator {
    return this.page.locator(
      "(//*[local-name()='svg']//*[name()='text' and contains(@transform,'matrix(1 0')])[1]",
    );
  }
  rteContentGroup1(): Locator {
    return this.page.locator("(//mat-icon[text()='table_rows'])[1]");
  }
  rteImage1(): Locator {
    return this.page.locator("(//mat-icon[text()='insert_photo'])[1]");
  }
  rteVideo1(): Locator {
    return this.page.locator("(//mat-icon[text()='videocam'])[1]");
  }
  rteVideo1_New(): Locator {
    return this.page.locator("(//mat-icon[text()='videocam'])[2]");
  }
  rteCodeSnippet1(): Locator {
    return this.page.locator(
      "(//rte-menuitem//button//span//mat-icon[text()='code'])[1]",
    );
  }
  //  rteExpand1  (): Locator{ return this.page.locator("(//mat-icon[text()='fullscreen'])[1]");}
  edtBody1(): Locator {
    return this.page.locator("(//div[@class='ProseMirror'])[1]");
  }
  edtBodyFirstBullet(): Locator {
    return this.page.locator("(//div[@class='ProseMirror']/ul/li)[1]");
  }

  rteHeader2(): Locator {
    return this.page.locator(
      "(//rte-menuitem[1]//button[1]//span[1]//mat-icon[1]//*[local-name()='svg'])[4]",
    );
  }
  rteBold2(): Locator {
    return this.page.locator("(//mat-icon[text()='format_bold'])[2]");
  }
  rteItalic2(): Locator {
    return this.page.locator("(//mat-icon[text()='format_italic'])[2]");
  }
  rteBulletedList2(): Locator {
    return this.page.locator("(//mat-icon[text()='format_list_bulleted'])[4]");
  }
  rteNumberedList2(): Locator {
    return this.page.locator("(//mat-icon[text()='format_list_numbered'])[4]");
  }
  rteBlockQuote2(): Locator {
    return this.page.locator("(//mat-icon[text()='insert_comment'])[2]");
  }
  rtePullQuote2(): Locator {
    return this.page.locator("(//mat-icon[text()='format_quote'])[2]");
  }
  rtePromoCutoff2(): Locator {
    return this.page.locator("(//mat-icon[text()='horizontal_rule'])[2]");
  }
  rteSuperscript2(): Locator {
    return this.page.locator("(//mat-icon[text()='superscript'])[4]");
  }
  rteSubscript2(): Locator {
    return this.page.locator("(//mat-icon[text()='subscript'])[4]");
  }
  rtechain2(): Locator {
    return this.page.locator("(//rte-menuitem//mat-icon[text()='link'])[2]");
  }
  rteDollar2(): Locator {
    return this.page.locator("(//mat-icon[text()='attach_money'])[2]");
  }
  rteSpecialChar2(): Locator {
    return this.page.locator(
      "(//*[local-name()='svg']//*[name()='text' and contains(@transform,'matrix(1 0')])[4]",
    );
  }
  rteContentGroup2(): Locator {
    return this.page.locator("(//mat-icon[text()='table_rows'])[2]");
  }
  rteImage2(): Locator {
    return this.page.locator("(//mat-icon[text()='insert_photo'])[2]");
  }
  //	  rteVideo2  (): Locator{ return this.page.locator("(//mat-icon[text()='videocam'])[2]");}
  rteVideo2(): Locator {
    return this.page.locator("//rte-menuitem//mat-icon[text()='videocam']");
  }
  rteCodeSnippet2(): Locator {
    return this.page.locator(
      "(//rte-menuitem//button//span//mat-icon[text()='code'])[2]",
    );
  }
  //  rteExpand2  (): Locator{ return this.page.locator("(//mat-icon[text()='fullscreen'])[2]");}
  edtBody2(): Locator {
    return this.page.locator("(//div[@class='ProseMirror'])[2]");
  }
  edtBody_FirstPara(): Locator {
    return this.page.locator("(//div[@class='ProseMirror']//p)[1]");
  }
  edtBody_LastPara(): Locator {
    return this.page.locator("(//div[@class='ProseMirror']//p)[last()]");
  }

  rteHeader3(): Locator {
    return this.page.locator(
      "(//rte-menuitem[1]//button[1]//span[1]//mat-icon[1]//*[local-name()='svg'])[3]",
    );
  }
  rteBold3(): Locator {
    return this.page.locator("(//mat-icon[text()='format_bold'])[3]");
  }
  rteItalic3(): Locator {
    return this.page.locator("(//mat-icon[text()='format_italic'])[3]");
  }
  rtechain3(): Locator {
    return this.page.locator("(//rte-menuitem//mat-icon[text()='link'])[3]");
  }
  rteDollar3(): Locator {
    return this.page.locator("(//mat-icon[text()='attach_money'])[3]");
  }
  rteSpecialChar3(): Locator {
    return this.page.locator(
      "(//*[local-name()='svg']//*[name()='text' and contains(@transform,'matrix(1 0')])[2]",
    );
  }
  rteBulletedList3(): Locator {
    return this.page.locator("(//mat-icon[text()='format_list_bulleted'])[2]");
  }
  rteNumberedList3(): Locator {
    return this.page.locator("(//mat-icon[text()='format_list_numbered'])[2]");
  }
  rteSuperscript3(): Locator {
    return this.page.locator("(//mat-icon[text()='superscript'])[2]");
  }
  rteSubscript3(): Locator {
    return this.page.locator("(//mat-icon[text()='subscript'])[2]");
  }
  rteBlockQuote3(): Locator {
    return this.page.locator("(//mat-icon[text()='insert_comment'])[3]");
  }
  rteVideo3(): Locator {
    return this.page.locator("(//mat-icon[text()='videocam'])[3]");
  }
  rteVideo4(): Locator {
    return this.page.locator("(//mat-icon[text()='videocam'])[4]");
  }
  rteVideo6(): Locator {
    return this.page.locator("(//mat-icon[text()='videocam'])[6]");
  }

  /**
   * Locator for all videocam icons - use with clickLastElement() method in CMSMethods
   * to find all videocam icons and click the last one when position varies
   */
  rteVideoAll(): Locator {
    return this.page.locator("//mat-icon[text()='videocam']");
  }
  rteCodeSnippet3(): Locator {
    return this.page.locator("(//mat-icon[text()='code'])[3]");
  }
  rtePullQuote3(): Locator {
    return this.page.locator("(//mat-icon[text()='format_quote'])[3]");
  }
  rtePullQuote4(): Locator {
    return this.page.locator("(//mat-icon[text()='format_quote'])[4]");
  }

  rtechain4(): Locator {
    return this.page.locator("(//rte-menuitem//mat-icon[text()='link'])[4]");
  }

  //New Config
  edtTitleNewConfig(): Locator {
    return this.page.locator("//carbon-input[@id='field_title']//textarea");
  }
  edtSourceUsageRule(): Locator {
    return this.page.locator(
      "//input[contains(@placeholder,'Type to select a usage rule')]",
    );
  }
  edtSourceNameField(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_shorterDescription']//textarea",
    );
  }
  edtNotesField(): Locator {
    return this.page.locator("//carbon-input[@id='field_notes']//textarea");
  }
  edtSlugField(): Locator {
    return this.page.locator("//carbon-input[@id='field_slug']//textarea");
  }
  edtSEOTitleNewConfig(): Locator {
    return this.page.locator("//carbon-input[@id='field_seoTitle']//textarea");
  }
  edtPromoTitleNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_linkHeadline']//textarea",
    );
  }
  edtSocialTitleNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_tweetOverride']//textarea",
    );
  }
  edtShortTitleNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_shorterHeadline']//textarea",
    );
  }
  edtSlugFieldInput(): Locator {
    return this.page.locator("//carbon-input[@id='field_slug']//input");
  }
  edtSlugFieldTextArea(): Locator {
    return this.page.locator("//carbon-input[@id='field_slug']//textarea");
  }
  edtTagNameField(): Locator {
    return this.page.locator("//carbon-input[@id='field_tagName']//textarea");
  }
  edtSourceShortName(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_shortestHeadline']//textarea",
    );
  }
  txtSEOTitleNC(): Locator {
    return this.page.locator("//carbon-input[@id='field_seoTitle']//textarea");
  }
  edtLinkHeadlineNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_linkHeadline']//textarea",
    );
  }
  edtSocialMessageNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_tweetOverride']//textarea",
    );
  }
  edtShorterHeadlineNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_shorterHeadline']//textarea",
    );
  }
  edtShortestHeadlineNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_shortestHeadline']//textarea",
    );
  }
  edtSummaryNewConfig(): Locator {
    return this.page.locator("//carbon-input[@id='field_summary']//textarea");
  }
  edtFieldMoreConfig(): Locator {
    return this.page.locator("//*[@id='field_more']//input");
  }
  btnLicenseGettyagain1(): Locator {
    return this.page.locator("//button[contains(text(),'Licens')]");
  }
  edtUsageRights(): Locator {
    return this.page.locator("//carbon-select[@id='field_usageRights']");
  }
  edtFieldAuthor(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_author']//input)[1]",
    );
  }
  edtTagsNewConfig(): Locator {
    return this.page.locator(
      "(//carbon-tags-autocomplete[@id='field_assets']//input)[2]",
    );
  }
  edtSourceNewConfig1(): Locator {
    return this.page.locator(
      "//carbon-autocomplete[@id='field_source']//input",
    );
  }
  edtSectionConfig(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_section']//input)[1]",
    );
  }
  edtAdditionalSectionsConfig(): Locator {
    return this.page.locator(
      "(//carbon-autocomplete[@id='field_additionalSections']//input)[1]",
    );
  }
  edtTagsConfig(): Locator {
    return this.page.locator("(//*[@id='field_tags']//input)[2]");
  }
  edtTagsNewConfigStory(): Locator {
    return this.page.locator("(//*[@id='field_tags']//input)[3]");
  }
  edtTeamConfig(): Locator {
    return this.page.locator("//*[@id='field_team']//input");
  }
  edtProjectConfig(): Locator {
    return this.page.locator("//*[@id='field_project']//input");
  }
  edtTemplateConfig(): Locator {
    return this.page.locator("//*[@id='field_template']//input");
  }
  edtUsageRuleConfig(): Locator {
    return this.page.locator("//*[@id='field_usageRule']//input");
  }
  edtKeypointsConfig(): Locator {
    return this.page.locator(
      "(//*[@id='field_keypointsStructured']//following::ul)[1]",
    );
  }
  edtCanonicalOverrideNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_canonicalUrlOverride']//textarea",
    );
  }
  edtCreatorOverrideNewConfig(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_creatorOverwrite']//textarea",
    );
  }
  edtSubHead(): Locator {
    return this.page.locator("//carbon-input[@id='field_deck']//textarea");
  }
  edtThumbnailNewConfig(): Locator {
    return this.page.locator("//*[@id='field_thumbnail']//input");
  }
  edtFeatureMediaNewConfig(): Locator {
    return this.page.locator("//*[@id='field_featuredMedia']//input");
  }
  btnCloseNewConfig(): Locator {
    return this.page.locator(
      "(//*[@class='full-width']//following::mat-icon[contains(text(),'close')])[1]",
    );
  }
  btnCloseOldConfig(): Locator {
    return this.page.locator(
      "//div[@class='c-asset-toolbar-close' and @title='CLOSE']",
    );
  }
  btnCopyIDVideoThumbnail(): Locator {
    return this.page.locator(
      "//img[contains(@src,'/api/v1/image')]//following::mat-icon[@role='img' and contains(text(),'filter_none')]",
    );
  }
  btnImageSelectionCancel(): Locator {
    return this.page.locator("//button[contains(text(),'Cancel')]");
  }

  //Guides
  rteNewlineImageGuide(): Locator {
    return this.page.locator("(//mat-icon[text()='image'])[1]");
  }
  rteNewlineInfographicGuide(): Locator {
    return this.page.locator("(//mat-icon[text()='insert_chart'])[1]");
  }
  rteNewlineMoreMenuGuide(): Locator {
    return this.page.locator("(//mat-icon[text()='more_vert'])[1]");
  }
  rteNewlineTwitterGuide(): Locator {
    return this.page.locator("//button[@mattooltip='Twitter']//span//mat-icon");
  }
  rteNewlineYoutubeGuide(): Locator {
    return this.page.locator("//button[@mattooltip='YouTube']//span//mat-icon");
  }
  rteNewlineInstagramGuide(): Locator {
    return this.page.locator(
      "//button[@mattooltip='Instagram']//span//mat-icon",
    );
  }
  rteNewlineSearchEditGuide(): Locator {
    return this.page.locator("//input[@placeholder='Search or enter ID']");
  }
  rteNewlineSearchIconGuide(): Locator {
    return this.page.locator("(//mat-icon[text()='search'])[1]");
  }
  rteNewlineInfoCardGuide(): Locator {
    return this.page.locator(
      "//button[@mattooltip='Info Card']//span//mat-icon",
    );
  }
  rteNewlineQACardGuide(): Locator {
    return this.page.locator(
      "//button[@mattooltip='Q&A Card']//span//mat-icon",
    );
  }
  rteNewlineReadMoreCardGuide(): Locator {
    return this.page.locator(
      "//button[@mattooltip='Read More Card']//span//mat-icon",
    );
  }
  edtPageNavigationTitle(): Locator {
    return this.page.locator(
      "//carbon-input[@id='field_pageNavigationTitle']//textarea",
    );
  }
  btnRemoveCircleNewline(): Locator {
    return this.page.locator(
      "//mat-icon[contains(text(),'remove_circle_outline')]",
    );
  }

  //Card Modules
  cardInfoBody(): Locator {
    return this.page.locator("//card[@type='info']//p");
  }
  cardInfoHeader(): Locator {
    return this.page.locator("//card[@type='info']//h2");
  }
  cardQABody(): Locator {
    return this.page.locator("//card[@type='question-answer']//p");
  }
  cardQAHeader(): Locator {
    return this.page.locator("//card[@type='question-answer']//h2");
  }
  cardReadMoreHeader(): Locator {
    return this.page.locator("//card[@type='read-more']//h2");
  }
  cardReadMoreBody(): Locator {
    return this.page.locator("//card[@type='read-more']//ul");
  }
  lnkClickheretoview(): Locator {
    return this.page.locator("//a[contains(text(),'Click here to view')]");
  }

  //view edit history
  lnkViewHistoryPopUp(): Locator {
    return this.page.locator("(//a//span[text()='View'])[1]");
  }
  lnkMoreMenuinMediaLibrary(): Locator {
    return this.page.locator(
      "//carbon-media-card//button[@mattooltip='More Options']//mat-icon[text()='more_vert']",
    );
  }
  lnkMoreMenuinMediaLibraryFirstImage(): Locator {
    return this.page.locator(
      "//div[contains(@id,'carbon-media-card')]//following::mat-icon[text()='more_vert']",
    );
  }
  edtSearchVideosVMPage(): Locator {
    return this.page.locator("//*[@label='Search Videos']//input");
  }
  lnkMoreMenuVMPage(): Locator {
    return this.page.locator(
      "//button[@mattooltip='Info']//following::mat-icon[text()='more_vert']",
    );
  }
  lnkViewHistoryPopUpVideo(): Locator {
    return this.page.locator(
      "(//a[contains(@href,'/dashboard')]//span[text()='View'])[7]",
    );
  }
  lblViewingVersionVideo(): Locator {
    return this.page.locator(
      "//*[contains(text(),'You are editing a revision')]",
    );
  }
  lnktoeditCurrentVersionVideo(): Locator {
    return this.page.locator("//a[contains(text(),'here')]");
  }

  //Toolbar items
  lnkCopyNewConfig(): Locator {
    return this.page.locator(
      "(//carbon-dropdown-menu[1]/button[1]/span[1]/mat-icon[1])[1]",
    );
  }
  lnkCopyIDNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Copy ID')]");
  }
  lnkCurrentURLNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Current URL')]");
  }
  lnkPreviewURLNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Preview URL')]");
  }
  lnkPreviewNewConfig(): Locator {
    return this.page.locator(
      "(//carbon-dropdown-menu[1]/button[1]/span[1]/mat-icon[1])[2]",
    );
  }
  lnkLiveNewConfig(): Locator {
    return this.page.locator(
      "(//carbon-dropdown-menu[1]/button[1]/span[1]/mat-icon[1])[3]",
    );
  }
  lnkDesktopPreviewNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Desktop preview')]");
  }
  lnkMobilePreviewNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Mobile preview')]");
  }
  lnkMobileAppsPreviewNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Mobile app preview')]");
  }
  lnkLegacyPreviewNewConfig(): Locator {
    return this.page.locator(
      "//button[contains(text(),'Desktop - Legacy preview')]",
    );
  }
  lnkDesktopLiveNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Desktop - Live')]");
  }
  lnkMobileWebLiveNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Mobile web - Live')]");
  }
  lnkMobileAppsLiveNewConfig(): Locator {
    return this.page.locator("//button[contains(text(),'Mobile apps - Live')]");
  }

  //More info objects
  lblID(): Locator {
    return this.page.locator("//b[contains(text(),'ID:')]");
  }
  lblIDValue(): Locator {
    return this.page.locator("//b[contains(text(),'ID:')]/..");
  }
  lblLink(): Locator {
    return this.page.locator("//b[contains(text(),'Link:')]");
  }
  lblCreatedBy(): Locator {
    return this.page.locator("//b[contains(text(),'Created by:')]");
  }
  lblLastUpdatedBy(): Locator {
    return this.page.locator("//b[contains(text(),'Last updated by:')]");
  }
  lblCreatedDate(): Locator {
    return this.page.locator("//b[contains(text(),'Created date:')]");
  }
  lblUpdatedDate(): Locator {
    return this.page.locator("//b[contains(text(),'Updated date:')]");
  }
  lblTitle(): Locator {
    return this.page.locator("//b[contains(text(),'Title:')]");
  }
  lblVideoLengthValue(): Locator {
    return this.page.locator("//b[contains(text(),'Video length')]/..");
  }
  lblPromoHeadline(): Locator {
    return this.page.locator("//b[contains(text(),'Promo Headline:')]");
  }
  lblSummary(): Locator {
    return this.page.locator("//b[contains(text(),'Summary:')]");
  }
  btnInfoIconVMPage(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'info')]");
  }
  lnkMoreInfo(): Locator {
    return this.page.locator("//*[contains(text(),'More Info')]");
  }
  lnkMoreInfoClose(): Locator {
    return this.page.locator(
      "(//*[@class='expanded-info']//mat-icon[contains(text(),'close')])",
    );
  }
  lnkUsedIn(): Locator {
    return this.page.locator("//*[contains(text(),'Used in')]");
  }

  divassetID(): Locator {
    return this.page.locator("(//span[contains(text(),'105753168')])[1]");
  }
  divLink(): Locator {
    return this.page.locator(
      "(//span[contains(text(),'cnbc.com/video/2019/02/21/killer-mike-wants-to-have-dinner-with-billionaire-ted-turner.html')])[1]",
    );
  }
  divCreatedBy(): Locator {
    return this.page.locator("(//span[contains(text(),'Mary.Stevens')])[1]");
  }
  divLastUpdatedBy(): Locator {
    return this.page.locator(
      "(//span[contains(text(),'Kathryn.dill@nbcuni.com')])[1]",
    );
  }
  divTitle(): Locator {
    return this.page.locator(
      "(//span[contains(text(),'Killer Mike wants to have lunch with this surprising billionaire')])[1]",
    );
  }
  divPromoHeadline(): Locator {
    return this.page.locator(
      "(//span[contains(text(),'Killer Mike wants to have lunch with this surprising billionaire')])[2]",
    );
  }
  txtProblemLoadingData(): Locator {
    return this.page.locator(
      "(//*[contains(text(),'Problem loading data')])[1]",
    );
  }
  txtDraftInfotab(): Locator {
    return this.page.locator(
      "(//div[contains(@class,'c-asset-status')]//b[text()='Draft'])[1]",
    );
  }

  //global search and Related content
  //div[@id='app_shell_search_field']//input
  textIDfromMainSearch(): Locator {
    return this.page.locator("(//span[contains(text(),'id:')])[1]");
  }
  textTypefromMainSearch(): Locator {
    return this.page.locator("(//span[contains(text(),'type:  Story')])[1]");
  }
  lnkOpenRelatedContent(): Locator {
    return this.page.locator("//a[contains(text(),'OPEN')]");
  }
  tabRelatedStory(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[@svgicon='related-content']",
    );
  }
  edtRelatedManualSearch(): Locator {
    return this.page.locator("//div[@class='search-input']//input");
  }
  edtRelatedContentFirstRow(): Locator {
    return this.page.locator("(//*[@class='mat-card-header'])[1]");
  }
  btnRelatedtextboxClear(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'clear')]");
  }
  btnGlobaltextboxClear(): Locator {
    return this.page.locator(
      "//*[@id='app_shell_search_field']//span[contains(text(),'CLEAR')]",
    );
  }
  btnGlobaltextboxClearNew(): Locator {
    return this.page.locator(
      "//*[@id='app_shell_search_field']//span[contains(text(),'CLEAR')]",
    );
  }
  btnRelatedCOPYIcon(): Locator {
    return this.page.locator(
      "(//div[@class='c-quick-sidebar Content c-drawer-Related']//*[contains(text(),'filter_none')])[1]",
    );
  }
  btnRelatedMore(): Locator {
    return this.page.locator(
      "(//div[@class='c-quick-sidebar Content c-drawer-Related']//*[contains(text(),'more_vert')])[1]",
    );
  }
  btnRelatedOpenPage(): Locator {
    return this.page.locator("//*[contains(text(),'View live')]");
  }
  btnRelatedCopyLiveUrl(): Locator {
    return this.page.locator("//*[contains(text(),'Copy Live Url')]");
  }
  btnRelatedEdit(): Locator {
    return this.page.locator("(//*[contains(text(),'Edit')])[2]");
  }
  btnMoreOptionEdit(): Locator {
    return this.page.locator("(//*[contains(text(),'Edit')])[2]");
  }
  btnGlobalEdit(): Locator {
    return this.page.locator("(//*[contains(text(),'Edit')])[3]");
  }
  btnRelatedViewInReadOnly(): Locator {
    return this.page.locator("//*[contains(text(),'View in read-only')]");
  }
  btnRelatedInfo(): Locator {
    return this.page.locator("//*[contains(text(),'More Info')]");
  }
  btnRelatedViewEditHistory(): Locator {
    return this.page.locator("//*[contains(text(),'View edit history')]");
  }
  btnRelatedViewClone(): Locator {
    return this.page.locator("//*[contains(text(),'Clone')]");
  }
  btnGlobalEdit1(): Locator {
    return this.page.locator("(//*[contains(text(),'Edit')])");
  }
  btnRelatedAddToBookmarks(): Locator {
    return this.page.locator("//*[contains(text(),'Add to Bookmarks')]");
  }
  btnGlobalSearchEdit(): Locator {
    return this.page.locator("//a[contains(text(),'Edit')]");
  }
  btnRelatedFRemovefromBookmarks(): Locator {
    return this.page.locator("//*[contains(text(),'Remove from Bookmarks')]");
  }
  btnRelatedCopyId(): Locator {
    return this.page.locator("//*[contains(text(),'Copy Id')]");
  }
  btnRelatedMoreInfoClose(): Locator {
    return this.page.locator(
      "(//div[@class='expanded-info']//mat-icon[contains(text(),'close')])[1]",
    );
  }
  btnGlobalSearchClose(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'clear')]");
  }
  btnGlobalSearchClear(): Locator {
    return this.page.locator("//span[contains(text(),'CLEAR')]");
  }

  lblIDRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'ID:')])[1]");
  }
  lblLinkRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'Link:')])[1]");
  }
  lblCreatedByRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'Created by:')])[1]");
  }
  lblLastUpdatedByRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'Last updated by:')])[1]");
  }
  lblCreatedDateRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'Created date:')])[1]");
  }
  lblUpdatedDateRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'Updated date:')])[1]");
  }
  lblTitleRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'Title:')])[1]");
  }
  lblPromoHeadlineRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'Promo Headline:')])[1]");
  }
  lblSummaryRelated(): Locator {
    return this.page.locator("(//b[contains(text(),'Summary:')])[1]");
  }

  lnkViewinEditHistory(): Locator {
    return this.page.locator(
      "(//h3[@class='mat-dialog-title'])[2]//following::a[2]",
    );
  }
  btnGlobalCOPYIcon(): Locator {
    return this.page.locator(
      "(//mat-expansion-panel-header/span[1]/mat-card[1]/mat-card-actions[1]/carbon-summary-view-actions[1]/div[1]/button)[1]",
    );
  }
  lnkAdvancedSearch(): Locator {
    return this.page.locator("//span[contains(text(),'Advanced Search')]");
  }
  btnContentLibraryCopyIcon(): Locator {
    return this.page.locator("(//mat-icon[contains(text(),'filter_none')])[6]");
  }
  proPillGlobalSearch(): Locator {
    return this.page.locator("//*[contains(@class,'pill Pro')]");
  }

  linkSearchSummaryViewLaunch(): Locator {
    return this.page.locator(
      "(//li[@class='c-summary-action']//mat-icon[text()='launch'])[1]",
    );
  }
  linkSearchSummaryViewMoreOption(): Locator {
    return this.page.locator(
      "(//li[@class='c-summary-action']//mat-icon[text()='more_vert'])[2]",
    );
  }
  linkSearchSummaryViewStatus(): Locator {
    return this.page.locator(
      "(//div[@class='c-summary-col']//div[contains(@class,'c-asset-status')])[2]",
    );
  }
  linkTemplateTextMainSearch(): Locator {
    return this.page.locator("//span[contains(text(),'Template')]");
  }
  lnkTemplateTitleMainSearch(): Locator {
    return this.page.locator("//mat-card-header/div[1]/mat-card-title[1]/a[1]");
  }

  //Image
  tabSourceInfo(): Locator {
    return this.page.locator("//span[contains(text(),'Source Info')]");
  }
  selUsageRights(): Locator {
    return this.page.locator(
      "(//select[contains(@class,'form-control ng-untouched ng-pristine ng-valid')])[1]",
    );
  }
  selPhotoType(): Locator {
    return this.page.locator(
      "(//select[contains(@class,'form-control ng-untouched ng-pristine ng-valid')])[2]",
    );
  }
  selLicense(): Locator {
    return this.page.locator("//select[contains(@name,'licensed')]");
  }
  btnResetToDefaults(): Locator {
    return this.page.locator("//b[@mattooltip='Reset to defaults']");
  }
  btnResetToDefaults2(): Locator {
    return this.page.locator("(//b[@mattooltip='Reset to defaults'])[2]");
  }
  txtPromotional(): Locator {
    return this.page.locator("//span[contains(text(),'Promotional')]");
  }
  btnRefreshContentLib(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'refresh')]");
  }
  lblStorySelected(): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-selected-types')]//span[contains(text(),'Story')]",
    );
  }

  //DataTable
  btnCreateTable(): Locator {
    return this.page.locator("//span[contains(text(),'CREATE TABLE')]");
  }
  btnAddColRight(): Locator {
    return this.page.locator("//button[contains(text(),'Add column right')]");
  }
  btnAddColLeft(): Locator {
    return this.page.locator("//button[contains(text(),'Add column left')]");
  }
  btnDeleteCol(): Locator {
    return this.page.locator("//button[contains(text(),'Delete column')]");
  }
  btnAddRowbelow(): Locator {
    return this.page.locator("//button[contains(text(),'Add row below')]");
  }
  btnAddRowabove(): Locator {
    return this.page.locator("//button[contains(text(),'Add row above')]");
  }
  btnDeleteRow(): Locator {
    return this.page.locator("//button[contains(text(),'Delete row')]");
  }
  btnDeleteRowDisabled(): Locator {
    return this.page.locator("//button[contains(text(),'Delete row')]");
  }
  btnMoreMenu1(): Locator {
    return this.page.locator(
      "(//td//mat-icon[contains(text(),'more_vert')])[1]",
    );
  }
  btnMoreMenu2(): Locator {
    return this.page.locator(
      "(//td//mat-icon[contains(text(),'more_vert')])[2]",
    );
  }
  btnTableMoremenu(): Locator {
    return this.page.locator(
      "(//div[@class='table-options']//mat-icon[contains(text(),'more_vert')])[1]",
    );
  }
  btnExportCSV(): Locator {
    return this.page.locator("//button[contains(text(),'Export CSV')]");
  }
  btnDeleteTable(): Locator {
    return this.page.locator("//button[contains(text(),'Delete table')]");
  }
  btnUsedIn(): Locator {
    return this.page.locator("//button[contains(text(),'Used in')]");
  }
  btnUsedInClose(): Locator {
    return this.page.locator("//span[contains(text(),'Close')]");
  }

  edtRow1Col1(): Locator {
    return this.page.locator("//tbody/tr[1]/td[1]/div[1]/textarea[1]");
  }
  edtRow1Col2(): Locator {
    return this.page.locator("//tbody/tr[1]/td[2]/div[1]/textarea[1]");
  }
  edtRow1Col3(): Locator {
    return this.page.locator("//tbody/tr[1]/td[3]/div[1]/textarea[1]");
  }
  edtRow2Col1(): Locator {
    return this.page.locator("//tbody/tr[2]/td[1]/div[1]/textarea[1]");
  }
  edtRow2Col2(): Locator {
    return this.page.locator("//tbody/tr[2]/td[2]/div[1]/textarea[1]");
  }
  edtRow2Col3(): Locator {
    return this.page.locator("//tbody/tr[2]/td[3]/div[1]/textarea[1]");
  }
  edtRow3Col1(): Locator {
    return this.page.locator("//tbody/tr[3]/td[1]/div[1]/textarea[1]");
  }
  edtRow3Col2(): Locator {
    return this.page.locator("//tbody/tr[3]/td[2]/div[1]/textarea[1]");
  }
  edtRow3Col3(): Locator {
    return this.page.locator("//tbody/tr[3]/td[3]/div[1]/textarea[1]");
  }

  btnLogoutPerson(): Locator {
    return this.page.locator(
      "(//span[@class='mat-button-wrapper']//mat-icon[contains(text(),'person')])[1]",
    );
  }
  lnkLogout(): Locator {
    return this.page.locator("//a[contains(text(),'Log Out')]");
  }
  paraLogintoCont(): Locator {
    return this.page.locator(
      "//div[contains(text(),'You signed out of your account')]",
    );
  }
  lblAutopubWarning(): Locator {
    return this.page.locator(
      "(//h2[contains(text(),' Are you sure? This may be embargoed! ')])[2]",
    );
  }
  btnAutopublishanyway(): Locator {
    return this.page.locator("(//span[text()='Publish anyway'])[2]");
  }

  //DataViz

  selChartType(): Locator {
    return this.page.locator("//carbon-select[@id='field_library']");
  }
  optStaticChart(): Locator {
    return this.page.locator(
      "//*[contains(text(),'Static market data chart')]",
    );
  }
  optStockChart(): Locator {
    return this.page.locator("//*[contains(text(),'Live market data chart')]");
  }
  optHighcharts(): Locator {
    return this.page.locator("(//*[contains(text(),'Highcharts')])[1]");
  }
  optDatawrapper(): Locator {
    return this.page.locator("(//*[contains(text(),'Datawrapper')])[1]");
  }
  edtToggleSwitch(): Locator {
    return this.page.locator("//*[@class='mat-slide-toggle-thumb']");
  }
  edtSelectTickersDataViz(): Locator {
    return this.page.locator("//*[@id='field_companyIssues']//input");
  }
  edtTimeframeDataviz(): Locator {
    return this.page.locator("//*[contains(@id,'field_companyTimeframe')]");
  }
  calChartStartDate(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'field_publicationTime')]//mat-icon)[1]",
    );
  }
  calChartEndDate(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'field_publicationTime')]//mat-icon)[2]",
    );
  }
  edtChartStartDate(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'field_publicationTime')]//input)[1]",
    );
  }
  edtChartEndDate(): Locator {
    return this.page.locator(
      "(//*[contains(@id,'field_publicationTime')]//input)[2]",
    );
  }
  codeDataViz(): Locator {
    return this.page.locator("//div[contains(@class,'cm-activeLine cm-line')]");
  }
  jsonValidationError(): Locator {
    return this.page.locator(
      "//div[contains(text(),'parse JSON: Unexpected')]",
    );
  }
  errorCode(): Locator {
    return this.page.locator("(//span[contains(text(),'code')])[1]");
  }
  btnGoback(): Locator {
    return this.page.locator("(//span[contains(text(),'Go back')])[2]");
  }
  edtAltImage(): Locator {
    return this.page.locator("//*[@id='field_altImage']//input");
  }
  edtAltImageWildcard(): Locator {
    return this.page.locator("(//*[@id='c_altImage']//input)[2]");
  }
  tabMobile(): Locator {
    return this.page.locator("//div[contains(text(),'MOBILE')]");
  }
  btnReplaceImage(): Locator {
    return this.page.locator("//span[contains(text(),'Replace Image')]");
  }
  btnRemoveImage(): Locator {
    return this.page.locator("//span[contains(text(),'Remove Image')]");
  }
  chkShowExtendedHours(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-slide-toggle-bar')])[2]",
    );
  }

  //User profile
  btnPerson(): Locator {
    return this.page.locator("//button//mat-icon[text()='person']");
  }
  lnkMyProfile(): Locator {
    return this.page.locator("//a[text()='My Profile']");
  }
  btnFirstNameEdit(): Locator {
    return this.page.locator("//mat-icon[text()='edit']");
  }
  edtDisplayName(): Locator {
    return this.page.locator("//input[@formcontrolname='firstName']");
  }
  edtPhoneNumber(): Locator {
    return this.page.locator("//input[@formcontrolname='phoneNumber']");
  }
  edtProfileAuthor(): Locator {
    return this.page.locator("//*[@fieldname='author']//input");
  }
  edtProfileTeam(): Locator {
    return this.page.locator("//*[@fieldname='team']//input");
  }
  edtProfileSection(): Locator {
    return this.page.locator("//*[@fieldname='section']//input");
  }
  edtProfileSource(): Locator {
    return this.page.locator("//*[@fieldname='source']//input");
  }
  chkProfileAcorn(): Locator {
    return this.page.locator(
      "(//span[contains(@class,'mat-checkbox-inner-container')])[1]",
    );
  }
  chkProfileCNBC(): Locator {
    return this.page.locator(
      "(//span[contains(@class,'mat-checkbox-inner-container')])[3]",
    );
  }
  chkProfileSelect(): Locator {
    return this.page.locator(
      "(//span[contains(@class,'mat-checkbox-inner-container')])[6]",
    );
  }
  txtProfileUnsaved(): Locator {
    return this.page.locator(
      "//span[contains(text(),'There are unsaved changed. Please save it')]",
    );
  }
  btnProfileSave(): Locator {
    return this.page.locator("//span[contains(text(),'Save')]");
  }
  txtProfileSaved(): Locator {
    return this.page.locator(
      "//span[contains(text(),'User data is saved successfully')]",
    );
  }
  btnProfileCloseAsset(): Locator {
    return this.page.locator("//i[@class='icon icon-close']");
  }
  txtAuthor(): Locator {
    return this.page.locator("//span[contains(text(),'Joseph O')]");
  }
  txtSource(): Locator {
    return this.page.locator("//span[text()='CNBC US Source']");
  }
  txtSection(): Locator {
    return this.page.locator("(//span[text()='Internet'])[1]");
  }
  txtSectionTag(): Locator {
    return this.page.locator("(//span[text()='Internet'])[2]");
  }

  //Event
  edtEventDescription(): Locator {
    return this.page.locator(
      "//carbon-rte[@id='field_summaryStructured']//div[@class='ProseMirror']",
    );
  }
  edtLiveStreamURL(): Locator {
    return this.page.locator("//*[@id='field_livestreamUrl']//textarea");
  }
  edtEventStartDateWithTime(): Locator {
    return this.page.locator("//*[@id='field_eventStartDate']//input");
  }
  edtEventEndDateWithTime(): Locator {
    return this.page.locator("//*[@id='field_eventEndDate']//input");
  }
  edtEventSurveyLink(): Locator {
    return this.page.locator("//*[@id='field_surveyLink']//textarea");
  }
  lnkEditStoryFromGlobalSearch(): Locator {
    return this.page.locator(
      "//a[contains(text(),'Robinhood confetti embargo')]",
    );
  }

  //Carbon talk page

  carbonTalkMenu(): Locator {
    return this.page.locator("//a[contains(@href,'carbon-talk')]");
  }
  carbonTalkClearFilters(): Locator {
    return this.page.locator("//span[contains(text(),'Clear filters')]");
  }
  carbonTalkSaveFilters(): Locator {
    return this.page.locator("//span[contains(text(),'Save filters')]");
  }
  carbonTalkSelectTaskType(): Locator {
    return this.page.locator("//input[@placeholder='Select task type']");
  }
  carbonTalkSelectTaskStatus(): Locator {
    return this.page.locator("//input[@placeholder='Select task status']");
  }
  carbonTalkETA(): Locator {
    return this.page.locator(
      "//*[@fieldname='dueDate']//div[contains(@class,'mat-select-value')]",
    );
  }
  carbonTalkAnyone(): Locator {
    return this.page.locator("//input[@placeholder='Anyone']");
  }
  carbonTalkAnyTeam(): Locator {
    return this.page.locator("//input[@placeholder='Any team']");
  }
  carbonTalkAnySection(): Locator {
    return this.page.locator("//input[@placeholder='Any section']");
  }
  carbonTalkAnySource(): Locator {
    return this.page.locator("//input[@placeholder='Any source']");
  }
  carbonTalkSelectBrand(): Locator {
    return this.page.locator("//input[@placeholder='Select brand']");
  }
  carbonTalkAddTask(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'add_task')]");
  }
  carbonTalkTaskTypeDialog(): Locator {
    return this.page.locator(
      "//*[@role='dialog']//following::*[contains(@class,'mat-select-value')]",
    );
  }
  carbonTalkDeleteDialog(): Locator {
    return this.page.locator(
      "//*[@role='dialog']//following::*[contains(text(),'Delete')]",
    );
  }
  carbonTalkTaskCancel(): Locator {
    return this.page.locator("//span[contains(text(),'Cancel')]");
  }
  carbonTalkTaskAssign(): Locator {
    return this.page.locator(
      "//*[@role='dialog']//span[contains(text(),'Assign')]",
    );
  }
  carbonTalkTaskUpdate(): Locator {
    return this.page.locator("//button//span[contains(text(),'Update')]");
  }
  carbonTalkTaskUsers(): Locator {
    return this.page.locator("//*[@fieldname='users']//input");
  }
  carbonTalkTaskTeams(): Locator {
    return this.page.locator("//*[@fieldname='teams']//input");
  }
  carbonTalkTaskDueDate(): Locator {
    return this.page.locator("//*[@fieldname='dueDate']//input");
  }
  carbonTalkTaskNotes(): Locator {
    return this.page.locator("//*[@fieldname='notes']//textarea");
  }
  carbonTalkTeamsToggleInput(): Locator {
    return this.page.locator(
      "//*[@formcontrolname='notifyTeams']//span//input",
    );
  }
  carbonTalkTeamsToggleSwitch(): Locator {
    return this.page.locator(
      "//*[@formcontrolname='notifyTeams']//span[@class='mat-slide-toggle-thumb']",
    );
  }
  carbonTalkUsersToggleInput(): Locator {
    return this.page.locator(
      "//*[@formcontrolname='notifyUsers']//span//input",
    );
  }
  carbonTalkUsersToggleSwitch(): Locator {
    return this.page.locator(
      "//*[@formcontrolname='notifyUsers']//span[@class='mat-slide-toggle-thumb']",
    );
  }
  carbonTalkUrgencyToggleInput(): Locator {
    return this.page.locator("//*[@formcontrolname='urgent']//span//input");
  }
  carbonTalkNotifyCreaterToggleInput(): Locator {
    return this.page.locator("//*[@formcontrolname='optOut']//span/input");
  }
  carbonTalkUrgencyToggleSwitch(): Locator {
    return this.page.locator(
      "//*[@formcontrolname='urgent']//span[@class='mat-slide-toggle-thumb']",
    );
  }
  carbonTalkNotifyCreaterToggleSwitch(): Locator {
    return this.page.locator(
      "//*[@formcontrolname='optOut']//span[@class='mat-slide-toggle-thumb']",
    );
  }
  carbonTalkExpandTasks(): Locator {
    return this.page.locator("//mat-expansion-panel-header/span[2]");
  }
  carbonTalkTaskAccept(): Locator {
    return this.page.locator("(//span[text()='Accept'])[1]");
  }
  CarbonTalkStatusDropdown(): Locator {
    return this.page.locator("(//*[contains(text(),'arrow_drop_down')])[1]");
  }
  carbonTalkInProgress(): Locator {
    return this.page.locator(
      "(//*[contains(text(),'In Progress')]//following::*[@class='mat-ripple mat-menu-ripple'])[1]",
    );
  }
  carbonTalkContainerNew(): Locator {
    return this.page.locator("//div[@class='mat-ripple task-container new']");
  }
  carbonTalkContainerInProgress(): Locator {
    return this.page.locator(
      "//div[@class='mat-ripple task-container in-progress']",
    );
  }
  CarbonTalkContainerInProgress(): Locator {
    return this.page.locator(
      "(//*[@class='mat-button-wrapper']//following::*[contains(text(),'In Progress')])[1]",
    );
  }
  carbonTalkContainerDone(): Locator {
    return this.page.locator("//div[@class='mat-ripple task-container done']");
  }
  CarbonTalkContainerDone(): Locator {
    return this.page.locator(
      "(//div[@class='mat-ripple task-container done'])[1]",
    );
  }
  carbonTalkTaskMarkAsDone(): Locator {
    return this.page.locator("(//span[text()='Mark as done'])[1]");
  }
  CarbonTalkTaskMarkAsDone(): Locator {
    return this.page.locator(
      "(//*[contains(text(),'In Progress')]//following::*[@class='mat-ripple mat-menu-ripple'])[2]",
    );
  }
  carbonTalkTaskMarkAsDone2(): Locator {
    return this.page.locator("//*[contains(text(),' In Progress ')]");
  }
  carbonTalkTaskDone(): Locator {
    return this.page.locator("(//span[text()='Done'])[1]");
  }
  carbonTalkFilters(): Locator {
    return this.page.locator("//div[contains(text(),'Filters')]");
  }
  carbonTalkSavedFilters(): Locator {
    return this.page.locator("//div[contains(text(),'Saved filters')]");
  }
  carbonTalkCopyFilter(): Locator {
    return this.page.locator(
      "(//*[@role='tabpanel']//following::*[contains(@mattooltip,'Copy filter')])[1]",
    );
  }
  carbonTalkRemoveFilter(): Locator {
    return this.page.locator(
      "(//*[@role='tabpanel']//following::*[contains(@mattooltip,'Remove filter')])[1]",
    );
  }
  carbonTalkCollapseAll(): Locator {
    return this.page.locator("//span[contains(text(),'Collapse All')]");
  }
  carbonTalkKeyboardTab(): Locator {
    return this.page.locator("//mat-icon[contains(text(),'keyboard_tab')]");
  }

  carbonTalkTaskDeleteEdit(): Locator {
    return this.page.locator(
      "//*[@mode='edit']//following::*[contains(text(),'Delete')]",
    );
  }
  carbonTalkTaskAcceptEdit(): Locator {
    return this.page.locator(
      "//*[@mode='edit']//following::*[contains(text(),'Accept')]",
    );
  }
  carbonTalkTaskMarkAsDoneEdit(): Locator {
    return this.page.locator(
      "//*[@mode='edit']//following::*[contains(text(),'Mark as done')]",
    );
  }
  carbonTalkTaskMarkAsInprogressEdit(): Locator {
    return this.page.locator(
      "//*[@mode='edit']//following::*[contains(text(),'Mark as in progress')]",
    );
  }
  carbonTalkTaskTypeEdit(): Locator {
    return this.page.locator(
      "(//*[@mode='edit']//following::*[contains(@class,'mat-select-value')])[1]",
    );
  }

  StatusDropDown(): Locator {
    return this.page.locator(
      "//*[@role='dialog']//following::*[contains(text(),'arrow_drop_down')]",
    );
  }
  carbonTalkTaskNewDialog(): Locator {
    return this.page.locator(
      "(//*[@role='dialog']//following::*[contains(text(),'New')])[2]",
    );
  }
  carbonTalkTaskMarkAsDoneDialog(): Locator {
    return this.page.locator(
      "//*[@role='dialog']//following::*[contains(text(),'In Progress')]",
    );
  }
  carbonTalkTaskMarkAsInprogressDialog(): Locator {
    return this.page.locator(
      "//*[@role='dialog']//following::*[contains(text(),'Done')]",
    );
  }
  carbonTalkTaskMarkAsInprogressDialog2(): Locator {
    return this.page.locator("//*[contains(text(),'Done')]");
  }
  carbonTalkTaskList(): Locator {
    return this.page.locator(
      "//span[text()='There is 1 task associated with this story']",
    );
  }
  carbonTalkTaskListVideo(): Locator {
    return this.page.locator(
      "//span[text()='There is 1 task associated with this video']",
    );
  }
  carbonTalkTaskListImage(): Locator {
    return this.page.locator(
      "//span[text()='There is 1 task associated with this image']",
    );
  }
  carbonTalkPersonKumar(): Locator {
    return this.page.locator("//span[contains(text(),'Kumar.Chand')]");
  }
  carbonTalkPersonBala(): Locator {
    return this.page.locator(
      "//span[contains(text(),'balamurugan.maruthakani')]",
    );
  }
  carbonTalkPersonShiji(): Locator {
    return this.page.locator("//span[contains(text(),'shiji.john')]");
  }
  carbonTalkTeamCarbon(): Locator {
    return this.page.locator(
      "//carbon-task-request//carbon-autocomplete[@id='field_teams']//mat-card//h5",
    );
  }
  carbonTalkEditTask(): Locator {
    return this.page.locator("(//h4[text()='By'])[1]");
  }
  carbonTalkPerson(): Locator {
    return this.page.locator("//span[contains(text(),'nbcuni')]");
  }
  carbonTalkThisWeek(): Locator {
    return this.page.locator("//*[contains(text(),'This week')]");
  }
  carbonTalkNextWeek(): Locator {
    return this.page.locator("//*[contains(text(),'Next week')]");
  }
  carbonTalkTomorrow(): Locator {
    return this.page.locator("//*[contains(text(),'Tomorrow')]");
  }
  carbonTalkToday(): Locator {
    return this.page.locator("//*[contains(text(),'Today')]");
  }

  carbonTalkFilterName(): Locator {
    return this.page.locator("//*[@role='dialog']//input");
  }
  carbonTalkBtnSaveFilter(): Locator {
    return this.page.locator("//*[contains(text(),'Save Filter')]");
  }
  carbonTalkCopyDeskTeam(): Locator {
    return this.page.locator("//*[@fieldname='teams']//h5[text()='Copy Desk']");
  }
  carbonTalkPhotoDeskTeam(): Locator {
    return this.page.locator(
      "//*[@fieldname='teams']//h5[text()='Photo Desk']",
    );
  }
  carbonTalkHotseatsTeam(): Locator {
    return this.page.locator("//*[@fieldname='teams']//h5[text()='Hotseats']");
  }
  carbonTalkSocialCNBCTeam(): Locator {
    return this.page.locator(
      "//*[@fieldname='teams']//h5[text()='SocialCNBC']",
    );
  }
  carbonTalkCloseTeam(): Locator {
    return this.page.locator(
      "//*[@fieldname='teams']//h5[text()='Hotseats']//following::*[text()='close']",
    );
  }
  carbonTalkTeamTitle(): Locator {
    return this.page.locator(
      "//*[@fieldname='teams']//h5[contains(@class,'summary-title')]",
    );
  }
  carbonTalkTaskTypeError(): Locator {
    return this.page.locator(
      "//*[@fieldname='taskType']//*[contains(@mattooltip,'This field is required to publish this content')]",
    );
  }
  carbonTalkAssignBtnStatus(): Locator {
    return this.page.locator(
      "//*[@fieldname='taskType']//following::button[contains(@class,'mat-button-disabled')]",
    );
  }

  assetPageTaskType(): Locator {
    return this.page.locator("//h4[@class='task-type']");
  }
  carbonTalk_TaskRow_StatusDropDown(): Locator {
    return this.page.locator("//div[@class='task-metadata']//button");
  }
  carbonTalkPage_TaskRowByAsset_StatusDropDown(timestamp: string): Locator {
    return this.page.locator(
      "//*[contains(text(),'" +
        timestamp +
        "')]//following::div[@class='task-metadata']//button",
    );
  }
  carbonTalkPage_TaskRowByAsset_StatusByType(
    timestamp: string,
    type: string,
  ): Locator {
    return this.page.locator(
      "//*[contains(text(),'" +
        timestamp +
        "')]//following::h4[@class='task-type' and text()='" +
        type +
        "']//following::div[@class='task-metadata']//button",
    );
  }
  carbonTalkPage_TaskRowByAsset_CurrentStatus(timestamp: string): Locator {
    return this.page.locator(
      "//*[contains(text(),'" +
        timestamp +
        "')]/ancestor::mat-expansion-panel//div[@class='task-metadata']//button/span",
    );
  }
  carbonTalk_EditTask_StatusDropDown(): Locator {
    return this.page.locator(
      "//carbon-task-request//button[contains(@class,'status-update-button')]",
    );
  }
  asset_TaskType_Row(taskType: string): Locator {
    return this.page.locator(
      "//carbon-task-view//h4[@class='task-type' and text()='" +
        taskType +
        "']",
    );
  }
  carbonTalk_ChangeStatusToNew(): Locator {
    return this.page.locator("//label[text()='New']");
  }
  carbonTalk_ChangeStatusToInProgress(): Locator {
    return this.page.locator("//label[text()='In Progress']");
  }
  carbonTalk_ChangeStatusToDone(): Locator {
    return this.page.locator("//label[text()='Done']");
  }
  carbonTalk_TaskListAcceptedHeader(): Locator {
    return this.page.locator("(//div[@class='task-metadata'])[1]/div[6]//h4");
  }
  carbonTalk_TaskListAcceptedByUser(): Locator {
    return this.page.locator(
      "(//div[@class='task-metadata'])[1]/div[6]//carbon-user-indicator",
    );
  }
  carbonTalk_TaskListOpenDialog1(): Locator {
    return this.page.locator(
      "(//carbon-task-view[@class='ng-star-inserted'])[1]",
    );
  }
  carbonTalkPage_TaskRowByAsset_AcceptedHeader(timestamp: string): Locator {
    return this.page.locator(
      "(//*[contains(text(),'" +
        timestamp +
        "')]//following::div[@class='task-metadata'])[1]/div[6]//h4",
    );
  }
  carbonTalkPage_TaskRowByAsset_AcceptedByValue(timestamp: string): Locator {
    return this.page.locator(
      "(//*[contains(text(),'" +
        timestamp +
        "')]//following::div[@class='task-metadata'])[1]/div[6]//h6",
    );
  }
  carbonTalkPage_TaskRowByAsset_OpenSidedrawer(timestamp: string): Locator {
    return this.page.locator(
      "//*[contains(text(),'" +
        timestamp +
        "')]//following::h4[@class='task-type']",
    );
  }
  carbonTalkPage_openAssetLink(timestamp: string): Locator {
    return this.page.locator("//*[contains(text(),'" + timestamp + "')]");
  }
  carbonTalk_TaskListCloseDialog(): Locator {
    return this.page.locator(
      "//carbon-task-request//button/span[text()='Cancel']",
    );
  }
  carbonTalk_CloseSideDrawer(): Locator {
    return this.page.locator("//mat-sidenav//button//mat-icon[text()='close']");
  }

  //Related Video
  btnSuggestVideos(): Locator {
    return this.page.locator(
      "//button/span[contains(text(),'Suggest videos')]",
    );
  }
  edtSuggestVideos(): Locator {
    return this.page.locator("//*[@id='field_relatedVideo']//input");
  }
  relVideoResultsTitle(): Locator {
    return this.page.locator("(//h4[@class='ng-star-inserted'])[1]");
  }
  relVideoResultsCopyID(): Locator {
    return this.page.locator(
      "(//div[@class='cdk-overlay-pane']//button[@mattooltip='Copy ID'])[1]",
    );
  }
  relVideoResultsMoreOption(): Locator {
    return this.page.locator(
      "(//div[@class='cdk-overlay-pane']//button[@mattooltip='More Options'])[1]",
    );
  }
  relVideoResultsViewLive(): Locator {
    return this.page.locator("//a[contains(text(),'View live')]");
  }

  //Evergreen content

  evrGreenToggleInput(): Locator {
    return this.page.locator(
      "//*[@id='field_seoTitle']//mat-slide-toggle//input",
    );
  }
  evrGreenToggleSwitch(): Locator {
    return this.page.locator(
      "//*[@id='field_seoTitle']//mat-slide-toggle//span[@class='mat-slide-toggle-bar']",
    );
  }
  evrGreenUsageRule(): Locator {
    return this.page.locator(
      "(//h5[text()='Evergreen']//following::button[@mattooltip='More Options'])[1]",
    );
  }
  evrGreenUsageRuleClose(): Locator {
    return this.page.locator(
      "(//h5[text()='Evergreen']//following::*[text()='close'])[1]",
    );
  }
  evrGreenPill(): Locator {
    return this.page.locator(
      "//*[contains(@class,'pill-evergreen')]//span[text()='Evergreen']",
    );
  }
  evrGreenDateline(): Locator {
    return this.page.locator("//*[@id='field_dateline']//input");
  }
  mediaLibraryLicensingBtn(): Locator {
    return this.page.locator("//*[@id='mat-select-150']");
  }
  mediaLibraryUnlicensedlbl(): Locator {
    return this.page.locator("//label[contains(text(),'Unlicensed')]");
  }
  selChartTypeNew(): Locator {
    return this.page.locator("//*[@id='field_chartType']");
  }
  edtCashHoldings(): Locator {
    return this.page.locator("//*[@id='field_cashHoldings']//textarea");
  }
  edtYearStartValue(): Locator {
    return this.page.locator("//*[@id='field_yearStartValue']//textarea");
  }
  btnVideoAndSRT(): Locator {
    return this.page.locator(
      "//button[contains(text(),'Select video and SRT file')]",
    );
  }
  btnVideoAndSRT1(): Locator {
    return this.page.locator(
      "//file-upload[@forceextension='.mp4|.srt']//input[@type='file']",
    );
  }
  btnUploadSRTFile(): Locator {
    return this.page.locator("//span[contains(text(),'Upload SRT file')]");
  }
  pillInvestingClub(): Locator {
    return this.page.locator("//*[contains(@class,'pill-club')]");
  }
  pillInvestingClubGold(): Locator {
    return this.page.locator("//*[contains(@class,'pill-gold')]");
  }
  pillPro(): Locator {
    return this.page.locator("//*[contains(@class,'pill-pro')]");
  }
  //  pillInvestingClubOldConfig  (): Locator{ return this.page.locator("//span[contains(@class,'pill-club') and text()='Club']");}

  carbonTalkPaginator(): Locator {
    return this.page.locator("//div[@class='mat-paginator-range-label']");
  }
  carbonTalkNextPage(): Locator {
    return this.page.locator("//button[@aria-label='Next page']//span");
  }
  carbonTalkNextPageDisabled(): Locator {
    return this.page.locator(
      "//button[@aria-label='Next page' and @disabled='true']",
    );
  }
  carbonTalkFirstStoryTitle(): Locator {
    return this.page.locator(
      "(//mat-card-header/div[1]/mat-card-title[1]/a[1])[1]",
    );
  }
  carbonTalk10thStoryTitle(): Locator {
    return this.page.locator(
      "(//mat-card-header/div[1]/mat-card-title[1]/a[1])[10]",
    );
  }
  carbonTalkPhotoDesk(): Locator {
    return this.page.locator(
      "((//mat-card-header/div[1]/mat-card-title[1]/a[1])[1]//following::h6[contains(text(),'Photo Desk')])[1]",
    );
  }
  carbonTalkCopyDesk(): Locator {
    return this.page.locator(
      "((//mat-card-header/div[1]/mat-card-title[1]/a[1])[1]//following::h6[contains(text(),'Copy Desk')])[1]",
    );
  }
  carbonTalkHotseats(): Locator {
    return this.page.locator(
      "((//mat-card-header/div[1]/mat-card-title[1]/a[1])[1]//following::h6[contains(text(),'Hotseats')])[1]",
    );
  }
  carbonTalkCarbonTeam(): Locator {
    return this.page.locator(
      "((//mat-card-header/div[1]/mat-card-title[1]/a[1])[1]//following::h6[contains(text(),'Carbon Test- Do not use this Team')])[1]",
    );
  }

  carbonTalkCarbonTeamAssetPage(): Locator {
    return this.page.locator(
      "(//h6[contains(text(),'Carbon Test- Do not use this Team')])[1]",
    );
  }
  carbonTalkCopydeskAssetPage(): Locator {
    return this.page.locator("(//h6[contains(text(),'Copy Desk')])[1]");
  }
  carbonTalkPhotoDeskAssetPage(): Locator {
    return this.page.locator("(//h6[contains(text(),'Photo Desk')])[1]");
  }
  carbonTalkHotseatsAssetPage(): Locator {
    return this.page.locator("(//h6[contains(text(),'Hotseats')])[1]");
  }
  carbonTalkMoreThan1Task(): Locator {
    return this.page.locator(
      "//mat-expansion-panel-header[@role='button']//span[1]",
    );
  }

  StoryEditorCopy(): Locator {
    return this.page.locator("(//editor//mat-icon[text()='filter_none'])[1]");
  }
  StoryEditorCopyID(): Locator {
    return this.page.locator("(//*[contains(text(),' Copy ID ')])[1]");
  }
  sort(): Locator {
    return this.page.locator("//span[contains(text(),'Sort by')]");
  }
  sortByDueDateAsc(): Locator {
    return this.page.locator("(//*[contains(text(),'Due date')])[1]");
  }
  sortByDueDateDesc(): Locator {
    return this.page.locator("(//*[contains(text(),'Due date')])[2]");
  }
  sortByDueDateDescNew(): Locator {
    return this.page.locator("(//*[contains(text(),'Due date')])[3]");
  }
  sortByRequestDateAsc(): Locator {
    return this.page.locator("(//*[contains(text(),'Request date')])[2]");
  }
  sortByRequestDateDesc(): Locator {
    return this.page.locator("(//*[contains(text(),'Request date')])[3]");
  }
  CopyIDCarbonTalks1(): Locator {
    return this.page.locator("(//*[text()='filter_none'])[1]");
  }
  CopyIDCarbonTalks10(): Locator {
    return this.page.locator("(//*[text()='filter_none'])[10]");
  }
  firstAssetCarbonTalks(): Locator {
    return this.page.locator("(//*[@class='ng-star-inserted'])[1]");
  }
  subscriberAlertContainer(): Locator {
    return this.page.locator("//mat-dialog-container//*[@id='warning_modal']");
  }
  subscriberAlertHeader(): Locator {
    return this.page.locator(
      "//mat-dialog-container//*[@id='warning_modal']//h2",
    );
  }
  subscriberAlertPublish(): Locator {
    return this.page.locator(
      "//mat-dialog-container//*[@id='warning_modal']//button/span[contains(text(),'Publish')]",
    );
  }
  subscriberAlertCancel(): Locator {
    return this.page.locator(
      "//mat-dialog-container//*[@id='warning_modal']//button/span[contains(text(),'Cancel')]",
    );
  }

  usedInPopUp_assetId1(): Locator {
    return this.page.locator(
      "(//carbon-asset-dependencies//mat-icon[text()='filter_none'])[1]",
    );
  }
  usedInPopUp_assetheadline1(): Locator {
    return this.page.locator(
      "(//carbon-asset-dependencies//mat-card-title/a)[1]",
    );
  }
  usedInPopUp_header(): Locator {
    return this.page.locator("//carbon-asset-dependencies/h3");
  }
  usedInPopUp_close(): Locator {
    return this.page.locator(
      "//carbon-asset-dependencies//span[text()='Close']",
    );
  }

  unlockModal(): Locator {
    return this.page.locator("(//*[contains(text(),'Unlock')])[2]");
  }

  propill_HomePage(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-view')]  [ .//a[contains(normalize-space(.),'" +
        assetTitle +
        "')] ]    //span[contains(@class,'pill-pro') and normalize-space(.)='Pro']",
    );
  }
  clubpill_HomePage(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-view')]  [ .//a[contains(normalize-space(.),'" +
        assetTitle +
        "')] ]    //span[contains(@class,'pill-club') and normalize-space(.)='Club']",
    );
  }
  clubGoldpill_HomePage(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-view')]  [ .//a[contains(normalize-space(.),'" +
        assetTitle +
        "')] ]    //span[contains(@class,'pill-gold') and normalize-space(.)='Gold']",
    );
  }

  propill_RightRail(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-wrapper')]    [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]    //span[contains(@class,'pill-pro') and normalize-space(.)='Pro']",
    );
  }
  clubpill_RightRail(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-wrapper')]    [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]    //span[contains(@class,'pill-club') and normalize-space(.)='Club']",
    );
  }
  clubGoldpill_RightRail(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-wrapper')]    [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]    //span[contains(@class,'pill-gold') and normalize-space(.)='Gold']",
    );
  }

  propill_ContentLibrary(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-view')]\n" +
        "   [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]\n" +
        "   //span[contains(@class,'pill-pro') and normalize-space(.)='Pro']\n",
    );
  }
  clubpill_ContentLibrary(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-view')]\n" +
        "   [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]\n" +
        "   //span[contains(@class,'pill-club') and normalize-space(.)='Club']\n",
    );
  }

  clubGoldpill_ContentLibrary(assetTitle: string): Locator {
    return this.page.locator(
      "//div[contains(@class,'c-summary-view')]\n" +
        "   [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]\n" +
        "   //span[contains(@class,'pill-gold') and normalize-space(.)='Gold']\n",
    );
  }

  propill_GlobalSearch(assetTitle: string): Locator {
    return this.page.locator(
      "//mat-card\n" +
        "   [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]\n" +
        "   //span[contains(@class,'pill-pro') and normalize-space(.)='Pro']\n",
    );
  }
  clubpill_GlobalSearch(assetTitle: string): Locator {
    return this.page.locator(
      "//mat-card\n" +
        "   [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]\n" +
        "   //span[contains(@class,'pill-club') and normalize-space(.)='Club']\n",
    );
  }
  clubGoldpill_GlobalSearch(assetTitle: string): Locator {
    return this.page.locator(
      "//mat-card\n" +
        "   [ .//a[normalize-space(.)='" +
        assetTitle +
        "'] ]\n" +
        "   //span[contains(@class,'pill-gold') and normalize-space(.)='Gold']\n",
    );
  }

  proPill_RTEInline(): Locator {
    return this.page.locator("//span[contains(@class,'pill-pro')]");
  }
  clubPill_RTEInline(): Locator {
    return this.page.locator("//span[contains(@class,'pill-club')]");
  }
  goldPill_RTEInline(): Locator {
    return this.page.locator("//span[contains(@class,'pill-gold')]");
  }

  pill_HomePage(assetTitle: string, pillType: string): Locator {
    if (
      pillType.trim().toLowerCase() === "premium" ||
      pillType.trim().toLowerCase() === "pro"
    ) {
      return this.page.locator(
        `//div[contains(@class,'c-summary-view')]  [ .//a[contains(normalize-space(.),'${assetTitle}')] ]    //span[contains(@class,'pill-pro') and normalize-space(.)='Pro']`,
      );
    } else if (
      pillType.trim().toLowerCase() === "investing club" ||
      pillType.trim().toLowerCase() === "club"
    ) {
      return this.page.locator(
        `//div[contains(@class,'c-summary-view')]  [ .//a[contains(normalize-space(.),'${assetTitle}')] ]    //span[contains(@class,'pill-club') and normalize-space(.)='Club']`,
      );
    } else if (
      pillType.trim().toLowerCase() === "investing club gold" ||
      pillType.trim().toLowerCase() === "gold"
    ) {
      return this.page.locator(
        `//div[contains(@class,'c-summary-view')]  [ .//a[contains(normalize-space(.),'${assetTitle}')] ]    //span[contains(@class,'pill-gold') and normalize-space(.)='Gold']`,
      );
    }
    return this.page.locator("//not-a-real-locator");
  }

  pill_ContentLibrary(assetTitle: string, pillType: string): Locator {
    if (
      pillType.trim().toLowerCase() === "premium" ||
      pillType.trim().toLowerCase() === "pro"
    ) {
      return this.page.locator(
        `//div[contains(@class,'c-summary-view')]
   [ .//a[contains(normalize-space(.),'${assetTitle}')] ]
   //span[contains(@class,'pill-pro') and normalize-space(.)='Pro']
`,
      );
    } else if (
      pillType.trim().toLowerCase() === "investing club" ||
      pillType.trim().toLowerCase() === "club"
    ) {
      return this.page.locator(
        `//div[contains(@class,'c-summary-view')]
   [ .//a[contains(normalize-space(.),'${assetTitle}')] ]
   //span[contains(@class,'pill-club') and normalize-space(.)='Club']
`,
      );
    } else if (
      pillType.trim().toLowerCase() === "investing club gold" ||
      pillType.trim().toLowerCase() === "gold"
    ) {
      return this.page.locator(
        `//div[contains(@class,'c-summary-view')]
   [ .//a[contains(normalize-space(.),'${assetTitle}')] ]
   //span[contains(@class,'pill-gold') and normalize-space(.)='Gold']
`,
      );
    }

    return this.page.locator("//not-a-real-locator");
  }

  pill_GlobalSearch(assetTitle: string, pillType: string): Locator {
    if (
      pillType.trim().toLowerCase() === "premium" ||
      pillType.trim().toLowerCase() === "pro"
    ) {
      return this.page.locator(
        "//mat-card//span[contains(@class,'pill') and text()='Pro']",
      );
    } else if (
      pillType.trim().toLowerCase() === "investing club" ||
      pillType.trim().toLowerCase() === "club"
    ) {
      return this.page.locator(
        "//mat-card//span[contains(@class,'pill') and text()='Club']",
      );
    } else if (
      pillType.trim().toLowerCase() === "investing club gold" ||
      pillType.trim().toLowerCase() === "gold"
    ) {
      return this.page.locator(
        "//mat-card//span[contains(@class,'pill') and text()='Gold']",
      );
    }

    return this.page.locator("//not-a-real-locator");
  }

  pill_RTEInline(pillType: string): Locator {
    if (
      pillType.trim().toLowerCase() === "premium" ||
      pillType.trim().toLowerCase() === "pro"
    ) {
      return this.page.locator(
        "//div[@class='c-summary-row']//span[contains(@class,'pill-pro') and normalize-space(.)='Pro']",
      );
    } else if (
      pillType.trim().toLowerCase() === "investing club" ||
      pillType.trim().toLowerCase() === "club"
    ) {
      return this.page.locator(
        "//div[@class='c-summary-row']//span[contains(@class,'pill-club') and normalize-space(.)='Club']",
      );
    } else if (
      pillType.trim().toLowerCase() === "investing club gold" ||
      pillType.trim().toLowerCase() === "gold"
    ) {
      return this.page.locator(
        "//div[@class='c-summary-row']//span[contains(@class,'pill-gold') and normalize-space(.)='Gold']",
      );
    }

    return this.page.locator("//not-a-real-locator");
  }

  edtUsernameViper(): Locator {
    return this.page.locator("//input[@id='edit-name']");
  }
  edtPasswordViper(): Locator {
    return this.page.locator("//input[@id='edit-pass']");
  }
  btnLoginViper(): Locator {
    return this.page.locator("//input[@id='edit-submit']");
  }
  btnGenerateNarration(): Locator {
    return this.page.locator(
      "//button//span[contains(text(),'Generate Narration')]",
    );
  }
  btnGenerateNarrationDisabled(): Locator {
    return this.page.locator(
      "//span[@class='narration-prefix']//button[@disabled='true']",
    );
  }
  btnGenerateNarrationEnabled(): Locator {
    return this.page.locator(
      "//button[@class='mat-focus-indicator mat-tooltip-trigger mat-flat-button mat-button-base mat-primary']",
    );
  }
  audioPreviewPlayer(): Locator {
    return this.page.locator("//audio[contains(@src,'.mp3')]");
  }
  copyAudioAssetID(): Locator {
    return this.page.locator(
      "(//audio[contains(@src,'.mp3')]//following::button[@mattooltip='Copy ID']//mat-icon[text()='filter_none'])[1]",
    );
  }
  btnCloseAudioAsset(): Locator {
    return this.page.locator(
      "//*[@id='field_featuredAudio']//mat-icon[@role='img' and text()='close']",
    );
  }

  //Carbon Talk
  carbonTaskVideoImage(): Locator {
    return this.page.locator("//i[@class='icon icon-tasks']");
  }

  btnSaveNewConfig(): Locator {
    return this.page.locator("//span[@class='mat-button-wrapper' and contains(text(),'Save')]");
  }




}
