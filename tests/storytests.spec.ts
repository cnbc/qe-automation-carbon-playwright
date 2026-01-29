import { test, expect } from '../fixtures/lambdatest';
import * as RM from '../reusablemethods/reusablemethodsindex';
import * as PO from '../pageobjects/pageobjectsindex';

const ENV = process.env.ENV || 'stg02';
const TAGS: string[] = ['@Story', '@Regression', '@High'];

test.describe('Carbon Story Tests', () => {
  let storyPage: PO.StoryPage;
  let cm: RM.CustomMethods;
  let sitPage: PO.SITPage;
  test.beforeEach(async ({ page }) => {
    storyPage = new PO.StoryPage(page);
    cm = new RM.CustomMethods(page);
    sitPage = new PO.SITPage(page);
  });

  test('C175315430 - Verify user is able to login into Carbon',{ tag: ['@C175315430', ...TAGS] }, async ({ page }) => {
    await cm.login(ENV);
    await cm.selectAsset('Story');
    await sitPage.edtTitleNewConfig().fill("AutoTest"+ cm.getTimeStamp());
    await sitPage.btnSaveNewConfig().click();
    await cm.waitForPageToLoadCMS();
    await cm.waitForTime(10000);
  

  
  });






});