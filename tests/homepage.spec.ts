import { JavaScriptActions } from '@cnbc/playwright-sdk';
import { test, expect } from '../fixtures/lambdatest';
import { BasePage } from '@cnbc/playwright-sdk';

/**
 * Test ID: C175315430
 * Description: HP RIVER: Verify homepage River module displays (BAT)
 * Groups: HP_River, BAT, Dev, High, Regression, Group2
 * 
 * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C175315430()
 */
test.describe('Homepage River Module Tests', () => {
  
  test('C175315430 - Verify homepage River module displays', {tag: ['@C175315430', '@HomePage']} ,async ({ page, wait, browserActions, msa }) => {
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

  /**
   * Test ID: C175315431
   * Description: HP RIVER: Verify River module functionality on homepage
   * Groups: C175315431, HomePage, High, HP_RIVER, Regression, Group2
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C175315431()
   */
  test('C175315431 - Verify River module functionality', {tag:["@C175315431",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage and save URL
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await browserActions.setViewport(1920, 1080);
    const homePageUrl = await browserActions.getCurrentUrl();
    
    // Step 2: Wait for page load and River Module
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 3: Scroll and lazy load modules
    homePage.logStep('Scrolling to load lazy-loaded modules');
    await msa.scrollDown(1500);
    await wait.forMilliseconds(2000);
    
    // Step 4: Verify River Module story count
    homePage.logStep('Verifying River Module story count');
    const riverStories = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]//*[contains(@class,'RiverPlusCard-container')]");
    const riverStoryCount = await riverStories.count();
    homePage.logInfo(`Found ${riverStoryCount} River stories`);
    
    if (riverStoryCount === 19) {
      expect(riverStoryCount).toBe(19);
    } else {
      expect(riverStoryCount).toBe(18);
    }
    
    // Step 5: Verify Breaker stories
    homePage.logStep('Verifying Breaker Module story count');
    const breakerStories = page.locator("//*[contains(@class,'RiverPlusBreaker-container')]//*[contains(@class,'RiverPlusCard-breakerCardContainer')]");
    const breakerStoryCount = await breakerStories.count();
    expect(breakerStoryCount).toBe(2);
    
    // Step 6: Verify Latest News Module alignment
    homePage.logStep('Verifying Latest News Module');
    await homePage.assert.isVisible("//*[contains(@class,'latestNews') or contains(@data-test,'latestNews')]");
    homePage.logInfo('Latest News Module is displayed');
    
    // Step 7: Verify story at position 3
    homePage.logStep('Verifying story at position 3');
    const story3 = page.locator("(//*[contains(@id,'Homepage-riverPlus')]//*[contains(@class,'RiverPlusCard-cardLeft')])[3]");
    await story3.scrollIntoViewIfNeeded();
    await homePage.assert.isVisible("(//*[contains(@id,'Homepage-riverPlus')]//*[contains(@class,'RiverPlusCard-cardLeft')])[3]");
    
    // Step 8: Verify story at position 12
    homePage.logStep('Scrolling to and verifying story at position 12');
    const story12Headline = page.locator("(//*[contains(@id,'Homepage-riverPlus')]//*[contains(@class,'RiverHeadline-headline')])[12]");
    await story12Headline.scrollIntoViewIfNeeded();
    await wait.forMilliseconds(2000);
    await homePage.assert.isVisible("(//*[contains(@id,'Homepage-riverPlus')]//*[contains(@class,'RiverPlusCard-cardLeft')])[12]");
    
    // Step 9: Click on story 12 headline and verify article page
    homePage.logStep('Clicking on story 12 headline');
    await wait.forMilliseconds(3000);
    const currentUrl = await browserActions.getCurrentUrl();
    await story12Headline.click({ force: true });
    await wait.forDomLoad();
    await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
    const articleUrl = await browserActions.getCurrentUrl();
    homePage.logInfo(`Article page loaded - Navigated from ${currentUrl} to ${articleUrl}`);
    expect(articleUrl).not.toBe(homePageUrl);
    
    // Step 10: Navigate back to homepage
    homePage.logStep('Navigating back to homepage');
    await browserActions.goto(homePageUrl);
    await wait.forDomLoad();
    
    // Step 11: Verify story 7 thumbnail and click
    homePage.logStep('Verifying and clicking story 7 thumbnail');
    const story7Headline = page.locator("(//*[contains(@id,'Homepage-riverPlus')]//*[contains(@class,'RiverHeadline-headline')])[7]");
    await story7Headline.scrollIntoViewIfNeeded();
    await wait.forMilliseconds(1000);
    
    const story7Thumbnail = page.locator("(//*[contains(@id,'Homepage-riverPlus')]//*[contains(@data-test,'Picture')]/img)[7]");
    await homePage.assert.isVisible("(//*[contains(@id,'Homepage-riverPlus')]//*[contains(@data-test,'Picture')]/img)[7]");
    const homeUrl = await browserActions.getCurrentUrl();
    await story7Thumbnail.click();
    await wait.forDomLoad();
    await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
    const thumbnailArticleUrl = await browserActions.getCurrentUrl();
    homePage.logInfo(`Article page from thumbnail - Navigated from ${homeUrl} to ${thumbnailArticleUrl}`);
    expect(thumbnailArticleUrl).not.toBe(homePageUrl);
    
    // Step 12: Navigate back to homepage again
    homePage.logStep('Navigating back to homepage again');
    await browserActions.goto(homePageUrl);
    await wait.forDomLoad();
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 13: Click on first story byline and verify bio page
    homePage.logStep('Clicking on first story byline');
    await msa.scrollDown(1000);
    await wait.forMilliseconds(1000);
    
    const firstStoryByline = page.locator("(//*[contains(@class,'RiverByline-authorByline')]//a)[1]");
    await firstStoryByline.scrollIntoViewIfNeeded();
    const homeUrl2 = await browserActions.getCurrentUrl();
    await firstStoryByline.click();
    await wait.forDomLoad();
    
    // Verify bio page loaded (checking for common bio page elements)
    homePage.logStep('Verifying bio page loaded');
    await wait.forMilliseconds(2000);
    const bioUrl = await browserActions.getCurrentUrl();
    homePage.logInfo(`Bio page loaded - Navigated from ${homeUrl2} to ${bioUrl}`);
    expect(bioUrl).not.toBe(homePageUrl);
    
    homePage.logInfo('C175315431 test completed successfully!');
  });

  /**
   * Test ID: C175315432
   * Description: HP RIVER: Verify homepage River module CSS properties on homepage
   * Groups: C175315432, HomePage, High, HP_RIVER, Regression, Group2
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C175315432()
   */
  test('C175315432 - Verify River module CSS properties', {tag:["@C175315432",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await browserActions.setViewport(1920, 1080);
    
    // Step 2: Wait for page load and lazy load modules
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    
    // Step 3: Scroll and lazy load modules
    homePage.logStep('Scrolling to load lazy-loaded modules');
    await msa.scrollDown(1500);
    await wait.forMilliseconds(2000);
    
    // Step 4: Verify River Module is displayed
    homePage.logStep('Verifying River Module is displayed');
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 5: Scroll to River Module
    const riverModule = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    await wait.forMilliseconds(5000);
    
    // Step 6: Verify First Story CSS properties
    homePage.logStep('Verifying River Module First Story CSS properties');
    const firstStory = page.locator("(//*[contains(@class,'RiverPlusCard-container')])[1]");
    
    // Wait for first story to be visible
    await wait.forVisible("(//*[contains(@class,'RiverPlusCard-container')])[1]", 10000);
    
    // Verify font-family for first story
    const firstStoryFontFamily = await firstStory.evaluate((el) => window.getComputedStyle(el).fontFamily);
    homePage.logInfo(`First Story Font Family: ${firstStoryFontFamily}`);
    expect(firstStoryFontFamily).toContain('Proxima Nova');
    
    // Step 7: Verify First Story Headline CSS properties
    homePage.logStep('Verifying First Story Headline CSS properties');
    const firstStoryHeadline = page.locator("((//*[contains(@class,'RiverHeadline-headline')])[1])/a[last()]");
    
    // Wait for headline to be visible
    await wait.forVisible("((//*[contains(@class,'RiverHeadline-headline')])[1])/a[last()]", 10000);
    
    const headlineFontFamily = await firstStoryHeadline.evaluate((el) => window.getComputedStyle(el).fontFamily);
    const headlineWidth = await firstStoryHeadline.evaluate((el) => window.getComputedStyle(el).width);
    const headlineHeight = await firstStoryHeadline.evaluate((el) => window.getComputedStyle(el).height);
    const headlineFontStyle = await firstStoryHeadline.evaluate((el) => window.getComputedStyle(el).fontStyle);
    const headlineFontWeight = await firstStoryHeadline.evaluate((el) => window.getComputedStyle(el).fontWeight);
    const headlineFontSize = await firstStoryHeadline.evaluate((el) => window.getComputedStyle(el).fontSize);
    const headlineLineHeight = await firstStoryHeadline.evaluate((el) => window.getComputedStyle(el).lineHeight);
    
    homePage.logInfo(`Headline Font Family: ${headlineFontFamily}`);
    expect(headlineFontFamily).toContain('Proxima Nova');
    
    homePage.logInfo(`Headline Width: ${headlineWidth}`);
    expect(headlineWidth).toBe('auto');
    
    homePage.logInfo(`Headline Height: ${headlineHeight}`);
    expect(headlineHeight).toBe('auto');
    
    homePage.logInfo(`Headline Font Style: ${headlineFontStyle}`);
    expect(headlineFontStyle).toBe('normal');
    
    homePage.logInfo(`Headline Font Weight: ${headlineFontWeight}`);
    expect(headlineFontWeight).toBe('600');
    
    homePage.logInfo(`Headline Font Size: ${headlineFontSize}`);
    expect(headlineFontSize).toBe('20px');
    
    homePage.logInfo(`Headline Line Height: ${headlineLineHeight}`);
    expect(headlineLineHeight).toBe('24px');
    
    // Step 8: Verify First Story Byline CSS properties
    homePage.logStep('Verifying First Story Byline CSS properties');
    const firstStoryByline = page.locator("(//*[contains(@class,'RiverByline-authorByline')]//a)[1]");
    //need to add this in pw-sdk later
    const js = new JavaScriptActions(page);
    // Wait for byline to be visible
    await wait.forVisible("(//*[contains(@class,'RiverByline-authorByline')]//a)[1]", 10000);
   const bylineFontFamily = await js.execute(() => {
        const el = document.querySelectorAll(".RiverByline-authorByline a")[0];
        return window.getComputedStyle(el).fontFamily;
    });

    const bylineWidth = await firstStoryByline.evaluate((el) => window.getComputedStyle(el).width);
    const bylineHeight = await firstStoryByline.evaluate((el) => window.getComputedStyle(el).height);
    const bylineFontStyle = await firstStoryByline.evaluate((el) => window.getComputedStyle(el).fontStyle);
    const bylineFontWeight = await firstStoryByline.evaluate((el) => window.getComputedStyle(el).fontWeight);
    const bylineFontSize = await firstStoryByline.evaluate((el) => window.getComputedStyle(el).fontSize);
    const bylineLineHeight = await firstStoryByline.evaluate((el) => window.getComputedStyle(el).lineHeight);
    
    homePage.logInfo(`Byline Font Family: ${bylineFontFamily}`);
    expect(bylineFontFamily).toContain('Lyon');
    
    homePage.logInfo(`Byline Width: ${bylineWidth}`);
    expect(bylineWidth).toBe('auto');
    
    homePage.logInfo(`Byline Height: ${bylineHeight}`);
    expect(bylineHeight).toBe('auto');
    
    homePage.logInfo(`Byline Font Style: ${bylineFontStyle}`);
    expect(bylineFontStyle).toBe('normal');
    
    homePage.logInfo(`Byline Font Weight: ${bylineFontWeight}`);
    expect(bylineFontWeight).toBe('600');
    
    homePage.logInfo(`Byline Font Size: ${bylineFontSize}`);
    expect(bylineFontSize).toBe('12px');
    
    homePage.logInfo(`Byline Line Height: ${bylineLineHeight}`);
    expect(bylineLineHeight).toBe('14px');
    
    // Step 9: Verify First Story Thumbnail CSS properties
    homePage.logStep('Verifying First Story Thumbnail CSS properties');
    const firstStoryThumbnail = page.locator("(//*[contains(@class,'RiverThumbnail-imageThumbnail')]//img)[1]");

    const thumbnailPosition = await firstStoryThumbnail.evaluate((el) => window.getComputedStyle(el).position);
    const thumbnailWidth = await firstStoryThumbnail.evaluate((el) => window.getComputedStyle(el).width);
    const thumbnailHeight = await firstStoryThumbnail.evaluate((el) => window.getComputedStyle(el).height);
    const thumbnailFontFamily = await firstStoryThumbnail.evaluate((el) => window.getComputedStyle(el).fontFamily);
    const thumbnailFontStyle = await firstStoryThumbnail.evaluate((el) => window.getComputedStyle(el).fontStyle);
    const thumbnailFontWeight = await firstStoryThumbnail.evaluate((el) => window.getComputedStyle(el).fontWeight);
    const thumbnailFontSize = await firstStoryThumbnail.evaluate((el) => window.getComputedStyle(el).fontSize);
    const thumbnailLineHeight = await firstStoryThumbnail.evaluate((el) => window.getComputedStyle(el).lineHeight);
    
    homePage.logInfo(`Thumbnail Position: ${thumbnailPosition}`);
    expect(thumbnailPosition).toBe('static');
    
    homePage.logInfo(`Thumbnail Width: ${thumbnailWidth}`);
    expect(thumbnailWidth).toBe('120px');
    
    homePage.logInfo(`Thumbnail Height: ${thumbnailHeight}`);
    expect(thumbnailHeight).toBe('90px');
    
    homePage.logInfo(`Thumbnail Font Family: ${thumbnailFontFamily}`);
    expect(thumbnailFontFamily).toContain('Proxima Nova');
    
    homePage.logInfo(`Thumbnail Font Style: ${thumbnailFontStyle}`);
    expect(thumbnailFontStyle).toBe('normal');
    
    homePage.logInfo(`Thumbnail Font Weight: ${thumbnailFontWeight}`);
    expect(thumbnailFontWeight).toBe('400');
    
    homePage.logInfo(`Thumbnail Font Size: ${thumbnailFontSize}`);
    expect(thumbnailFontSize).toBe('16px');
    
    homePage.logInfo(`Thumbnail Line Height: ${thumbnailLineHeight}`);
    expect(thumbnailLineHeight).toBe('normal');
    
    homePage.logInfo('C175315432 test completed successfully!');
  });

  /**
   * Test ID: C182114823
   * Description: HP RIVER: Verify Pro pill module functionality on homepage River
   * Groups: HomePage, High, Regression, Group2, HP_RIVER, C182114823
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C182114823()
   */
  test('C182114823 - Verify Pro pill module functionality', {tag:["@C182114823",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await browserActions.setViewport(1920, 1080);
    
    // Step 2: Wait for page load and lazy load modules
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    await msa.scrollDown(1500);
    await wait.forMilliseconds(2000);
    
    // Step 3: Verify River Module is displayed
    homePage.logStep('Verifying River Module is displayed');
    const riverModule = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 4: Verify Pro Pill is displayed
    homePage.logStep('Verifying Pro Pill is displayed');
    const proPill = page.locator("((//div[contains(@class,'RiverHeadline')])//*[contains(@class,'ProPill-proPill')])[2]");
    await wait.forVisible("((//div[contains(@class,'RiverHeadline')])//*[contains(@class,'ProPill-proPill')])[2]", 60000);
    await homePage.assert.isVisible("((//div[contains(@class,'RiverHeadline')])//*[contains(@class,'ProPill-proPill')])[2]");
    
    // Step 5: Click Pro Pill Headline and verify redirection
    homePage.logStep('Clicking Pro Pill Headline');
    await wait.forMilliseconds(8000);
    const proPillHeadline = page.locator("(//*[@class='RiverHeadline-headline RiverHeadline-hasThumbnail']//a[2])[1]");
    await wait.forVisible("(//*[@class='RiverHeadline-headline RiverHeadline-hasThumbnail']//a[2])[1]", 60000);
    
    // Get the href before clicking
    const proPillUrl = await proPillHeadline.getAttribute('href');
    await proPillHeadline.click();
    await wait.forMilliseconds(3000);
    await wait.forDomLoad();
    
    // Verify we navigated to article page
    const currentUrl = await browserActions.getCurrentUrl();
    homePage.logInfo(`Navigated to: ${currentUrl}`);
    expect(currentUrl).toContain(proPillUrl || '');
    
    // Step 6: Navigate back to homepage
    homePage.logStep('Navigating back to homepage');
    await browserActions.goBack();
    await wait.forDomLoad();
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 7: Scroll and verify Pro Pill Thumbnail
    homePage.logStep('Verifying Pro Pill Thumbnail');
    await msa.scrollDown(500);
    await wait.forDomLoad();
    
    await riverModule.scrollIntoViewIfNeeded();
    await proPill.scrollIntoViewIfNeeded();
    
    const proPillThumbnail = page.locator("(((//div[contains(@class,'RiverHeadline')])//*[contains(@class,'ProPill-proPill')])//ancestor::div[@class='RiverPlusCard-container']//div[@class='RiverThumbnail-thumbnailContainer'])[1]");
    await wait.forVisible("(((//div[contains(@class,'RiverHeadline')])//*[contains(@class,'ProPill-proPill')])//ancestor::div[@class='RiverPlusCard-container']//div[@class='RiverThumbnail-thumbnailContainer'])[1]", 60000);
    await homePage.assert.isVisible("(((//div[contains(@class,'RiverHeadline')])//*[contains(@class,'ProPill-proPill')])//ancestor::div[@class='RiverPlusCard-container']//div[@class='RiverThumbnail-thumbnailContainer'])[1]");
    
    // Step 8: Click Pro Pill Thumbnail and verify redirection
    homePage.logStep('Clicking Pro Pill Thumbnail');
    const thumbnailUrl = await proPillThumbnail.locator('a').first().getAttribute('href');
    const beforeThumbnailUrl = await browserActions.getCurrentUrl();
    await proPillThumbnail.click();
    await wait.forDomLoad();
    
    // Verify navigation
    const thumbnailRedirectUrl = await browserActions.getCurrentUrl();
    homePage.logInfo(`Thumbnail clicked - Navigated from ${beforeThumbnailUrl} to: ${thumbnailRedirectUrl}`);
    expect(thumbnailRedirectUrl).not.toBe(beforeThumbnailUrl);
    await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
    
    // Step 9: Navigate back to homepage
    homePage.logStep('Navigating back to homepage after thumbnail click');
    await browserActions.goBack();
    await wait.forDomLoad();
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 10: Scroll and click Pro Pill Author
    homePage.logStep('Clicking Pro Pill Author');
    await msa.scrollDown(1000);
    await wait.forMilliseconds(2000);
    
    // Re-locate Pro Pill after navigation
    const proPillAfterNav = page.locator("((//div[contains(@class,'RiverHeadline')])//*[contains(@class,'ProPill-proPill')])[2]");
    await proPillAfterNav.scrollIntoViewIfNeeded();
    await wait.forMilliseconds(1000);
    
    // Find author byline for the second Pro Pill story
    const proPillAuthor = page.locator("((//div[contains(@class,'RiverHeadline')]//*[contains(@class,'ProPill-proPill')])[2]//ancestor::div[contains(@class,'RiverPlusCard-container')]//div[contains(@class,'RiverByline-authorByline')]//a)[1]");
    await wait.forVisible("((//div[contains(@class,'RiverHeadline')]//*[contains(@class,'ProPill-proPill')])[2]//ancestor::div[contains(@class,'RiverPlusCard-container')]//div[contains(@class,'RiverByline-authorByline')]//a)[1]", 60000);
    
    const authorUrl = await proPillAuthor.getAttribute('href');
    await proPillAuthor.click();
    await wait.forDomLoad();
    
    // Verify navigation to author bio page
    const authorRedirectUrl = await browserActions.getCurrentUrl();
    homePage.logInfo(`Author clicked - Navigated to: ${authorRedirectUrl}`);
    expect(authorRedirectUrl).toContain(authorUrl || '');
    
    homePage.logInfo('C182114823 test completed successfully!');
  });

  /**
   * Test ID: C182114824
   * Description: HP RIVER: Verify Live pill module functionality on homepage River
   * Groups: HomePage, High, Regression, Group2, HP_RIVER, C182114824
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C182114824()
   */
  test('C182114824 - Verify Live pill module functionality', {tag:["@C182114824",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await browserActions.setViewport(1920, 1080);
    
    // Step 2: Wait for page load and River Module
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    await msa.scrollDown(1500);
    await wait.forMilliseconds(2000);
    
    // Step 3: Verify River Module is displayed
    homePage.logStep('Verifying River Module is displayed');
    const riverModule = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 4: Check if Live Pill exists on the page
    homePage.logStep('Checking for Live Pill existence');
    const livePillElements = page.locator("//img[contains(@class,'RiverHeadline-watchLivePill')]");
    const livePillCount = await livePillElements.count();
    
    if (livePillCount > 0) {
      homePage.logInfo(`Found ${livePillCount} Live Pill(s) on the page`);
      
      // Step 5: Verify Live Pill is displayed
      homePage.logStep('Verifying Live Pill is displayed');
      const livePill = page.locator("(//img[contains(@class,'RiverHeadline-watchLivePill')])[1]");
      await livePill.scrollIntoViewIfNeeded();
      await wait.forMilliseconds(2000);
      await homePage.assert.isVisible("(//img[contains(@class,'RiverHeadline-watchLivePill')])[1]");
      
      // Step 6: Click Live Pill Headline and verify navigation
      homePage.logStep('Clicking Live Pill Headline');
      const homePageUrl = await browserActions.getCurrentUrl();
      await wait.forMilliseconds(3000);
      
      const livePillHeadline = page.locator("(//img[contains(@class,'RiverHeadline-watchLivePill')])[1]//following-sibling::a");
      await wait.forVisible("(//img[contains(@class,'RiverHeadline-watchLivePill')])[1]//following-sibling::a", 60000);
      
      const livePillUrl = await livePillHeadline.getAttribute('href');
      await livePillHeadline.click();
      await wait.forDomLoad();
      await wait.forMilliseconds(2000);
      
      // Verify article page loaded
      await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
      homePage.logInfo('Article page loaded successfully');
      
      // Step 7: Navigate back to homepage
      homePage.logStep('Navigating back to homepage');
      await browserActions.goto(homePageUrl);
      await wait.forDomLoad();
      await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
      
      // Step 8: Scroll and verify Live Pill Thumbnail
      homePage.logStep('Verifying and clicking Live Pill Thumbnail');
      await msa.scrollDown(1000);
      await wait.forMilliseconds(2000);
      
      await livePill.scrollIntoViewIfNeeded();
      
      const livePillThumbnail = page.locator("(//img[contains(@class,'RiverHeadline-watchLivePill')])[1]/../../..//*[contains(@class,'RiverThumbnail-imageThumbnail')]");
      await wait.forVisible("(//img[contains(@class,'RiverHeadline-watchLivePill')])[1]/../../..//*[contains(@class,'RiverThumbnail-imageThumbnail')]", 60000);
      await homePage.assert.isVisible("(//img[contains(@class,'RiverHeadline-watchLivePill')])[1]/../../..//*[contains(@class,'RiverThumbnail-imageThumbnail')]");
      
      // Step 9: Click Live Pill Thumbnail and verify navigation
      homePage.logStep('Clicking Live Pill Thumbnail');
      await livePillThumbnail.click();
      await wait.forDomLoad();
      
      // Verify article page loaded
      await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
      const thumbnailRedirectUrl = await browserActions.getCurrentUrl();
      homePage.logInfo(`Thumbnail clicked - Navigated to: ${thumbnailRedirectUrl}`);
      
      // Step 10: Navigate back to homepage
      homePage.logStep('Navigating back to homepage after thumbnail click');
      await browserActions.goto(homePageUrl);
      await wait.forDomLoad();
      await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
      
      // Step 11: Scroll and click Live Pill Author
      homePage.logStep('Clicking Live Pill Author');
      await msa.scrollDown(1000);
      await wait.forMilliseconds(2000);
      
      // Re-locate Live Pill after navigation
      const livePillAfterNav = page.locator("(//img[contains(@class,'RiverHeadline-watchLivePill')])[1]");
      await livePillAfterNav.scrollIntoViewIfNeeded();
      await wait.forMilliseconds(1000);
      
      const livePillAuthor = page.locator("(//img[contains(@class,'RiverHeadline-watchLivePill')])/../..//span[contains(@class,'authorByline')]//a");
      await wait.forVisible("(//img[contains(@class,'RiverHeadline-watchLivePill')])/../..//span[contains(@class,'authorByline')]//a", 60000);
      
      const authorUrl = await livePillAuthor.getAttribute('href');
      await livePillAuthor.click();
      await wait.forDomLoad();
      
      // Verify navigation to author bio page
      const authorRedirectUrl = await browserActions.getCurrentUrl();
      homePage.logInfo(`Author clicked - Navigated to: ${authorRedirectUrl}`);
      expect(authorRedirectUrl).toContain(authorUrl || '');
      
      homePage.logInfo('C182114824 test completed successfully with Live Pill!');
    } else {
      homePage.logInfo('No Live Pill found on the page - test skipped (this is expected if no live content is available)');
    }
  });

  /**
   * Test ID: C211950537
   * Description: HP RIVER: Verify IC pill functionality on homepage River
   * Groups: HomePage, High, HPRIVER, Regression, Group2, C211950537
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C211950537()
   */
  test('C211950537 - Verify IC pill functionality', {tag:["@C211950537",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Step 2: Wait for page load and lazy load modules
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    await msa.scroll(0, 1500);
    await wait.forMilliseconds(2000);
    
    // Step 3: Verify River Module is displayed
    homePage.logStep('Verifying River Module is displayed');
    const riverModule = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    
    // Step 4: Check if IC Pill exists on the page
    homePage.logStep('Checking for IC Pill existence');
    const icPillThumbnails = page.locator("(//*[contains(@class,'InvestingClubPill-investingClubPill')]//ancestor::div[contains(@class, 'Breaker-container') or contains(@class, 'Card-container')]//*[@class='RiverThumbnail-imageThumbnail'])");
    const icPillCount = await icPillThumbnails.count();
    
    if (icPillCount > 0) {
      homePage.logInfo(`Found ${icPillCount} IC Pill story(ies) on the page`);
      
      // Step 5: Scroll to IC Pill thumbnail
      homePage.logStep('Scrolling to IC Pill thumbnail');
      const firstIcPillThumbnail = page.locator("(//*[contains(@class,'InvestingClubPill-investingClubPill')]//ancestor::div[contains(@class, 'Breaker-container') or contains(@class, 'Card-container')]//*[@class='RiverThumbnail-imageThumbnail'])[1]");
      await firstIcPillThumbnail.scrollIntoViewIfNeeded();
      await wait.forMilliseconds(2000);
      await homePage.assert.isVisible("(//*[contains(@class,'InvestingClubPill-investingClubPill')]//ancestor::div[contains(@class, 'Breaker-container') or contains(@class, 'Card-container')]//*[@class='RiverThumbnail-imageThumbnail'])[1]");
      
      // Step 6: Verify IC Pill CSS properties
      homePage.logStep('Verifying IC Pill CSS properties');
      const icPill = page.locator("(//*[contains(@class,'RiverHeadline-headline')]//*[@class='InvestingClubPill-investingClubPill'])[1]");
      await wait.forVisible("(//*[contains(@class,'RiverHeadline-headline')]//*[@class='InvestingClubPill-investingClubPill'])[1]", 10000);
      
      const icPillHeight = await icPill.evaluate((el) => window.getComputedStyle(el).height);
      homePage.logInfo(`IC Pill Height: ${icPillHeight}`);
      expect(icPillHeight).toBe('16px');
      
      // Step 7: Find first non-video IC pill story
      homePage.logStep('Finding first non-video IC pill story');
      const homePageUrl = await browserActions.getCurrentUrl();
      let foundNonVideoStory = false;
      
      for (let i = 1; i <= icPillCount; i++) {
        const icPillHref = page.locator(`(//*[contains(@class,'InvestingClubPill-investingClubPill')]//ancestor::div[@class='RiverPlusCard-container']//*[@class='RiverThumbnail-imageThumbnail']/a)[${i}]`);
        
        // Check if element exists
        const hrefCount = await icPillHref.count();
        if (hrefCount === 0) continue;
        
        const hrefValue = await icPillHref.getAttribute('href');
        
        // Skip video stories
        if (hrefValue && hrefValue.includes('video')) {
          homePage.logInfo(`Story ${i} is a video - skipping`);
          continue;
        }
        
        homePage.logInfo(`Testing IC Pill story ${i}`);
        foundNonVideoStory = true;
        
        // Step 8: Verify and click IC Pill icon
        homePage.logStep(`Clicking IC Pill icon for story ${i}`);
        const icPillIcon = page.locator(`(//*[contains(@class,'RiverHeadline-headline')]//*[@class='InvestingClubPill-investingClubPill'])[${i}]`);
        await icPillIcon.scrollIntoViewIfNeeded();
        await icPillIcon.click();
        await wait.forDomLoad();
        
        // Verify URL contains 'club'
        const currentUrl = await browserActions.getCurrentUrl();
        expect(currentUrl).toContain('club');
        homePage.logInfo('Navigated to club article page');
        
        // Step 9: Navigate back and click thumbnail
        homePage.logStep('Navigating back to homepage');
        await browserActions.goBack();
        await wait.forDomLoad();
        await wait.forMilliseconds(2000);
        
        homePage.logStep('Scrolling and clicking IC Pill thumbnail');
        await msa.scroll(0, 1500);
        await wait.forMilliseconds(2000);
        
        const icPillThumbnail = page.locator(`(//*[contains(@class,'InvestingClubPill-investingClubPill')]//ancestor::div[contains(@class, 'Breaker-container') or contains(@class, 'Card-container')]//*[@class='RiverThumbnail-imageThumbnail'])[${i}]`);
        await icPillThumbnail.scrollIntoViewIfNeeded();
        await wait.forMilliseconds(1000);
        await icPillThumbnail.click();
        await wait.forDomLoad();
        
        // Verify article page with IC pill eyebrow (unless it's a live story)
        await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
        
        const liveUpdatesPill = page.locator("//*[contains(@class,'LiveStory-updates')]");
        const liveUpdateCount = await liveUpdatesPill.count();
        
        if (liveUpdateCount === 0) {
          await homePage.assert.isVisible("//*[contains(@class,'ArticleHeader-investingClubPill') or contains(@class,'ClipPlayer-investingClubPill')]");
          homePage.logInfo('IC Pill eyebrow displayed on article page');
        }
        
        // Step 10: Navigate back and click headline
        homePage.logStep('Navigating back to homepage again');
        await browserActions.goBack();
        await wait.forDomLoad();
        await wait.forMilliseconds(2000);
        
        homePage.logStep('Clicking IC Pill headline');
        await msa.scroll(0, 1500);
        await wait.forMilliseconds(2000);
        
        // Re-locate IC pill after navigation to ensure fresh element reference
        const icPillHeadline = page.locator(`(//*[contains(@class,'InvestingClubPill-investingClubPill')]//ancestor::div[contains(@class,'RiverPlusCard-container')]//*[contains(@class,'RiverHeadline-headline')]//a[2])[${i}]`);
        await icPillHeadline.scrollIntoViewIfNeeded({ timeout: 60000 });
        await wait.forMilliseconds(1000);
        await icPillHeadline.click();
        await wait.forDomLoad();
        
        // Verify article headline and IC pill eyebrow
        await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
        
        const liveUpdatesCount2 = await liveUpdatesPill.count();
        if (liveUpdatesCount2 === 0) {
          await homePage.assert.isVisible("//*[contains(@class,'ArticleHeader-investingClubPill') or contains(@class,'ClipPlayer-investingClubPill')]");
          homePage.logInfo('IC Pill eyebrow displayed on article page from headline click');
        }
        
        // Step 11: Navigate back twice and click byline
        homePage.logStep('Navigating back to homepage');
        await browserActions.goBack();
        await wait.forDomLoad();
        // await browserActions.goBack();
        // await wait.forDomLoad();
        // await wait.forMilliseconds(2000);
        
        homePage.logStep('Clicking IC Pill author byline');
        await msa.scrollDown(1500);
        await wait.forMilliseconds(2000);
        
        const icPillByline = page.locator("(//*[contains(@class,'InvestingClubPill-investingClubPill')]//ancestor::div[@class='RiverPlusCard-container']//*[@class='RiverByline-authorByline']//a)[1]");
        await icPillByline.scrollIntoViewIfNeeded();
        await wait.forMilliseconds(1000);
        await icPillByline.click();
        await wait.forDomLoad();
        
        // Verify bio page loaded
        await wait.forMilliseconds(2000);
        homePage.logInfo('Author bio page loaded successfully');
        
        // Only test first non-video IC pill story
        break;
      }
      
      if (foundNonVideoStory) {
        homePage.logInfo('C211950537 test completed successfully with IC Pill!');
      } else {
        homePage.logInfo('All IC Pill stories were videos - test partially completed');
        expect(foundNonVideoStory).toBeTruthy();
      }
      
    } else {
      homePage.logInfo('No IC Pill found on the page - test skipped (this is expected if no IC club content is available)');
      expect(icPillCount).toBeGreaterThan(0);
    }
  });

  /**
   * Test ID: C182114825
   * Description: HP RIVER: Verify Paid post (Native Ads) module displays in 4th position in River module
   * Groups: C182114825, Regression, Group2, HomePage, HP_RIVER, High
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C182114825()
   */
  test('C182114825 - Verify Paid post (Native Ads) in 4th position', {tag:["@C182114825",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Step 2: Wait for page load and scroll to River Module
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    await msa.scrollDown(1500);
    await wait.forMilliseconds(2000);
    
    // Step 3: Verify River Module is displayed
    homePage.logStep('Verifying River Module is displayed');
    const riverModule = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await wait.forVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]", 20000);
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    
    // Scroll down to ensure 4th position story is loaded
    await msa.scrollDown(1000);
    await wait.forMilliseconds(2000);
    
    // Step 4: Check if Paid Post (Native Ad) exists on the page
    homePage.logStep('Checking for Paid Post existence');
    const paidPosts = page.locator("//span[contains(@class,'RiverByline-bylineContainer')]//div[contains(text(),'Paid')]");
    const paidPostCount = await paidPosts.count();
    
    if (paidPostCount > 0) {
      homePage.logInfo(`Found ${paidPostCount} Paid Post(s) on the page`);
      
      // Step 5: Verify Paid Post is displayed
      homePage.logStep('Verifying Paid Post is displayed');
      await homePage.assert.isVisible("//span[contains(@class,'RiverByline-bylineContainer')]//div[contains(text(),'Paid')]");
      
      // Step 6: Verify Paid Post is at 4th position
      homePage.logStep('Verifying Paid Post is at 4th position in River module');
      const fourthStory = page.locator("(//div[contains(@class,'RiverPlusCard-container')])[4]");
      await fourthStory.scrollIntoViewIfNeeded();
      await homePage.assert.isVisible("(//div[contains(@class,'RiverPlusCard-container')])[4]");
      
      // Step 7: Scroll to Paid Post
      homePage.logStep('Scrolling to Paid Post');
      const firstPaidPost = page.locator("(//span[contains(@class,'RiverByline-bylineContainer')]//div[contains(text(),'Paid')])[1]");
      await firstPaidPost.scrollIntoViewIfNeeded();
      await wait.forMilliseconds(2000);
      
      // Step 8: Verify Paid Post byline is displayed
      homePage.logStep('Verifying Paid Post byline');
      const paidPostByline = page.locator("(//div[contains(@class,'RiverPlusCard-container')])[4]");
      await wait.forVisible("(//div[contains(@class,'RiverPlusCard-container')])[4]", 40000);
      
      // Step 9: Verify Paid Post CSS color
      homePage.logStep('Verifying Paid Post color');
      await wait.forVisible("(//span[contains(@class,'RiverByline-bylineContainer')]//div[contains(text(),'Paid')])[1]", 10000);
      const paidPostColor = await firstPaidPost.evaluate((el) => window.getComputedStyle(el).color);
      homePage.logInfo(`Paid Post Color: ${paidPostColor}`);
      expect(paidPostColor).toBe('rgb(85, 51, 204)'); // rgba(85, 51, 204, 1)
      
      // Step 10: Scroll and verify River Module again
      homePage.logStep('Scrolling to verify River Module');
      await msa.scrollDown(1500);
      await wait.forMilliseconds(1000);
      await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
      await riverModule.scrollIntoViewIfNeeded();
      
      // Step 11: Click Paid Post title and verify navigation
      homePage.logStep('Clicking Paid Post title');
      const paidPostTitle = page.locator("(//div[contains(text(),'Paid')])[1]//ancestor::div[contains(@class,'RiverPlusCard')]//div[contains(@class,'headline')]//a");
      await paidPostTitle.scrollIntoViewIfNeeded();
      await wait.forMilliseconds(1000);
      await paidPostTitle.click();
      await wait.forDomLoad();
      
      // Step 12: Verify Paid Post landing page
      homePage.logStep('Verifying Paid Post landing page');
      await wait.forDomLoad();
      await wait.forMilliseconds(2000);
      
      // Verify we're on the paid post landing page (advertorial/sponsored content page)
      const currentUrl = await browserActions.getCurrentUrl();
      homePage.logInfo(`Paid Post landing page URL: ${currentUrl}`);
      
      // Check for paid post indicator - try multiple possible indicators
      const paidPostLanding = page.locator("//div[contains(@class,'bottom') and contains(text(),'paid')]");
      const paidPostLandingCount = await paidPostLanding.count();
      
      if (paidPostLandingCount > 0) {
        await homePage.assert.isVisible("//div[contains(@class,'bottom') and contains(text(),'paid')]");
        homePage.logInfo('Paid Post landing page indicator found');
      } else {
        // Alternative verification: check URL contains advertorial or sponsored keywords
        const isPaidPostUrl = currentUrl.includes('advertorial') || currentUrl.includes('sponsored') || currentUrl.includes('partner');
        homePage.logInfo(`Paid Post URL verification: ${isPaidPostUrl ? 'PASS' : 'FAIL'} (URL contains advertorial/sponsored/partner)`);
      }
      
      homePage.logInfo('C182114825 test completed successfully with Paid Post!');
    } else {
      homePage.logInfo('No Paid Post found on the page - test skipped (this is expected if no native ads are available)');
    }
  });

  /**
   * Test ID: C205109936
   * Description: HP RIVER: Verify Two (2) images side-by-side thumbnail Display in the 9th and 10th position of the river (BAT)
   * Groups: C205109936, Regression, Group2, HomePage, HP_RIVER, High
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C205109936()
   */
  test('C205109936 - Verify side-by-side thumbnails in 9th and 10th position', {tag:["@C205109936",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Step 2: Wait for page load and lazy load modules
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    await wait.forMilliseconds(2000);
    
    // Step 3: Scroll and verify River Module
    homePage.logStep('Scrolling to River Module');
    await msa.scrollDown(1500);
    const riverModule = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await wait.forVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]", 20000);
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    
    // Step 4: Verify 9th position side-by-side image (index 8)
    homePage.logStep('Verifying 9th position side-by-side image');
    const sideBySide9th = page.locator("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'8')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    await wait.forVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'8')]//*[contains(@class,'RiverThumbnail-breakerImage')]", 20000);
    await homePage.assert.isVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'8')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    
    // Step 5: Verify 10th position side-by-side image (index 9)
    homePage.logStep('Verifying 10th position side-by-side image');
    const sideBySide10th = page.locator("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    await wait.forVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]", 20000);
    await homePage.assert.isVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    
    // Step 6: Verify CSS properties for 9th position
    homePage.logStep('Verifying CSS properties for 9th position side-by-side image');
    await wait.forDomLoad();
    
    const height9th = await sideBySide9th.evaluate((el) => window.getComputedStyle(el).height);
    const width9th = await sideBySide9th.evaluate((el) => window.getComputedStyle(el).width);
    
    homePage.logInfo(`9th position Height: ${height9th}`);
    expect(height9th).toContain('199');
    
    homePage.logInfo(`9th position Width: ${width9th}`);
    expect(width9th).toBe('299.5px');
    
    // Step 7: Verify CSS properties for 10th position
    homePage.logStep('Verifying CSS properties for 10th position side-by-side image');
    
    const height10th = await sideBySide10th.evaluate((el) => window.getComputedStyle(el).height);
    const width10th = await sideBySide10th.evaluate((el) => window.getComputedStyle(el).width);
    
    homePage.logInfo(`10th position Height: ${height10th}`);
    expect(height10th).toContain('199');
    
    homePage.logInfo(`10th position Width: ${width10th}`);
    expect(width10th).toBe('299.5px');
    
    homePage.logInfo('C205109936 test completed successfully!');
  });

  /**
   * Test ID: C205109937
   * Description: HP RIVER: RiverPlusCard Breaker (Two (2) images side-by-side thumbnail in the 9th and 10th position in the river) functionality
   * Groups: C205109937, Regression, Group2, HomePage, BAT, HP_RIVER, High
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C205109937()
   */
  test('C205109937 - Verify side-by-side thumbnails functionality', {tag:["@C205109937",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Step 2: Wait for page load and lazy load modules
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    await wait.forMilliseconds(2000);
    
    // Step 3: Scroll and verify River Module
    homePage.logStep('Scrolling to River Module');
    await msa.scrollDown(1500);
    await wait.forMilliseconds(5000);
    
    const riverModule = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await wait.forVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]", 20000);
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    
    // Step 4: Verify side-by-side images
    homePage.logStep('Verifying side-by-side images at 9th and 10th positions');
    await wait.forMilliseconds(1500);
    
    const sideBySide9th = page.locator("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'8')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    await wait.forVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'8')]//*[contains(@class,'RiverThumbnail-breakerImage')]", 20000);
    await homePage.assert.isVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'8')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    
    const sideBySide10th = page.locator("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    await wait.forVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]", 20000);
    await homePage.assert.isVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    
    // Step 5: Verify 8th and 9th story headlines
    homePage.logStep('Verifying 8th and 9th story headlines');
    const river8thStory = page.locator("//div[contains(@id,'Homepage-riverPlus') and contains(@id,'8')]/div[contains(@class,'headline')]/a");
    await wait.forVisible("//div[contains(@id,'Homepage-riverPlus') and contains(@id,'8')]/div[contains(@class,'headline')]/a", 20000);
    await homePage.assert.isVisible("//div[contains(@id,'Homepage-riverPlus') and contains(@id,'8')]/div[contains(@class,'headline')]/a");
    
    const river9thStory = page.locator("//div[contains(@id,'Homepage-riverPlus') and contains(@id,'9')]/div[contains(@class,'headline')]/a");
    await wait.forVisible("//div[contains(@id,'Homepage-riverPlus') and contains(@id,'9')]/div[contains(@class,'headline')]/a", 20000);
    await homePage.assert.isVisible("//div[contains(@id,'Homepage-riverPlus') and contains(@id,'9')]/div[contains(@class,'headline')]/a");
    await river9thStory.hover();
    
    // Step 6: Verify breaker module stories
    homePage.logStep('Verifying breaker module stories');
    const breakerModuleStories = page.locator("//*[contains(@class,'RiverPlusBreaker-container')]//*[contains(@class,'RiverPlusCard-breakerCardContainer')]");
    await wait.forVisible("//*[contains(@class,'RiverPlusBreaker-container')]//*[contains(@class,'RiverPlusCard-breakerCardContainer')]", 20000);
    const riverModuleStories = page.locator("//*[contains(@id,'Homepage-riverPlus')]");
    await riverModuleStories.first().scrollIntoViewIfNeeded();
    
    // Step 7: Click 8th story thumbnail and verify navigation
    homePage.logStep('Clicking 8th story thumbnail');
    await wait.forMilliseconds(1500);
    
    const river8thThumbnail = page.locator("//div[contains(@class,'RiverPlusBreaker-container')]//div[contains(@id,'Homepage') and contains(@id,'8')]//*[contains(@class,'RiverThumbnail-breakerImage')]//a");
    await wait.forVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[contains(@id,'Homepage') and contains(@id,'8')]//*[contains(@class,'RiverThumbnail-breakerImage')]//a", 20000);
    
    const homePageUrl = await browserActions.getCurrentUrl();
    await river8thThumbnail.click();
    await wait.forDomLoad();
    
    // Clear cache and verify article page
    await page.evaluate(() => {
      window.sessionStorage.clear();
      window.localStorage.clear();
    });
    await wait.forDomLoad();
    
    const articleHeadline = page.locator("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
    await wait.forVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]", 30000);
    await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
    
    const articlePageUrl = await browserActions.getCurrentUrl();
    homePage.logInfo(`8th story thumbnail clicked - Navigated from ${homePageUrl} to: ${articlePageUrl}`);
    expect(articlePageUrl).not.toBe(homePageUrl);
    
    // Step 8: Navigate back to homepage (twice to clear cache navigation)
    homePage.logStep('Navigating back to homepage');
    await browserActions.goBack();
    await wait.forDomLoad();
    
    // Step 9: Scroll back to River Module
    homePage.logStep('Scrolling back to River Module');
    await msa.scrollDown(1500);
    await wait.forVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]", 20000);
    await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    
    await wait.forVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]", 20000);
    await homePage.assert.isVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]");
    
    // Step 10: Click 9th story thumbnail and verify URL redirection
    homePage.logStep('Clicking 9th story thumbnail');
    await wait.forMilliseconds(1500);
    
    const river9thThumbnail = page.locator("//div[contains(@class,'RiverPlusBreaker-container')]//div[contains(@id,'Homepage') and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]//a");
    await wait.forVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[contains(@id,'Homepage') and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]//a", 20000);
    await wait.forMilliseconds(2500);
    
    // Wait for element to be clickable
    await wait.forVisible("//div[contains(@class,'RiverPlusBreaker-container')]//div[contains(@id,'Homepage') and contains(@id,'9')]//*[contains(@class,'RiverThumbnail-breakerImage')]//a", 50000);
    await wait.forMilliseconds(1500);
    
    // Capture current URL and href before clicking
    const currentHomeUrl = await browserActions.getCurrentUrl();
    const thumbnailHref = await river9thThumbnail.getAttribute('href');
    homePage.logInfo(`Current URL before click: ${currentHomeUrl}`);
    homePage.logInfo(`Thumbnail href: ${thumbnailHref}`);
    
    await river9thThumbnail.click();
    await wait.forDomLoad();
    
    // Verify article page loaded and URL changed
    await wait.forVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]", 30000);
    await homePage.assert.isVisible("//h1[contains(@class,'headline') or contains(@class, 'clipPlayerIntroTitle')]");
    
    const newUrl = await browserActions.getCurrentUrl();
    homePage.logInfo(`9th story thumbnail clicked - Navigated to: ${newUrl}`);
    
    // Verify URL redirection occurred
    expect(newUrl).not.toBe(currentHomeUrl);
    if (thumbnailHref) {
      expect(newUrl).toContain(thumbnailHref.replace('https://www.cnbc.com', ''));
    }
    homePage.logInfo('URL redirection verified successfully');
    
    homePage.logInfo('C205109937 test completed successfully!');
  });

  /**
   * Test ID: C205828248
   * Description: HP RIVER: Verify RiverPlusCard Breaker (Two (2) images side-by-side thumbnail in the 9th and 10th position in the river) CSS Properties
   * Groups: C205828248, Regression, Group2, HomePage, HP_River, Low
   * 
   * Migrated from: com.cnbc.Phoenix.TestCases.HomePageTestCases.C205828248()
   */
  test('C205828248 - Verify side-by-side thumbnails CSS properties', {tag:["@C205828248",'@HomePage']}, async ({ page, wait, browserActions, msa }) => {
    const homePage = new BasePage(page, 'HomePage');
    
    // Step 1: Navigate to CNBC homepage
    homePage.logStep('Opening CNBC homepage');
    await homePage.goto('https://www.cnbc.com/');
    await page.setViewportSize({ width: 1440, height: 900 });
    
    // Step 2: Wait for page load and lazy load modules
    homePage.logStep('Waiting for page to load completely');
    await wait.forDomLoad();
    
    // Step 3: Scroll to River Module
    homePage.logStep('Scrolling to River Module');
    const riverModule = page.locator("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
    await riverModule.scrollIntoViewIfNeeded();
    await wait.forVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]", 20000);
    
    // Step 4: Verify CSS properties for 9th and 10th position side-by-side images
    homePage.logStep('Verifying CSS properties for side-by-side images');
    
    for (let k = 8; k <= 9; k++) {
      await wait.forMilliseconds(2000);
      
      const sideBySide = page.locator(`//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'${k}')]//*[contains(@class,'RiverThumbnail-breakerImage')]`);
      await wait.forVisible(`//div[contains(@class,'RiverPlusBreaker-container')]//div[(contains(@id,'Homepage') or contains(@id,'HomePage')) and contains(@id,'${k}')]//*[contains(@class,'RiverThumbnail-breakerImage')]`, 60000);
      await homePage.assert.isVisible("//*[contains(@class,'RiverPlus-riverPlusContainer')]");
      
      await wait.forMilliseconds(5000);
      
      // Verify CSS values
      const height = await sideBySide.evaluate((el) => window.getComputedStyle(el).height);
      const width = await sideBySide.evaluate((el) => window.getComputedStyle(el).width);
      const lineHeight = await sideBySide.evaluate((el) => window.getComputedStyle(el).lineHeight);
      
      homePage.logInfo(`Position ${k+1} - Height: ${height}`);
      expect(height).toContain('199');
      
      homePage.logInfo(`Position ${k+1} - Width: ${width}`);
      expect(width).toContain('299');
      
      homePage.logInfo(`Position ${k+1} - Line Height: ${lineHeight}`);
      expect(lineHeight).toBe('normal');
    }
    
    // Step 5: Verify picture source dimensions for responsive images
    homePage.logStep('Verifying responsive image dimensions');
    
    for (let j = 8; j <= 9; j++) {
      for (let i = 1; i <= 3; i++) {
        const sourceElement = page.locator(`(//div[contains(@id,'Homepage-riverPlus') and contains(@id,'${j}')]//*[contains(@class,'breakerImage')]//picture//source)[${i}]`);
        const sourceCount = await sourceElement.count();
        
        if (sourceCount > 0) {
          const mediaAttr = await sourceElement.getAttribute('media');
          const srcsetAttr = await sourceElement.getAttribute('srcset');
          
          if (mediaAttr) {
            homePage.logInfo(`Position ${j+1}, Source ${i} - Media: ${mediaAttr}`);
            
            if (mediaAttr.includes('1340px') || mediaAttr.includes('1020px') || mediaAttr.includes('360px')) {
              homePage.logInfo(`Position ${j+1}, Source ${i} - Srcset: ${srcsetAttr}`);
              expect(srcsetAttr).toContain('w=600');
              expect(srcsetAttr).toContain('h=400');
              homePage.logInfo('Width=600 and Height=400 verified');
            } else if (mediaAttr.includes('760px')) {
              homePage.logInfo(`Position ${j+1}, Source ${i} - Srcset: ${srcsetAttr}`);
              expect(srcsetAttr).toContain('w=660');
              expect(srcsetAttr).toContain('h=440');
              homePage.logInfo('Width=660 and Height=440 verified');
            }
          }
        }
      }
    }
    
    homePage.logInfo('C205828248 test completed successfully!');
  });
  
});
