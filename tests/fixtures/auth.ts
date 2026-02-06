import { test as base, expect } from './base';
import type { BrowserContext, Page, WorkerInfo } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';
import { CustomHelpers, resolveEnvName, carbonAppUrl } from '../helpers/customHelpers';

/**
 * Worker-scoped auth:
 * - Logs in once per worker
 * - Writes storage state to a unique file per worker+project
 * - Creates a fresh context per test that reuses the worker's storage state
 *
 * Usage in specs:
 *   import { test, expect } from '../fixtures/auth';
 */
export const test = base.extend<
  { context: BrowserContext; page: Page },
  { storageStatePath: string }
>({
  storageStatePath: [
    async ({ browser }, use, workerInfo: WorkerInfo) => {
      const env = resolveEnvName(process.env.ENV || 'stg02');

      // Store auth state under Playwright's standard auth folder (already gitignored).
      const authDir = path.join(process.cwd(), 'playwright', '.auth');
      await fs.mkdir(authDir, { recursive: true });

      const safeProject = workerInfo.project.name.replace(/[^a-z0-9._-]+/gi, '_');
      const statePath = path.join(authDir, `state-${safeProject}-w${workerInfo.workerIndex}.json`);

      const context = await browser.newContext(workerInfo.project.use);
      const page = await context.newPage();

      // Perform UI login once per worker (reuse your existing login flow).
      const cm = new CustomHelpers(page);
      await cm.login(env);

      await context.storageState({ path: statePath });
      await context.close();

      try {
        await use(statePath);
      } finally {
        // Cleanup once the worker finishes all its tests.
        try {
          await fs.rm(statePath, { force: true });
        } catch {
          // ignore
        }
        // Best-effort: remove authDir if empty.
        try {
          const remaining = await fs.readdir(authDir);
          if (remaining.length === 0) await fs.rmdir(authDir);
        } catch {
          // ignore (dir not empty / already removed / permissions)
        }
      }
    },
    { scope: 'worker' },
  ],

  // Override context to always reuse worker auth state, while still being per-test.
  context: async ({ browser, storageStatePath }, use, testInfo) => {
    const context = await browser.newContext({
      ...(testInfo.project.use as any),
      storageState: storageStatePath,
    });
    try {
      await use(context);
    } finally {
      await context.close();
    }
  },

  // Override page so tests start already logged-in on Carbon app.
  page: async ({ context }, use) => {
    const page = await context.newPage();
    const env = resolveEnvName(process.env.ENV || 'stg02');
    await page.goto(carbonAppUrl(env), { waitUntil: 'domcontentloaded' });
    await use(page);
    try {
      await page.close();
    } catch {
      // ignore
    }
  },
});

export { expect };

