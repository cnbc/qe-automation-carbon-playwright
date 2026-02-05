import {
  BasePage,
  WaitHelpers,
  BrowserActions,
  MouseActions,
} from "@cnbc/playwright-sdk";
import { expect, type Locator, type Page } from "@playwright/test";

export class SectionPage {
  private readonly base: BasePage;

  constructor(private readonly page: Page) {
    this.base = new BasePage(page, "SectionPage");
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

  lnkUnlockSectionInPCM(): Locator {
    return this.page.locator("//span[@class='unlock']");
  }
  lnkunlockSectionYesInPCM(): Locator {
    return this.page.locator(
      "//span[@class='MuiButton-label' and text()='Yes']",
    );
  }

  actionbutton_subitems(): Locator {
    return this.page.locator("//button[@role='menuitem']");
  }

  previewlive_url(): Locator {
    return this.page.locator("//*[@class='icon icon-eye2']");
  }

  section_buckets(): Locator {
    return this.page.locator("//span[@id='moduleHeaderCustLbl']");
  }

  collection_OPList(): Locator {
    return this.page.locator(
      "//span[@id='moduleHeaderCustLbl' and text()='output list']",
    );
  }
  collection_Primary(): Locator {
    return this.page.locator(
      "//span[@id='moduleHeaderCustLbl' and text()='primary']",
    );
  }
  collection_Related(): Locator {
    return this.page.locator(
      "//span[@id='moduleHeaderCustLbl' and text()='related']",
    );
  }
  collection_More(): Locator {
    return this.page.locator(
      "//span[@id='moduleHeaderCustLbl' and text()='more']",
    );
  }
  Curation_Settings(): Locator {
    return this.page.locator("//li[contains(text(),'Curation Settings')]");
  }
  section_Setup(): Locator {
    return this.page.locator("//li[contains(text(),'Section Setup')]");
  }
  Curation_Automated(): Locator {
    return this.page.locator("//input[@id='type_1']");
  }
  Curation_NewsStory(): Locator {
    return this.page.locator("//input[@id='asset_0']");
  }
  Curation_Video(): Locator {
    return this.page.locator("//input[@id='asset_3']");
  }
  Curation_BrandCNBC(): Locator {
    return this.page.locator("//input[@id='brand_0']");
  }
  Curation_edtSelectCondition(): Locator {
    return this.page.locator("//div[contains(text(),'Select Condition')]");
  }
  Curation_OR(): Locator {
    return this.page.locator("//li[text()='OR']");
  }
  Curation_AND(): Locator {
    return this.page.locator("//li[text()='AND']");
  }
  Curation_NOT(): Locator {
    return this.page.locator("//li[text()='NOT']");
  }
  Curation_edtSelectAssociation(): Locator {
    return this.page.locator("//div[contains(text(),'Select Association')]");
  }
  Curation_Section(): Locator {
    return this.page.locator("//li[text()='SECTION']");
  }
  Curation_UsageRule(): Locator {
    return this.page.locator("//li[text()='USAGE RULE']");
  }
  Curation_Source(): Locator {
    return this.page.locator("//li[text()='SOURCE']");
  }
  Curation_typetoSelectSection(): Locator {
    return this.page.locator("//input[@placeholder='Type to select Section']");
  }
  Curation_PlusIcon(): Locator {
    return this.page.locator("//i[@class='la la-plus']");
  }
  Curation_PlusIcon2(): Locator {
    return this.page.locator("(//i[@class='la la-plus'])[2]");
  }
  Curation_Save(): Locator {
    return this.page.locator("//span[contains(text(),'SAVE')]");
  }

  PCMUI_setting(): Locator {
    return this.page.locator("//*[@title='Settings']//button");
  }

  PCMUI_preview(): Locator {
    return this.page.locator("//*[@title='Preview']//button");
  }

  PCMUI_livelink(): Locator {
    return this.page.locator("//*[@title='Live Link']//button");
  }

  PCMUI_copy(): Locator {
    return this.page.locator("//*[@title='Copy']//button");
  }

  PCMUI_addtobookmarks(): Locator {
    return this.page.locator("//button[@title='Add to Bookmarks']");
  }
  PCMUI_RemoveFrombookmarks(): Locator {
    return this.page.locator("//button[@title='Remove from Bookmarks']");
  }

  PCMUI_info(): Locator {
    return this.page.locator("//button[@title='Info']");
  }

  PCMUI_setting_sublinks(): Locator {
    return this.page.locator("(//*[@id='topMenuDDItem'])");
  }

  PCMUI_infoupdated(): Locator {
    return this.page.locator("//span[text()='Updated']");
  }

  PCMUI_infofirstpublished(): Locator {
    return this.page.locator("//span[text()='First Published']");
  }

  PCMUI_infocreated(): Locator {
    return this.page.locator("//span[text()='Created']");
  }

  thumbnail_button(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-icon-button mat-primary')])[1]",
    );
  }

  featuredmedia_button(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-icon-button mat-primary')])[2]",
    );
  }

  sectionlogo_button(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-icon-button mat-primary')])[3]",
    );
  }

  sectionheader_button(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'mat-icon-button mat-primary')])[4]",
    );
  }

  uploadimage(): Locator {
    return this.page.locator("(//input[@accept='image/*'])[1]");
  }

  resettodefault(): Locator {
    return this.page.locator("(//*[@ngbtooltip='Reset to defaults'])[2]");
  }

  editHeadline(): Locator {
    return this.page.locator("(//*[@title='Edit Headline'])[1]");
  }
  firstAssetInHero(): Locator {
    return this.page.locator("//*[@id='story_1_0_0']");
  }

  editHeadlinePackaged(): Locator {
    return this.page.locator("(//*[@id='actionPanel_Pencil_1_0_1'])[1]");
  }

  headlineTextBoxclear(): Locator {
    return this.page.locator("//*[@class='react_inline_textarea_editing']");
  }

  headlineTextBox(): Locator {
    return this.page.locator("//*[@class='item_content_Edit']");
  }

  confirmHeadline(): Locator {
    return this.page.locator("//*[@id='storyEditButtons_Save']");
  }

  featuredTitle(): Locator {
    return this.page.locator("(//a[contains(text(),'AutoTest')])[1]");
  }

  headlineLP(): Locator {
    return this.page.locator("//*[@id='content_1_0_0']");
  }

  pin1(): Locator {
    return this.page.locator("//*[@id='actionPin_1_0_0']");
  }

  insert1(): Locator {
    return this.page.locator(
      "(//*[contains(@class,'inser_Hoverbutton')]//button[contains(@id,'insertBtn')])[1]",
    );
  }

  searchbox(): Locator {
    return this.page.locator("//*[@id='searchText']");
  }

  insertTop1(): Locator {
    return this.page.locator("//*[@id='modalFooter_Confirm']");
  }

  revert(): Locator {
    return this.page.locator("(//*[text()='Revert'])[1]");
  }

  revertConfirm(): Locator {
    return this.page.locator("(//*[text()='Revert'])[2]");
  }

  contenStoryTitle(): Locator {
    return this.page.locator("//div[@class='item_content']");
  }

  contentheadRiverPreview(): Locator {
    return this.page.locator(
      "//div[contains(@id,'Homepage-riverPlus') and not(@class='NativeRiver-container')]//div[contains(@class,'RiverHeadline-headline')]/a",
    );
  }

  imageupload_DateTime(arg: string): Locator {
    return this.page.locator(
      "(//*[@class='c-asset-date' and contains(text(),'" + arg + "')])[2]",
    );
  }

  addcontents(): Locator {
    return this.page.locator("//*[contains(@id,'addNewBtnCol')]");
  }
  btnAddOutputlist(): Locator {
    return this.page.locator("//button[contains(@class,'modHeaderInsertBtn')]");
  }

  PCMbuckets(): Locator {
    return this.page.locator("(//i[contains(text(),'expand_more')])[2]");
  }
  PCMbucketsNew(position: string): Locator {
    return this.page.locator("//*[@id='dropDown_" + position + "']");
  }
  primary_Story(): Locator {
    return this.page.locator("//span[@id='story_1_0_0_date']");
  }
  related_Story(): Locator {
    return this.page.locator("//span[@id='story_2_0_0_date']");
  }
  more_Story(): Locator {
    return this.page.locator("//span[@id='story_3_0_0_date']");
  }

  addcontentsHP(): Locator {
    return this.page.locator("(//*[contains(@id,'insertBtn_1_0__0')])[1]");
  }

  insertcontent_input(): Locator {
    return this.page.locator("//input[contains(@id,'searchText')]");
  }

  Hpinsertcontent_input(): Locator {
    return this.page.locator("//*[@id='searchText']");
  }

  insert_button(): Locator {
    return this.page.locator(
      "//button[contains(@id,'modalFooter_Confirm_breaking')]//span[text()='INSERT']",
    );
  }
  replace_button(): Locator {
    return this.page.locator(
      "//button[contains(@id,'modalFooter_Confirm')]//span[text()='REPLACE']",
    );
  }

  username(): Locator {
    return this.page.locator("//*[contains(@class,'userNameBreaking')]");
  }

  updated_info(): Locator {
    return this.page.locator("//*[contains(@id,'updatedInfo')]");
  }

  firstpublish_info(): Locator {
    return this.page.locator("//*[contains(@id,'firstPubInfo')]");
  }

  created_info(): Locator {
    return this.page.locator("//*[contains(@id,'createdInfo')]");
  }

  versions_info(): Locator {
    return this.page.locator("//*[contains(@class,'c-revision')]//div//span");
  }

  versions_status(): Locator {
    return this.page.locator("//*[contains(@class,'c-revision')]//b");
  }

  PCMUI_versions_info(): Locator {
    return this.page.locator(
      "//*[contains(@id,'historyInfo')]//*[contains(@id,'updatedInfo')]",
    );
  }

  PCMUI_versions_status(): Locator {
    return this.page.locator(
      "//*[contains(@id,'historyInfo')]//*[contains(@id,'stateHistory')]",
    );
  }

  PCMUI_plus_button(): Locator {
    return this.page.locator("//button[contains(@class,'modHeaderInsertBtn')]");
  }

  insert_top1(): Locator {
    return this.page.locator("(//button[contains(@id,'insertBtn_0_0__0')])[1]");
  }

  insert_top2(): Locator {
    return this.page.locator("(//button[contains(@id,'insertBtn_0_0__0')])[2]");
  }

  insert_bottom1(): Locator {
    return this.page.locator("(//button[contains(@id,'insertBtn_0_0__0')])[2]");
  }

  insert_bottom2(): Locator {
    return this.page.locator("(//button[contains(@id,'insertBtn_0_0__1')])[1]");
  }

  pin_section(): Locator {
    return this.page.locator("//*[contains(@id,'actionPin')]");
  }

  PCMUI_pin(position: string): Locator {
    return this.page.locator(
      "(//*[contains(@id,'actionPin')])[" + position + "]",
    );
  }
  PCMUI_Unpin(position: string): Locator {
    return this.page.locator(
      "//*[contains(@id,'actionPinPromo_0_0_" +
        position +
        "') and @title='Unpin Story']",
    );
  }

  PCMUI_promote2(): Locator {
    return this.page.locator("(//*[contains(@id,'actionPromotePinned')])[2]");
  }

  PCMUI_storyOverflowMenu(): Locator {
    return this.page.locator("(//*[contains(@id,'storyEllipsis')])[2]");
  }
  PCMUI_storyOverflowMenu1st(): Locator {
    return this.page.locator("(//*[contains(@id,'storyEllipsis')])[1]");
  }

  PCMUI_Remove(): Locator {
    return this.page.locator("//*[contains(text(),'Remove')]");
  }

  PCMUI_Replace(): Locator {
    return this.page.locator("//*[contains(text(),'Replace')]");
  }

  PCMUI_EditInCarbon(): Locator {
    return this.page.locator("//*[contains(text(),'Edit in Carbon')]");
  }
  PCMUI_moremenuOptions(option: string): Locator {
    return this.page.locator("//li[text()='" + option + "']");
  }

  PCMUI_ViewInCarbon(): Locator {
    return this.page.locator("//*[contains(text(),'View in Carbon')]");
  }
  PCMUI_OpenLivePage(): Locator {
    return this.page.locator("//*[contains(text(),'Open live page')]");
  }

  PCMUI_RemoveConfirmation(): Locator {
    return this.page.locator("//span[contains(text(),'REMOVE')]");
  }

  insertcontent_radio1(): Locator {
    return this.page.locator("(//input[contains(@name,'storyRadio')])[1]");
  }

  insertcontent_radio2(): Locator {
    return this.page.locator("(//input[contains(@name,'storyRadio')])[2]");
  }

  insertcontent_radio3(): Locator {
    return this.page.locator("(//input[contains(@name,'storyRadio')])[3]");
  }

  insertcontent_radio4(): Locator {
    return this.page.locator("(//input[contains(@name,'storyRadio')])[4]");
  }

  insertcontent_radio5(): Locator {
    return this.page.locator("(//input[contains(@name,'storyRadio')])[5]");
  }

  infoheads(): Locator {
    return this.page.locator("//*[contains(@id,'infoHead')]");
  }

  contentheads(): Locator {
    return this.page.locator("//div[@class='item_content']");
  }
  contentheadsTitle(): Locator {
    return this.page.locator("//span[@class='wrap-2-line']");
  }

  PCMUI_copyID(): Locator {
    return this.page.locator("//*[text()='Copy ID']");
  }

  PCMUI_copyliveurl(): Locator {
    return this.page.locator("//*[text()='Copy Live URL']");
  }

  PCMUI_copytoclipboard(): Locator {
    return this.page.locator("//*[@id='copyIDInfoTop']");
  }

  PCMUI_promote(): Locator {
    return this.page.locator("(//*[@title='Promote'])[1]");
  }

  PCMUI_unpromote(): Locator {
    return this.page.locator("(//*[@title='Unpromote'])[1]");
  }

  PCMUI_save(): Locator {
    return this.page.locator("//*[contains(@id,'saveSectionBtn')]");
  }

  PCMUI_publish(): Locator {
    return this.page.locator(
      "//button[@id='pubSectionBtn']//span[contains(text(),'Publish')]",
    );
  }

  PCMUI_message(arg: string): Locator {
    return this.page.locator(
      "//*[contains(@class,'message') and contains(text(),'" + arg + "')]",
    );
  }

  PCMUI_storybody1(): Locator {
    return this.page.locator("(//*[contains(@class,'wrap-2-line')])[1]");
  }

  PCMUI_storybody2(): Locator {
    return this.page.locator("(//*[contains(@class,'wrap-2-line')])[2]");
  }

  navigation_buckets(): Locator {
    return this.page.locator(
      "(//input[contains(@id,'mat-chip-list-input')])[6]",
    );
  }

  carousel_buckets(): Locator {
    return this.page.locator(
      "(//input[contains(@id,'mat-chip-list-input')])[7]",
    );
  }

  socialtools_buckets(): Locator {
    return this.page.locator(
      "(//input[contains(@id,'mat-chip-list-input')])[8]",
    );
  }

  people_buckets(): Locator {
    return this.page.locator(
      "(//input[contains(@id,'mat-chip-list-input')])[9]",
    );
  }

  editors_buckets(): Locator {
    return this.page.locator(
      "(//input[contains(@id,'mat-chip-list-input')])[10]",
    );
  }

  source_buckets(): Locator {
    return this.page.locator(
      "(//input[contains(@id,'mat-chip-list-input')])[11]",
    );
  }

  buckets_firstitem(): Locator {
    return this.page.locator(
      "(//span[contains(@class,'c-title c-nolink ng-star-inserted')])[1]",
    );
  }

  HpSignIn(): Locator {
    return this.page.locator("//*[text()='Sign In']");
  }

  confirmButton(): Locator {
    return this.page.locator("//*[@id='confirmButton']");
  }

  HPUI_storybody1(): Locator {
    return this.page.locator("(//*[contains(@class,'item_body')])[1]");
  }

  HPUI_storybody2(): Locator {
    return this.page.locator("(//*[contains(@class,'item_body')])[2]");
  }

  HPUI_save(): Locator {
    return this.page.locator("(//*[text()='Save'])[1]");
  }

  HPUI_publish(): Locator {
    return this.page.locator("(//*[text()='Publish'])[1]");
  }

  HeroModule(): Locator {
    return this.page.locator("//*[text()='hero']");
  }

  River20(): Locator {
    return this.page.locator(
      "(//*[@id='module_3']//*[@aria-roledescription='Draggable item. Press space bar to lift'])[20]",
    );
  }

  River19(): Locator {
    return this.page.locator(
      "(//*[@id='module_3']//*[@aria-roledescription='Draggable item. Press space bar to lift'])[19]",
    );
  }

  HpContentHeads(): Locator {
    return this.page.locator(
      "//*[contains(@class,'item_content')]//span[contains(@id,'content')]",
    );
  }
  HpunpinStory(): Locator {
    return this.page.locator("//img[@title='Unpin Story']");
  }

  Hero1(): Locator {
    return this.page.locator("//*[@id='story_1_0_0']");
  }

  colourFirstAsset(): Locator {
    return this.page.locator("//*[@class='FeaturedCard-packagedCardTitle']");
  }

  WebFrame(): Locator {
    return this.page.locator("//*[@id='previewFrame']");
  }

  Hp_storyOverflowMenu(): Locator {
    return this.page.locator("(//*[@id='storyEllipsis'])[1]");
  }

  Hp_Replace(): Locator {
    return this.page.locator("(//*[text()='Replace'])[1]");
  }

  Replace_button(): Locator {
    return this.page.locator("(//*[text()='REPLACE'])[1]");
  }

  Hp_save(): Locator {
    return this.page.locator("//*[text()='Save']");
  }

  Hp_publish(): Locator {
    return this.page.locator("(//*[text()='Publish'])[1]");
  }

  Hp_Remove(): Locator {
    return this.page.locator("//*[text()='Remove']");
  }

  Hp_RemoveConfirmation(): Locator {
    return this.page.locator("//*[text()='REMOVE']");
  }

  Hp_insertOnTop(): Locator {
    return this.page.locator("(//*[text()=' Insert '])[1]");
  }
  Hp_insertOnTop_River1(): Locator {
    return this.page.locator("(//*[@id='insertBtn_2_0__0'])[1]");
  }

  Hp_insert(): Locator {
    return this.page.locator("(//*[text()='INSERT'])[1]");
  }

  headlineLP1(): Locator {
    return this.page.locator("(//*[@class='item_content'])[2]");
  }

  pin_section1(): Locator {
    return this.page.locator("//*[contains(@title,'Unpin Story')]");
  }

  revert1(): Locator {
    return this.page.locator('//*[@id="discardBtn"]');
  }

  ExpandQL(): Locator {
    return this.page.locator("(//*[text()='expand_more'])[1]");
  }
  QLmodule(): Locator {
    return this.page.locator('(//*[@class="module_panel"])[1]');
  }

  unpinStoryRiver(position: string): Locator {
    return this.page.locator(
      "//img[@id='actionPin_3_0_" + position + "' and @title='Unpin Story']",
    );
  }
  unpinStoryHero(position: string): Locator {
    return this.page.locator(
      "//img[@id='actionPin_1_0_" + position + "' and @title='Unpin Story']",
    );
  }
}
