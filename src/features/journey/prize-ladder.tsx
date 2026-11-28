'use client';

import { CHAPTERS, chapterProgress } from '@/domain/progress/journey';
import {
  campaignScore,
  chapterReward,
  earnedRank,
  formatScore,
} from '@/domain/progress/scoring';
import { LEVEL_METAS } from '@/levels';
import { useProgress } from '@/stores/progress';
import styles from './journey.module.css';

export function PrizeLadder() {
  const results = useProgress((state) => state.levels);
  return (
    <section className={styles.scoreboard} aria-label="Thang chinh phục">
      <p className={styles.eyebrow}>42 MÀN · 7 CẤP · 7 MỐC THƯỞNG</p>
      <div className={styles.scoreRow}>
        <strong data-testid="campaign-score">
          {formatScore(campaignScore(LEVEL_METAS, results))} điểm
        </strong>
        <span>{earnedRank(LEVEL_METAS, results)}</span>
      </div>
      <details className={styles.ladder}>
        <summary data-touch-target>Xem thang cấp bậc và mốc thưởng</summary>
        <ol>
          {CHAPTERS.map((chapter, index) => {
            const reward = chapterReward(LEVEL_METAS, results, index);
            const progress = chapterProgress(LEVEL_METAS, results, index);
            return (
              <li key={chapter.rank} data-mastered={reward.mastered}>
                <span aria-hidden="true">
                  {reward.mastered ? '🏆' : chapter.icon}
                </span>
                <div>
                  <strong>
                    Cấp {index + 1} · {chapter.rank}
                  </strong>
                  <p>
                    Màn {index * 6 + 1}–{reward.milestone} ·{' '}
                    {chapter.difficulty}
                  </p>
                  <p>
                    {reward.mastered
                      ? 'Đã nhận danh hiệu'
                      : `Đã giải ${reward.solved}/6 · Đã qua ${progress.completed}/6`}
                  </p>
                </div>
                <strong>
                  {formatScore(reward.score)} / {formatScore(reward.maximum)}{' '}
                  điểm
                </strong>
              </li>
            );
          })}
        </ol>
        <p className={styles.rules}>
          Tự giải nhận 100% điểm; gợi ý nhẹ 75%; gợi ý rõ 50%. Xem đáp án nhận 0
          điểm và vẫn mở màn kế. Màn thứ 6 mỗi cấp có điểm gấp đôi.
        </p>
        <p className={styles.rules}>
          Giải đủ 6 màn để nhận danh hiệu. Chơi lại nâng kết quả tốt nhất; điểm
          không cộng trùng. Điểm chỉ dùng trong trò chơi.
        </p>
      </details>
    </section>
  );
}
