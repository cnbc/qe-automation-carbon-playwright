import { test as base, chromium, type Browser, type BrowserContext, type Page } from '@playwright/test';
import { WaitHelpers, BrowserActions, MouseActions } from '@cnbc/playwright-sdk';
import path from 'path';

// Generate build name once at module load time (not per test)
const BUILD_NAME = process.env.LT_BUILD_NAME || `Carbon Playwright Tests - ${new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/,/g, '')}`;

// LambdaTest capabilities
const ltOptions: Record<string, any> = {
  platform: "MacOS Tahoe",
  build: BUILD_NAME,
  name: "Carbon Automation Tests",
  user: process.env.LT_USER,
  accessKey: process.env.LT_PASS,
  network: true,
  video: true,
  console: true,
  visual: true,
  tunnel: false,
  tunnelName: "",
  geoLocation: "US",
};

// If you really need to force a specific window size in LambdaTest, set LT_RESOLUTION, e.g. "1920x1080".
// Otherwise we do NOT hardcode it (viewport/window sizing is handled by Playwright config + page viewport logic).
if (process.env.LT_RESOLUTION) {
  ltOptions.resolution = process.env.LT_RESOLUTION;
}

const capabilities = {
  browserName: "Chrome",
  browserVersion: "latest",
  "LT:Options": ltOptions,
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
        'macos-tahoe': 'MacOS Tahoe',
        'macos-ventura': 'macOS Ventura',
        'macos-sonoma': 'macOS Sonoma',
        'macos-monterey': 'macOS Monterey',
        'macos-sequoia': 'MacOS Sequoia',

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
  browser: Browser;
  context: BrowserContext;
  wait: WaitHelpers;
  browserActions: BrowserActions;
  msa: MouseActions;
}>({
  browser: [
    async ({}, use, workerInfo) => {
      // Expose workerIndex for helpers running outside testInfo context (e.g. in reusable methods).
      process.env.PW_WORKER_INDEX = String(workerInfo.workerIndex);

      const projectName = workerInfo.project.name;

      if (projectName.match(/lambdatest/)) {
        // Configure LambdaTest platform (once per worker connection).
        modifyCapabilities(projectName, `Worker ${workerInfo.workerIndex} - ${projectName}`);

        const ltBrowser = await chromium.connect({
          wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
            JSON.stringify(capabilities),
          )}`,
        });

        // Wait for connection to stabilize
        await new Promise((resolve) => setTimeout(resolve, 750));

        try {
          await use(ltBrowser);
        } finally {
          try {
            await ltBrowser.close();
          } catch {
            // ignore
          }
        }
        return;
      }

      // Local run: launch one browser per worker (Playwright contexts will be per-test)
      const useOptions = workerInfo.project.use as any;
      const launchOptions = useOptions.launchOptions ?? {};
      const headless = useOptions.headless;

      const localBrowser = await chromium.launch({
        ...launchOptions,
        ...(typeof headless === 'boolean' ? { headless } : {}),
      });

      try {
        await use(localBrowser);
      } finally {
        await localBrowser.close();
      }
    },
    { scope: 'worker' },
  ],

  context: async ({ browser }, use, testInfo) => {
    // Expose workerIndex for helpers running outside testInfo context (e.g. in reusable methods).
    process.env.PW_WORKER_INDEX = String(testInfo.workerIndex);

    // Fresh context per test (safe for parallel workers/machines)
    const context = await browser.newContext(testInfo.project.use);
    try {
      await use(context);
    } finally {
      await context.close();
    }
  },

  page: async ({ context }, use, testInfo) => {
    const page: Page = await context.newPage();

    // Wait for LambdaTest session to register (only relevant for LT projects)
    if (testInfo.project.name.match(/lambdatest/)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await use(page);

    // Mark LambdaTest status at the end with retry logic.
    if (testInfo.project.name.match(/lambdatest/)) {
      const testStatus = {
        action: 'setTestStatus',
        arguments: {
          status: testInfo.status,
          remark: getErrorMessage(testInfo, ['error', 'message']),
        },
      };

      let statusMarked = false;
      for (let attempt = 1; attempt <= 3 && !statusMarked; attempt++) {
        try {
          await page.evaluate(() => {}, `lambdatest_action: ${JSON.stringify(testStatus)}`);
          statusMarked = true;
        } catch {
          if (attempt < 3) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }
      }

      // Give LambdaTest time to receive the status.
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }

    try {
      await page.close();
    } catch {
      // ignore
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
