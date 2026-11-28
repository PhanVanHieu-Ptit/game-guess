'use client';

import Link from 'next/link';
import { useEffect, type ReactNode } from 'react';
import type { LevelMeta } from '@/domain/levels/types';
import type { LevelResults } from '@/domain/progress/types';
import { isUnlocked } from '@/domain/progress/unlock';
import {
  CHAPTERS,
  chapterIndex,
  chapterProgress,
} from '@/domain/progress/journey';
import { StampCollection } from '@/features/journey/journey-card';
import { PrizeLadder } from '@/features/journey/prize-ladder';
import {
  chapterReward,
  formatScore,
  isCheckpoint,
  maxLevelScore,
} from '@/domain/progress/scoring';
import { UNLOCK_ALL } from '@/features/config';
import { StorageNotice } from '@/features/game-shell/storage-notice';
import { strings } from '@/features/strings';
import { IconLink } from '@/features/ui/button';
import {
  ArrowLeftIcon,
  BulbIcon,
  CheckIcon,
  LockIcon,
} from '@/features/ui/icons';
import { LEVEL_METAS } from '@/levels';
import { ensureProgressHydrated, useProgress } from '@/stores/progress';
import styles from './level-select.module.css';

type CellState = 'locked' | 'open' | 'solved' | 'revealed';

/**
 * Trạng thái một ô. Trước khi nạp xong tiến trình chỉ màn đầu mở, giống HTML máy chủ (docs/TECH.md mục 6);
 * sau đó lấy từ kết quả đã lưu và luật mở khóa.
 */
function cellState(
  meta: LevelMeta,
  hydrated: boolean,
  results: LevelResults,
): CellState {
  if (!hydrated) return meta.ordinal === 1 ? 'open' : 'locked';
  const result = results[meta.id];
  if (result) return result.status;
  return isUnlocked(LEVEL_METAS, meta.id, results, UNLOCK_ALL)
    ? 'open'
    : 'locked';
}

function markFor(state: CellState): ReactNode {
  if (state === 'solved') return <CheckIcon size={16} />;
  if (state === 'revealed') return <BulbIcon size={16} />;
  if (state === 'locked') return <LockIcon size={16} />;
  return null;
}

/** Màn chọn màn: bảy cấp, lưới màn và mốc thưởng. Ô khóa không lộ tên hoặc đáp án. */
export function LevelSelect() {
  useEffect(() => {
    ensureProgressHydrated();
  }, []);
  const hydrated = useProgress((state) => state.hydrated);
  const results = useProgress((state) => state.levels);

  return (
    <main className="page">
      <header className={styles.header}>
        <IconLink href="/" label={strings.levels.back}>
          <ArrowLeftIcon />
        </IconLink>
        <h1 className={styles.title}>{strings.levels.title}</h1>
        <span aria-hidden="true" />
      </header>

      <PrizeLadder />
      <StampCollection />
      <div aria-label={strings.levels.listLabel}>
        {CHAPTERS.map((chapter, index) => {
          const progress = chapterProgress(LEVEL_METAS, results, index);
          const reward = chapterReward(LEVEL_METAS, results, index);
          return (
            <section key={chapter.name} className={styles.chapter}>
              <h2 className={styles.chapterTitle}>
                <span aria-hidden="true">{chapter.icon}</span> Cấp {index + 1} ·{' '}
                {chapter.rank}{' '}
                <span>
                  {progress.completed}/{progress.total}
                </span>
              </h2>
              <p className={styles.chapterCaption}>
                {chapter.difficulty} · {chapter.brief}
              </p>
              <p className={styles.reward}>
                {reward.mastered
                  ? `🏆 Đã nhận danh hiệu ${chapter.rank}`
                  : `Mốc màn ${reward.milestone} · Tối đa ${formatScore(reward.maximum)} điểm`}
              </p>
              <p className={styles.chapterCaption}>
                {progress.earned
                  ? `Dấu “${chapter.stamp}” đã vào hộ chiếu!`
                  : `Dấu chờ bạn: ${chapter.stamp}`}
              </p>
              <ol className={styles.grid} aria-label={`Chặng ${index + 1}`}>
                {LEVEL_METAS.filter(
                  (meta) => chapterIndex(meta.ordinal) === index,
                ).map((meta) => {
                  const state = cellState(meta, hydrated, results);
                  const label = strings.levels.cell(meta.ordinal, state);
                  const mark = markFor(state);
                  const content = (
                    <>
                      <strong>
                        {meta.ordinal}
                        {isCheckpoint(meta.ordinal) ? ' 🏆' : ''}
                      </strong>
                      <span className={styles.cellTitle}>
                        {isCheckpoint(meta.ordinal)
                          ? 'Màn chốt ×2'
                          : state === 'locked'
                            ? `Độ khó ${meta.difficulty}/5`
                            : meta.title}
                      </span>
                      <span className={styles.cellScore}>
                        {formatScore(maxLevelScore(meta.ordinal))} điểm
                      </span>
                      {mark ? (
                        <span className={styles.mark} aria-hidden="true">
                          {mark}
                        </span>
                      ) : null}
                    </>
                  );
                  return (
                    <li key={meta.id}>
                      {state === 'locked' ? (
                        <span
                          className={styles.cell}
                          data-state={state}
                          data-checkpoint={isCheckpoint(meta.ordinal)}
                          role="img"
                          aria-label={label}
                        >
                          {content}
                        </span>
                      ) : (
                        <Link
                          className={styles.cell}
                          data-state={state}
                          data-checkpoint={isCheckpoint(meta.ordinal)}
                          data-touch-target
                          href={`/play/${meta.id}`}
                          aria-label={label}
                        >
                          {content}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>

      <p className={styles.legend}>{strings.levels.legend}</p>
      <StorageNotice />
    </main>
  );
}
