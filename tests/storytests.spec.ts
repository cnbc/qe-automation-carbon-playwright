import { test } from '../fixtures/lambdatest';
import { CustomMethods } from '../reusablemethods/customMethods';

const ENV = 'stg02';
const TAGS: string[] = ['@C175315430', '@Story', '@Regression', '@High', '@BAT', '@MVP'];

/**
 * Test ID: C175315430
 * Description: Verify Field Level Comment module displays
 */
test.describe('Carbon Story Tests', () => {
  
  test('C175315430 - Verify user is able to login into Carbon', { tag: TAGS }, async ({ page }) => {
    const customMethods = new CustomMethods(page);
    await customMethods.openPublishPageURLViper(ENV);
    await customMethods.login(ENV);
    



  
  });
});
