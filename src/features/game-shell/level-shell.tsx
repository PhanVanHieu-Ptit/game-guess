'use client';

import { Suspense, useEffect, useState } from 'react';
import type { OpenableTier } from '@/domain/hints/hint-machine';
import { levelAfter } from '@/domain/progress/unlock';
import { FeedbackToast } from '@/features/hud/feedback-toast';
import { BottomBar } from '@/features/hud/bottom-bar';
import { TopBar } from '@/features/hud/top-bar';
import { JourneyCard } from '@/features/journey/journey-card';
import { HintSheet } from '@/features/hints/hint-sheet';
import { ResultView } from '@/features/result/result-view';
import { strings } from '@/features/strings';
import { Button, ButtonLink } from '@/features/ui/button';
import { LEVEL_METAS } from '@/levels';
import { flavorOf } from '@/levels/flavor';
import styles from './game-shell.module.css';
import { getLazyScene, preloadScene, resetLazyScene } from './lazy-scene';
import type { LevelRun } from './level-run';
import { SceneBoundary } from './scene-boundary';
import { StorageNotice } from './storage-notice';
import { useLevelRun } from './use-level-run';

import type { Level } from '@/engine/scene';
import { PromptWordsProvider } from '@/engine/prompt-words';
import { PromptText } from './prompt-text';

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

export function LevelShell({ level }: { level: Level }) {
  const meta = level;
  const { run, snapshot } = useLevelRun(meta, 'campaign');
  const [hintsOpen, setHintsOpen] = useState(false);
  // Cảnh nạp lười được giữ trong state (không tạo lại mỗi lần render); "Thử lại" thay bằng một bản nạp mới.
  const [Scene, setScene] = useState(() =>
    getLazyScene(meta.id, level.component),
  );
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
    <PromptWordsProvider key={snapshot.epoch}>
      <main className={styles.play}>
        <TopBar
          ordinal={meta.ordinal}
          total={LEVEL_METAS.length}
          onRestart={restart}
        />
        <StorageNotice />
        <JourneyCard ordinal={meta.ordinal} compact />
        <PromptText
          prompt={meta.prompt}
          className={styles.prompt}
          disabled={finished || snapshot.status === 'idle'}
          onTap={() => run.session.progress()}
        />

        <div className={styles.stage} data-testid="play-stage">
          <FeedbackToast feedback={snapshot.feedback} />
          <div className={styles.sceneFrame}>
            <SceneBoundary
              onRetry={() => {
                resetLazyScene(meta.id);
                setScene(getLazyScene(meta.id, level.component));
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
                <Scene
                  key={snapshot.epoch}
                  onSolved={run.session.solve}
                  onWrong={run.session.wrong}
                  onProgress={run.session.progress}
                />
                <SceneReady run={run} />
              </Suspense>
            </SceneBoundary>
          </div>
          <p className={styles.sceneIntro}>
            <span aria-hidden="true">✦</span> {flavorOf(meta.id)?.[0]}
          </p>
        </div>

        <BottomBar
          hintTier={snapshot.hintTier}
          nudge={snapshot.nudge}
          onOpenHints={() => setHintsOpen(true)}
          onRestart={restart}
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
    </PromptWordsProvider>
  );
}
