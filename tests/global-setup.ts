import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Global setup runs once before the entire test run.
 * We ensure root-level `screenshots/` exists and is emptied.
 */
export default async function globalSetup(): Promise<void> {
  const clearDir = async (dir: string) => {
    await fs.mkdir(dir, { recursive: true });
    const entries = await fs.readdir(dir).catch(() => []);
    await Promise.all(
      entries.map(async (name) => {
        const full = path.join(dir, name);
        await fs.rm(full, { recursive: true, force: true });
      }),
    );
  };

  // Keep folders, clear contents.
  await clearDir(path.join(process.cwd(), 'screenshots'));
  await clearDir(path.join(process.cwd(), 'allure-results'));
  await clearDir(path.join(process.cwd(), 'allure-report'));
}

