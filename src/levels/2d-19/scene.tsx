'use client';

import { useRef } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';

const segments = {
  a: [7, 0, 43, 0],
  b: [50, 8, 50, 42],
  c: [50, 58, 50, 92],
  d: [7, 100, 43, 100],
  e: [0, 58, 0, 92],
  f: [0, 8, 0, 42],
  g: [7, 50, 43, 50],
} as const;
function Match({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}) {
  return (
    <g>
      <path d={`M${x1} ${y1}L${x2} ${y2}`} stroke="#c48a3b" strokeWidth={7} />
      <circle cx={x1} cy={y1} r={4} fill="#ef6b68" stroke="none" />
    </g>
  );
}
function Digit({
  x,
  parts,
}: {
  x: number;
  parts: readonly (keyof typeof segments)[];
}) {
  return (
    <g transform={`translate(${x} 85)`}>
      {parts.map((part) => {
        const [x1, y1, x2, y2] = segments[part];
        return <Match key={part} {...{ x1, y1, x2, y2 }} />;
      })}
    </g>
  );
}

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const match = useDrag({
    svgRef,
    initialPosition: { x: 70, y: 110 },
    target: { x: 90, y: 105, width: 56, height: 60 },
    onDrop: onSolved,
    onMiss: () => wrong('miss'),
    onProgress,
  });
  return (
    <div className={styles.scene}>
      <PuzzleArt
        svgRef={svgRef}
        label="Phép tính bằng que diêm trên bàn gỗ: 8 trừ 3 bằng 9"
        height={300}
        reaction={reaction}
      >
        <path d="M0 0h360v300H0z" fill="#ffe1b2" stroke="none" />
        <path d="M0 48h360M0 219h360" stroke="#e4bb86" strokeWidth={2} />
        <Digit x={20} parts={['a', 'c', 'd', 'e', 'f', 'g']} />
        <ArtButton
          label="Que khác ở số 8"
          x={14}
          y={142}
          width={60}
          height={60}
          onPress={() => wrong('number')}
        >
          <path d="M25 200h40" stroke="none" />
        </ArtButton>
        <ArtButton
          label="Các que ở số 3"
          x={144}
          y={79}
          width={60}
          height={112}
          onPress={() => wrong('number')}
        >
          <Digit x={148} parts={['a', 'b', 'c', 'd', 'g']} />
        </ArtButton>
        <ArtButton
          label="Các que ở số 9"
          x={276}
          y={79}
          width={60}
          height={112}
          onPress={() => wrong('number')}
        >
          <Digit x={280} parts={['a', 'b', 'c', 'd', 'f', 'g']} />
        </ArtButton>
        <ArtButton
          label="Dấu bằng"
          x={212}
          y={106}
          width={56}
          height={60}
          onPress={() => wrong('equal')}
        >
          <Match x1={222} y1={122} x2={254} y2={122} />
          <Match x1={222} y1={146} x2={254} y2={146} />
        </ArtButton>
        <g
          {...match.targetProps}
          aria-label="Dấu trừ"
          aria-disabled={false}
          data-touch-target
          onClick={() =>
            match.selected ? match.targetProps.onClick() : wrong('sign')
          }
        >
          <Match x1={98} y1={135} x2={132} y2={135} />
          {match.placed && <Match x1={115} y1={115} x2={115} y2={155} />}
          <rect
            x={90}
            y={105}
            width={56}
            height={60}
            fill="transparent"
            stroke="none"
          />
        </g>
        {!match.placed && (
          <g
            {...match.dragProps}
            aria-label="Que trên bên phải số 8"
            data-touch-target
            transform={`translate(${match.position.x} ${match.position.y})`}
          >
            <Match x1={0} y1={-17} x2={0} y2={17} />
            <rect
              x={-28}
              y={-28}
              width={56}
              height={56}
              rx={10}
              fill="transparent"
              stroke={match.selected ? '#126b5e' : 'none'}
            />
          </g>
        )}
        <g transform="translate(140 242)">
          <rect width={80} height={38} rx={8} fill="#59b9d5" />
          <path
            d="M158 253l12 14m-12 0l12-14"
            transform="translate(-140 -242)"
            stroke="#fff1d0"
          />
        </g>
      </PuzzleArt>
      <p className={styles.note} role="status">
        {match.placed
          ? '6 + 3 = 9'
          : match.selected
            ? 'Đã chọn một que. Chạm nơi muốn đặt que.'
            : 'Kéo một que, hoặc chạm chọn que rồi chạm nơi muốn đặt.'}
      </p>
    </div>
  );
}
