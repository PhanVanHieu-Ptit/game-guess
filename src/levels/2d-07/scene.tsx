'use client';

import { useRef, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import { PuzzleArt, usePuzzleFeedback } from '@/engine/stage2d/puzzle-art';
import puzzleStyles from '@/engine/stage2d/puzzle.module.css';
import chooseStyles from '@/engine/stage2d/scenes/choose.module.css';

const OPTIONS = [
  { id: 'left', label: 'Quả bên trái' },
  { id: 'right', label: 'Quả bên phải' },
  { id: 'equal', label: 'Bằng nhau' },
  { id: 'unknown', label: 'Không thể biết' },
] as const;

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const [eliminated, setEliminated] = useState<ReadonlySet<string>>(
    () => new Set(),
  );
  const [pickedId, setPickedId] = useState<string | null>(null);

  const orange = useDrag({
    svgRef,
    initialPosition: { x: 95, y: 105 },
    target: { x: 235, y: 75, width: 60, height: 60 },
    onDrop: onProgress,
    onMiss: () => wrong('miss'),
    onProgress,
  });

  const pick = (id: string) => {
    if (pickedId !== null || eliminated.has(id)) return;
    if (id === 'equal') {
      setPickedId(id);
      onSolved();
    } else {
      setEliminated((prev) => new Set(prev).add(id));
      wrong(id);
    }
  };

  // 6 quả nhỏ quanh quả trái (r=11, bán kính cụm 46)
  const smallAngles = [0, 60, 120, 180, 240, 300];
  // 6 quả lớn quanh quả phải (r=32, bán kính cụm 74)
  const largeAngles = [30, 90, 150, 210, 270, 330];

  return (
    <div className={chooseStyles.scene}>
      <PuzzleArt
        svgRef={svgRef}
        label="Hai đĩa cam: bên trái quả cam giữa quả nhỏ, bên phải giữa quả to"
        height={210}
        reaction={reaction}
      >
        {/* Nền bàn khăn trải */}
        <path d="M0 0h360v210H0z" fill="#fff8df" stroke="none" />
        <path d="M0 185h360v25H0z" fill="#ffdf94" stroke="none" />
        <path d="M0 185h360" stroke="#e0be6c" strokeWidth={3} />

        {/* Khung đĩa bên trái */}
        <ellipse
          cx={95}
          cy={105}
          rx={80}
          ry={70}
          fill="#f4faee"
          stroke="#bfe6c7"
          strokeWidth={2.5}
        />
        {/* Khung đĩa bên phải */}
        <ellipse
          cx={265}
          cy={105}
          rx={88}
          ry={76}
          fill="#f4faee"
          stroke="#bfe6c7"
          strokeWidth={2.5}
        />

        {/* Cụm quả cam nhỏ bên trái */}
        {smallAngles.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 95 + 46 * Math.cos(rad);
          const cy = 105 + 46 * Math.sin(rad);
          return (
            <g key={deg}>
              <circle cx={cx} cy={cy} r={11} fill="#ff9a3c" />
              <circle
                cx={cx - 3}
                cy={cy - 3}
                r={3}
                fill="#ffda72"
                stroke="none"
              />
              <path
                d={`M${cx} ${cy - 11}q4-7 8-3t-4 7`}
                fill="#73c892"
                stroke="#439c63"
                strokeWidth={1.5}
              />
            </g>
          );
        })}

        {/* Vết mờ chỗ quả trái ban đầu */}
        <circle
          cx={95}
          cy={105}
          r={28}
          fill="none"
          stroke="#d5cca8"
          strokeDasharray="4 4"
          strokeWidth={2}
        />

        {/* Cụm quả cam to bên phải */}
        {largeAngles.map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const cx = 265 + 74 * Math.cos(rad);
          const cy = 105 + 74 * Math.sin(rad);
          return (
            <g key={deg}>
              <circle cx={cx} cy={cy} r={32} fill="#ff9a3c" />
              <circle
                cx={cx - 9}
                cy={cy - 9}
                r={8}
                fill="#ffda72"
                stroke="none"
              />
              <path
                d={`M${cx} ${cy - 32}q10-14 18-6t-10 14`}
                fill="#73c892"
                stroke="#439c63"
                strokeWidth={2}
              />
            </g>
          );
        })}

        {/* Vùng đích nhận quả cam (chính là quả cam phải) */}
        <g
          {...orange.targetProps}
          aria-label="Quả cam bên phải"
          role="button"
          tabIndex={0}
          data-touch-target
        >
          <rect
            x={225}
            y={65}
            width={80}
            height={80}
            fill="transparent"
            stroke="none"
          />
          <circle cx={265} cy={105} r={28} fill="#ff9a3c" />
          <circle cx={257} cy={97} r={6} fill="#ffda72" stroke="none" />
          <path
            d="M265 77q8-12 16-5t-8 12"
            fill="#73c892"
            stroke="#439c63"
            strokeWidth={2}
          />
        </g>

        {/* Quả cam kéo được (quả cam bên trái) */}
        <g
          {...orange.dragProps}
          aria-label="Quả cam bên trái"
          role="button"
          tabIndex={0}
          data-touch-target
          transform={`translate(${orange.position.x} ${orange.position.y})`}
          style={{ cursor: 'grab' }}
        >
          <rect
            x={-40}
            y={-40}
            width={80}
            height={80}
            fill="transparent"
            stroke="none"
          />
          <circle
            cx={0}
            cy={0}
            r={28}
            fill="#ff8826"
            stroke={orange.selected ? '#126b5e' : '#231f3f'}
            strokeWidth={orange.selected ? 5 : 3.5}
          />
          <circle cx={-8} cy={-8} r={6} fill="#ffda72" stroke="none" />
          <path
            d="M0-28q8-12 16-5t-8 12"
            fill="#73c892"
            stroke="#439c63"
            strokeWidth={2}
          />
          {orange.placed && (
            <text
              x={0}
              y={8}
              textAnchor="middle"
              fontSize={18}
              fontWeight={800}
              fill="#ffffff"
              stroke="#231f3f"
              strokeWidth={1}
            >
              Khít!
            </text>
          )}
        </g>
      </PuzzleArt>

      <p className={puzzleStyles.note} role="status">
        {orange.placed
          ? 'Đã đặt chồng hai quả: vừa khít! Giờ chọn đáp án nào?'
          : orange.selected
            ? 'Đã chọn quả trái. Chạm quả phải để dời sang so sánh.'
            : 'Có thể kéo quả trái đè lên quả phải để so sánh.'}
      </p>

      {/* 4 lựa chọn */}
      <div
        className={chooseStyles.options}
        role="group"
        aria-label="Chọn xem quả nào to hơn"
      >
        {OPTIONS.map((option) => {
          const state =
            option.id === pickedId
              ? 'correct'
              : eliminated.has(option.id)
                ? 'wrong'
                : 'idle';
          return (
            <button
              key={option.id}
              type="button"
              className={chooseStyles.option}
              data-touch-target
              data-state={state}
              aria-disabled={state !== 'idle'}
              onClick={() => pick(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
