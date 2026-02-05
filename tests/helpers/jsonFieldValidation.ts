export type JsonType = 'string' | 'number' | 'boolean' | 'null' | 'undefined' | 'array' | 'object';

export type FieldExpectation = {
  /**
   * JSON path like:
   * - "id"
   * - "items[0].id"
   * - "[0].type"  (when the root is an array)
   * - "dates.updatedDate"
   */
  path: string;

  /**
   * Expected value (optional).
   * If provided, we validate equality (deep equality for arrays/objects).
   */
  expectedValue?: unknown;

  /**
   * Expected type (optional).
   * If omitted but expectedValue is provided, the type is inferred from expectedValue.
   */
  expectedType?: JsonType;

  /**
   * If true, missing path is allowed (no failure).
   */
  optional?: boolean;
};

export type FieldMatch = { path: string; message: 'Matching' };
export type FieldMismatch = {
  path: string;
  message: 'NOT matching';
  reason: 'MISSING' | 'TYPE' | 'VALUE';
  expectedType?: JsonType;
  actualType?: JsonType;
  expectedValue?: unknown;
  actualValue?: unknown;
};

export type FieldValidationResult = { ok: boolean; matches: FieldMatch[]; mismatches: FieldMismatch[] };

type PathFilterSegment = { kind: 'filter'; key: string; value: unknown };
export type PathSegment = string | number | PathFilterSegment;

function jsonTypeOf(v: unknown): JsonType {
  if (v === null) return 'null';
  if (v === undefined) return 'undefined';
  if (Array.isArray(v)) return 'array';
  const t = typeof v;
  if (t === 'string') return 'string';
  if (t === 'number') return 'number';
  if (t === 'boolean') return 'boolean';
  return 'object';
}

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
      if (!deepEqual((a as any)[k], (b as any)[k])) return false;
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
 * - "additionalMetadata[name=release_document_url].value" (select array item by property)
 * - "[0].type" (root array)
 */
export function parseJsonPath(path: string): PathSegment[] {
  const out: PathSegment[] = [];

  // tokens: "foo" OR "[...]" where ... can be a number or "key=value"
  const re = /([^[.\]]+)|\[(.+?)\]/g;
  let match: RegExpExecArray | null;

  const parseBracket = (raw: string): PathSegment => {
    const s = raw.trim();
    if (/^\d+$/.test(s)) return Number(s);

    // filter form: key=value OR key="value with spaces" OR key='value'
    const eq = s.indexOf('=');
    if (eq <= 0) {
      // Unknown bracket content; keep as a string segment for best-effort access
      return s;
    }

    const key = s.slice(0, eq).trim();
    let valueRaw = s.slice(eq + 1).trim();

    // strip quotes if present
    if (
      (valueRaw.startsWith('"') && valueRaw.endsWith('"')) ||
      (valueRaw.startsWith("'") && valueRaw.endsWith("'"))
    ) {
      valueRaw = valueRaw.slice(1, -1);
      return { kind: 'filter', key, value: valueRaw };
    }

    // basic primitives
    if (valueRaw === 'true') return { kind: 'filter', key, value: true };
    if (valueRaw === 'false') return { kind: 'filter', key, value: false };
    if (valueRaw === 'null') return { kind: 'filter', key, value: null };
    if (/^-?\d+(\.\d+)?$/.test(valueRaw)) return { kind: 'filter', key, value: Number(valueRaw) };

    // unquoted string
    return { kind: 'filter', key, value: valueRaw };
  };

  while ((match = re.exec(path))) {
    if (match[1]) out.push(match[1]);
    else if (match[2]) out.push(parseBracket(match[2]));
  }

  return out;
}

export function getByPath(value: unknown, path: PathSegment[]): unknown {
  let cur: any = value;
  for (const seg of path) {
    if (cur == null) return undefined;

    if (typeof seg === 'string' || typeof seg === 'number') {
      cur = cur[seg as any];
      continue;
    }

    // filter segment: select from array by object property equality
    if (seg.kind === 'filter') {
      if (!Array.isArray(cur)) return undefined;
      const found = cur.find((item: unknown) => {
        if (!isPlainObject(item)) return false;
        return deepEqual((item as any)[seg.key], seg.value);
      });
      cur = found;
      continue;
    }

    return undefined;
  }
  return cur;
}

/**
 * Validate a list of fields (paths) against expected value and/or expected type.
 */
export function validateJsonFields(actualJson: unknown, expectations: FieldExpectation[]): FieldValidationResult {
  const matches: FieldMatch[] = [];
  const mismatches: FieldMismatch[] = [];

  for (const exp of expectations) {
    const actualValue = getByPath(actualJson, parseJsonPath(exp.path));
    const missing = actualValue === undefined;

    if (missing) {
      if (exp.optional) {
        matches.push({ path: exp.path, message: 'Matching' });
      } else {
        mismatches.push({ path: exp.path, message: 'NOT matching', reason: 'MISSING' });
      }
      continue;
    }

    const actualType = jsonTypeOf(actualValue);
    const expectedType: JsonType | undefined = exp.expectedType ?? (exp.expectedValue !== undefined ? jsonTypeOf(exp.expectedValue) : undefined);

    if (expectedType && actualType !== expectedType) {
      mismatches.push({
        path: exp.path,
        message: 'NOT matching',
        reason: 'TYPE',
        expectedType,
        actualType,
        expectedValue: exp.expectedValue,
        actualValue,
      });
      continue;
    }

    if (exp.expectedValue !== undefined) {
      if (!deepEqual(actualValue, exp.expectedValue)) {
        mismatches.push({
          path: exp.path,
          message: 'NOT matching',
          reason: 'VALUE',
          expectedType,
          actualType,
          expectedValue: exp.expectedValue,
          actualValue,
        });
        continue;
      }
    }

    matches.push({ path: exp.path, message: 'Matching' });
  }

  return { ok: mismatches.length === 0, matches, mismatches };
}

export function formatJsonFieldValidationResult(res: FieldValidationResult): string {
  const fmt = (v: unknown) => JSON.stringify(v);
  const notMatching = res.mismatches
    .map((m) => {
      const base = `- ${m.message}: ${m.path} reason=${m.reason}`;
      if (m.reason === 'MISSING') return base;
      return `${base} expectedType=${m.expectedType} actualType=${m.actualType} expected=${fmt(m.expectedValue)} actual=${fmt(m.actualValue)}`;
    })
    .join('\n');

  return [`OK=${res.ok}`, `NOT matching (${res.mismatches.length}):`, notMatching || '- (none)'].join('\n');
}

export function assertJsonFields(actualJson: unknown, expectations: FieldExpectation[]): void {
  const res = validateJsonFields(actualJson, expectations);
  if (res.ok) return;
  throw new Error(`JSON field validation failed:\n${formatJsonFieldValidationResult(res)}`);
}

