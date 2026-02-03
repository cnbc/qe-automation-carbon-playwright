import { expect, type Locator, type Page } from '@playwright/test';
import * as PO from '../pageobjects/pageobjectsindex';

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
    console.log(`Assigned credentials to worker ${wi}: ${cred.username}`);
    return cred;
  }
}

export type LoginOptions = {
  workerIndex?: number;
  username?: string;
  password?: string;
};


export class CustomHelpers {
  private readonly storyPage: PO.StoryPage;

  constructor(private readonly page: Page) {
    this.storyPage = new PO.StoryPage(page);
  }

  private log(message: string) {
    // eslint-disable-next-line no-console
    console.log(`[customMethods] ${message}`);
  }

  /**
   * Returns current timestamp in format like:
   * `10:29 AM Tuesday Feb 3, 2026`
   */
  getCurrentTimestampDisplay(): string {
    try {
      const now = new Date();
      const parts = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).formatToParts(now);

      const get = (type: Intl.DateTimeFormatPartTypes) =>
        parts.find((p) => p.type === type)?.value ?? '';

      const hour = get('hour');
      const minute = get('minute');
      const dayPeriod = get('dayPeriod'); // AM/PM
      const weekday = get('weekday');
      const month = get('month');
      const day = get('day');
      const year = get('year');

      // 10:29 AM Tuesday Feb 3, 2026
      return `${hour}:${minute} ${dayPeriod} ${weekday} ${month} ${day}, ${year}`;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const full = `getCurrentTimestampDisplay failed: ${msg}`;
      this.log(full);
      throw new Error(full);
    }
  }

  getTimeStamp(): string {
    this.log('Entered getTimeStamp method');
    try {
      const now = new Date();
      const pad = (n: number, width: number) => n.toString().padStart(width, '0');

      // Match Java pattern: "yy-MM-dd-HH-mm-ss-SSS" (local time)
      const date =
        `${pad(now.getFullYear() % 100, 2)}-` +
        `${pad(now.getMonth() + 1, 2)}-` +
        `${pad(now.getDate(), 2)}-` +
        `${pad(now.getHours(), 2)}-` +
        `${pad(now.getMinutes(), 2)}-` +
        `${pad(now.getSeconds(), 2)}-` +
        `${pad(now.getMilliseconds(), 3)}`;

      this.log(`Returning timestamp: ${date} for creating a unique name of the asset`);
      this.log('Exited getTimeStamp method');
      return date;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const full = `Not Exited getTimeStamp Method : ${msg}`;
      this.log(full);
      throw new Error(full);
    }
  }

  async waitForTime(ms: number, reason?: string): Promise<void> {
    if (!Number.isFinite(ms) || ms < 0) {
      throw new Error(`waitForTime: "ms" must be a non-negative finite number. Received: ${ms}`);
    }
    this.log(`Waiting for ${ms}ms${reason ? ` (${reason})` : ''}`);
    await this.page.waitForTimeout(ms);
  }

  async waitForSeconds(seconds: number, reason?: string): Promise<void> {
    if (!Number.isFinite(seconds) || seconds < 0) {
      throw new Error(`waitForSeconds: "seconds" must be a non-negative finite number. Received: ${seconds}`);
    }
    await this.waitForTime(Math.round(seconds * 1000), reason);
  }

  /**
   * Reliable text entry for rich-text/contenteditable editors (e.g., ProseMirror).
   * Uses click-to-focus + select-all + backspace + keyboard typing.
   */
  async typeInContentEditable(
    editor: Locator,
    text: string,
    opts?: { label?: string; timeoutMs?: number; clearFirst?: boolean; delayMs?: number },
  ): Promise<void> {
    const label = opts?.label ?? 'contenteditable';
    const timeoutMs = opts?.timeoutMs ?? 30_000;
    const clearFirst = opts?.clearFirst ?? true;
    const delayMs = opts?.delayMs ?? 0;

    this.log(`Typing into ${label}: "${text}"`);
    await editor.waitFor({ state: 'visible', timeout: timeoutMs });
    await editor.click({ timeout: timeoutMs });

    if (clearFirst) {
      const isMac = process.platform === 'darwin';
      await this.page.keyboard.press(isMac ? 'Meta+A' : 'Control+A');
      await this.page.keyboard.press('Backspace');
    }

    await this.page.keyboard.type(text, { delay: delayMs });
  }

  /**
   * Select (highlight) the first (or Nth) occurrence of a substring inside a ProseMirror/contenteditable editor.
   *
   * Example:
   * `await cm.selectTextInProseMirror(storyPage.edtBody(), 'close to 2% on Friday following');`
   */
  async selectTextInProseMirror(
    editor: Locator,
    textToSelect: string,
    opts?: { occurrence?: number; timeoutMs?: number; label?: string }
  ): Promise<void> {
    const label = opts?.label ?? 'ProseMirror editor';
    const timeoutMs = opts?.timeoutMs ?? 30_000;
    const occurrence = opts?.occurrence ?? 1; // 1-based

    if (!textToSelect?.trim()) {
      throw new Error('selectTextInProseMirror: textToSelect is empty');
    }
    if (!Number.isFinite(occurrence) || occurrence < 1) {
      throw new Error(`selectTextInProseMirror: occurrence must be >= 1. Received: ${occurrence}`);
    }

    this.log(`Selecting text in ${label}: "${textToSelect}" (occurrence=${occurrence})`);
    await editor.waitFor({ state: 'visible', timeout: timeoutMs });
    await editor.click({ timeout: timeoutMs });

    await editor.evaluate(
      (el, { text, occ }) => {
        // If caller passed a wrapper, try to find the actual ProseMirror node.
        const passed = el as HTMLElement;
        const root =
          (passed.matches?.('[contenteditable="true"].ProseMirror') ? passed : null) ||
          (passed.querySelector?.('[contenteditable="true"].ProseMirror') as HTMLElement | null) ||
          (passed.querySelector?.('[contenteditable="true"][class*="ProseMirror"]') as HTMLElement | null) ||
          passed;
        root.focus();

        // Collect text nodes under the editor.
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
        const nodes: Text[] = [];
        const lengths: number[] = [];

        let n: Node | null;
        while ((n = walker.nextNode())) {
          const t = n as Text;
          const value = t.nodeValue ?? '';
          nodes.push(t);
          lengths.push(value.length);
        }

        const fullText = nodes.map((t) => t.nodeValue ?? '').join('');
        if (!fullText) {
          throw new Error('Editor contains no text');
        }

        // Find the Nth occurrence of the substring.
        let fromIndex = 0;
        let foundIndex = -1;
        for (let i = 0; i < occ; i++) {
          foundIndex = fullText.indexOf(text, fromIndex);
          if (foundIndex === -1) break;
          fromIndex = foundIndex + Math.max(text.length, 1);
        }
        if (foundIndex === -1) {
          throw new Error(`Text not found in editor: "${text}"`);
        }

        const startIndex = foundIndex;
        const endIndex = foundIndex + text.length;

        // Map global indices back to (node, offset).
        let cumulative = 0;
        let startNode: Text | null = null;
        let endNode: Text | null = null;
        let startOffset = 0;
        let endOffset = 0;

        for (let i = 0; i < nodes.length; i++) {
          const len = lengths[i] ?? 0;
          const nodeStart = cumulative;
          const nodeEnd = cumulative + len;

          if (!startNode && startIndex >= nodeStart && startIndex <= nodeEnd) {
            startNode = nodes[i];
            startOffset = startIndex - nodeStart;
          }
          if (!endNode && endIndex >= nodeStart && endIndex <= nodeEnd) {
            endNode = nodes[i];
            endOffset = endIndex - nodeStart;
          }

          cumulative += len;
          if (startNode && endNode) break;
        }

        if (!startNode || !endNode) {
          throw new Error('Could not map selection range to text nodes');
        }

        const range = document.createRange();
        range.setStart(startNode, startOffset);
        range.setEnd(endNode, endOffset);

        const sel = window.getSelection();
        if (!sel) throw new Error('window.getSelection() returned null');
        sel.removeAllRanges();
        sel.addRange(range);

        // ProseMirror floating menus often appear after these events.
        document.dispatchEvent(new Event('selectionchange', { bubbles: true }));
        root.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));

        // Ensure selection is visible.
        const parent = (startNode.parentElement ?? root) as HTMLElement;
        parent.scrollIntoView({ block: 'center', inline: 'nearest' });
      },
      { text: textToSelect, occ: occurrence }
    );
  }

  async waitForPageToLoadCMS() {
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