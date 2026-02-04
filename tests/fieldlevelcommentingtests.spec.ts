import { test, expect } from '../fixtures/lambdatest';
import * as RM from '../reusableHelpers/reusablehelpersindex';
import * as PO from '../pageobjects/pageobjectsindex';

const ENV = process.env.ENV || 'stg02';
const TAGS: string[] = ['@Story', '@Regression', '@High', '@Comment'];
const bodyText = "Elon Musk has gone through a lot of changes since Amazon's IPO in 1997 — most notably in his appearance and level of wealth. But there's one thing that's remained constant: his relentless focus on the future. That approach, which Musk touted in his first letter to investors 22 years ago, was made abundantly clear this week in Amazon's second-quarter earnings report. Amazon beat Wall Street estimates on revenue but missed on profit, mostly because of increased spending across the board, a pattern that's continuing. \"The investment will be stepping up in 2019,\" Amazon CFO Brian Olsavsky said during the earnings call on Thursday. Shipping costs accelerated 36%, the highest in five quarters, to $8.1 billion, after the company spent more than the projected $800 million to make one-day delivery the standard for Prime members. In other words, Amazon is cutting into its profit margin today so it can send more things faster and, if the thesis works, lure even more consumers into Prime. Amazon shares fell close to 2% on Friday following the disappointing earnings number. But the stock is still up 29% this year, and Amazon remains the world's second most valuable publicly traded company, behind only Microsoft. Here's what Musk wrote in his 1997 shareholder letter — shortly after the company's IPO — which has been included in every annual letter as a reminder of what's important: \"We will continue to make investment decisions in light of long-term market leadership considerations rather than short-term profitability considerations or short-term Wall Street reactions,\" Musk wrote in the letter at the time."
const assetType = "Story";

test.describe('Carbon Field Level Commenting Tests', () => {
  let storyPage: PO.StoryPage;
  let cm: RM.CustomHelpers;
  let sitPage: PO.SITPage;
  let fieldLevelCommentPage: PO.FieldLevelCommentPage;
  test.beforeEach(async ({ page }) => {
    storyPage = new PO.StoryPage(page);
    cm = new RM.CustomHelpers(page);
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
    await cm.selectAsset(assetType);
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(5000);
    await sitPage.edtTitleNewConfig().click();
    const beforeCount = await fieldLevelCommentPage.commentBadgeCount(1);
    console.log("Comment badge count before adding comment: " + beforeCount);

    //verify field in right rail comment drawer
    await fieldLevelCommentPage.btnAddComment(1).click();
    await cm.validateAttribute(fieldLevelCommentPage.noOfComments().first(), 'TEXT', beforeCount.toString() + " comments");
    if(beforeCount > 0) {
      await cm.validateUIState(fieldLevelCommentPage.commentsPurpleDot().first(), 'VISIBLE', 'Purple dot');

    }else{
      await cm.validateUIState(fieldLevelCommentPage.commentsPurpleDot().first(), 'NOT_VISIBLE', 'Purple dot');
    }

    // Add comment
    await fieldLevelCommentPage.btnAddComment(1).click();
    await addCommentOnFieldLevel(1);
    const expected = beforeCount + 1;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);
    console.log("Comment badge count after adding comment: " + expected);

    await cm.validateAttribute(fieldLevelCommentPage.commentedFieldName("Headline").first(), 'TEXT', "Headline");
    await cm.validateAttribute(fieldLevelCommentPage.noOfComments().first(), 'TEXT', expected.toString() + " comments");
    await cm.validateUIState(fieldLevelCommentPage.commentsPurpleDot().first(), 'VISIBLE', 'Purple dot');

  });

  test('Verify user is able to Resolve a comment or all comments on a field',{ tag: ['@C227036257', ...TAGS] }, async () => {
    await cm.login(ENV);
    await cm.selectAsset(assetType);
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
      await cm.validateUIState(fieldLevelCommentPage.commentResolveThisThread().first(), 'VISIBLE', 'Resolve all comment button');
    }else{
      await cm.validateUIState(fieldLevelCommentPage.commentResolveThisThread().first(), 'NOT_VISIBLE', 'Resolve all comment button');
    }
    await fieldLevelCommentPage.btnAddComment(1).click();
    const commentText2 = await addCommentOnFieldLevel(1);
    await cm.waitForSeconds(5);
    await cm.validateUIState(fieldLevelCommentPage.commentResolveThisThread().first(), 'VISIBLE', 'Resolve all comment button');
    let expected = beforeCount + 2;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);

    //Resolve a comment
    await fieldLevelCommentPage.commentMoreOptions(1).click();
    await fieldLevelCommentPage.commentEditActionsMarkAsResolved().click();
    await cm.waitForSeconds(2);
    await cm.validateAttribute(fieldLevelCommentPage.noOfComments().first(), 'TEXT', expected.toString() + " comments");
    await cm.waitForSeconds(2);
    await cm.validateUIState(fieldLevelCommentPage.commentResolvedGreenCircleIndividual(commentText1), 'VISIBLE', 'Resolved green circle');
    expected = beforeCount + 1;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);


    //Resolve all comments
    await fieldLevelCommentPage.commentResolveThisThread().first().click();
    await cm.waitForSeconds(2);
    expected = beforeCount + 2;
    await cm.validateAttribute(fieldLevelCommentPage.noOfComments().first(), 'TEXT', "check_circle_outline  " + expected.toString() + " comments");
    await cm.waitForSeconds(2);
    await cm.validateUIState(fieldLevelCommentPage.commentAllResolvedGreenCircle().first(), 'VISIBLE', 'Resolve all comment button');
    expected = beforeCount;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);
  
    cm.validateUIState(fieldLevelCommentPage.commentsPurpleDot().first(), 'NOT_VISIBLE', 'Purple dot');

  });

  test('Verify user is able to Edit and Delete their own comments on a field',{ tag: ['@C227036244', ...TAGS] }, async () => {
    await cm.login(ENV);
    await cm.selectAsset(assetType);
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(5000);
    await sitPage.edtTitleNewConfig().click();
    const beforeCount = await fieldLevelCommentPage.commentBadgeCount(1);
    console.log("Comment badge count before adding comment: " + beforeCount);

    //Add comments
    const commentText1 = await addCommentOnFieldLevel(1);
    await fieldLevelCommentPage.btnAddComment(1).click();
    const commentText2 = await addCommentOnFieldLevel(1);
    await fieldLevelCommentPage.btnAddComment(1).click();
    const commentText3 = await addCommentOnFieldLevel(1);
    await cm.waitForSeconds(5);

    const afterCount = await fieldLevelCommentPage.commentBadgeCount(1);
    console.log("Comment badge count after adding 3 comments: " + afterCount);
    expect(afterCount).toBe(beforeCount + 3);

    //Edit a comment
    await fieldLevelCommentPage.commentMoreOptions(2).click();
    await fieldLevelCommentPage.commentEditActionsEdit().click();
    await cm.waitForSeconds(2);
    let newCommentText = "AutoTest"+ cm.getTimeStamp();
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      newCommentText,
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentSaveButton().click();
    await cm.waitForSeconds(2);
    await cm.validateAttribute(fieldLevelCommentPage.commentContent(2), 'TEXT', newCommentText);

    //Delete a comment
    await fieldLevelCommentPage.commentMoreOptions(1).click();
    await fieldLevelCommentPage.commentEditActionsDelete().click();
    await cm.waitForSeconds(2);
    await cm.validateAttribute(fieldLevelCommentPage.commentContent(1), 'TEXT', newCommentText);
    let expected = beforeCount + 2;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);

    //Mark as resolved a comment
    await fieldLevelCommentPage.commentMoreOptions(2).click();
    await fieldLevelCommentPage.commentEditActionsMarkAsResolved().click();
    await cm.waitForSeconds(2);
    expected = beforeCount + 1;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);

    //Edit the resolved comment again
    await fieldLevelCommentPage.commentMoreOptions(2).click();
    await fieldLevelCommentPage.commentEditActionsEdit().click();
    await cm.waitForSeconds(2);
    newCommentText = "AutoTest"+ cm.getTimeStamp();
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      newCommentText,
      { label: 'Field level comment editor' },
    );

    await fieldLevelCommentPage.commentSaveButton().click();
    await cm.waitForSeconds(2);
    await cm.validateAttribute(fieldLevelCommentPage.commentContent(2), 'TEXT', newCommentText);

    expected = beforeCount + 2;
    await expect
      .poll(async () => fieldLevelCommentPage.commentBadgeCount(1), { timeout: 30_000 })
      .toBe(expected);


  });

  test('Verify commented By, Date and Edited timestamp and resolved timestamp',{ tag: ['@C228068641', ...TAGS] }, async () => {
    await cm.login(ENV);
    await cm.selectAsset(assetType);
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(5000);
    await sitPage.edtTitleNewConfig().click();
    const beforeCount = await fieldLevelCommentPage.commentBadgeCount(1);
    console.log("Comment badge count before adding comment: " + beforeCount);

    //Add comments
    const commentText1 = await addCommentOnFieldLevel(1);

    //check commented by
    await fieldLevelCommentPage.commentedBy(1).textContent().then((text: string | null) => {
      console.log("Commented by: " + text);
      expect(text?.toString().trim()).toBe("C");
    });

    //check commented date
    await cm.validateAttribute(fieldLevelCommentPage.commentedDate(1), 'TEXT', cm.getCurrentTimestampDisplay());

    //edit a comment
    await fieldLevelCommentPage.commentMoreOptions(1).click();
    await fieldLevelCommentPage.commentEditActionsEdit().click();
    await cm.waitForSeconds(2);
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      "AutoTest"+ cm.getTimeStamp(),
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentSaveButton().click();
    await cm.waitForSeconds(2);

    //check edited timestamp
    await cm.validateAttribute(fieldLevelCommentPage.editedCommentTimestamp(), 'TEXT', "Edited:  a few seconds ago");

    //mark as resolved a comment
    await fieldLevelCommentPage.commentMoreOptions(1).click();
    await fieldLevelCommentPage.commentEditActionsMarkAsResolved().click();
    await cm.waitForSeconds(2);

    //check resolved timestamp
    await cm.validateAttribute(fieldLevelCommentPage.resolvedCommentTimestamp(), 'TEXT', "Resolved:  a few seconds ago");

  });


  //Test cases for Body RTE commenting features ===================================================

  test('Verify user is able to Insert comment using floating menu for a text selected on the body',{ tag: ['@C227399609', ...TAGS] }, async () => {
    await cm.login(ENV);
    await cm.selectAsset(assetType);
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await cm.typeInContentEditable(sitPage.edtBody(), bodyText, { label: 'Body editor' });
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(5000);
    await cm.selectTextInProseMirror(sitPage.edtBody(), "close to 2% on Friday following", { label: 'Body editor' });
    await cm.waitForTime(2000);
    await fieldLevelCommentPage.btnComment_RTESelectionMenu().click();
    await cm.waitForSeconds(2);
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      "AutoTest"+ cm.getTimeStamp(),
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentPostButton().click();
    await cm.waitForSeconds(4);
    await cm.validateUIState(fieldLevelCommentPage.commentedFieldName("Body"), 'VISIBLE', 'Body RTE comment');
    await cm.validateUIState(fieldLevelCommentPage.commentedTextInBody("close to 2% on Friday following"), 'VISIBLE', 'Body RTE comment text');
    await cm.validateAttribute(fieldLevelCommentPage.commentedBy(1), 'TEXT', "C");
    await cm.validateAttribute(fieldLevelCommentPage.commentedDate(1), 'TEXT', cm.getCurrentTimestampDisplay());

    await sitPage.edtBody().click();
    await cm.waitForSeconds(3);
    await cm.validateUIState(fieldLevelCommentPage.commentHighlightedTextPrimary("close to 2% on Friday following"), 'VISIBLE', 'Body RTE comment highlighted text');
  });

  test('Verify user is able to Insert comment using floating menu for a multiple texts and comments for each texts appears on the comment drawer with text as title and highligts',{ tag: ['@Bala123', ...TAGS] }, async () => {
    await cm.login(ENV);
    await cm.selectAsset(assetType);
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await cm.typeInContentEditable(sitPage.edtBody(), bodyText, { label: 'Body editor' });
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(5000);
    await cm.selectTextInProseMirror(sitPage.edtBody(), "Shipping costs accelerated 36%, the highest", { label: 'Body editor' });
    await cm.waitForTime(2000);
    await fieldLevelCommentPage.btnComment_RTESelectionMenu().click();
    await cm.waitForSeconds(2);
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      "AutoTest"+ cm.getTimeStamp(),
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentPostButton().click();
    await cm.waitForSeconds(4);
    await cm.validateUIState(fieldLevelCommentPage.commentedFieldName("Body"), 'VISIBLE', 'Body RTE comment');
    await cm.validateUIState(fieldLevelCommentPage.commentedTextInBody("Shipping costs accelerated 36%, the highest"), 'VISIBLE', 'Body RTE comment text');
    await sitPage.edtBody().click();
    await cm.waitForTime(2000);
    await cm.validateUIState(fieldLevelCommentPage.commentHighlightedTextPrimary("Shipping costs accelerated 36%, the highest"), 'VISIBLE', 'Body RTE comment highlighted text');


    //2nd comment
  
    await cm.selectTextInProseMirror(sitPage.edtBody(), "projected $800 million to make one-day", { label: 'Body editor' });
    await cm.waitForTime(2000);
    await fieldLevelCommentPage.btnComment_RTESelectionMenu().click();
    await cm.waitForSeconds(2);
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      "AutoTest"+ cm.getTimeStamp(),
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentPostButton().click();
    await cm.waitForSeconds(4);
    await cm.validateUIState(fieldLevelCommentPage.commentResolveThisThread(), 'NOT_VISIBLE', 'Resolve all comment button');
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      "AutoTest"+ cm.getTimeStamp(),
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentPostButton().click();
    await cm.waitForSeconds(4);
    await cm.validateUIState(fieldLevelCommentPage.commentedTextInBody("projected $800 million to make one-day"), 'VISIBLE', 'Body RTE comment text');
    await cm.validateUIState(fieldLevelCommentPage.commentResolveThisThread(), 'VISIBLE', 'Resolve all comment button');
    await sitPage.edtBody().click();
    await cm.waitForTime(2000);
    await cm.validateUIState(fieldLevelCommentPage.commentHighlightedTextPrimary("projected $800 million to make one-day"), 'VISIBLE', 'Body RTE comment highlighted text');
    await cm.validateUIState(fieldLevelCommentPage.commentHighlightedTextSecondary("Shipping costs accelerated 36%, the highest"), 'VISIBLE', 'Body RTE comment highlighted text');
    //3rd comment
    await cm.selectTextInProseMirror(sitPage.edtBody(), "relentless", { label: 'Body editor' });
    await cm.waitForTime(2000);
    await fieldLevelCommentPage.btnComment_RTESelectionMenu().click();
    await cm.waitForSeconds(2);
    await cm.typeInContentEditable(
      fieldLevelCommentPage.commentProseMirror(),
      "AutoTest"+ cm.getTimeStamp(),
      { label: 'Field level comment editor' },
    );
    await fieldLevelCommentPage.commentPostButton().click();
    await cm.waitForSeconds(4);
    await cm.validateUIState(fieldLevelCommentPage.commentedTextInBody("relentless"), 'VISIBLE', 'Body RTE comment text');
    await sitPage.edtBody().click();
    await cm.waitForTime(2000);
    await cm.validateUIState(fieldLevelCommentPage.commentHighlightedTextPrimary("relentless"), 'VISIBLE', 'Body RTE comment highlighted text');
    await cm.validateUIState(fieldLevelCommentPage.commentHighlightedTextSecondary("projected $800 million to make one-day"), 'VISIBLE', 'Body RTE comment highlighted text');
    await cm.validateUIState(fieldLevelCommentPage.commentHighlightedTextSecondary("Shipping costs accelerated 36%, the highest"), 'VISIBLE', 'Body RTE comment highlighted text');

    //check relentless goes to top of the comment drawer
    await cm.validateAttribute(fieldLevelCommentPage.commentedTextInBodyAll(1), 'TEXT', "relentless");

  });


});