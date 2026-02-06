import { test as base, expect } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

function safeFilePart(input: string): string {
  return (input ?? '')
    .toString()
    .trim()
    .slice(0, 120)
    .replace(/[\/\\:*?"<>|]+/g, '_')
    .replace(/\s+/g, ' ')
    .replace(/\s/g, '_');
}

/**
 * Base fixture with automatic screenshot capture on failure.
 *
 * Usage:
 *   import { test, expect } from '../fixtures/base';
 */
export const test = base.extend<{ captureOnFailure: void }>({
  captureOnFailure: [
    async ({ page }, use, testInfo) => {
      await use(undefined);

      if (testInfo.status === testInfo.expectedStatus) return;

      const title = safeFilePart(testInfo.title);
      const project = safeFilePart(testInfo.project.name);
      const shotDir = path.join(process.cwd(), 'screenshots');
      const shotName = `fail-${project}-w${testInfo.workerIndex}-${title || 'test'}.png`;
      const shotPath = path.join(shotDir, shotName);

      try {
        await fs.mkdir(shotDir, { recursive: true });
        await page.screenshot({ path: shotPath, fullPage: true });
        await testInfo.attach('failure-screenshot', { path: shotPath, contentType: 'image/png' });
      } catch {
       }
    },
    { auto: true },
  ],
});

export { expect };

