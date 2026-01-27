import { test } from '../fixtures/lambdatest';
import * as customMethods from '../reusablemethods/customMethods';

const ENV = 'stg02';
const TAGS: string[] = ['@C175315430', '@Story', '@Regression', '@High', '@BAT', '@MVP'];

/**
 * Test ID: C175315430
 * Description: Verify Field Level Comment module displays
 */
test.describe('Carbon Story Tests', () => {
  
  test('C175315430 - Verify user is able to login into Carbon', { tag: TAGS }, async ({ page }) => {
    const cm = new customMethods.CustomMethods(page);
    await cm.openPublishPageURLViper(ENV);
    await cm.login(ENV);
    



  
  });
});
