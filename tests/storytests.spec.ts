import { test, expect } from '../fixtures/lambdatest';
import { FieldLevelCommentPage } from '../pageobjects/fieldlevelcomment';

/**
 * Test ID: C175315430
 * Description: Verify Field Level Comment module displays
 */
test.describe('Carbon Story Tests', () => {
  
  test('C175315430 - Verify homepage River module displays', {tag: ['@C175315430', '@Story','@Regression','@High','@BAT','@MVP']} ,async ({ page, wait, browserActions, msa }) => {
    const fieldLevelCommentPage = new FieldLevelCommentPage(page);
    
    // Step 1: Navigate to CNBC homepage
    await fieldLevelCommentPage.open('/', browserActions);
    
    // Step 2: Wait for page load and lazy load modules
    await fieldLevelCommentPage.waitForLoaded(wait);
    
    // Step 3: Scroll to load lazy-loaded content
    await fieldLevelCommentPage.loadLazyModules(msa, wait, 1000);
    
    // Step 4: Verify River Module is displayed
    await fieldLevelCommentPage.expectRiverVisible();
    
    // Step 5: Scroll to River Module Stories
    fieldLevelCommentPage.logStep('Scrolling to River Module stories');
    const riverStories = fieldLevelCommentPage.riverStories();
    await riverStories.first().scrollIntoViewIfNeeded();
    await wait.forMilliseconds(1000);
    
    // Step 6: Wait for Breaker stories to load
    fieldLevelCommentPage.logStep('Waiting for Breaker Module stories');
    const breakerStories = fieldLevelCommentPage.breakerStories();
    await breakerStories.first().waitFor({ state: 'visible', timeout: 20000 });
    
    // Step 7: Verify River Module has 18 or 19 regular stories
    // River module has 21 stories [19 regular stories including Native ad + 2 Breaker stories]
    fieldLevelCommentPage.logStep('Verifying River Module story count');
    const riverStoryCount = await riverStories.count();
    fieldLevelCommentPage.logInfo(`Found ${riverStoryCount} River stories`);
    
    if (riverStoryCount === 19) {
      expect(riverStoryCount).toBe(19);
    } else {
      expect(riverStoryCount).toBe(18);
    }
    
    // Step 8: Verify Breaker Module has 2 stories
    fieldLevelCommentPage.logStep('Verifying Breaker Module story count');
    const breakerStoryCount = await breakerStories.count();
    fieldLevelCommentPage.logInfo(`Found ${breakerStoryCount} Breaker stories`);
    expect(breakerStoryCount).toBe(2);
    
    // Step 9: Verify first story elements are displayed
    await fieldLevelCommentPage.expectFirstStoryElementsVisible();
    
    fieldLevelCommentPage.logInfo('C175315430 test completed successfully!');
  });



  
});
