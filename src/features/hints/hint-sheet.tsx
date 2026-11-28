'use client';

import { useEffect, useRef, useState } from 'react';
import {
  needsConfirmation,
  type HintTier,
  type OpenableTier,
} from '@/domain/hints/hint-machine';
import type { LevelMeta } from '@/domain/levels/types';
import { formatScore, runScore } from '@/domain/progress/scoring';
import { strings } from '@/features/strings';
import { Button } from '@/features/ui/button';
import { Modal } from '@/features/ui/modal';
import styles from './hints.module.css';

export interface HintSheetProps {
  open: boolean;
  meta: LevelMeta;
  /** Cấp gợi ý cao nhất đã mở trong lượt chơi (0–3). */
  tier: HintTier;
  onOpenTier: (tier: OpenableTier) => void;
  /** Người chơi đã xác nhận xem đáp án. */
  onReveal: () => void;
  onClose: () => void;
}

const TIERS: readonly OpenableTier[] = [1, 2, 3];

/** Hộp gợi ý ba cấp (docs/GDD.md mục 5): mở tuần tự; cấp 3 là xem đáp án và cần xác nhận. */
export function HintSheet({ open, ...body }: HintSheetProps) {
  return (
    <Modal
      open={open}
      label={strings.hints.title}
      variant="sheet"
      onDismiss={body.onClose}
    >
      <HintSheetBody {...body} />
    </Modal>
  );
}

function HintSheetBody({
  meta,
  tier,
  onOpenTier,
  onReveal,
  onClose,
}: Omit<HintSheetProps, 'open'>) {
  // Component chỉ tồn tại lúc hộp mở, nên trạng thái "đang xác nhận" tự đặt lại mỗi lần mở.
  const [confirming, setConfirming] = useState(false);
  const confirmRef = useRef<HTMLDivElement>(null);

  // Máy nhỏ (iPhone SE 320×568): hộp gợi ý đã cao gần hết màn hình nên phần xác nhận nằm dưới mép và người chơi
  // không thấy nút. Cuộn nó vào tầm nhìn ngay khi hiện (`nearest`: chỉ cuộn khi cần, và cuộn ít nhất có thể).
  useEffect(() => {
    if (confirming) confirmRef.current?.scrollIntoView({ block: 'nearest' });
  }, [confirming]);

  return (
    <>
      <h2 className={styles.title}>{strings.hints.title}</h2>
      {tier === 1 ? (
        <p className={styles.intro}>{strings.hints.intro}</p>
      ) : null}
      <ol className={styles.steps}>
        {TIERS.map((step) => {
          const opened = step <= tier;
          const isNext = step === tier + 1;
          const state = opened ? 'opened' : isNext ? 'next' : 'locked';
          return (
            <li
              key={step}
              className={styles.step}
              data-state={state}
              data-testid={`hint-step-${step}`}
            >
              <p className={styles.stepName}>
                {strings.hints.tierName[step - 1]}
                {' · '}
                {formatScore(
                  runScore(
                    meta.ordinal,
                    step === 3 ? 'revealed' : 'solved',
                    step,
                  ),
                )}{' '}
                điểm khi giải
              </p>
              {opened ? (
                <p className={styles.stepText}>{meta.hints[step - 1]}</p>
              ) : null}
              {state === 'locked' ? (
                <p className={styles.stepText}>{strings.hints.locked}</p>
              ) : null}
              {isNext && !(confirming && needsConfirmation(step)) ? (
                <Button
                  block
                  onClick={() =>
                    needsConfirmation(step)
                      ? setConfirming(true)
                      : onOpenTier(step)
                  }
                >
                  {strings.hints.open[step - 1]}
                </Button>
              ) : null}
              {isNext && confirming && needsConfirmation(step) ? (
                <div
                  ref={confirmRef}
                  className={styles.confirm}
                  role="group"
                  aria-label={strings.hints.confirmTitle}
                >
                  <p className={styles.confirmTitle}>
                    {strings.hints.confirmTitle}
                  </p>
                  <p>{strings.hints.confirmBody}</p>
                  <Button block variant="primary" onClick={onReveal}>
                    {strings.hints.confirmYes}
                  </Button>
                  <Button block onClick={() => setConfirming(false)}>
                    {strings.hints.confirmNo}
                  </Button>
                </div>
              ) : null}
            </li>
          );
        })}
      </ol>
      <Button block variant="quiet" onClick={onClose}>
        {strings.hints.close}
      </Button>
    </>
  );
}
