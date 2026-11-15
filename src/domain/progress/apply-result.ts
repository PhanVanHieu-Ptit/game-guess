import type { LevelResult, RunOutcome } from './types';

/**
 * Gộp kết quả của một lượt chơi vừa xong vào kết quả đã lưu, giữ kết quả tốt nhất (docs/GDD.md mục 5):
 * - đã tự giải thì lần xem đáp án sau không làm kết quả tệ đi;
 * - đã xem đáp án rồi tự giải thì thành "đã giải";
 * - cùng loại thì giữ thời gian ngắn nhất và số gợi ý ít nhất.
 */
export function applyResult(
  prev: LevelResult | undefined,
  outcome: RunOutcome,
): LevelResult {
  const fresh: LevelResult = {
    status: outcome.status,
    bestMs: Math.max(0, Math.round(outcome.durationMs)),
    bestHints: outcome.hintsUsed,
    lastSolvedAt: outcome.at,
  };
  if (!prev) return fresh;
  if (prev.status === 'solved' && outcome.status === 'revealed') return prev;
  if (prev.status === 'revealed' && outcome.status === 'solved') return fresh;
  return {
    status: prev.status,
    bestMs: Math.min(prev.bestMs, fresh.bestMs),
    bestHints: Math.min(
      prev.bestHints,
      fresh.bestHints,
    ) as LevelResult['bestHints'],
    lastSolvedAt: outcome.at,
  };
}
