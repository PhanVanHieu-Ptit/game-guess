'use client';

import { useState } from 'react';
import type { HintTier } from '@/domain/hints/hint-machine';
import { isCheckpoint, runScore, formatScore } from '@/domain/progress/scoring';
import { Button } from '@/features/ui/button';
import { Modal } from '@/features/ui/modal';
import { PrizeLadder } from './prize-ladder';
import styles from './journey.module.css';

export function ChallengeStakes({
  ordinal,
  hints,
}: {
  ordinal: number;
  hints: HintTier;
}) {
  const [open, setOpen] = useState(false);
  const checkpoint = isCheckpoint(ordinal);
  return (
    <>
      <div
        className={styles.stakes}
        data-checkpoint={checkpoint}
        aria-label="Điểm thử thách"
      >
        <div>
          <span>
            {checkpoint
              ? '🏆 Màn chốt · điểm ×2'
              : `Thử thách ${((ordinal - 1) % 6) + 1}/6`}
          </span>
          <strong
            aria-live="polite"
            aria-label={`${formatScore(runScore(ordinal, 'solved', hints))} điểm khi giải đúng`}
          >
            {formatScore(runScore(ordinal, 'solved', hints))} điểm
          </strong>
        </div>
        <Button variant="quiet" onClick={() => setOpen(true)}>
          Thang điểm
        </Button>
      </div>
      <Modal
        open={open}
        label="Luật chinh phục"
        onDismiss={() => setOpen(false)}
      >
        <h2>Chinh phục từng cấp</h2>
        <PrizeLadder />
        <Button block onClick={() => setOpen(false)}>
          Tiếp tục chơi
        </Button>
      </Modal>
    </>
  );
}
