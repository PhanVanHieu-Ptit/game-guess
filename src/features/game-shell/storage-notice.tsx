'use client';

import { useSyncExternalStore } from 'react';
import { strings } from '@/features/strings';
import { safeStorage } from '@/services/storage/safe-storage';
import styles from './game-shell.module.css';

/**
 * Một dòng báo khi không lưu được tiến trình (chế độ riêng tư, hết dung lượng): game vẫn chơi bình thường,
 * chỉ là tiến trình mất khi đóng tab (docs/GDD.md mục 6). Không chặn người chơi.
 */
export function StorageNotice() {
  // Máy chủ luôn coi là "local" nên HTML máy chủ và lần render đầu của máy khách giống nhau.
  const mode = useSyncExternalStore(
    safeStorage.subscribe,
    safeStorage.getMode,
    () => 'local' as const,
  );
  if (mode !== 'memory') return null;
  return (
    <p className={styles.notice} role="status" data-testid="storage-notice">
      {strings.storage.notice}
    </p>
  );
}
