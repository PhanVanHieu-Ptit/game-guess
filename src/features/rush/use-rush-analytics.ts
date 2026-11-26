'use client';

import { useEffect, useRef } from 'react';
import { RUSH_DURATION_MS, type RushState } from '@/domain/rush/run';
import type { EventPayloads } from '@/services/analytics/events';
import { generateId } from '@/services/analytics/ids';
import { track } from '@/services/analytics/track';
import { safeStorage } from '@/services/storage/safe-storage';
import { ensureProgressHydrated } from '@/stores/progress';
import { wireAnalyticsContext } from '@/features/game-shell/analytics-context';

export function useRushAnalytics(state: RushState) {
  const run = useRef<EventPayloads['rush_start'] | null>(null);
  const latest = useRef(state);
  const terminal = useRef(false);

  useEffect(() => {
    latest.current = state;
    if (state.phase !== 'finished' || !run.current || terminal.current) return;
    terminal.current = true;
    track('rush_complete', {
      ...run.current,
      score: state.score,
      solved: state.solved,
      bestCombo: state.bestCombo,
      durationMs: RUSH_DURATION_MS - state.remainingMs,
      reason:
        state.remainingMs === 0
          ? 'timeout'
          : state.lives === 0
            ? 'lives'
            : 'deck',
    });
  }, [state]);

  useEffect(() => {
    function abandon() {
      const current = latest.current;
      if (!run.current || terminal.current) return;
      terminal.current = true;
      track('rush_abandon', {
        ...run.current,
        score: current.score,
        durationMs: Math.min(
          RUSH_DURATION_MS,
          Math.max(0, Date.now() - (current.deadline - RUSH_DURATION_MS)),
        ),
      });
    }
    function onPageHide(event: PageTransitionEvent) {
      // A cached page can resume the same live game on browser Back.
      if (!event.persisted) abandon();
    }
    window.addEventListener('pagehide', onPageHide);
    return () => {
      window.removeEventListener('pagehide', onPageHide);
      abandon();
    };
  }, []);

  return {
    start(data: Omit<EventPayloads['rush_start'], 'runId' | 'attempt'>) {
      ensureProgressHydrated();
      wireAnalyticsContext();
      const key = `latleo:rush:attempt:v1:${data.mode}:${data.seed}`;
      const stored = Number(safeStorage.getItem(key));
      const attempt =
        Number.isSafeInteger(stored) && stored >= 0 && stored < 1_000_000
          ? stored + 1
          : 1;
      safeStorage.setItem(key, String(attempt));
      run.current = { ...data, runId: generateId(), attempt };
      terminal.current = false;
      track('rush_start', run.current);
    },
    share(outcome: EventPayloads['rush_share']['outcome']) {
      if (!run.current) return;
      track('rush_share', { ...run.current, score: state.score, outcome });
    },
  };
}
