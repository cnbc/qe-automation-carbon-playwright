import {
  BasePage,
  WaitHelpers,
  BrowserActions,
  MouseActions,
} from "@cnbc/playwright-sdk";
import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  private readonly base: BasePage;

  constructor(private readonly page: Page) {
    this.base = new BasePage(page, "HomePage");
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
  Username(): Locator {
    return this.page.locator("//*[contains(@name,'name')]");
  }
  Password(): Locator {
    return this.page.locator("//*[contains(@name,'pass')]");
  }
  Submit(): Locator {
    return this.page.locator("//*[contains(@type,'submit')]");
  }
  Add(): Locator {
    return this.page.locator("//*[contains(@class,'icon-plus')]");
  }
  Carbon(): Locator {
    return this.page.locator("//*[contains(@title,'Carbon')]");
  }
  Plus(): Locator {
    return this.page.locator("//*[contains(@class,'icon-plus')]");
  }
  Story(): Locator {
    return this.page.locator("//span[text()='Story']");
  }
  Video(): Locator {
    return this.page.locator("//span[text()='Video']");
  }
  Listicle(): Locator {
    return this.page.locator("//span[text()='Listicle']");
  }
  Wildcard(): Locator {
    return this.page.locator("//span[text()='Wildcard']");
  }
  Author(): Locator {
    return this.page.locator("//span[text()='Author']");
  }
  Web_Resource(): Locator {
    return this.page.locator("//span[text()='Web Resource']");
  }
  profile(): Locator {
    return this.page.locator("//span[text()='Profile']");
  }
  team(): Locator {
    return this.page.locator("//span[contains(text(),'Team')]");
  }
  project(): Locator {
    return this.page.locator("//span[contains(text(),'Project')]");
  }
  event(): Locator {
    return this.page.locator("//span[contains(text(),'Event')]");
  }
  skin(): Locator {
    return this.page.locator("//span[contains(text(),'Skin')]");
  }
  file(): Locator {
    return this.page.locator("//span[text()='File']");
  }
  editorialfile(): Locator {
    return this.page.locator("//span[contains(text(),'Editorial File')]");
  }
  Source(): Locator {
    return this.page.locator("//span[contains(text(),'Source')]");
  }
  creditcard(): Locator {
    return this.page.locator("//span[contains(text(),'Product')]");
  }
  section(): Locator {
    return this.page.locator("//span[contains(text(),'Section')]");
  }
  colelction(): Locator {
    return this.page.locator("//span[contains(text(),'Collection')]");
  }
  Live_Story(): Locator {
    return this.page.locator("//span[contains(text(),'Live Story')]");
  }
  jsonContent(): Locator {
    return this.page.locator("//pre");
  }
  MoreOps(): Locator {
    return this.page.locator("(//*[@mattooltip='More Options'])[1]");
  }
  Edit_Template(): Locator {
    return this.page.locator("(//*[text()='Edit template'])[1]");
  }
  mainSearch_Textfield(): Locator {
    return this.page.locator("//div[@id='app_shell_search_field']//input");
  } //*[@formcontrolname='q']
  edit_Link(): Locator {
    return this.page.locator("//a[contains(text(),'Edit')]");
  } //(//a[@mattooltip='Edit']//*[text()='launch'])[1]
  moreOption_ContentLibsearch(): Locator {
    return this.page.locator(
      "(//summary-context-menu//following::*[contains(@mattooltip,'More Options')])[5]",
    );
  }
  createFromTemplate_Mainsearch(): Locator {
    return this.page.locator("//a[contains(text(),'Create from Template')]");
  }
  createFromTemplate_ContentLib(): Locator {
    return this.page.locator(
      "(//*[@mattooltip='Create from this Template']//following::*[contains(text(),'file_copy')])[5]",
    );
  }
  viewInReadOnly_Link(): Locator {
    return this.page.locator("//*[contains(text(),'View in read-only')]");
  }
  history_Icon(): Locator {
    return this.page.locator(
      "//div[@class='c-sticky-tab-wrapper']//mat-icon[text()='history']",
    );
  }
  search_Content_Icon(): Locator {
    return this.page.locator(
      "//*[contains(@class,'c-nav-icon icon icon-search')]",
    );
  }
  search_Content_Textfield(): Locator {
    return this.page.locator(
      "//*[contains(@placeholder,'Type to search for content')]",
    );
  }
  dashboardThumbnail(): Locator {
    return this.page.locator("//dashboard-view//img");
  }
  refresh_Icon(): Locator {
    return this.page.locator("//*[contains(@class,'icon icon-refresh')]");
  }
  myBookmarks_Tab(): Locator {
    return this.page.locator("//li[contains(text(),'My Bookmarks')]");
  }
  home_Icon(): Locator {
    return this.page.locator("//mat-icon[text()='home']");
  }

  globalsearch(): Locator {
    return this.page.locator("//*[contains(@class,'search-term')]/input");
  }
  moreoptions(): Locator {
    return this.page.locator(
      "//*[contains(@class,'c-results-body')]//*[@mattooltip='More Options']",
    );
  }
  edittemplate(): Locator {
    return this.page.locator("//*[text()='Edit template']");
  }
  mediaLibrary_Link(): Locator {
    return this.page.locator("//a[contains(@href,'/dashboard/media')]");
  }
  videomanagement_Link(): Locator {
    return this.page.locator(
      "//a[contains(@href,'/dashboard/video-management')]",
    );
  }
  multiplePhoto_Link(): Locator {
    return this.page.locator("//*[contains(text(),'Multiple Photo')]");
  }
  moreOption1_MediaLink(): Locator {
    return this.page.locator(
      "(//image-container//span//i[contains(@mattooltip,'More Options')])[1]",
    );
  }
  viewReadOnly_MediaLink(): Locator {
    return this.page.locator("//*[contains(text(),'View in read-only')]");
  }

  UploadDropDown(): Locator {
    return this.page.locator("//*[@class='uploader-main-button']");
  }

  moreOptions_edit(): Locator {
    return this.page.locator("//button//a[text()='Edit']");
  }

  edtMainSearch(): Locator {
    return this.page.locator("//div[@id='app_shell_search_field']//input");
  } //input[@type='text']

  mainSearchEdit(): Locator {
    return this.page.locator("//a[contains(text(),'Edit')]");
  }

  moreOption_History(text: string): Locator {
    return this.page.locator(
      "(//history[@summarytype='side']//following::*[contains(text(),'" +
        text +
        "')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  title_History(): Locator {
    return this.page.locator(
      "(//*[text()='History']//following::app-smart-link[@class='ng-star-inserted']//a[contains(@href,'/dashboard')])",
    );
  }
  title_historyinbodyRTE(): Locator {
    return this.page.locator(
      "(//mat-option//following::relation-view[5]//following::span)[1]",
    );
  }

  moreOption_Bookmarks(text: string): Locator {
    return this.page.locator(
      "(//favorites[@contenttype='favorite']//following::*[contains(text(),'" +
        text +
        "')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  moreOption_Template(text: string): Locator {
    return this.page.locator(
      "(//favorites[@contenttype='contemplate']//following::*[contains(text(),'" +
        text +
        "')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  moreOption_DashboardHistory(text: string): Locator {
    return this.page.locator(
      "(//b[contains(text(),'My History')]//following::a[contains(text(),'" +
        text +
        "')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  moreOption_DashboardTemplate(text: string): Locator {
    return this.page.locator(
      "(//b[contains(text(),'My Templates')]//following::a[contains(text(),'" +
        text +
        "')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  moreOption_DashboardBookmarks(text: string): Locator {
    return this.page.locator(
      "(//b[contains(text(),'My Bookmarks')]//following::a[contains(text(),'" +
        text +
        "')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  moreOption_MediaLibraryBookmarks(text: string): Locator {
    return this.page.locator(
      "(//div[@id='carbon-media-card']//h4[contains(text(),'" +
        text +
        "')]//following::button[@mattooltip='More Options'])[1]",
    );
  }

  verifyAsset_MyHistory(text: string): Locator {
    return this.page.locator(
      "//b[contains(text(),'My History')]//following::a[contains(text(),'" +
        text +
        "')][1]",
    );
  }

  bookmarkIcon_MyHistory(text: string): Locator {
    return this.page.locator(
      "(//b[contains(text(),'My History')]//following::a[contains(text(),'" +
        text +
        "')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  lnkAddToBookMarks(): Locator {
    return this.page.locator("//*[contains(text(),'Add to Bookmarks')]");
  }
  lnkRemoveFromBookMarks(): Locator {
    return this.page.locator("//*[contains(text(),'Remove from Bookmarks')]");
  }

  moreOption(text: string): Locator {
    return this.page.locator(
      "(//a[contains(text(),'" +
        text +
        "')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  moreOptionCopyFunctionality(): Locator {
    return this.page.locator(
      "(//a[contains(text(),'S&P 500 trade in the year')]//following::*[contains(text(),'more_vert')])[1]",
    );
  }

  bookmarkIcon(text: string): Locator {
    return this.page.locator(
      "(//a[contains(text(),'" +
        text +
        "')]//following::*[contains(@class,'icon icon-bookmark')])[1]",
    );
  }

  bookmarkIcon_MyBookmarks(text: string): Locator {
    return this.page.locator(
      "(//b[contains(text(),'My Bookmarks')]//following::a[contains(text(),'" +
        text +
        "')]//following::*[contains(@class,'icon icon-bookmark')])[1]",
    );
  }

  verifyAsset_MyBookmarks(text: string): Locator {
    return this.page.locator(
      "//*[contains(text(),'My Bookmarks')]//following::a[contains(text(),'" +
        text +
        "')][1]",
    );
  }

  moreOption_Mainsearch(): Locator {
    return this.page.locator(
      "//mat-option[@role='option']//following::mat-icon[text()='more_vert']",
    );
  }

  btnPersonImg(): Locator {
    return this.page.locator(
      "//button[@aria-haspopup='menu']//mat-icon[text()='person']",
    );
  }
  lnkMyProfile(): Locator {
    return this.page.locator("//a[contains(@href,'user-profile')]");
  }
  btnUploadProfilePhoto(): Locator {
    return this.page.locator("//div[contains(text(),'Upload Profile Photo')]");
  }
  txtFieldAuthor(): Locator {
    return this.page.locator("//*[@id='field_author']//input");
  }
  txtFieldTeam(): Locator {
    return this.page.locator("//*[@id='field_team']//input");
  }
  txtFieldSection(): Locator {
    return this.page.locator("//*[@id='field_section']//input");
  }
  txtFieldSource(): Locator {
    return this.page.locator("//*[@id='field_source']//input");
  }
  txtFieldBrands(): Locator {
    return this.page.locator("//*[@id='field_brands']//span[text()='CNBC']");
  }
  btnSaveChanges(): Locator {
    return this.page.locator("//button//span[text()='Save Changes']");
  }
}
