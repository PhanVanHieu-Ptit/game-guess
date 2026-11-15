import { useEffect, useState, useSyncExternalStore } from 'react';
import type { LevelMeta, PlayMode } from '@/domain/levels/types';
import { track } from '@/services/analytics/track';
import { nowMs } from '@/services/clock/clock';
import { useProgress } from '@/stores/progress';
import { wireAnalyticsContext } from './analytics-context';
import { LevelRun, type RunSnapshot } from './level-run';

/**
 * Tạo và quản lý lượt chơi của một màn đang hiển thị. Dùng `key={meta.id}` ở nơi gọi để mỗi màn có một `LevelRun` riêng.
 * Việc gắn vào trang (nghe tab ẩn/hiện, pagehide) nằm trong useEffect để không chạm DOM lúc render phía máy chủ.
 */
export function useLevelRun(
  meta: LevelMeta,
  mode: PlayMode,
): { run: LevelRun; snapshot: RunSnapshot } {
  const [run] = useState(() => {
    // Phải nối ngữ cảnh đo lường trước sự kiện đầu tiên, mà sự kiện đó có thể phát ngay trong lần commit đầu.
    wireAnalyticsContext();
    return new LevelRun({
      meta,
      mode,
      track,
      now: nowMs,
      nextAttemptNo: () => useProgress.getState().recordAttempt(meta.id),
      onOutcome: (outcome) =>
        useProgress.getState().recordResult(meta.id, outcome),
    });
  });

  useEffect(() => run.mount(), [run]);
  const snapshot = useSyncExternalStore(
    run.subscribe,
    run.getSnapshot,
    run.getSnapshot,
  );
  return { run, snapshot };
}
