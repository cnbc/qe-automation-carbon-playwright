import type { Locator, Page } from '@playwright/test';

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
  // Default + stg-02
  return 'https://stg-aws02pub.cnbc.com/';
}

export function viperAppUrl(envOverride?: CarbonEnvName): string {
  const env = resolveEnvName(envOverride);

  if (env === 'stg-01carbon' || env === 'stg01' || env === 'stg-01') return 'https://stg-01cmsviper.cnbc.com/';
  if (env === 'stg-02carbon' || env === 'stg02' || env === 'stg-02') return 'https://stg-02cmsviper.cnbc.com/';
  if (env === 'stg-03carbon' || env === 'stg03' || env === 'stg-03') return 'https://stg-03cmsviper.cnbc.com/';
  // Default + stg-02
  return 'https://stg-02cmsviper.cnbc.com/';
}

export function carbonAppUrl(envOverride?: CarbonEnvName): string {
  const env = resolveEnvName(envOverride);

  if (env === 'stg-01carbon' || env === 'stg01' || env === 'stg-01') return 'https://stg-01carbon.cnbc.com/';
  if (env === 'stg-02carbon' || env === 'stg02' || env === 'stg-02') return 'https://stg-02carbon.cnbc.com/';
  if (env === 'stg-03carbon' || env === 'stg03' || env === 'stg-03') return 'https://stg-03carbon.cnbc.com/';
  // Default + stg-02
  return 'https://stg-02carbon.cnbc.com/';
}

export type Credential = { username: string; password: string };

function readWorkerIndexFromEnv(): number {
  const raw = process.env.PW_WORKER_INDEX ?? process.env.TEST_WORKER_INDEX ?? process.env.PLAYWRIGHT_WORKER_INDEX ?? '';
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : 0;
}

/**
 * Deterministic credential assignment per Playwright worker.
 * - Each worker process gets a stable workerIndex.
 * - We map workerIndex -> credential, so parallel workers use different users.
 *
 * Note: if you run more workers than credentials, we wrap around.
 */
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
  /** If omitted, we use PW_WORKER_INDEX/TEST_WORKER_INDEX env vars (or 0). */
  workerIndex?: number;
  /** Explicit overrides (highest priority). */
  username?: string;
  password?: string;
};

export class CustomMethods {
  constructor(private readonly page: Page) {}

  private log(message: string) {
    // Keep it simple; swap to a logger later if needed.
    // eslint-disable-next-line no-console
    console.log(`[customMethods] ${message}`);
  }

  private async waitForPageToLoadCMS() {
    // Closest Playwright equivalent to "waitForPageToLoadCMS()"
    await this.page.waitForLoadState('domcontentloaded');
    //await this.page.waitForLoadState('networkidle').catch(() => {
      // Some pages never reach networkidle; don't fail just for that.
    //});
  }

  async openPublishPageURLViper(envOverride?: CarbonEnvName) {
    const url = viperAppUrl(envOverride);
    this.log(`Opening Viper login URL: ${url}`);
    await this.page.goto(url);
    await this.waitForPageToLoadCMS();
    await this.page.waitForTimeout(5000);
  }

  async openPublishPageURL(envOverride?: CarbonEnvName) {
    // Java version only calls Viper.
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

    // If nothing was provided via env/options, fall back to per-worker credentials.
    if (!username || !password) {
      const cred = CredentialProvider.assignCredentials(options?.workerIndex);
      username = cred.username;
      password = cred.password;
      this.log(`Using worker credential username=${username}`);
    }

    if (!username || !password) {
      throw new Error('Missing credentials. Provide VIPER_USERNAME/VIPER_PASSWORD (or CMS_USERNAME/CMS_PASSWORD).');
    }

    // Reasonable defaults (can be overridden by passing locators).
    const usernameLocator =
      locators?.username ?? this.page.locator('input[id="edit-name"]').first();
    const passwordLocator =
      locators?.password ?? this.page.locator('input[id="edit-pass"]').first();
    const loginButtonLocator =
      locators?.loginButton ??
      this.page.locator('input[id="edit-submit"]').first();

    await this.openPublishPageURLViper(env);
    await this.waitForPageToLoadCMS();

    await usernameLocator.waitFor({ state: 'visible', timeout: 60_000 });
    await usernameLocator.fill(username);
    await passwordLocator.click();
    await passwordLocator.fill(password);
    await loginButtonLocator.click();

    await this.page.waitForTimeout(2000);
    await this.waitForPageToLoadCMS();

    // Navigate to Carbon app after login (mirrors Java logic).
    const appUrl = carbonAppUrl(env);
    this.log(`Navigating to Carbon app URL after login: ${appUrl}`);
    await this.page.goto(appUrl);
    await this.waitForPageToLoadCMS();

    const currentUrl = this.page.url().toLowerCase();
    this.log(`Application URL after login: ${currentUrl}`);
    if (currentUrl.includes('https://carbon.cnbc.com') || currentUrl.includes('http://carbon.cnbc.com')) {
      throw new Error('Environment value is blank or URL is production (carbon.cnbc.com). Aborting test.');
      process.exit(1);
    }

    // Optional: capture logged-in username if locator provided.
    const loggedInUserName =
      locators?.username ?? this.page.locator('//app-top-toolbar-header/button[1]/span[1]').first();
      const usernameValue = (await loggedInUserName.textContent())?.replace('person', '').trim();
      this.log(`Logged in user: ${usernameValue}`);
  }
}