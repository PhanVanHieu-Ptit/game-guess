import type { ReactNode } from 'react';
import styles from './tet.module.css';

/** Lời nhân vật thay đổi theo thao tác; không nói trước lời giải. */
export function TetDialogue({
  speaker,
  children,
}: {
  speaker: string;
  children: ReactNode;
}) {
  return (
    <p className={styles.dialogue} role="status" aria-live="polite">
      <strong>{speaker}</strong> {children}
    </p>
  );
}
