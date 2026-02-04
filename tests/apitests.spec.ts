import { test, expect, chromium, type APIRequestContext } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as customHelpers from '../reusableHelpers/customHelpers';
import * as apiHelpers from '../reusableHelpers/apiHelpers';

test.describe('Viper API Tests', () => {
  let api: APIRequestContext;
  const defaultEnv = 'stg02';
  const TAGS: string[] = ['@API', '@Regression', '@High'];

  test.beforeAll(async ({ playwright }, testInfo) => {
    const env = process.env.ENV || defaultEnv;
    const baseUrl = customHelpers.viperAppUrl(env);
    const cred = customHelpers.CredentialProvider.assignCredentials(testInfo.workerIndex);

    // UI-login once to establish a session cookie, then reuse it for API requests.
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(baseUrl);
    await page.locator('input[id="edit-name"]').fill(cred.username);
    await page.locator('input[id="edit-pass"]').fill(cred.password);
    await page.locator('input[id="edit-submit"]').click();

    // Give the login flow a moment to set cookies / redirect.
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(1500);

    const cookies = await context.cookies(baseUrl);
    const cookieHeader = cookies.map((c) => `${c.name}=${c.value}`).join('; ');

    await context.close();
    await browser.close();

    if (!cookieHeader) {
      throw new Error(`No session cookies found after login (baseUrl=${baseUrl}).`);
    }

    // Some endpoints (like presigned POST) require X-CSRF-Token along with cookies.
    const tokenRequest = await playwright.request.newContext({
      extraHTTPHeaders: {
        Cookie: cookieHeader,
        Accept: 'text/plain',
      },
    });

    const csrfTokenCandidates = ['/session/token', '/rest/session/token', '/api/v1/session/token'];
    let csrfToken = '';
    for (const p of csrfTokenCandidates) {
      const tokenUrl = new URL(p, baseUrl).toString();
      const res = await tokenRequest.get(tokenUrl);
      if (!res.ok()) continue;
      const txt = (await res.text()).trim();
      if (txt) {
        csrfToken = txt;
        break;
      }
    }
    await tokenRequest.dispose();

    if (!csrfToken) {
      throw new Error(
        `Could not retrieve CSRF token. Tried: ${csrfTokenCandidates.join(', ')} (baseUrl=${baseUrl})`
      );
    }

    api = await playwright.request.newContext({
      extraHTTPHeaders: {
        Cookie: cookieHeader,
        Accept: 'application/json',
        'X-CSRF-Token': csrfToken,
      },
    });
  });

  test.afterAll(async () => {
    await api?.dispose();
  });

  test('GET /api/v1/s3/asset returns JSON', { tag: ['@C228030168', ...TAGS] }, async () => {
    const env = process.env.ENV || defaultEnv;
    const baseUrl = customHelpers.viperAppUrl(env);

    const mediaPrefix = env === 'stg03' ? 'stg-aws03media' : 'stg-aws02media';
    const filename = `${mediaPrefix}/test/Image_JPG with(.) Space.jpg`;

    const url = apiHelpers.buildS3AssetApiUrl({
      baseUrl,
      filename,
      bucket: 'cnbc-cms-ui',
      region: 'us-east-1',
    });
    console.log(`URL: ${url}`);
    const result = await apiHelpers.getJson(api, url);

    expect(result.status, `Unexpected status for ${url}. Body: ${result.rawText}`).toBe(200);
    expect(result.ok).toBeTruthy();

    const expectations = {
      bucket: 'cnbc-cms-ui',
      region: 'us-east-1',
      exists: false,
      message: 'File does not exist in the specified bucket',
      filename,
    };

    const validation = apiHelpers.validateJsonFields(result.json, expectations);
    // eslint-disable-next-line no-console
    console.log(apiHelpers.formatJsonValidationResult(validation));
    apiHelpers.assertJsonFields(result.json, expectations);

    // Example reusable parsing: try to read a commonly-named URL field if present.
    const maybeUrl =
      apiHelpers.getByPath(result.json, ['url']) ?? apiHelpers.getByPath(result.json, ['data', 'url']);
    // eslint-disable-next-line no-console
    console.log(`API status=${result.status}, extractedUrl=${String(maybeUrl ?? '')}`);
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(result.json, null, 2));
  });

  test('POST /api/v1/s3/asset/presigned returns JSON', { tag: ['@C228030184', ...TAGS] }, async () => {
    const env = process.env.ENV || defaultEnv;
    const baseUrl = customHelpers.viperAppUrl(env);
    const url = new URL('/api/v1/s3/asset/presigned', baseUrl).toString();

    const payloadPath = path.join(__dirname, 'testdata', 'presigned-asset.request.json');
    const payloadRaw = await fs.readFile(payloadPath, 'utf8');
    const payload = JSON.parse(payloadRaw);

    const result = await apiHelpers.postJson(api, url, payload);
    expect(result.status, `Unexpected status for ${url}. Body: ${result.rawText}`).toBe(200);
    expect(result.ok).toBeTruthy();

    const expectations = {
      filename: payload.filename,
      bucket: payload.bucket,
      region: payload.region,
      filetype: payload.filetype,
      method:'PUT',
      message:'Use this URL to upload your file with a PUT request',
      expires_in: 600,
    };
    const validation = apiHelpers.validateJsonFields(result.json, expectations);
    // eslint-disable-next-line no-console
    console.log(apiHelpers.formatJsonValidationResult(validation));
    apiHelpers.assertJsonFields(result.json, expectations);

    const presignedUrl =
      apiHelpers.getByPath(result.json, ['url']) ??
      apiHelpers.getByPath(result.json, ['data', 'url']) ??
      apiHelpers.getByPath(result.json, ['presigned_url']);
    expect(presignedUrl, `No presigned URL found in response. Body: ${result.rawText}`).toBeTruthy();
    expect(presignedUrl).toContain('amazonaws.com');
  });

  test('POST /api/v1/log accepts log-message.json and returns 201 Created and json response', { tag: ['@C228061875', ...TAGS] }, async () => {
    const env = process.env.ENV || defaultEnv;
    const baseUrl = customHelpers.viperAppUrl(env);
    const url = new URL('/api/v1/log', baseUrl).toString();

    const payloadPath = path.join(__dirname, 'testdata', 'log-message.json');
    const payloadRaw = await fs.readFile(payloadPath, 'utf8');
    const payload = JSON.parse(payloadRaw) as { log_type?: string; log_detail?: string };

    expect(payload.log_type, 'log-message.json missing "log_type"').toBeTruthy();
    expect(payload.log_detail, 'log-message.json missing "log_detail"').toBeTruthy();

    const res = await apiHelpers.postJson(api, url, payload);
    const status = res.status;

    // Most log endpoints return 200/201/204. Keep it tolerant.
    expect(
      status,
      `Unexpected status for ${url}. content-type=${res.headers['content-type']}. Body: ${res.rawText}`,
    ).toBeGreaterThanOrEqual(200);
    expect(status).toBeLessThan(300);

    if (res.rawText && res.headers['content-type']?.includes('application/json')) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const json = JSON.parse(res.rawText);
      // eslint-disable-next-line no-console
      console.log(JSON.stringify(json, null, 2));
    } else {
      // eslint-disable-next-line no-console
      console.log(`Response body (non-JSON or empty): ${res.rawText}`);
    }


    expect(status).toBe(201);
    expect(apiHelpers.getByPath(res.json, ['message'])).toBe('Log entry recorded successfully');
    expect(apiHelpers.getByPath(res.json, ['log_type'])).toBe(payload.log_type);
    expect(apiHelpers.getByPath(res.json, ['success'])).toBe(true);
    
  });
});
