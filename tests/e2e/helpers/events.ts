// Kiểm sự kiện đo lường mà E2E thu được từ console (docs/TECH.md mục 11, dòng "Ghi đủ sự kiện đo lường").
// Danh sách trường dưới đây viết lại độc lập từ docs/GDD.md mục 9.1, KHÔNG lấy từ mã nguồn, để test bắt được
// trường thừa (nguy cơ lộ dữ liệu định danh) lẫn trường thiếu.

/** Một sự kiện đo lường đọc từ console (tiền tố `[track] `, xem src/services/analytics/sinks.ts). */
export type TrackedEvent = { type: string } & Record<string, unknown>;

const COMMON_KEYS = [
  'type',
  'eventId',
  'installId',
  'sessionId',
  'ts',
  'appVersion',
  'device',
] as const;

const DEVICE_KEYS = ['kind', 'w', 'h', 'quality'] as const;

interface KeySpec {
  required: readonly string[];
  optional: readonly string[];
}

const SPECIFIC_KEYS: Readonly<Record<string, KeySpec>> = {
  level_start: {
    required: ['levelId', 'mode', 'attemptNo', 'restart'],
    optional: [],
  },
  hint_used: {
    required: ['levelId', 'mode', 'tier', 'elapsedMs'],
    optional: [],
  },
  level_complete: {
    required: [
      'levelId',
      'mode',
      'durationMs',
      'hintsUsed',
      'result',
      'wrongCount',
    ],
    optional: ['noWebgl'],
  },
  level_abandon: {
    required: ['levelId', 'mode', 'durationMs', 'hintsUsed', 'wrongCount'],
    optional: [],
  },
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const LEVEL_ID = /^(2d|3d)-[a-z0-9]+(-[a-z0-9]+)*$/;

const isInt = (value: unknown, min: number, max = Infinity): boolean =>
  typeof value === 'number' &&
  Number.isInteger(value) &&
  value >= min &&
  value <= max;
const isDuration = (value: unknown): boolean =>
  typeof value === 'number' && Number.isFinite(value) && value >= 0;
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

function checkFields(event: TrackedEvent, at: string): string[] {
  const problems: string[] = [];
  const bad = (field: string, why: string): void => {
    problems.push(`${at}: ${field} ${why}`);
  };

  for (const field of ['eventId', 'installId', 'sessionId'] as const) {
    if (typeof event[field] !== 'string' || !UUID.test(event[field]))
      bad(field, 'phải là UUID');
  }
  if (
    typeof event.ts !== 'string' ||
    !event.ts.endsWith('Z') ||
    Number.isNaN(Date.parse(event.ts))
  )
    bad('ts', 'phải là thời điểm ISO 8601 (UTC)');
  if (typeof event.appVersion !== 'string' || event.appVersion === '')
    bad('appVersion', 'không được rỗng');

  const device = event.device;
  if (!isRecord(device)) {
    bad('device', 'phải là đối tượng');
  } else {
    const keys = Object.keys(device).sort();
    if (keys.join() !== [...DEVICE_KEYS].sort().join())
      bad('device', `có trường sai: ${keys.join(', ')}`);
    if (!['ios', 'android', 'desktop', 'other'].includes(String(device.kind)))
      bad('device.kind', 'ngoài danh sách cho phép');
    if (!isInt(device.w, 1) || !isInt(device.h, 1))
      bad('device.w/h', 'phải là số nguyên dương');
    if (!['high', 'medium', 'low'].includes(String(device.quality)))
      bad('device.quality', 'ngoài danh sách cho phép');
  }

  if (typeof event.levelId !== 'string' || !LEVEL_ID.test(event.levelId))
    bad('levelId', 'sai dạng mã màn');
  if (event.mode !== 'campaign' && event.mode !== 'daily')
    bad('mode', 'phải là campaign hoặc daily');

  switch (event.type) {
    case 'level_start':
      if (!isInt(event.attemptNo, 1)) bad('attemptNo', 'phải là số nguyên ≥ 1');
      if (typeof event.restart !== 'boolean') bad('restart', 'phải là boolean');
      break;
    case 'hint_used':
      if (!isInt(event.tier, 1, 3)) bad('tier', 'phải là 1, 2 hoặc 3');
      if (!isDuration(event.elapsedMs)) bad('elapsedMs', 'phải là số ≥ 0');
      break;
    case 'level_complete':
      if (!isDuration(event.durationMs)) bad('durationMs', 'phải là số ≥ 0');
      if (!isInt(event.hintsUsed, 0, 3)) bad('hintsUsed', 'phải từ 0 đến 3');
      if (event.result !== 'solved' && event.result !== 'revealed')
        bad('result', 'phải là solved hoặc revealed');
      if (!isInt(event.wrongCount, 0))
        bad('wrongCount', 'phải là số nguyên ≥ 0');
      if ('noWebgl' in event && typeof event.noWebgl !== 'boolean')
        bad('noWebgl', 'phải là boolean');
      break;
    case 'level_abandon':
      if (!isDuration(event.durationMs)) bad('durationMs', 'phải là số ≥ 0');
      if (!isInt(event.hintsUsed, 0, 3)) bad('hintsUsed', 'phải từ 0 đến 3');
      if (!isInt(event.wrongCount, 0))
        bad('wrongCount', 'phải là số nguyên ≥ 0');
      break;
  }
  return problems;
}

/**
 * Trả về danh sách vi phạm (rỗng nghĩa là đạt):
 *  - mỗi sự kiện đủ trường bắt buộc, không có trường lạ, đúng kiểu; `eventId` không trùng;
 *  - mỗi lượt chơi bắt đầu rồi có đúng một kết thúc (`level_complete` hoặc `level_abandon`);
 *    không có hai `level_start` liền nhau của cùng một màn, không có kết thúc hay `hint_used` khi chưa bắt đầu.
 * Một lượt còn dở ở cuối chuỗi là bình thường (test dừng giữa màn), xem `openRuns`.
 */
export function findEventProblems(events: readonly TrackedEvent[]): string[] {
  const problems: string[] = [];
  const seenIds = new Set<unknown>();
  const open = new Set<string>();

  events.forEach((event, index) => {
    const at = `sự kiện #${index + 1} (${event.type})`;
    const spec = SPECIFIC_KEYS[event.type];
    if (!spec) {
      problems.push(`${at}: tên sự kiện không nằm trong GDD mục 9.1`);
      return;
    }

    const allowed = new Set<string>([
      ...COMMON_KEYS,
      ...spec.required,
      ...spec.optional,
    ]);
    const present = Object.keys(event);
    for (const key of [...COMMON_KEYS, ...spec.required]) {
      if (!present.includes(key)) problems.push(`${at}: thiếu trường ${key}`);
    }
    for (const key of present) {
      if (!allowed.has(key)) problems.push(`${at}: có trường lạ "${key}"`);
    }
    problems.push(...checkFields(event, at));

    if (seenIds.has(event.eventId)) problems.push(`${at}: eventId bị trùng`);
    seenIds.add(event.eventId);

    const levelId = String(event.levelId);
    if (event.type === 'level_start') {
      if (open.has(levelId))
        problems.push(
          `${at}: ${levelId} bắt đầu lần nữa khi lượt trước chưa kết thúc`,
        );
      open.add(levelId);
    } else {
      if (!open.has(levelId))
        problems.push(`${at}: ${levelId} chưa bắt đầu mà đã có sự kiện này`);
      if (event.type !== 'hint_used') open.delete(levelId);
    }
  });
  return problems;
}

/** Các màn còn một lượt chơi dở (đã `level_start`, chưa có `level_complete`/`level_abandon`). */
export function openRuns(events: readonly TrackedEvent[]): string[] {
  const open = new Set<string>();
  for (const event of events) {
    const levelId = String(event.levelId);
    if (event.type === 'level_start') open.add(levelId);
    else if (event.type === 'level_complete' || event.type === 'level_abandon')
      open.delete(levelId);
  }
  return [...open];
}

/** Tên các sự kiện theo thứ tự, để so với chuỗi mong đợi. */
export const typesOf = (events: readonly TrackedEvent[]): string[] =>
  events.map((event) => event.type);
