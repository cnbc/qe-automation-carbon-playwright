import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';
// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Environment / baseURL resolution:
// - Prefer explicit BASE_URL (most flexible)
// - Else allow passing an environment name (ENV or `npm test --env=stg` -> npm_config_env)
const envName =
  (process.env.ENV ||
    process.env.PW_ENV ||
    process.env.npm_config_env ||
    'prod')
    .toString()
    .trim()
    .toLowerCase();

const envBaseUrls: Record<string, string> = {
  //prod: 'https://www.cnbc.com',
  //production: 'https://www.cnbc.com',
  stg01: 'https://stg-01carbon.cnbc.com',
  stg02: 'https://stg-02carbon.cnbc.com',
  stg03: 'https://stg-03carbon.cnbc.com',
};

const baseURL =
  process.env.BASE_URL?.toString().trim() ||
  envBaseUrls[envName] ||
  'https://stg-02carbon.cnbc.com';

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
  globalSetup: './tests/global-setup',
  globalTeardown: './tests/global-teardown',
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
  reporter: [
    ['blob', { outputFolder: 'blob-report' }],
    // Allure reporter produces *results*; HTML is generated in globalTeardown.
    ['allure-playwright', { outputFolder: 'allure-results' }],
    // Keep Playwright HTML report but don't auto-open (we auto-open Allure instead).
    ['html', { open: 'always' }]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    /* Action timeout */
    actionTimeout: 30 * 1000, // 30 seconds for each action
  },


  /* Configure projects for major browsers */
  projects: [
     // LambdaTest Chrome on MacOS Tahoe  (connection handled by fixture)
    {
      name: 'lambdatest-chrome-macos-tahoe',
      use: {
        ...devices['Desktop Chrome'],
        // Start maximized: requires `viewport: null` AND no `deviceScaleFactor`.
        // The device preset includes `deviceScaleFactor`, so we explicitly unset it.
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'], // optional, useful for Chromium
        },
      },
      // Limit parallel execution for LambdaTest to avoid concurrency issues
      fullyParallel: true,
    },
    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        deviceScaleFactor: undefined,
        viewport: null,
        launchOptions: {
          args: ['--start-maximized'], // optional, useful for Chromium
        },
      },
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
