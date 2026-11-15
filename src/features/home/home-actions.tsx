'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { countCompleted, nextPlayable } from '@/domain/progress/unlock';
import { UNLOCK_ALL } from '@/features/config';
import { StorageNotice } from '@/features/game-shell/storage-notice';
import { strings } from '@/features/strings';
import { ButtonLink } from '@/features/ui/button';
import { LEVEL_METAS } from '@/levels';
import { ensureProgressHydrated, useProgress } from '@/stores/progress';
import styles from './home.module.css';

/**
 * Các lối vào của trang chủ: Chơi / Chơi tiếp, Đố mẹo mỗi ngày, Chọn màn. Nút chính phụ thuộc tiến trình nên chờ
 * nạp xong mới hiện (giữ chỗ trong lúc chờ), để không lệch với HTML máy chủ (docs/TECH.md mục 6).
 */
export function HomeActions() {
  useEffect(() => {
    ensureProgressHydrated();
  }, []);
  const hydrated = useProgress((state) => state.hydrated);
  const results = useProgress((state) => state.levels);

  const completed = countCompleted(LEVEL_METAS, results);
  const target = nextPlayable(LEVEL_METAS, results, UNLOCK_ALL);
  const first = LEVEL_METAS[0];

  let primary;
  if (!hydrated) {
    primary = <div className={styles.skeleton} aria-hidden="true" />;
  } else if (target && completed > 0) {
    primary = (
      <ButtonLink block variant="primary" href={`/play/${target.id}`}>
        <span className={styles.stack}>
          {strings.home.playContinue}
          <span className={styles.sub}>
            {strings.home.continueTo(target.ordinal, LEVEL_METAS.length)}
          </span>
        </span>
      </ButtonLink>
    );
  } else if (target) {
    primary = (
      <ButtonLink block variant="primary" href={`/play/${target.id}`}>
        {strings.home.play}
      </ButtonLink>
    );
  } else {
    // Đã có kết quả cho mọi màn hiện có.
    primary = (
      <>
        <p className={styles.allDone}>{strings.home.allDone}</p>
        <ButtonLink block variant="primary" href={`/play/${first.id}`}>
          {strings.home.playAgain}
        </ButtonLink>
      </>
    );
  }

  return (
    <nav className={styles.menu} aria-label={strings.home.menuLabel}>
      {primary}
      <Link className={styles.daily} data-touch-target href="/daily">
        <span className={styles.dailyTitle}>{strings.home.daily}</span>
        <span className={styles.dailyHint}>{strings.home.dailyEmpty}</span>
      </Link>
      <ButtonLink block href="/levels">
        {strings.home.levels}
      </ButtonLink>
      <StorageNotice />
    </nav>
  );
}
