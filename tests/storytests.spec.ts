import { test } from '../fixtures/lambdatest';
import * as customMethods from '../reusablemethods/customMethods';

const ENV = process.env.ENV || 'stg02';
const TAGS: string[] = ['@Story', '@Regression', '@High'];

/**
 * Test ID: C175315430
 * Description: Verify Field Level Comment module displays
 */
test.describe('Carbon Story Tests', () => {
  
  test('C175315430 - Verify user is able to login into Carbon', { tag: ['@C175315430', ...TAGS] }, async ({ page }) => {
    const cm = new customMethods.CustomMethods(page);
    await cm.login(ENV);
    await cm.selectAsset('Story');

  });
});
