import type { AnalyticsEvent } from './events';

const UUID = /^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i;
const DAY = /^\d{4}-\d{2}-\d{2}$/;
type Check = (value: unknown) => boolean;
const text: Check = (v) =>
  typeof v === 'string' && v.length > 0 && v.length <= 64;
const uuid: Check = (v) => typeof v === 'string' && UUID.test(v);
const bool: Check = (v) => typeof v === 'boolean';
const integer =
  (min: number, max: number): Check =>
  (v) =>
    typeof v === 'number' && Number.isSafeInteger(v) && v >= min && v <= max;
const oneOf =
  (...values: unknown[]): Check =>
  (v) =>
    values.includes(v);
const duration = integer(0, 86_400_000);
const score = integer(0, 14_400);
const record = (v: unknown): v is Record<string, unknown> =>
  typeof v === 'object' && v !== null && !Array.isArray(v);

const base: Record<string, Check> = {
  type: text,
  eventId: uuid,
  installId: uuid,
  sessionId: uuid,
  ts: (v) =>
    typeof v === 'string' &&
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(v) &&
    Number.isFinite(Date.parse(v)),
  appVersion: text,
  device: (v) =>
    record(v) &&
    matches(v, {
      kind: oneOf('ios', 'android', 'desktop', 'other'),
      quality: oneOf('high', 'medium', 'low'),
      w: integer(0, 100_000),
      h: integer(0, 100_000),
    }),
};
const level = {
  levelId: (v: unknown) =>
    typeof v === 'string' && /^(2d|3d)-[a-z0-9-]{1,40}$/.test(v),
  mode: oneOf('campaign', 'daily'),
};
const rush = {
  runId: uuid,
  mode: oneOf('rush', 'daily'),
  seed: integer(0, 0xffff_ffff),
  day: (v: unknown) => typeof v === 'string' && (v === '' || DAY.test(v)),
  attempt: integer(1, 1_000_000),
  challenged: bool,
};
const schemas: Record<string, Record<string, Check>> = {
  page_view: {
    page: oneOf('home', 'rush', 'daily', 'levels', 'play', 'other'),
    source: oneOf('direct', 'friend', 'community', 'short_video', 'playtest'),
  },
  rush_start: rush,
  rush_complete: {
    ...rush,
    score,
    solved: integer(0, 72),
    bestCombo: integer(0, 72),
    durationMs: integer(0, 60_000),
    reason: oneOf('timeout', 'lives', 'deck'),
  },
  rush_abandon: { ...rush, score, durationMs: integer(0, 60_000) },
  rush_share: {
    ...rush,
    score,
    outcome: oneOf('copied', 'shared', 'manual', 'cancelled'),
  },
  level_start: { ...level, attemptNo: integer(1, 1_000_000), restart: bool },
  hint_used: { ...level, tier: integer(1, 3), elapsedMs: duration },
  level_complete: {
    ...level,
    durationMs: duration,
    hintsUsed: integer(0, 3),
    result: oneOf('solved', 'revealed'),
    wrongCount: integer(0, 1_000_000),
  },
  level_abandon: {
    ...level,
    durationMs: duration,
    hintsUsed: integer(0, 3),
    wrongCount: integer(0, 1_000_000),
  },
};

function matches(
  value: Record<string, unknown>,
  schema: Record<string, Check>,
) {
  return (
    Object.keys(value).every((key) => Object.hasOwn(schema, key)) &&
    Object.entries(schema).every(([key, check]) => check(value[key]))
  );
}

/** Reject unknown fields, including URLs, answer text, names and emails. */
export function isAnalyticsEvent(value: unknown): value is AnalyticsEvent {
  if (!record(value) || typeof value.type !== 'string') return false;
  if (!Object.hasOwn(schemas, value.type)) return false;
  const schema = { ...base, ...schemas[value.type] };
  if (value.type === 'level_complete' && 'noWebgl' in value)
    Object.assign(schema, { noWebgl: bool });
  return matches(value, schema);
}
