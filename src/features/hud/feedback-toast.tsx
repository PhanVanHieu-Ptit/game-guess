'use client';

import { useEffect, useState } from 'react';
import type { RunFeedback } from '@/features/game-shell/level-run';
import styles from './hud.module.css';

const VISIBLE_MS = 4500;

/**
 * Phản hồi khi sai: mọi thao tác sai đều có phản hồi, không bao giờ im lặng (docs/GDD.md mục 3.1, quy tắc 2).
 * Vùng `role="status"` luôn có mặt để trình đọc màn hình đọc được nội dung mới; chữ tự ẩn sau vài giây.
 */
export function FeedbackToast({ feedback }: { feedback: RunFeedback | null }) {
  const [dismissedId, setDismissedId] = useState<number | null>(null);

  useEffect(() => {
    if (!feedback) return;
    const timer = setTimeout(() => setDismissedId(feedback.id), VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [feedback]);

  const visible = feedback !== null && dismissedId !== feedback.id;
  return (
    <div className={styles.toastLayer} role="status">
      {visible ? (
        <p key={feedback.id} className={styles.toast} data-testid="feedback">
          {feedback.text}
        </p>
      ) : null}
    </div>
  );
}
