'use client';

import { useEffect, useState } from 'react';
import styles from './scene-3d.module.css';

/** Dùng chung cho hai màn 3D làm quen; đồng hồ chỉ chạy sau khi Canvas sẵn sàng. */
export function DragHint({ active }: { active: boolean }) {
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(() => setExpired(true), 5000);
    return () => window.clearTimeout(timer);
  }, [active]);
  if (!active || expired) return null;
  return (
    <div className={styles.hint} data-testid="drag-hint" aria-hidden="true">
      <svg viewBox="0 0 160 90" width="160" height="90">
        <path d="M24 30h112m-100-9L24 30l12 9m88-18 12 9-12 9" />
        <g className={styles.hand}>
          <path d="M66 70V35a6 6 0 0 1 12 0v19-8a6 6 0 0 1 12 0v8-5a6 6 0 0 1 12 0v8-3a6 6 0 0 1 12 0v14q0 17-18 17H83q-10 0-15-10L57 61q-4-7 2-10 4-2 7 3" />
        </g>
      </svg>
      <span>Kéo để xoay</span>
    </div>
  );
}
