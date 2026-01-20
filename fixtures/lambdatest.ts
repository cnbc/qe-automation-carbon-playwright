import { test as base } from '@playwright/test';
import { WaitHelpers, BrowserActions, MouseActions } from '@cnbc/playwright-sdk';

// Extend base test with LambdaTest capabilities and SDK helpers
export const test = base.extend<{
  wait: WaitHelpers;
  browserActions: BrowserActions;
  msa: MouseActions;
}>({
  wait: async ({ page }, use) => {
    const wait = new WaitHelpers(page);
    await use(wait);
  },
  
  browserActions: async ({ page }, use) => {
    const browserActions = new BrowserActions(page);
    await use(browserActions);
  },
  
  msa: async ({ page }, use) => {
    const msa = new MouseActions(page);
    await use(msa);
  },
  
  page: async ({ page, context }, use, testInfo) => {
    // Update LambdaTest session with test name using the correct Playwright format
    if (process.env.LT_USERNAME && process.env.LT_ACCESS_KEY) {
      await page.evaluate(() => {}, `lambdatest_executor: ${JSON.stringify({ 
        action: 'setTestName', 
        arguments: { name: testInfo.title } 
      })}`);
    }
    await use(page);
    
    // Mark test status at the end
    if (process.env.LT_USERNAME && process.env.LT_ACCESS_KEY) {
      await page.evaluate(() => {}, `lambdatest_executor: ${JSON.stringify({ 
        action: 'setTestStatus', 
        arguments: { 
          status: testInfo.status === 'passed' ? 'passed' : 'failed',
          remark: testInfo.error?.message || ''
        } 
      })}`);
    }
  },
});

export { expect } from '@playwright/test';
