import type { HintTier } from '@/domain/hints/hint-machine';
import type { LevelId } from '@/domain/levels/types';
import type {
  DailyProgress,
  DailyResult,
  LevelResult,
  LevelResults,
  ProgressData,
  ResultStatus,
} from './types';

// Làm sạch dữ liệu đọc từ localStorage (docs/TECH.md mục 6): dữ liệu hỏng, sai kiểu hay phiên bản lạ thì bỏ
// phần hỏng và khởi tạo lại phần đó, tuyệt đối không ném lỗi.

export const PROGRESS_VERSION = 1;

const LEVEL_ID_PATTERN = /^(2d|3d)-[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const INSTALL_ID_PATTERN = /^[A-Za-z0-9-]{8,64}$/;
const MAX_COUNT = 1_000_000;

type Rec = Record<string, unknown>;

const isRecord = (value: unknown): value is Rec =>
  typeof value === 'object' && value !== null && !Array.isArray(value);
const isStatus = (value: unknown): value is ResultStatus =>
  value === 'solved' || value === 'revealed';
const isHintTier = (value: unknown): value is HintTier =>
  value === 0 || value === 1 || value === 2 || value === 3;
const isCount = (value: unknown): value is number =>
  typeof value === 'number' &&
  Number.isInteger(value) &&
  value >= 0 &&
  value <= MAX_COUNT;
const isDuration = (value: unknown): value is number =>
  typeof value === 'number' &&
  Number.isFinite(value) &&
  value >= 0 &&
  value <= 86_400_000;

/** Tiến trình trống của người chơi mới. `newId` sinh mã ẩn danh (truyền vào để domain không đụng tới crypto). */
export function emptyProgress(newId: () => string): ProgressData {
  return {
    version: PROGRESS_VERSION,
    installId: newId(),
    levels: {},
    attempts: {},
    daily: { results: {}, streak: 0, bestStreak: 0 },
  };
}

function readLevelResult(value: unknown): LevelResult | null {
  if (!isRecord(value)) return null;
  const { status, bestMs, bestHints, lastSolvedAt } = value;
  if (!isStatus(status) || !isDuration(bestMs) || !isHintTier(bestHints))
    return null;
  if (
    typeof lastSolvedAt !== 'string' ||
    !Number.isFinite(Date.parse(lastSolvedAt))
  )
    return null;
  return { status, bestMs, bestHints, lastSolvedAt };
}

function readDailyResult(value: unknown): DailyResult | null {
  if (!isRecord(value)) return null;
  const { status, ms, hints } = value;
  if (!isStatus(status) || !isDuration(ms) || !isHintTier(hints)) return null;
  return { status, ms, hints };
}

function readLevels(value: unknown): LevelResults {
  const levels: LevelResults = {};
  if (!isRecord(value)) return levels;
  for (const [id, raw] of Object.entries(value)) {
    const result = LEVEL_ID_PATTERN.test(id) ? readLevelResult(raw) : null;
    if (result) levels[id as LevelId] = result;
  }
  return levels;
}

function readAttempts(value: unknown): ProgressData['attempts'] {
  const attempts: ProgressData['attempts'] = {};
  if (!isRecord(value)) return attempts;
  for (const [id, count] of Object.entries(value)) {
    if (LEVEL_ID_PATTERN.test(id) && isCount(count) && count > 0)
      attempts[id as LevelId] = count;
  }
  return attempts;
}

function readDaily(value: unknown): DailyProgress {
  const daily: DailyProgress = { results: {}, streak: 0, bestStreak: 0 };
  if (!isRecord(value)) return daily;
  if (isRecord(value.results)) {
    for (const [date, raw] of Object.entries(value.results)) {
      const result = DATE_KEY_PATTERN.test(date) ? readDailyResult(raw) : null;
      if (result) daily.results[date] = result;
    }
  }
  if (isCount(value.streak)) daily.streak = value.streak;
  if (isCount(value.bestStreak)) daily.bestStreak = value.bestStreak;
  daily.bestStreak = Math.max(daily.bestStreak, daily.streak);
  return daily;
}

/**
 * Biến dữ liệu bất kỳ đọc từ ổ lưu trữ thành `ProgressData` hợp lệ. Phần nào hỏng thì khởi tạo lại phần đó.
 * Không có hoặc sai kiểu hoàn toàn thì trả về tiến trình trống.
 */
export function sanitizeProgress(
  raw: unknown,
  newId: () => string,
): ProgressData {
  if (!isRecord(raw)) return emptyProgress(newId);
  return {
    version: PROGRESS_VERSION,
    installId:
      typeof raw.installId === 'string' &&
      INSTALL_ID_PATTERN.test(raw.installId)
        ? raw.installId
        : newId(),
    levels: readLevels(raw.levels),
    attempts: readAttempts(raw.attempts),
    daily: readDaily(raw.daily),
  };
}

/**
 * Nâng cấp dữ liệu từ phiên bản `fromVersion` lên phiên bản hiện tại. Hiện chỉ có phiên bản 1, nên mọi phiên
 * bản khác (từ tương lai hoặc không rõ) coi là lạ và bắt đầu lại. Khi có phiên bản 2, thêm bước nâng cấp ở đây.
 */
export function migrateProgress(
  persisted: unknown,
  fromVersion: number,
  newId: () => string,
): ProgressData {
  if (fromVersion !== PROGRESS_VERSION) return emptyProgress(newId);
  return sanitizeProgress(persisted, newId);
}
