import type { ReactNode, Ref } from 'react';
import styles from './stage-2d.module.css';

// Sân chơi 2D bằng SVG (docs/TECH.md mục 7.1). Toạ độ trong cảnh là toạ độ logic (mặc định 360×480, tỉ lệ 3:4),
// CSS co giãn vừa khung nên màn chạy giống nhau ở mọi cỡ màn hình. Việc quy đổi toạ độ chạm sang toạ độ logic
// và kéo-thả thuộc story LL-042/LL-009, chưa làm ở đây.

export const STAGE_WIDTH = 360;
export const STAGE_HEIGHT = 480;

export interface Stage2DProps {
  ref?: Ref<SVGSVGElement>;
  /** Mô tả bằng chữ của hình vẽ cho người dùng trình đọc màn hình. */
  label: string;
  width?: number;
  height?: number;
  children: ReactNode;
}

export function Stage2D({
  ref,
  label,
  width = STAGE_WIDTH,
  height = STAGE_HEIGHT,
  children,
}: Stage2DProps) {
  return (
    <svg
      ref={ref}
      className={styles.stage}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}
