import type { APIRequestContext, APIResponse } from '@playwright/test';

export type JsonValue =
  | null
  | boolean
  | number
  | string
  | JsonValue[]
  | { [key: string]: JsonValue };

export type ApiJsonResult<T = JsonValue> = {
  url: string;
  status: number;
  ok: boolean;
  headers: Record<string, string>;
  json: T;
  rawText: string;
};

export type HeaderMap = Record<string, string>;

export function buildS3AssetApiUrl(params: {
  baseUrl: string;
  filename: string;
  bucket: string;
  region: string;
}): string {
  const url = new URL('/api/v1/s3/asset', params.baseUrl);
  url.searchParams.set('filename', params.filename);
  url.searchParams.set('bucket', params.bucket);
  url.searchParams.set('region', params.region);
  return url.toString();
}

export async function safeJson<T = JsonValue>(response: APIResponse): Promise<{ json: T; rawText: string }> {
  const rawText = await response.text();
  if (!rawText) return { json: null as T, rawText };

  try {
    return { json: JSON.parse(rawText) as T, rawText };
  } catch (e) {
    const contentType = response.headers()['content-type'] ?? '';
    throw new Error(
      `Expected JSON but could not parse response (status=${response.status()}, content-type=${contentType}). ` +
        `First 200 chars: ${rawText.slice(0, 200)}`
    );
  }
}

export async function getJson<T = JsonValue>(
  request: APIRequestContext,
  url: string,
  options?: { headers?: Record<string, string> }
): Promise<ApiJsonResult<T>> {
  const response = await request.get(url, { headers: options?.headers });
  const { json, rawText } = await safeJson<T>(response);

  return {
    url,
    status: response.status(),
    ok: response.ok(),
    headers: response.headers(),
    json,
    rawText,
  };
}

export async function postJson<TResponse = JsonValue, TBody = unknown>(
  request: APIRequestContext,
  url: string,
  body: TBody,
  options?: { headers?: Record<string, string> }
): Promise<ApiJsonResult<TResponse>> {
  const response = await request.post(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    data: body as any,
  });
  const { json, rawText } = await safeJson<TResponse>(response);

  return {
    url,
    status: response.status(),
    ok: response.ok(),
    headers: response.headers(),
    json,
    rawText,
  };
}

/**
 * Java `setHeaders()` equivalent:
 * - Takes a cookie string like "NAME=value; Path=/; ..." (or just "NAME=value")
 * - Extracts the first cookie value (everything after the first '=' in the first segment)
 * - Returns headers with JSON content negotiation + a custom token header set to that value
 */
export function setHeadersFromCookieString(cookieString: string, tokenName: string): { headers: HeaderMap; tokenValue: string } {
  try {
    const firstSegment = (cookieString ?? '').split(';')[0]?.trim() ?? '';
    const eqIdx = firstSegment.indexOf('=');
    const tokenValue = eqIdx >= 0 ? firstSegment.slice(eqIdx + 1).trim() : '';

    if (!tokenName) throw new Error('tokenName is required');
    if (!tokenValue) throw new Error(`Could not parse tokenValue from cookieString: "${cookieString}"`);

    const headers: HeaderMap = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      [tokenName]: tokenValue,
    };

    return { headers, tokenValue };
  } catch (e: any) {
    throw new Error(`setHeadersFromCookieString failed: ${e?.message ?? String(e)}`);
  }
}

export type JsonMatch = { path: string; expected: unknown; actual: unknown; message: 'Matching' };
export type JsonMismatch = { path: string; expected: unknown; actual: unknown; message: 'NOT matching' };
export type JsonValidationResult = { ok: boolean; matches: JsonMatch[]; mismatches: JsonMismatch[] };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && (value as any).constructor === Object;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
    return true;
  }
  if (isPlainObject(a) && isPlainObject(b)) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    for (const k of aKeys) {
      if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
      if (!deepEqual(a[k], b[k])) return false;
    }
    return true;
  }
  return false;
}

/**
 * Parse a "path string" into segments for JSON access.
 * Supports:
 * - "exists"
 * - "data.url"
 * - "items[0].id"
 */
export function parseJsonPath(path: string): Array<string | number> {
  const out: Array<string | number> = [];
  const re = /([^[.\]]+)|\[(\d+)\]/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(path))) {
    if (match[1]) out.push(match[1]);
    else if (match[2]) out.push(Number(match[2]));
  }
  return out;
}

/**
 * Validate JSON fields by key->expected, where keys can be dot/bracket paths.
 * Example:
 *   validateJsonFields(json, { exists: false, bucket: 'cnbc-cms-ui', 'data.url': '...' })
 */
export function validateJsonFields(json: unknown, expectedByPath: Record<string, unknown>): JsonValidationResult {
  const matches: JsonMatch[] = [];
  const mismatches: JsonMismatch[] = [];
  for (const [path, expected] of Object.entries(expectedByPath)) {
    const actual = getByPath(json, parseJsonPath(path));
    if (deepEqual(actual, expected)) matches.push({ path, expected, actual, message: 'Matching' });
    else mismatches.push({ path, expected, actual, message: 'NOT matching' });
  }
  return { ok: mismatches.length === 0, matches, mismatches };
}

export function formatJsonValidationResult(res: JsonValidationResult): string {
  const fmt = (v: unknown) => JSON.stringify(v);
  const matching = res.matches
    .map((m) => `- ${m.message}: ${m.path} expected=${fmt(m.expected)} actual=${fmt(m.actual)}`)
    .join('\n');
  const notMatching = res.mismatches
    .map((m) => `- ${m.message}: ${m.path} expected=${fmt(m.expected)} actual=${fmt(m.actual)}`)
    .join('\n');
  return [
    `Matching (${res.matches.length}):`,
    matching || '- (none)',
    '',
    `NOT matching (${res.mismatches.length}):`,
    notMatching || '- (none)',
  ].join('\n');
}

/**
 * Same as validateJsonFields, but throws a helpful error when any field mismatches.
 */
export function assertJsonFields(json: unknown, expectedByPath: Record<string, unknown>) {
  const res = validateJsonFields(json, expectedByPath);
  if (res.ok) return;
  throw new Error(`JSON validation failed:\n${formatJsonValidationResult(res)}`);
}

/**
 * Simple JSON "path" getter for reusable parsing.
 * Example: getByPath(json, ['data', 'url'])
 */
export function getByPath(value: unknown, path: Array<string | number>): unknown {
  let cur: any = value;
  for (const key of path) {
    if (cur == null) return undefined;
    cur = cur[key as any];
  }
  return cur;
}
