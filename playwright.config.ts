import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Function to get capabilities with dynamic test name
const getCapabilities = (testName?: string) => ({
  'browserName': 'Chrome',
  'browserVersion': 'latest',
  'LT:Options': {
    'platform': 'MacOS Tahoe',
    'build': process.env.LT_BUILD_NAME || 'Carbon Playwright Tests',
    'name': testName || process.env.LT_TEST_NAME || 'Carbon Automation Tests',
    'project': process.env.LT_PROJECT_NAME || 'Carbon Automation Tests',
    'w3c': true,
    'plugin': 'playwright-test',
    'video': true,
    'visual': true,
    'network': true,
    'console': true,
    'tunnel': false,
    'tunnelName': '',
    'geoLocation': 'US',
    'resolution': '1920x1080',
  }
});
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Maximum time one test can run for */
  timeout: 20 * 60 * 1000, // 20 minutes
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 5 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Action timeout */
    actionTimeout: 30 * 1000, // 30 seconds for each action
  },

  /* Configure projects for major browsers */
  projects: [
     // LambdaTest Chrome on MacOS Tahoe  (connection handled by fixture)
    /*{
      name: 'lambdatest-chrome-macos-tahoe',
      use: {
        ...devices['Desktop Chrome'],
      },
      // Limit parallel execution for LambdaTest to avoid concurrency issues
      fullyParallel: true,
    },*/
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
    },

    /*{
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },*/

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
