'use client';

import { useState, type ReactNode } from 'react';
import type { SceneProps } from '@/engine/scene';
import { Stage2D } from '@/engine/stage2d/stage-2d';
import styles from './choose.module.css';

// Cảnh dùng chung "chọn một đáp án" (docs/TECH.md mục 4, engine/stage2d/scenes). Màn chỉ cần khai báo dữ liệu:
// các lựa chọn, lựa chọn đúng và hình vẽ. Theo GDD mục 11 quy tắc 2, màn chỉ dựa vào chọn đáp án phải có ≥ 4 lựa chọn.

export interface ChooseOption {
  /** Khóa của lựa chọn; truyền vào `onWrong(id)` để tra phản hồi riêng trong `meta.wrong`. */
  id: string;
  label: string;
}

export interface ChooseSceneProps extends SceneProps {
  options: readonly ChooseOption[];
  correctId: string;
  /** Hình vẽ SVG hiện phía trên các lựa chọn, theo toạ độ logic `artWidth`×`artHeight` (mặc định 360×240). */
  art: ReactNode;
  artWidth?: number;
  artHeight?: number;
  /** Mô tả bằng chữ của hình vẽ cho trình đọc màn hình. */
  artLabel: string;
  /** Tên của nhóm lựa chọn cho trình đọc màn hình. */
  groupLabel: string;
}

export function ChooseScene({
  onSolved,
  onWrong,
  options,
  correctId,
  art,
  artWidth = 360,
  artHeight = 240,
  artLabel,
  groupLabel,
}: ChooseSceneProps) {
  // Lựa chọn sai bị đánh dấu "loại" (không bị phạt: người chơi vẫn thử tiếp, không giới hạn lần).
  const [eliminated, setEliminated] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [pickedId, setPickedId] = useState<string | null>(null);

  const pick = (id: string): void => {
    if (pickedId !== null || eliminated.has(id)) return;
    if (id === correctId) {
      setPickedId(id);
      onSolved();
    } else {
      setEliminated((previous) => new Set(previous).add(id));
      onWrong(id);
    }
  };

  return (
    <div className={styles.scene}>
      <div
        className={styles.art}
        style={{ aspectRatio: `${artWidth} / ${artHeight}` }}
      >
        <Stage2D label={artLabel} width={artWidth} height={artHeight}>
          {art}
        </Stage2D>
      </div>
      <div className={styles.options} role="group" aria-label={groupLabel}>
        {options.map((option) => {
          const state =
            option.id === pickedId
              ? 'correct'
              : eliminated.has(option.id)
                ? 'wrong'
                : 'idle';
          return (
            <button
              key={option.id}
              type="button"
              className={styles.option}
              data-touch-target
              data-state={state}
              aria-disabled={state !== 'idle'}
              onClick={() => pick(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
