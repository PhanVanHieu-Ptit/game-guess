'use client';

import { useState, type ReactNode, type Ref } from 'react';
import { Stage2D } from './stage-2d';
import styles from './puzzle.module.css';

/** Phản hồi của cảnh vẫn đi qua khung chơi; bộ đếm chỉ để chạy lại nét rung. */
export function usePuzzleFeedback(onWrong: (code?: string) => void) {
  const [reaction, setReaction] = useState(0);
  return {
    reaction,
    wrong: (code?: string) => {
      setReaction((value) => value + 1);
      onWrong(code);
    },
  };
}

export function PuzzleArt({
  children,
  label,
  reaction = 0,
  height = 360,
  svgRef,
}: {
  children: ReactNode;
  label: string;
  reaction?: number;
  height?: number;
  svgRef?: Ref<SVGSVGElement>;
}) {
  return (
    <div className={styles.art} style={{ aspectRatio: `360 / ${height}` }}>
      <Stage2D ref={svgRef} label={label} width={360} height={height}>
        <PuzzleDrawing reaction={reaction}>{children}</PuzzleDrawing>
      </Stage2D>
    </div>
  );
}

export function PuzzleDrawing({
  children,
  reaction = 0,
}: {
  children: ReactNode;
  reaction?: number;
}) {
  return (
    <g
      key={reaction}
      data-testid="puzzle-art"
      data-reaction={reaction}
      className={reaction > 0 ? styles.wiggle : undefined}
      stroke="#231f3f"
      strokeWidth={3.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </g>
  );
}

/** Hộp chạm SVG rộng hơn hình vẽ; không đòi dò đúng nét. */
export function ArtButton({
  label,
  onPress,
  x,
  y,
  width = 60,
  height = 60,
  children,
}: {
  label: string;
  onPress(): void;
  x: number;
  y: number;
  width?: number;
  height?: number;
  children: ReactNode;
}) {
  return (
    <g
      role="button"
      aria-label={label}
      tabIndex={0}
      data-touch-target
      onClick={onPress}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onPress();
        }
      }}
      style={{ cursor: 'pointer' }}
    >
      <g aria-hidden="true">{children}</g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill="transparent"
        stroke="none"
      />
    </g>
  );
}

/** Nhân vật tự vẽ: đầu tròn, áo màu, chân ngắn. Tọa độ gốc ở đỉnh đầu. */
export function Kid({
  x,
  y,
  shirt = '#59b9d5',
  small = false,
}: {
  x: number;
  y: number;
  shirt?: string;
  small?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${small ? 0.72 : 1})`}>
      <path d="M-11 58v15m22-15v15" fill="none" />
      <path d="M-17 29q17-9 34 0l5 31h-44z" fill={shirt} />
      <path d="M-18 34l-8 16m44-16l8 16" fill="none" />
      <circle cy={13} r={18} fill="#ffd0a1" />
      <path d="M-17 8q0-23 28-10l7 9-16-4-9 5" fill="#53415b" />
      <path d="M-6 13v1m12-1v1m-10 8q4 4 8 0" fill="none" strokeWidth={2.5} />
    </g>
  );
}
