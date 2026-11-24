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

/** Màn chọn màn (docs/GDD.md mục 4, màn hình số 2): lưới ô đánh số sinh từ dữ liệu màn; ô khóa chỉ hiện số. */
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

      <StampCollection />
      <div aria-label={strings.levels.listLabel}>
        {CHAPTERS.map((chapter, index) => {
          const progress = chapterProgress(LEVEL_METAS, results, index);
          return (
            <section key={chapter.name} className={styles.chapter}>
              <h2 className={styles.chapterTitle}>
                <span aria-hidden="true">{chapter.icon}</span> {chapter.name}{' '}
                <span>
                  {progress.completed}/{progress.total}
                </span>
              </h2>
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
                      {meta.ordinal}
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
                          role="img"
                          aria-label={label}
                        >
                          {content}
                        </span>
                      ) : (
                        <Link
                          className={styles.cell}
                          data-state={state}
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
