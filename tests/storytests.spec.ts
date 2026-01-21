import { JavaScriptActions, BrowserActions, KeyboardActions, MouseActions, BasePage } from '@cnbc/playwright-sdk';
import { test, expect } from '../fixtures/lambdatest';

/**
 * Test ID: C175315430
 * Description: HP RIVER: Verify homepage River module displays (BAT)
 * Groups: HP_River, BAT, Dev, High, Regression, Group2
 * 
 * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C175315430()
 */
test.describe('Carbon Story Tests', () => {
  
  test('C175315430 - Verify homepage River module displays', {tag: ['@C175315430', '@Story','@Regression','@High','@BAT','@MVP']} ,async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await browserActions.setViewport(1920, 1080);
    
    // Step 2: Wait for page load and lazy load modules
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    
    // Step 3: Scroll to load lazy-loaded content
    homePage.logStep('Scrolling to load lazy-loaded modules');
    await msa.scroll(0, 1000);
    await wait.forMilliseconds(2000);
    
    // Step 4: Verify River Module is displayed
    homePage.logStep('Verifying River Module is displayed');
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 5: Scroll to River Module Stories
    homePage.logStep('Scrolling to River Module stories');
    const riverStories = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]//*[contains(@class,'RiverPlusCard-container')]");
    await riverStories.first().scrollIntoViewIfNeeded();
    await wait.forMilliseconds(1000);
    
    // Step 6: Wait for Breaker stories to load
    homePage.logStep('Waiting for Breaker Module stories');
    const breakerStories = page.locator("//*[contains(@class,'RiverPlusBreaker-container')]//*[contains(@class,'RiverPlusCard-breakerCardContainer')]");
    await breakerStories.first().waitFor({ state: 'visible', timeout: 20000 });
    
    // Step 7: Verify River Module has 18 or 19 regular stories
    // River module has 21 stories [19 regular stories including Native ad + 2 Breaker stories]
    homePage.logStep('Verifying River Module story count');
    const riverStoryCount = await riverStories.count();
    homePage.logInfo(`Found ${riverStoryCount} River stories`);
    
    if (riverStoryCount === 19) {
      expect(riverStoryCount).toBe(19);
    } else {
      expect(riverStoryCount).toBe(18);
    }
    
    // Step 8: Verify Breaker Module has 2 stories
    homePage.logStep('Verifying Breaker Module story count');
    const breakerStoryCount = await breakerStories.count();
    homePage.logInfo(`Found ${breakerStoryCount} Breaker stories`);
    expect(breakerStoryCount).toBe(2);
    
    // Step 9: Verify first story elements are displayed
    homePage.logStep('Verifying first story elements');
    
    // Verify Story Title
    await homePage.assert.isVisible("(//*[contains(@class,'RiverPlus-riverPlusContainer')]//*[contains(@class,'RiverHeadline')]//a)[1]");
    homePage.logInfo('Story 1 Title is displayed');
    
    // Verify Story Thumbnail
    await homePage.assert.isVisible("(//*[contains(@class,'RiverPlus')]//*[contains(@class,'RiverThumbnail-imageThumbnail')])[1]");
    homePage.logInfo('Story 1 Thumbnail is displayed');
    
    // Verify Story Author
    await homePage.assert.isVisible("(//*[contains(@class,'RiverPlus')]//*[contains(@class,'RiverByline-authorByline')]//a)[1]");
    homePage.logInfo('Story 1 Author is displayed');
    
    homePage.logInfo('C175315430 test completed successfully!');
  });



  
});
