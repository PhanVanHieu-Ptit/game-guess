'use client';

import { useRef } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const envelope = useDrag({
    svgRef,
    initialPosition: { x: 262, y: 260 },
    target: { x: 20, y: 218, width: 120, height: 124 },
    onDrop: onProgress,
    onMiss: () => wrong('miss'),
    onProgress,
  });
  return (
    <div className={styles.scene}>
      <PuzzleArt
        svgRef={svgRef}
        label="Bốn bé và bao lì xì khổng lồ"
        reaction={reaction}
      >
        <path d="M0 210h360v150H0z" fill="#e3f4d5" stroke="none" />
        <path d="M24 32q156 35 312 0" fill="none" />
        {[55, 180, 305].map((x) => (
          <g key={x}>
            <rect
              x={x - 13}
              y={39}
              width={26}
              height={29}
              rx={8}
              fill="#ef6b68"
            />
            <path d={`M${x} 68v10`} />
          </g>
        ))}
        {[46, 120, 194, 268].map((x, index) => (
          <ArtButton
            key={x}
            label={`Bé ${index + 1}`}
            x={x - 30}
            y={100}
            height={100}
            onPress={() => wrong('child')}
          >
            <Kid
              x={x}
              y={110 + index * 4}
              shirt={['#59b9d5', '#ffbd59', '#b694df', '#73c892'][index]}
            />
          </ArtButton>
        ))}
        <g
          {...envelope.targetProps}
          aria-label="Chỗ trống bên trái"
          data-touch-target
        >
          <rect
            x={20}
            y={218}
            width={120}
            height={124}
            rx={18}
            fill="#fff8df"
            strokeDasharray="7 8"
          />
        </g>
        {envelope.placed ? (
          <ArtButton
            label="Bé nhỏ nhất"
            x={232}
            y={225}
            width={60}
            height={90}
            onPress={onSolved}
          >
            <Kid x={262} y={241} shirt="#ef6b68" small />
          </ArtButton>
        ) : (
          <Kid x={262} y={241} shirt="#ef6b68" small />
        )}
        <g
          {...envelope.dragProps}
          aria-label="Bao lì xì"
          data-touch-target
          transform={`translate(${envelope.position.x} ${envelope.position.y})`}
        >
          <rect
            x={-50}
            y={-62}
            width={100}
            height={124}
            rx={12}
            fill="#ef6b68"
            stroke={envelope.selected ? '#126b5e' : '#231f3f'}
            strokeWidth={envelope.selected ? 6 : 3.5}
          />
          <path d="M-48-48L0-12l48-36" fill="#f3917d" />
          <circle cy={16} r={23} fill="#ffda72" />
          <path d="M-9 16h18m-9-9v18" stroke="#c62f3b" />
        </g>
      </PuzzleArt>
      <p className={styles.note}>
        {envelope.selected
          ? 'Đã chọn bao lì xì. Chạm chỗ trống để dời bao.'
          : 'Có thể kéo đồ vật, hoặc chạm chọn rồi chạm chỗ trống.'}
      </p>
    </div>
  );
}
