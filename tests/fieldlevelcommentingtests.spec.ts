import { test, expect } from '../fixtures/lambdatest';
import * as RM from '../reusablemethods/reusablemethodsindex';
import * as PO from '../pageobjects/pageobjectsindex';

const ENV = process.env.ENV || 'stg02';
const TAGS: string[] = ['@Story', '@Regression', '@High'];

test.describe('Carbon Story Tests', () => {
  let storyPage: PO.StoryPage;
  let cm: RM.CustomMethods;
  let sitPage: PO.SITPage;
  let fieldLevelCommentPage: PO.FieldLevelCommentPage;

  test.beforeEach(async ({ page }) => {
    storyPage = new PO.StoryPage(page);
    cm = new RM.CustomMethods(page);
    sitPage = new PO.SITPage(page);
    fieldLevelCommentPage = new PO.FieldLevelCommentPage(page);
  });

  //methods ===================================================================================
  async function addCommentOnFieldLevel(fieldNumber: number): Promise<void> {
    await sitPage.edtTitleNewConfig().click();
    await fieldLevelCommentPage.btnAddComment(fieldNumber).click();
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      `AutoTest${cm.getTimeStamp()}`,
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentPostButton().click();
    console.log("Comment added successfully");
  }


  test('Verify user is able to add comment on field level',{ tag: ['@C227036241', ...TAGS] }, async ({ page }) => {
    await cm.login(ENV);
    await cm.selectAsset('Story');
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(5000);
    await sitPage.edtTitleNewConfig().click();
    const beforeCount = await fieldLevelCommentPage.commentBadgeCount(1);
    console.log("Comment badge count before adding comment: " + beforeCount);

    //verify field in right rail comment drawer
    await fieldLevelCommentPage.btnAddComment(1).click();
    await fieldLevelCommentPage.commentedText().first().textContent().then((text: string | null) => {
      console.log("Commented text: " + text);
      expect(text?.toString().trim()).toBe("Headline");
    });
    await fieldLevelCommentPage.noOfComments().first().textContent().then((text: string | null) => {
      console.log("No of comments: " + text);
      expect(text?.toString().trim()).toBe(beforeCount.toString() + " comments");
    });
    if(beforeCount > 0) {
      await fieldLevelCommentPage.commentsPurpleDot().first().isVisible().then((isVisible: boolean) => {
        console.log("Purple dot is visible: " + isVisible);
        expect(isVisible).toBe(true);
      });

    }else{
      await fieldLevelCommentPage.commentsPurpleDot().first().isVisible().then((isVisible: boolean) => {
        console.log("Purple dot is not visible: " + isVisible);
        expect(isVisible).toBe(false);
      });
    }

    // Add comment
    await fieldLevelCommentPage.btnAddComment(1).click();
    await addCommentOnFieldLevel(1);
    const expected = beforeCount + 1;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);
    console.log("Comment badge count after adding comment: " + expected);


    await fieldLevelCommentPage.noOfComments().first().textContent().then((text: string | null) => {
      console.log("No of comments: " + text);
      expect(text?.toString().trim()).toBe(expected.toString() + " comments");
    });
    await fieldLevelCommentPage.commentsPurpleDot().first().isVisible().then((isVisible: boolean) => {
      console.log("Purple dot is visible: " + isVisible);
      expect(isVisible).toBe(true);
    });


  });


});