'use client';

import { useEffect } from 'react';
import type { LevelId, LevelMeta } from '@/domain/levels/types';
import { isUnlocked, nextPlayable } from '@/domain/progress/unlock';
import { UNLOCK_ALL } from '@/features/config';
import { strings } from '@/features/strings';
import { ButtonLink } from '@/features/ui/button';
import { MessagePage } from '@/features/ui/message-page';
import { LEVEL_METAS } from '@/levels';
import { findPlayableLevel } from '@/levels/load-scene';
import { ensureProgressHydrated, useProgress } from '@/stores/progress';
import styles from './game-shell.module.css';
import { LevelShell } from './level-shell';
import { NotFoundView } from './not-found-view';

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

  const meta = findPlayableLevel(levelId);
  if (!meta) return <NotFoundView />;
  if (!hydrated) return <LoadingView />;
  if (!isUnlocked(LEVEL_METAS, meta.id, results, UNLOCK_ALL)) {
    return (
      <LockedView target={nextPlayable(LEVEL_METAS, results, UNLOCK_ALL)} />
    );
  }
  return <LevelShell key={meta.id} level={meta} />;
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
