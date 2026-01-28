import type { Locator, Page } from '@playwright/test';
import * as PO from '../pageobjects';

export type CarbonEnvName = string;

export type ViperLoginLocators = {
  username: Locator;
  password: Locator;
  loginButton: Locator;
  loggedInUserName?: Locator;
};

function normalizeEnv(env: unknown): string {
  return (env ?? '')
    .toString()
    .trim()
    .toLowerCase()
    .replace(/_/g, '-');
}

export function resolveEnvName(envOverride?: CarbonEnvName): string {
  return normalizeEnv(
    envOverride ??
      process.env.ENV ??
      process.env.appEnv ??
      process.env.PW_ENV ??
      process.env.npm_config_env ??
      'stg-02carbon'
  );
}

export function phxURL(envOverride?: CarbonEnvName): string {
  const env = resolveEnvName(envOverride);
  if (env === 'stg-01carbon' || env === 'stg01' || env === 'stg-01') return 'https://stg-aws01pub.cnbc.com/';
  if (env === 'stg-02carbon' || env === 'stg02' || env === 'stg-02') return 'https://stg-aws02pub.cnbc.com/';
  if (env === 'stg-03carbon' || env === 'stg03' || env === 'stg-03') return 'https://stg-aws03pub.cnbc.com/';
  return 'https://stg-aws02pub.cnbc.com/';
}

export function viperAppUrl(envOverride?: CarbonEnvName): string {
  const env = resolveEnvName(envOverride);
  if (env === 'stg-01carbon' || env === 'stg01' || env === 'stg-01') return 'https://stg-01cmsviper.cnbc.com/';
  if (env === 'stg-02carbon' || env === 'stg02' || env === 'stg-02') return 'https://stg-02cmsviper.cnbc.com/';
  if (env === 'stg-03carbon' || env === 'stg03' || env === 'stg-03') return 'https://stg-03cmsviper.cnbc.com/';
  return 'https://stg-02cmsviper.cnbc.com/';
}

export function carbonAppUrl(envOverride?: CarbonEnvName): string {
  const env = resolveEnvName(envOverride);
  if (env === 'stg-01carbon' || env === 'stg01' || env === 'stg-01') return 'https://stg-01carbon.cnbc.com/';
  if (env === 'stg-02carbon' || env === 'stg02' || env === 'stg-02') return 'https://stg-02carbon.cnbc.com/';
  if (env === 'stg-03carbon' || env === 'stg03' || env === 'stg-03') return 'https://stg-03carbon.cnbc.com/';
  return 'https://stg-02carbon.cnbc.com/';
}

export type Credential = { username: string; password: string };

function readWorkerIndexFromEnv(): number {
  const raw = process.env.PW_WORKER_INDEX ?? process.env.TEST_WORKER_INDEX ?? process.env.PLAYWRIGHT_WORKER_INDEX ?? '';
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}

export class CredentialProvider {
  private static readonly credentials: ReadonlyArray<Credential> = [
    { username: 'cmsautomation', password: 'Welcome@123' },
    { username: 'cmsautomation1', password: 'Welcome@123' },
    { username: 'cmsautomation2', password: 'Welcome@123' },
    { username: 'cmsautomation3', password: 'Welcome@123' },
    { username: 'cmsautomation4', password: 'Welcome@123' },
  ];

  private static readonly assignedByWorker = new Map<number, Credential>();

  static assignCredentials(workerIndex?: number): Credential {
    const wi = Number.isFinite(workerIndex as number) ? (workerIndex as number) : readWorkerIndexFromEnv();
    const cached = this.assignedByWorker.get(wi);
    if (cached) return cached;

    const idx = ((wi % this.credentials.length) + this.credentials.length) % this.credentials.length;
    const cred = this.credentials[idx];
    this.assignedByWorker.set(wi, cred);
    return cred;
  }
}

export type LoginOptions = {
  workerIndex?: number;
  username?: string;
  password?: string;
};


export class CustomMethods {
  private readonly storyPage: PO.StoryPage;

  constructor(private readonly page: Page) {
    this.storyPage = new PO.StoryPage(page);
  }

  private log(message: string) {
    // eslint-disable-next-line no-console
    console.log(`[customMethods] ${message}`);
  }

  private async waitForPageToLoadCMS() {
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openPublishPageURLViper(envOverride?: CarbonEnvName) {
    const url = viperAppUrl(envOverride);
    this.log(`Opening Viper login URL: ${url}`);
    await this.page.goto(url);
    await this.waitForPageToLoadCMS();
    //await this.page.waitForTimeout(5000);
  }

  async openPublishPageURL(envOverride?: CarbonEnvName) {
    await this.openPublishPageURLViper(envOverride);
  }

  async login(envOverride?: CarbonEnvName, locators?: ViperLoginLocators, options?: LoginOptions) {
    await this.loginViaViperUI(envOverride, locators, options);
  }

  async loginViaViperUI(envOverride?: CarbonEnvName, locators?: ViperLoginLocators, options?: LoginOptions) {
    const env = resolveEnvName(envOverride);
    this.log(`Entered login method (env=${env})`);

    const envUsername = process.env.VIPER_USERNAME || process.env.CMS_USERNAME || '';
    const envPassword = process.env.VIPER_PASSWORD || process.env.CMS_PASSWORD || '';

    let username = options?.username ?? envUsername;
    let password = options?.password ?? envPassword;

    if (!username || !password) {
      const cred = CredentialProvider.assignCredentials(options?.workerIndex);
      username = cred.username;
      password = cred.password;
      this.log(`Using worker credential username=${username}`);
    }

    if (!username || !password) {
      throw new Error('Missing credentials. Provide VIPER_USERNAME/VIPER_PASSWORD (or CMS_USERNAME/CMS_PASSWORD).');
    }

    const usernameLocator = locators?.username ?? this.page.locator('input[id="edit-name"]').first();
    const passwordLocator = locators?.password ?? this.page.locator('input[id="edit-pass"]').first();
    const loginButtonLocator = locators?.loginButton ?? this.page.locator('input[id="edit-submit"]').first();

    await this.openPublishPageURLViper(env);
    await this.waitForPageToLoadCMS();

    await usernameLocator.waitFor({ state: 'visible', timeout: 60_000 });
    await usernameLocator.fill(username);
    await passwordLocator.fill(password);
    await loginButtonLocator.click();

    await this.page.waitForTimeout(2000);
    await this.waitForPageToLoadCMS();

    const appUrl = carbonAppUrl(env);
    this.log(`Navigating to Carbon app URL after login: ${appUrl}`);
    await this.page.goto(appUrl);
    await this.waitForPageToLoadCMS();

    const currentUrl = this.page.url().toLowerCase();
    if (currentUrl.includes('https://carbon.cnbc.com') || currentUrl.includes('http://carbon.cnbc.com')) {
      throw new Error('Environment value is blank or URL is production (carbon.cnbc.com). Aborting test.');
    }
  }

  private normalizeAssetType(value: string): string {
    return (value ?? '')
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ');
  }

  private async clickUsingJsFallback(locator: Locator, label: string) {
    try {
      await locator.click({ timeout: 10_000 });
    } catch {
      this.log(`Falling back to JS click for: ${label}`);
      await locator.evaluate((el) => (el as HTMLElement).click());
    }
  }

  async selectAsset(asset: string) {
    const [assetTypeRaw] = (asset ?? '').split(',');
    const assetType = (assetTypeRaw ?? '').trim();
    if (!assetType) throw new Error('selectAsset: assetType is empty');

    const normalized = this.normalizeAssetType(assetType);

    await this.clickUsingJsFallback(this.storyPage.createFromScratchButton(), 'Create From Scratch Button');
    await this.page.waitForTimeout(3000);
    await this.clickUsingJsFallback(this.storyPage.selectAssetType(assetType), `Asset type: ${assetType}`);
    await this.page.waitForTimeout(5000);
    await this.unlockAsset(normalized);
  }

  async unlockAsset(assetType: string) {
    await this.page.waitForTimeout(5000);
    const currentUrl = this.page.url();
    if (!currentUrl.includes('readonly=true')) this.log('Asset is not locked');
    else {
      this.log('Asset is locked');
      const normalized = this.normalizeAssetType(assetType);
      const useOldConfig =
      normalized === 'video' ||
      normalized === 'wildcard' ||
      normalized === 'profile' ||
      normalized === 'author' ||
      normalized === 'image';
      if (!useOldConfig) {
        this.log('Using new config');
        this.clickUsingJsFallback(this.storyPage.lockedAssetNewConfig(), 'Lock icon');
        await this.page.waitForTimeout(2000);
      }
      else {
        this.log('Using old config');
        this.clickUsingJsFallback(this.storyPage.lockedAssetOldConfig(), 'Lock icon');
        await this.page.waitForTimeout(2000);
      }
      this.clickUsingJsFallback(this.storyPage.unlockAsset(), 'Unlock Asset');
      await this.page.waitForTimeout(5000);
    }
  }
}