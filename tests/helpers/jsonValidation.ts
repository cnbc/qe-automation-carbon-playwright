export type JsonType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'null'
  | 'undefined'
  | 'array'
  | 'double'
  | 'float'
  | 'long'
  | 'int'
  | 'short'
  | 'byte'
  | 'char'
  | 'boolean'
  | 'object';

export type JsonShapeValidationOptions = {
  /**
   * When validating arrays:
   * - "template": if expected array has at least one element, use expected[0] as a template for *all* actual elements.
   * - "tuple": validate element-by-element (lengths must match).
   */
  arrayMode?: 'template' | 'tuple';
  /**
   * If true, also validate primitive values are equal (strings/numbers/booleans/null).
   * Default false because many API responses contain dynamic values (ids, timestamps, etc.).
   */
  enforcePrimitiveValues?: boolean;
};

export type JsonShapeMatch = { path: string; message: 'Matching' };
export type JsonShapeMismatch = {
  path: string;
  expectedType: JsonType;
  actualType: JsonType;
  expectedValue?: unknown;
  actualValue?: unknown;
  message: 'NOT matching';
};

export type JsonShapeValidationResult = {
  ok: boolean;
  matches: JsonShapeMatch[];
  mismatches: JsonShapeMismatch[];
};

export function parseJsonOrThrow<T = unknown>(raw: string, label = 'JSON'): T {
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`${label} parse failed: ${msg}. First 200 chars: ${(raw ?? '').slice(0, 200)}`);
  }
}

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

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && (v as any).constructor === Object;
}

function joinPath(base: string, next: string): string {
  if (!base) return next;
  if (next.startsWith('[')) return `${base}${next}`;
  return `${base}.${next}`;
}

function validateShapeInner(params: {
  actual: unknown;
  expected: unknown;
  path: string;
  opts: Required<JsonShapeValidationOptions>;
  matches: JsonShapeMatch[];
  mismatches: JsonShapeMismatch[];
}) {
  const { actual, expected, path, opts, matches, mismatches } = params;

  const expectedType = jsonTypeOf(expected);
  const actualType = jsonTypeOf(actual);

  if (expectedType !== actualType) {
    mismatches.push({
      path,
      expectedType,
      actualType,
      expectedValue: expected,
      actualValue: actual,
      message: 'NOT matching',
    });
    return;
  }

  // primitive types
  if (expectedType === 'string' || expectedType === 'number' || expectedType === 'boolean' || expectedType === 'null') {
    if (opts.enforcePrimitiveValues && expectedType !== 'null') {
      if (!Object.is(actual, expected)) {
        mismatches.push({
          path,
          expectedType,
          actualType,
          expectedValue: expected,
          actualValue: actual,
          message: 'NOT matching',
        });
        return;
      }
    }
    matches.push({ path, message: 'Matching' });
    return;
  }

  if (expectedType === 'array') {
    const actualArr = actual as unknown[];
    const expectedArr = expected as unknown[];

    if (opts.arrayMode === 'tuple') {
      if (actualArr.length !== expectedArr.length) {
        mismatches.push({
          path: joinPath(path, 'length'),
          expectedType: 'number',
          actualType: 'number',
          expectedValue: expectedArr.length,
          actualValue: actualArr.length,
          message: 'NOT matching',
        });
        return;
      }
      for (let i = 0; i < expectedArr.length; i++) {
        validateShapeInner({
          actual: actualArr[i],
          expected: expectedArr[i],
          path: joinPath(path, `[${i}]`),
          opts,
          matches,
          mismatches,
        });
      }
      matches.push({ path, message: 'Matching' });
      return;
    }

    // template mode
    if (expectedArr.length === 0) {
      matches.push({ path, message: 'Matching' });
      return;
    }
    const template = expectedArr[0];
    for (let i = 0; i < actualArr.length; i++) {
      validateShapeInner({
        actual: actualArr[i],
        expected: template,
        path: joinPath(path, `[${i}]`),
        opts,
        matches,
        mismatches,
      });
    }
    matches.push({ path, message: 'Matching' });
    return;
  }

  // object
  if (!isPlainObject(expected) || !isPlainObject(actual)) {
    // expectedType === actualType === 'object' but not plain objects (rare in JSON); accept type-only.
    matches.push({ path, message: 'Matching' });
    return;
  }

  for (const key of Object.keys(expected)) {
    if (!Object.prototype.hasOwnProperty.call(actual, key)) {
      mismatches.push({
        path: joinPath(path, key),
        expectedType: jsonTypeOf((expected as any)[key]),
        actualType: 'undefined',
        expectedValue: (expected as any)[key],
        actualValue: undefined,
        message: 'NOT matching',
      });
      continue;
    }

    validateShapeInner({
      actual: (actual as any)[key],
      expected: (expected as any)[key],
      path: joinPath(path, key),
      opts,
      matches,
      mismatches,
    });
  }

  matches.push({ path, message: 'Matching' });
}

/**
 * Validate that `actual` has the same *keys + nested structure + types* as `expected`.
 *
 * This is ideal for large JSON responses where many fields are dynamic: you can keep
 * a "sample response" JSON as the expected template and validate the shape.
 */
export function validateJsonShape(
  actual: unknown,
  expected: unknown,
  options?: JsonShapeValidationOptions,
): JsonShapeValidationResult {
  const opts: Required<JsonShapeValidationOptions> = {
    arrayMode: options?.arrayMode ?? 'template',
    enforcePrimitiveValues: options?.enforcePrimitiveValues ?? false,
  };

  const matches: JsonShapeMatch[] = [];
  const mismatches: JsonShapeMismatch[] = [];

  validateShapeInner({ actual, expected, path: '$', opts, matches, mismatches });
  return { ok: mismatches.length === 0, matches, mismatches };
}

export function formatJsonShapeValidationResult(res: JsonShapeValidationResult): string {
  const fmt = (v: unknown) => JSON.stringify(v);
  const notMatching = res.mismatches
    .map(
      (m) =>
        `- ${m.message}: ${m.path} expectedType=${m.expectedType} actualType=${m.actualType}` +
        (m.expectedValue !== undefined || m.actualValue !== undefined
          ? ` expected=${fmt(m.expectedValue)} actual=${fmt(m.actualValue)}`
          : ''),
    )
    .join('\n');

  return [`OK=${res.ok}`, `NOT matching (${res.mismatches.length}):`, notMatching || '- (none)'].join('\n');
}

export function assertJsonShape(actual: unknown, expected: unknown, options?: JsonShapeValidationOptions): void {
  const res = validateJsonShape(actual, expected, options);
  if (res.ok) return;
  throw new Error(`JSON shape validation failed:\n${formatJsonShapeValidationResult(res)}`);
}

