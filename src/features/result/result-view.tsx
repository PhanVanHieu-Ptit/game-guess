import { solveLevelOf, type HintTier } from '@/domain/hints/hint-machine';
import type { LevelMeta } from '@/domain/levels/types';
import { formatDuration } from '@/domain/share/format-duration';
import {
  CHAPTERS,
  chapterIndex,
  chapterProgress,
  replayChallenge,
} from '@/domain/progress/journey';
import { JourneyCard } from '@/features/journey/journey-card';
import { LEVEL_METAS } from '@/levels';
import { flavorOf } from '@/levels/flavor';
import { useProgress } from '@/stores/progress';
import { strings } from '@/features/strings';
import { Button, ButtonLink } from '@/features/ui/button';
import { BulbIcon, CheckIcon } from '@/features/ui/icons';
import { Modal } from '@/features/ui/modal';
import styles from './result.module.css';

export interface ResultViewProps {
  open: boolean;
  meta: LevelMeta;
  status: 'solved' | 'revealed';
  hintsUsed: HintTier;
  durationMs: number;
  /** Màn kế tiếp; null nếu đây là màn cuối. */
  next: LevelMeta | null;
  onRestart: () => void;
}

/**
 * Màn kết quả (docs/GDD.md mục 4, màn hình số 5): dấu thắng, câu giải thích, thời gian, mức tự giải, rồi Màn tiếp.
 * Hiện ngay khi giải xong (≤ 1 giây theo docs/GDD.md mục 3.1). Ở màn cuối nút này thành "Về chọn màn"
 * (docs/backlog.md LL-005); màn tổng kết `/done` của docs/GDD.md mục 4 chưa dựng.
 */
export function ResultView({
  open,
  meta,
  status,
  hintsUsed,
  durationMs,
  next,
  onRestart,
}: ResultViewProps) {
  const revealed = status === 'revealed';
  const results = useProgress((state) => state.levels);
  const chapter = CHAPTERS[chapterIndex(meta.ordinal)];
  const progress = chapterProgress(
    LEVEL_METAS,
    results,
    chapterIndex(meta.ordinal),
  );
  const replay = replayChallenge(LEVEL_METAS, results);
  return (
    <Modal open={open} label={strings.result.dialogLabel} variant="full">
      {!revealed && (
        <div className={styles.confetti} aria-hidden="true">
          {Array.from({ length: 12 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `${5 + i * 8}%`,
                animationDelay: `${(i % 4) * 80}ms`,
                background: ['#ffc53d', '#73c892', '#b694df', '#ef6b68'][i % 4],
              }}
            />
          ))}
        </div>
      )}
      <div className={styles.mark} aria-hidden="true">
        {revealed ? <BulbIcon size={44} /> : <CheckIcon size={44} />}
      </div>
      <h2 className={styles.title}>
        {revealed ? strings.result.revealedTitle : strings.result.solvedTitle}
      </h2>
      <p className={styles.lead}>
        {revealed
          ? strings.result.revealedLead
          : (flavorOf(meta.id)?.[1] ?? strings.result.solvedLead)}
      </p>

      {progress.earned && (
        <p className={styles.stamp} data-testid="earned-stamp">
          <span aria-hidden="true">{chapter.icon}</span> Chặng hoàn tất ·{' '}
          {chapter.stamp}
        </p>
      )}
      <JourneyCard ordinal={meta.ordinal} compact />

      <div className={styles.nextCard}>
        <p className={styles.cardLabel}>
          {next ? 'Tiếp theo có gì?' : 'Hộ chiếu đã đầy dấu!'}
        </p>
        <p>{flavorOf(meta.id)?.[2]}</p>
        {next ? (
          <ButtonLink block variant="primary" href={`/play/${next.id}`}>
            {strings.result.next}
          </ButtonLink>
        ) : (
          <ButtonLink block variant="primary" href="/levels">
            {strings.result.backToLevels}
          </ButtonLink>
        )}
      </div>

      {revealed ? (
        <div className={styles.card}>
          <p className={styles.cardLabel}>{strings.result.answer}</p>
          <p>{meta.hints[2]}</p>
        </div>
      ) : null}
      <div className={styles.card}>
        <p className={styles.cardLabel}>{strings.result.explanation}</p>
        <p>{meta.explanation}</p>
      </div>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dt>{strings.result.time}</dt>
          <dd data-testid="result-time">{formatDuration(durationMs)}</dd>
        </div>
        <div className={styles.stat}>
          <dt>{strings.result.level}</dt>
          <dd data-testid="result-level">
            {strings.result.solveLevel[solveLevelOf(hintsUsed)]}
          </dd>
        </div>
      </dl>

      <div className={styles.actions}>
        {next ? (
          <>
            <Button block onClick={onRestart}>
              {strings.result.restart}
            </Button>
            <ButtonLink block variant="quiet" href="/levels">
              {strings.result.backToLevels}
            </ButtonLink>
          </>
        ) : (
          <>
            {replay && (
              <ButtonLink block href={`/play/${replay.id}`}>
                Thử tự giải lại · Màn {replay.ordinal}
              </ButtonLink>
            )}
            <Button block onClick={onRestart}>
              {strings.result.restart}
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
