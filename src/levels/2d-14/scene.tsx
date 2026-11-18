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
import motion from './scene.module.css';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const ash = useDrag({
    svgRef,
    initialPosition: { x: 88, y: 92 },
    target: { x: 34, y: 182, width: 112, height: 120 },
    onDrop: onProgress,
    onMiss: () => wrong('miss'),
    onProgress,
  });
  return (
    <div className={styles.scene}>
      <PuzzleArt
        svgRef={svgRef}
        label="Chén tro cạnh bếp, bàn tay đang chờ và con lươn trong rổ"
        reaction={reaction}
        height={340}
      >
        <path d="M0 0h360v340H0z" fill="#fff1d0" stroke="none" />
        <path d="M0 300h360v40H0z" fill="#e3f4d5" stroke="none" />
        <path d="M14 60h145v82H14z" fill="#efb08a" />
        <path
          d="M19 83h135m-135 28h135M54 61v22m56 0v28m-56 0v30"
          stroke="#b56d57"
        />
        <path
          d="M28 60q15-12 29 0m62 0q15-12 29 0"
          stroke="#53415b"
          fill="none"
        />
        <path d="M180 55h145m-122 14h95" stroke="#e4c98a" strokeWidth={6} />
        <g
          {...ash.targetProps}
          aria-label="Bàn tay"
          data-touch-target
          onClick={() =>
            ash.selected && !ash.placed
              ? ash.targetProps.onClick()
              : !ash.placed && wrong('hand')
          }
        >
          <path
            d="M73 298v-27q-30-17-32-32-3-13 10-9l15 13-9-54q-2-13 9-11 5 0 7 13l6 29-3-55q0-13 11-11 7 2 7 13l3 49 3-43q1-13 12-9 5 2 4 13l-3 45 6-23q3-12 13-6 5 4 2 13l-9 48q-3 16-13 24v25"
            fill="#ffd0a1"
          />
          <path d="M75 251q18-16 32-6" fill="none" stroke="#ca966c" />
          {ash.placed && (
            <g fill="#8a8493" stroke="none">
              <ellipse cx={92} cy={238} rx={24} ry={17} />
              {[
                [-14, -7],
                [7, -9],
                [-3, 5],
                [15, 4],
              ].map(([x, y]) => (
                <circle key={x} cx={92 + x} cy={238 + y} r={4} fill="#b8b2ba" />
              ))}
            </g>
          )}
          <rect
            x={34}
            y={182}
            width={112}
            height={120}
            fill="transparent"
            stroke="none"
          />
        </g>
        <g aria-hidden="true">
          <ellipse cx={259} cy={246} rx={80} ry={63} fill="#e5bb77" />
          <path
            d="M190 247h138m-131 18h124m-110 18h95m-88-71v69m25-79v90m25-90v90m25-81v71"
            fill="none"
            stroke="#c48a3b"
            strokeWidth={2}
          />
        </g>
        <ArtButton
          label="Rổ tre"
          x={177}
          y={274}
          width={168}
          height={60}
          onPress={() => wrong('basket')}
        >
          <path d="M223 294h72" fill="none" stroke="#c48a3b" strokeWidth={2} />
        </ArtButton>
        <ArtButton
          label="Con lươn"
          x={184}
          y={170}
          width={150}
          height={100}
          onPress={() => (ash.placed ? onSolved() : wrong('eel'))}
        >
          <g
            key={reaction}
            className={reaction && !ash.placed ? motion.slip : undefined}
          >
            <path
              d="M206 244q96 12 94-27-1-22-37-5t-53-17q-1-17 36-10"
              stroke="#8b664e"
              strokeWidth={18}
              fill="none"
            />
            <path
              d="M207 246q83 5 89-25"
              stroke="#cfa776"
              strokeWidth={5}
              fill="none"
            />
            <ellipse cx={251} cy={184} rx={15} ry={10} fill="#a77c55" />
            <circle cx={258} cy={181} r={2.5} fill="#231f3f" stroke="none" />
            <path d="M260 188l8 1" strokeWidth={2} />
          </g>
        </ArtButton>
        {!ash.placed && (
          <g
            {...ash.dragProps}
            aria-label="Chén tro bếp"
            data-touch-target
            transform={`translate(${ash.position.x} ${ash.position.y})`}
          >
            <rect
              x={-45}
              y={-34}
              width={90}
              height={72}
              fill="transparent"
              stroke="none"
            />
            <path
              d="M-38-6q3 43 38 43T38-6"
              fill="#59b9d5"
              stroke={ash.selected ? '#126b5e' : '#231f3f'}
              strokeWidth={ash.selected ? 6 : 3.5}
            />
            <ellipse cy={-6} rx={38} ry={16} fill="#b8b2ba" />
            <path
              d="M-26-7l13-8 13 6 12-9 15 11"
              stroke="#8a8493"
              fill="none"
            />
          </g>
        )}
      </PuzzleArt>
      <p className={styles.note} role="status">
        {ash.placed
          ? 'Tay đã phủ tro, bớt trơn rồi!'
          : ash.selected
            ? 'Đã chọn chén tro. Chạm bàn tay để dời chén.'
            : 'Có thể kéo đồ vật, hoặc chạm chọn rồi chạm nơi muốn đặt.'}
      </p>
    </div>
  );
}
