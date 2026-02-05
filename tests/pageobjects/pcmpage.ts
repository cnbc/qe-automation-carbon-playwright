import {
  BasePage,
  WaitHelpers,
  BrowserActions,
  MouseActions,
} from "@cnbc/playwright-sdk";
import { expect, type Locator, type Page } from "@playwright/test";

export class PCMPage {
  private readonly base: BasePage;

  constructor(private readonly page: Page) {
    this.base = new BasePage(page, "PCMPage");
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

  heroModulePin(arg: string): Locator {
    return this.page.locator("//img[@id='actionPin_1_0_" + arg + "']");
  }
  heroModuleInsert(arg: string): Locator {
    return this.page.locator("(//button[@id='insertBtn_1_0__" + arg + "'])[1]");
  }
  heroModuleEdit(arg: string): Locator {
    return this.page.locator(
      "//span[@id='actionPanel_Pencil_1_0_" + arg + "']",
    );
  }
  heroModuleContent(arg: string): Locator {
    return this.page.locator("//span[@id='content_1_0_" + arg + "']");
  }
  heroModuleMoreMenu(arg: string): Locator {
    return this.page.locator(
      "//*[@id='module_1']//*[@id='story_1_0_" +
        arg +
        "']//i[text()='more_vert']",
    );
  }
  moreMenuOptions(arg: string): Locator {
    return this.page.locator("//li[text()='" + arg + "']");
  }

  heroModuleLineItems(arg: string): Locator {
    return this.page.locator(
      "//*[@id='module_1']//*[@id='story_1_0_" + arg + "']",
    );
  }
  heroModuleStoryTitle(arg: string): Locator {
    return this.page.locator(
      "//*[@id='module_1']//*[@id='content_1_0_" + arg + "']",
    ); // Updated to correct the module ID
  }

  //River Module
  riverModulePin(arg: string): Locator {
    return this.page.locator("//img[@id='actionPin_3_0_" + arg + "']");
  }
  riverModuleInsert(arg: string): Locator {
    return this.page.locator("(//button[@id='insertBtn_3_0__" + arg + "'])[1]");
  }
  riverModuleEdit(arg: string): Locator {
    return this.page.locator(
      "//span[@id='actionPanel_Pencil_3_0_" + arg + "']",
    );
  }
  riverModuleMoreMenu(arg: string): Locator {
    return this.page.locator(
      "//*[@id='module_3']//*[@id='story_3_0_" +
        arg +
        "']//i[text()='more_vert']",
    );
  }

  riverModuleLineItems(arg: string): Locator {
    return this.page.locator(
      "//*[@id='module_3']//*[@id='story_3_0_" + arg + "']",
    );
  }
  riverModuleStoryTitle(arg: string): Locator {
    return this.page.locator(
      "//*[@id='module_3']//*[@id='content_3_0_" + arg + "']",
    );
  }

  //Zone titles
  zoneTitleStoriesCount(arg: string): Locator {
    return this.page.locator(
      "(//*[@class='zone_title' and @id='topicTown_heading_" +
        arg +
        "']//span)[1]",
    );
  }
  zoneTitleText(arg: string): Locator {
    return this.page.locator(
      "(//*[@class='zone_title' and @id='topicTown_heading_" +
        arg +
        "']//span)[2]",
    );
  }

  zoneSectionEdit(arg: string): Locator {
    return this.page.locator(
      "//*[@class='zone_title' and @id='topicTown_heading_" +
        arg +
        "']//following-sibling::div[@class='editLink']",
    );
  }
  zoneSectionExpand(arg: string): Locator {
    return this.page.locator(
      "//*[@class='zone_title' and @id='topicTown_heading_" +
        arg +
        "']//following-sibling::span[@class='arrowBtns']",
    );
  }

  zoneSectionMoreMenu(arg: string): Locator {
    return this.page.locator(
      "//*[@class='zone_title' and @id='topicTown_heading_" +
        arg +
        "']//following-sibling::div//span[@id='moduleEllipsis_tt']",
    );
  }

  livePageLink(): Locator {
    return this.page.locator("//a[@title='Go to Live Page']//span[@id='link']");
  }

  editorialCurationRadiobtn(): Locator {
    return this.page.locator("//input[@id='type_0']");
  }
  automatedCurationRadiobtn(): Locator {
    return this.page.locator("//input[@id='type_1']");
  }
  virtualCurationRadiobtn(): Locator {
    return this.page.locator("//input[@id='type_2']");
  }
  editorialCurationChecked(): Locator {
    return this.page.locator(
      "//input[@id='type_0']//following-sibling::div[contains(@class,'checked')]",
    );
  }
  automatedCurationChecked(): Locator {
    return this.page.locator(
      "//input[@id='type_1']//following-sibling::div[contains(@class,'checked')]",
    );
  }
  virtualCurationChecked(): Locator {
    return this.page.locator(
      "//input[@id='type_2']//following-sibling::div[contains(@class,'checked')]",
    );
  }
  curationSettingsCancelBtn(): Locator {
    return this.page.locator("//button//span[text()='CANCEL']");
  }
  curationSettingsSaveBtn(): Locator {
    return this.page.locator("//button//span[text()='SAVE']");
  }
  btnVirtualCurationYes(): Locator {
    return this.page.locator("//button[@id='editConfirmYes']");
  }
  lockIcon(): Locator {
    return this.page.locator("//span[@class='lockIcon']");
  }
  pcmPromoImage(): Locator {
    return this.page.locator("//img[@alt='promoImage']");
  }
  pcmModuleHeaderAddButton(): Locator {
    return this.page.locator("//button[contains(@class,'modHeaderInsertBtn')]");
  }

  //Automated Curation Elements
  chkNewsStory(): Locator {
    return this.page.locator("//input[@id='asset_0']");
  }
  chkBrand(): Locator {
    return this.page.locator("//input[@id='brand_0']");
  }
  lstCondition(): Locator {
    return this.page.locator("//div[@id='rowSearchIs0']");
  }
  lstConditionValue(value: string): Locator {
    return this.page.locator("//li[@data-value='" + value + "']");
  }
  lstAssociation(): Locator {
    return this.page.locator("//div[@id='rowSearchSection0']");
  }
  txtSearchBox(): Locator {
    return this.page.locator("//input[@class='react-autosuggest__input']");
  }
  btnClicktoAddContent(): Locator {
    return this.page.locator("//button[@id='addNewBtnCol']");
  }
  txtEnterIDorLink(): Locator {
    return this.page.locator("//input[@placeholder='Enter id or link']");
  }
  firstStoryInserted(): Locator {
    return this.page.locator("//div[@id='storyHeader_0_0_0']");
  }
  secondStoryInserted(): Locator {
    return this.page.locator("//div[@id='storyHeader_0_0_1']");
  }
  insertStorySearchBtn(): Locator {
    return this.page.locator("//i[@id='searchBrkBtn']");
  }

  phxSectionTitle(value: string): Locator {
    return this.page.locator(
      "//h1[@class='PageHeaderWithTuneInText-title' and text()='" +
        value +
        "']",
    );
  }
  phxSectionSubTitle(value: string): Locator {
    return this.page.locator(
      "//h1[@class='PageHeader-title' and text()='" + value + "']",
    );
  }

  hpRefreshButton(): Locator {
    return this.page.locator(
      "//button[@id='breakingNewsConfirmBtn']//span[text()='REFRESH']",
    );
  }
  hpYesButton(): Locator {
    return this.page.locator(
      "//button[@id='confirmButton']//span[text()='Yes']",
    );
  }
  breakingNewsYesButton(): Locator {
    return this.page.locator(
      "//button[@id='breakingNewsConfirmBtn']//span[text()='Yes']",
    );
  }

  hpRefreshORYesButton(): Locator {
    return this.page.locator(
      "//button[@id='breakingNewsConfirmBtn']//span[text()='REFRESH'] or //button[@id='confirmButton']//span[text()='Yes']",
    );
  }
  phxSectionTitleMobileNative(): Locator {
    return this.page.locator("(//a[@class='Card-title'])[1]");
  }
  pcmToolbarOptions(value: string): Locator {
    return this.page.locator("//li[contains(text(),'" + value + "')]");
  }

  pcmHPstoryEllipsis(): Locator {
    return this.page.locator("//span[@id='storyEllipsis']");
  }
  pcmHPstoryEllipsisDynamic(value: string): Locator {
    return this.page.locator("(//span[@id='storyEllipsis'])[" + value + "]");
  }
  btnRestore(): Locator {
    return this.page.locator(
      "//button[@id='confirmButton']//span[text()='RESTORE']",
    );
  }
  lblEdited(): Locator {
    return this.page.locator("//span[@id='edit_1_0_0' and @class='edited']");
  }
  firstRiverStoryinPHX(): Locator {
    return this.page.locator("(//div[@class='SecondaryCard-headline'])[1]");
  }

  heroStoriesList(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_1_0_" + value + "')]",
    );
  }
  heroStoriesStatus(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_1_0_" +
        value +
        "')]//span[@class='P_status']",
    );
  }
  heroStoriesAssetType(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_1_0_" +
        value +
        "')]//span[@class='sty_info_tip']",
    );
  }

  //river stories for INTL homepage
  riverStoriesListINTL(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_2_0_" + value + "')]",
    );
  }
  riverStoriesStatusINTL(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_2_0_" +
        value +
        "')]//span[@class='P_status']",
    );
  }

  riverStoriesAssetTypeINTL(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_2_0_" +
        value +
        "')]//span[@class='sty_info_tip']",
    );
  }

  //river stories for US homepage
  riverStoriesListUS(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_3_0_" + value + "')]",
    );
  }
  riverStoriesStatusUS(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_3_0_" +
        value +
        "')]//span[@class='P_status']",
    );
  }

  riverStoriesAssetTypeUS(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_3_0_" +
        value +
        "')]//span[@class='sty_info_tip']",
    );
  }
  riverStoriesUsageRuleUS(value: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'storyHeader_3_0_" + value + "')]//span[@class='PRO']",
    );
  }
}
