import { test, expect } from '../fixtures/lambdatest';
import * as RM from '../reusablemethods/reusablemethodsindex';
import * as PO from '../pageobjects/pageobjectsindex';

const ENV = process.env.ENV || 'stg02';
const TAGS: string[] = ['@Story', '@Regression', '@High', '@Comment'];

test.describe('Carbon Field Level Commenting Tests', () => {
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
  async function addCommentOnFieldLevel(fieldNumber: number): Promise<string> {
    await sitPage.edtTitleNewConfig().click();
    await fieldLevelCommentPage.btnAddComment(fieldNumber).click();
    const commentText = `AutoTest${cm.getTimeStamp()}`;
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      commentText,
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentPostButton().click();
    console.log("Comment added successfully");
    return commentText;
  }


  test('Verify user is able to add comment on field level',{ tag: ['@C227036241', ...TAGS] }, async () => {
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

  test('Verify user is able to Resolve a comment or all comments on a field',{ tag: ['@C227036257', ...TAGS] }, async () => {
    await cm.login(ENV);
    await cm.selectAsset('Story');
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(5000);
    await sitPage.edtTitleNewConfig().click();
    const beforeCount = await fieldLevelCommentPage.commentBadgeCount(1);
    console.log("Comment badge count before adding comment: " + beforeCount);

    //Add comments
    //await fieldLevelCommentPage.btnAddComment(1).click();
    const commentText1 = await addCommentOnFieldLevel(1);
    if(beforeCount > 0) {
      await fieldLevelCommentPage.commentResolveThisThread().first().isVisible().then((isVisible: boolean) => {
        console.log("Resolve all comment button is visible: " + isVisible);
        expect(isVisible).toBe(true);
      });
    }else{
      await fieldLevelCommentPage.commentResolveThisThread().first().isVisible().then((isVisible: boolean) => {
        console.log("Resolve all comment button is not visible: " + isVisible);
        expect(isVisible).toBe(false);
      });
    }
    await fieldLevelCommentPage.btnAddComment(1).click();
    const commentText2 = await addCommentOnFieldLevel(1);
    await cm.waitForSeconds(5);
    await fieldLevelCommentPage.commentResolveThisThread().first().isVisible().then((isVisible: boolean) => {
      console.log("Resolve all comment button is visible: " + isVisible);
      expect(isVisible).toBe(true);
    });
    let expected = beforeCount + 2;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);

    //Resolve a comment
    await fieldLevelCommentPage.commentMoreOptions(1).click();
    await fieldLevelCommentPage.commentEditActionsMarkAsResolved().click();
    await cm.waitForSeconds(2);
    await fieldLevelCommentPage.noOfComments().first().textContent().then((text: string | null) => {
      console.log("No of comments: " + text);
      expect(text?.toString().trim()).toBe(expected.toString() + " comments");
    });
    await cm.waitForSeconds(2);
    await fieldLevelCommentPage.commentResolvedGreenCircleIndividual(commentText1).isVisible().then((isVisible: boolean) => {
      console.log("Resolved green circle is visible: " + isVisible);
      expect(isVisible).toBe(true);
    });
    /*await fieldLevelCommentPage.commentResolveThisThread().first().isVisible().then((isVisible: boolean) => {
      console.log("Resolve all comment button is NOT visible: " + isVisible);
      expect(isVisible).toBe(false);
    });*/
    expected = beforeCount + 1;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);


    //Resolve all comments
    await fieldLevelCommentPage.commentResolveThisThread().first().click();
    await cm.waitForSeconds(2);
    expected = beforeCount + 2;
    await fieldLevelCommentPage.noOfComments().first().textContent().then((text: string | null) => {
      console.log("No of comments: " + text);
      expect(text?.toString().trim()).toBe("check_circle_outline  " + expected.toString() + " comments");
    });
    await cm.waitForSeconds(2);
    await fieldLevelCommentPage.commentAllResolvedGreenCircle().first().isVisible().then((isVisible: boolean) => {
      console.log("Resolve all comment button is visible: " + isVisible);
      expect(isVisible).toBe(true);
    });
    expected = beforeCount;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);

  
    await fieldLevelCommentPage.commentsPurpleDot().first().isVisible().then((isVisible: boolean) => {
      console.log("Purple dot is visible: " + isVisible);
      expect(isVisible).toBe(false);
    });

  });

  test('Verify user is able to Edit and Delete their own comments on a field',{ tag: ['@C227036244', ...TAGS] }, async () => {
    await cm.login(ENV);
    await cm.selectAsset('Story');
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(5000);
    await sitPage.edtTitleNewConfig().click();
    const beforeCount = await fieldLevelCommentPage.commentBadgeCount(1);
    console.log("Comment badge count before adding comment: " + beforeCount);

    //Add comments
    //await fieldLevelCommentPage.btnAddComment(1).click();
    const commentText1 = await addCommentOnFieldLevel(1);
    await fieldLevelCommentPage.btnAddComment(1).click();
    const commentText2 = await addCommentOnFieldLevel(1);
    const commentText3 = await addCommentOnFieldLevel(1);
    await cm.waitForSeconds(5);


  });



});