'use client';

import {
  CHAPTERS,
  chapterIndex,
  chapterProgress,
} from '@/domain/progress/journey';
import { LEVEL_METAS } from '@/levels';
import { useProgress } from '@/stores/progress';
import styles from './journey.module.css';

export function JourneyCard({
  ordinal,
  compact = false,
}: {
  ordinal: number;
  compact?: boolean;
}) {
  const results = useProgress((state) => state.levels);
  const index = chapterIndex(ordinal);
  const chapter = CHAPTERS[index];
  const progress = chapterProgress(LEVEL_METAS, results, index);
  return (
    <section
      className={compact ? styles.compact : styles.card}
      aria-label="Hành trình lắt léo"
      style={{ backgroundColor: chapter.color }}
    >
      <div className={styles.row}>
        <span className={styles.icon} aria-hidden="true">
          {chapter.icon}
        </span>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>
            Cấp {index + 1} / {CHAPTERS.length} · {chapter.rank}
          </p>
          <p className={styles.name}>
            {compact ? `Cấp ${index + 1} · ${chapter.rank}` : chapter.name}
          </p>
        </div>
        <strong>
          {progress.completed}/{progress.total}
        </strong>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={`Tiến độ chặng ${index + 1}`}
        aria-valuemin={0}
        aria-valuemax={progress.total}
        aria-valuenow={progress.completed}
      >
        {Array.from({ length: progress.total }, (_, i) => (
          <span key={i} data-filled={i < progress.completed} />
        ))}
      </div>
      {!compact && (
        <>
          <p className={styles.caption}>
            {chapter.difficulty} · {chapter.brief}
          </p>
          <p className={styles.caption}>
            {progress.earned
              ? `Đã sưu tập dấu “${chapter.stamp}”!`
              : `Thêm ${progress.total - progress.completed} màn để sưu tập dấu “${chapter.stamp}”.`}
          </p>
        </>
      )}
    </section>
  );
}

export function StampCollection() {
  const results = useProgress((state) => state.levels);
  const earned = CHAPTERS.filter(
    (_, index) => chapterProgress(LEVEL_METAS, results, index).earned,
  ).length;
  return (
    <section
      className={styles.collection}
      aria-label="Bộ sưu tập dấu hành trình"
    >
      <p className={styles.name}>
        Hộ chiếu lắt léo{' '}
        <span>
          {earned}/{CHAPTERS.length} dấu
        </span>
      </p>
      <div className={styles.stamps}>
        {CHAPTERS.map((chapter, index) => {
          const progress = chapterProgress(LEVEL_METAS, results, index);
          return (
            <span
              key={chapter.stamp}
              className={styles.stamp}
              role="img"
              data-earned={progress.earned}
              aria-label={`${chapter.stamp}: ${progress.earned ? 'đã sưu tập' : `${progress.completed}/${progress.total} màn`}`}
              title={chapter.stamp}
            >
              <span aria-hidden="true">
                {progress.earned ? chapter.icon : '·'}
              </span>
            </span>
          );
        })}
      </div>
      <p className={styles.caption}>
        Qua 6 màn nhận dấu hành trình. Giải đủ cả 6 để nhận danh hiệu.
      </p>
    </section>
  );
}
