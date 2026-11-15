'use client';

import { Suspense, useEffect, useState } from 'react';
import type { OpenableTier } from '@/domain/hints/hint-machine';
import type { LevelId, LevelMeta } from '@/domain/levels/types';
import { isUnlocked, levelAfter, nextPlayable } from '@/domain/progress/unlock';
import { UNLOCK_ALL } from '@/features/config';
import { FeedbackToast } from '@/features/hud/feedback-toast';
import { BottomBar } from '@/features/hud/bottom-bar';
import { TopBar } from '@/features/hud/top-bar';
import { HintSheet } from '@/features/hints/hint-sheet';
import { ResultView } from '@/features/result/result-view';
import { strings } from '@/features/strings';
import { Button, ButtonLink } from '@/features/ui/button';
import { MessagePage } from '@/features/ui/message-page';
import { findLevel, LEVEL_METAS } from '@/levels';
import { ensureProgressHydrated, useProgress } from '@/stores/progress';
import styles from './game-shell.module.css';
import { getLazyScene, preloadScene, resetLazyScene } from './lazy-scene';
import type { LevelRun } from './level-run';
import { NotFoundView } from './not-found-view';
import { SceneBoundary } from './scene-boundary';
import { StorageNotice } from './storage-notice';
import { useLevelRun } from './use-level-run';

/**
 * Khung chạy màn (docs/TECH.md mục 3, "Luồng vào một màn"): kiểm mã màn → chờ nạp tiến trình → kiểm mở khóa →
 * nạp lười cảnh → tạo lượt chơi (đo lường, gợi ý, thời gian) → hiển thị cảnh.
 */
export function GameShell({ levelId }: { levelId: LevelId }) {
  useEffect(() => {
    ensureProgressHydrated();
  }, []);
  const hydrated = useProgress((state) => state.hydrated);
  const results = useProgress((state) => state.levels);

  const meta = findLevel(levelId);
  if (!meta) return <NotFoundView />;
  if (!hydrated) return <LoadingView />;
  if (!isUnlocked(LEVEL_METAS, meta.id, results, UNLOCK_ALL)) {
    return (
      <LockedView target={nextPlayable(LEVEL_METAS, results, UNLOCK_ALL)} />
    );
  }
  return <PlayScreen meta={meta} />;
}

function LoadingView() {
  return (
    <MessagePage busy>
      <p className={styles.loading} role="status">
        {strings.play.loading}
      </p>
    </MessagePage>
  );
}

function LockedView({ target }: { target: LevelMeta | null }) {
  return (
    <MessagePage title={strings.play.locked.title}>
      <p>{strings.play.locked.body}</p>
      {target ? (
        <ButtonLink block variant="primary" href={`/play/${target.id}`}>
          {strings.play.locked.goOn}
        </ButtonLink>
      ) : null}
      <ButtonLink block href="/levels">
        {strings.play.back}
      </ButtonLink>
    </MessagePage>
  );
}

function SceneLoading() {
  return (
    <p className={styles.loading} role="status">
      {strings.play.loading}
    </p>
  );
}

/** Báo cho lượt chơi biết cảnh đã dựng xong (`level_start` phát lúc này). Nằm cùng ranh giới Suspense với cảnh. */
function SceneReady({ run }: { run: LevelRun }) {
  useEffect(() => {
    run.sceneReady();
  }, [run]);
  return null;
}

function PlayScreen({ meta }: { meta: LevelMeta }) {
  const { run, snapshot } = useLevelRun(meta, 'campaign');
  const [hintsOpen, setHintsOpen] = useState(false);
  // Cảnh nạp lười được giữ trong state (không tạo lại mỗi lần render); "Thử lại" thay bằng một bản nạp mới.
  const [Scene, setScene] = useState(() => getLazyScene(meta.id));
  const next = levelAfter(LEVEL_METAS, meta.id);
  const finished =
    snapshot.status === 'solved' || snapshot.status === 'revealed';

  // Tải trước cảnh của màn kế trong lúc người chơi đọc kết quả, để "Màn tiếp" mở nhanh (docs/TECH.md mục 10).
  useEffect(() => {
    if (finished && next) preloadScene(next.id);
  }, [finished, next]);

  const restart = (): void => {
    setHintsOpen(false);
    run.restart();
  };

  return (
    <main className={styles.play}>
      <TopBar
        ordinal={meta.ordinal}
        total={LEVEL_METAS.length}
        onRestart={restart}
      />
      <StorageNotice />
      <p className={styles.prompt} data-testid="prompt">
        {meta.prompt}
      </p>

      <div className={styles.stage}>
        <FeedbackToast feedback={snapshot.feedback} />
        <SceneBoundary
          onRetry={() => {
            resetLazyScene(meta.id);
            setScene(getLazyScene(meta.id));
          }}
          fallback={(retry) => (
            <div className={styles.errorBox} role="alert">
              <p>{strings.play.loadError}</p>
              <Button block variant="primary" onClick={retry}>
                {strings.play.retry}
              </Button>
              <ButtonLink block href="/levels">
                {strings.play.back}
              </ButtonLink>
            </div>
          )}
        >
          <Suspense fallback={<SceneLoading />}>
            <Scene key={snapshot.epoch} session={run.session} />
            <SceneReady run={run} />
          </Suspense>
        </SceneBoundary>
      </div>

      <BottomBar
        hintTier={snapshot.hintTier}
        nudge={snapshot.nudge}
        onOpenHints={() => setHintsOpen(true)}
      />

      <HintSheet
        open={hintsOpen}
        meta={meta}
        tier={snapshot.hintTier}
        onOpenTier={(tier: OpenableTier) => run.openHint(tier)}
        onReveal={() => {
          setHintsOpen(false);
          run.reveal();
        }}
        onClose={() => setHintsOpen(false)}
      />
      <ResultView
        open={finished}
        meta={meta}
        status={snapshot.status === 'revealed' ? 'revealed' : 'solved'}
        hintsUsed={snapshot.hintTier}
        durationMs={snapshot.durationMs}
        next={next}
        onRestart={restart}
      />
    </main>
  );
}
