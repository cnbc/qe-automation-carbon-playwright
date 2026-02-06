import * as fs from 'fs/promises';
import * as path from 'path';
import { spawn, spawnSync } from 'child_process';

function run(cmd: string, cwd: string) {
  const res = spawnSync(cmd, {
    cwd,
    shell: true,
    stdio: 'inherit',
    env: process.env,
  });
  if (res.status !== 0) {
    throw new Error(`Command failed (${res.status}): ${cmd}`);
  }
}

async function dirHasFiles(dir: string): Promise<boolean> {
  try {
    const entries = await fs.readdir(dir);
    return entries.length > 0;
  } catch {
    return false;
  }
}

export default async function globalTeardown(): Promise<void> {
  const cwd = process.cwd();
  const resultsDir = path.join(cwd, 'allure-results');
  const reportDir = path.join(cwd, 'allure-report');

  // Generate report only if results exist.
  if (!(await dirHasFiles(resultsDir))) return;

  // Generate Allure HTML report into ./allure-report
  run(`npx allure generate "${resultsDir}" -o "${reportDir}" --clean`, cwd);

  // Auto-open locally (avoid on CI).
  // Important: opening `index.html` via file:// often shows a blank "Loading..." due to browser security.
  // Use `allure open` which serves the report over http:// and opens it.
  if (process.env.CI) return;

  try {
    await fs.access(path.join(reportDir, 'index.html'));
  } catch {
    return;
  }

  const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
  const child = spawn(npxCmd, ['allure', 'open', reportDir, '-p', '0'], {
    cwd,
    detached: true,
    stdio: 'ignore',
    env: process.env,
  });
  child.unref();
}

