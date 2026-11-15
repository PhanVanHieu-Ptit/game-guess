import type { ReactNode } from 'react';
import styles from './message-page.module.css';

/** Trang một cột canh giữa dùng cho thông báo: không tìm thấy, màn chưa mở, lỗi, chưa có câu hôm nay… */
export function MessagePage({
  title,
  busy,
  children,
}: {
  title?: string;
  busy?: boolean;
  children: ReactNode;
}) {
  return (
    <main className={`page ${styles.messagePage}`} aria-busy={busy}>
      {title ? <h1 className={styles.title}>{title}</h1> : null}
      {children}
    </main>
  );
}
