import { test as base, chromium } from '@playwright/test';
import { WaitHelpers, BrowserActions, MouseActions } from '@cnbc/playwright-sdk';
import path from 'path';

// LambdaTest capabilities
const capabilities = {
  browserName: "Chrome",
  browserVersion: "latest",
  "LT:Options": {
    platform: "Windows 11",
    build: process.env.LT_BUILD_NAME || "CNBC Playwright Web Tests",
    name: "CNBC Test",
    user: process.env.LT_USER,
    accessKey: process.env.LT_PASS,
    network: true,
    video: true,
    console: true,
    visual: true,
    tunnel: false,
    tunnelName: "",
    geoLocation: "US",
  },
};

// Modify capabilities dynamically based on project and test info
const modifyCapabilities = (configName: string, testName: string) => {
  // Handle project names like "lambdatest-chrome-win11" or "chrome:latest:Windows 10@lambdatest"
  let config = configName.split("@lambdatest")[0];
  
  // Check if format is "browser:version:platform" or "lambdatest-browser-platform"
  if (config.includes(":")) {
    let [browserName, browserVersion, platform] = config.split(":");
    capabilities.browserName = browserName || capabilities.browserName;
    capabilities.browserVersion = browserVersion || capabilities.browserVersion;
    capabilities["LT:Options"]["platform"] = platform || capabilities["LT:Options"]["platform"];
  } else if (config.startsWith("lambdatest-")) {
    // Parse "lambdatest-chrome-win11" format
    const parts = config.replace("lambdatest-", "").split("-");
    const browser = parts[0]; // chrome, firefox, webkit, edge
    
    // Map browser names to LambdaTest format
    const browserMap: { [key: string]: string } = {
      'chrome': 'Chrome',
      'chromium': 'Chrome',
      'edge': 'MicrosoftEdge',
      'firefox': 'pw-firefox',
      'webkit': 'pw-webkit'
    };
    
    capabilities.browserName = browserMap[browser] || 'Chrome';
    
    // Parse platform (e.g., "win11" -> "Windows 11")
    if (parts.length > 1) {
      const platformPart = parts.slice(1).join("-");
      const platformMap: { [key: string]: string } = {
        'win11': 'Windows 11',
        'win10': 'Windows 10',
        'macos': 'macOS Big Sur',
        'linux': 'Ubuntu 20.04'
      };
      capabilities["LT:Options"]["platform"] = platformMap[platformPart] || capabilities["LT:Options"]["platform"];
    }
  }
  
  capabilities["LT:Options"]["name"] = testName;
};

const getErrorMessage = (obj: any, keys: string[]) =>
  keys.reduce(
    (obj, key) => (typeof obj == "object" ? obj[key] : undefined),
    obj
  );

// Extend base test with LambdaTest capabilities and SDK helpers
export const test = base.extend<{
  wait: WaitHelpers;
  browserActions: BrowserActions;
  msa: MouseActions;
}>({
  page: async ({ page, playwright }, use, testInfo) => {
    let fileName = testInfo.file.split(path.sep).pop();
    
    // Configure LambdaTest platform for cross-browser testing
    if (testInfo.project.name.match(/lambdatest/)) {
      modifyCapabilities(
        testInfo.project.name,
        `${testInfo.title} - ${fileName}`
      );

      const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
          JSON.stringify(capabilities)
        )}`,
      });

      const ltPage = await browser.newPage(testInfo.project.use);
      
      // Initialize SDK helpers with LambdaTest page
      const wait = new WaitHelpers(ltPage);
      const browserActions = new BrowserActions(ltPage);
      const msa = new MouseActions(ltPage);
      
      await use(ltPage);

      // Mark test status at the end
      const testStatus = {
        action: "setTestStatus",
        arguments: {
          status: testInfo.status,
          remark: getErrorMessage(testInfo, ["error", "message"]),
        },
      };
      await ltPage.evaluate(() => {},
        `lambdatest_action: ${JSON.stringify(testStatus)}`);
      await ltPage.close();
      await browser.close();
    } else {
      // Run tests locally when not using LambdaTest project
      await use(page);
    }
  },
  
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
});

export { expect } from '@playwright/test';
