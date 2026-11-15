'use client';

import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import styles from './modal.module.css';

// Hộp thoại dựng trên thẻ <dialog> gốc: tự khóa phần nền (không lấy nét, không bấm được), tự bắt phím Esc và trả
// nét về nút đã mở. `sheet` là hộp trượt từ dưới lên (hộp gợi ý); `full` phủ kín màn (kết quả).

export interface ModalProps {
  open: boolean;
  /** Tên hộp thoại cho trình đọc màn hình. */
  label: string;
  variant?: 'sheet' | 'full';
  /** Có thì bấm Esc hoặc bấm ra ngoài vùng nội dung sẽ gọi hàm này; không có thì hộp chỉ đóng bằng nút bên trong. */
  onDismiss?: () => void;
  children: ReactNode;
}

export function Modal({
  open,
  label,
  variant = 'sheet',
  onDismiss,
  children,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
      // Lấy nét vào khung nội dung để trình đọc màn hình đọc tên hộp thoại trước; Tab kế tiếp tới nút đầu tiên.
      // (Mặc định trình duyệt lấy nét vào nút đầu tiên, hiện vòng lấy nét dù người dùng vừa chạm tay.)
      panelRef.current?.focus({ preventScroll: true });
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const handleBackdropClick = (event: MouseEvent<HTMLDialogElement>): void => {
    // Bấm vào chính thẻ <dialog> (vùng ngoài khung nội dung) thì coi là bấm ra ngoài.
    if (event.target === event.currentTarget) onDismiss?.();
  };

  return (
    <dialog
      ref={ref}
      aria-label={label}
      className={`${styles.dialog} ${variant === 'full' ? styles.full : styles.sheet}`}
      onCancel={(event) => {
        // Trạng thái đóng/mở do cha điều khiển; không để trình duyệt tự đóng.
        event.preventDefault();
        onDismiss?.();
      }}
      onClick={handleBackdropClick}
    >
      {open ? (
        <div
          ref={panelRef}
          // -1: nhận nét bằng mã (ở useEffect trên) nhưng không nằm trong thứ tự Tab.
          tabIndex={-1}
          className={variant === 'full' ? styles.fullPanel : styles.sheetPanel}
        >
          {children}
        </div>
      ) : null}
    </dialog>
  );
}
