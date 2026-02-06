import { test, expect } from '../fixtures/auth';
import * as RM from '../helpers/reusablehelpersindex.ts';
import * as PO from '../pageobjects/pageobjectsindex.ts';

const ENV = process.env.ENV || 'stg02';
const TAGS: string[] = ['@Story', '@Regression', '@High', '@Upload'];

test.describe('Carbon Upload Tests', () => {
  let storyPage: PO.StoryPage;
  let cm: RM.CustomHelpers;
  let sitPage: PO.SITPage;

  test.beforeEach(async ({ page }) => {
    storyPage = new PO.StoryPage(page);
    cm = new RM.CustomHelpers(page);
    sitPage = new PO.SITPage(page);
  });

  test('Verify user is able to upload a single image',{ tag: ['@Bala234', ...TAGS] }, async () => {
    await sitPage.lnkMediaLibrary().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(2000);
    await sitPage.btnUpload().click();
    await cm.waitForPageToLoadCMS();
    await cm.uploadFileViaChooser(sitPage.lnkSinglePhoto(), "tests/testdata/Image_PNG with(.) Space.png");
    await cm.waitForSeconds(30);

  });

  test('Verify user is able to upload a multiple images',{ tag: ['@Bala345', ...TAGS] }, async () => {
    await sitPage.lnkMediaLibrary().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(2000);
    await sitPage.btnUpload().click();
    await cm.waitForPageToLoadCMS();
    await cm.uploadFileViaChooser(sitPage.lnkMultiplePhoto(), ["tests/testdata/Image_PNG with(.) Space.png", "tests/testdata/cnbc-logo.png", "tests/testdata/gettyimages-1.jpeg"]);
    await cm.waitForSeconds(30);
  });
});

