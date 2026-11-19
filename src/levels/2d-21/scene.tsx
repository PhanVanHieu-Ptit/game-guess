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
import touch from '@/engine/stage2d/touch-scene.module.css';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const curtain = useDrag({
    svgRef,
    initialPosition: { x: 63, y: 119 },
    target: { x: 105, y: 49, width: 183, height: 153 },
    onDrop: onSolved,
    onMiss: () => wrong('miss'),
    onProgress,
  });
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        svgRef={svgRef}
        label="Bé nằm trên giường, đèn đã tắt, ánh trăng lọt qua cửa sổ có rèm mở"
        height={370}
        reaction={reaction}
      >
        <path
          d="M0 0h360v370H0z"
          fill={curtain.placed ? '#c5b9e1' : '#f5e3f2'}
          stroke="none"
        />
        <path d="M0 302h360v68H0z" fill="#d5c1a9" stroke="none" />
        {!curtain.placed && (
          <path d="M117 179h162l49 119H130z" fill="#fff1d0" stroke="none" />
        )}
        <ArtButton
          label="Cửa sổ"
          x={105}
          y={49}
          width={183}
          height={153}
          onPress={() =>
            curtain.selected ? curtain.targetProps.onClick() : wrong('window')
          }
        >
          <rect
            x={110}
            y={54}
            width={173}
            height={143}
            rx={14}
            fill="#665b9b"
          />
          <path
            d="M196 54v143M110 126h173"
            fill="none"
            stroke="#fff1d0"
            strokeWidth={7}
          />
          <path d="M139 77h1m-13 32h1m89 61h1m43-13h1" stroke="#fff1d0" />
        </ArtButton>
        <ArtButton
          label="Mặt trăng"
          x={219}
          y={67}
          width={58}
          height={58}
          onPress={() => wrong('moon')}
        >
          <path d="M258 75q-37 1-27 29 15 25 38 0-28 3-11-29z" fill="#ffd66e" />
        </ArtButton>
        <path d="M35 40h265" stroke="#c48a3b" strokeWidth={9} />
        <ArtButton
          label="Đèn đã tắt"
          x={16}
          y={214}
          width={70}
          height={107}
          onPress={() => wrong('lamp')}
        >
          <path d="M51 259v47m-20 0h40" fill="none" />
          <path d="M33 221h36l13 39H20z" fill="#b8bbce" />
          <path d="M83 281l8 8m0-8l-8 8" fill="none" />
        </ArtButton>
        <ArtButton
          label="Giường của bé"
          x={97}
          y={225}
          width={238}
          height={108}
          onPress={() => wrong('bed')}
        >
          <rect
            x={103}
            y={261}
            width={224}
            height={52}
            rx={13}
            fill="#c48a3b"
          />
          <path d="M111 305v27m207-27v27" fill="none" strokeWidth={8} />
          <rect x={111} y={233} width={75} height={47} rx={17} fill="#fff8df" />
          <ellipse cx={146} cy={252} rx={25} ry={21} fill="#ffd0a1" />
          <path d="M122 248q-2-32 35-16l12 14-20-6-12 7" fill="#53415b" />
          <path
            d="M134 253q4 3 8 0m7 0q4 3 8 0m-13 10h4"
            fill="none"
            strokeWidth={2.5}
          />
          <path d="M173 248h140v49H163z" fill="#59b9d5" />
          <path d="M199 260l4 7m28-9l5 8m33-8l5 8" stroke="#fff8df" />
        </ArtButton>
        <g
          {...curtain.dragProps}
          aria-label="Rèm cửa"
          data-touch-target
          transform={`translate(${curtain.placed ? 196 : curtain.position.x} ${curtain.placed ? 123 : curtain.position.y})`}
        >
          <path
            d={
              curtain.placed
                ? 'M-85-76H85V76Q40 65 0 76q-40-11-85 0z'
                : 'M-24-76h48L17 5l9 71q-26-9-52 0L-17 5z'
            }
            fill="#f3a3bd"
          />
          <path
            d={
              curtain.placed
                ? 'M-58-65V65m39-130V66m38-131V66m39-131V65'
                : 'M-12-66l7 68-6 62m23-130L5 2l6 62'
            }
            fill="none"
            stroke="#bd658e"
          />
          {!curtain.placed && (
            <path d="M-19 3h38" stroke="#ffd66e" strokeWidth={8} />
          )}
          <rect
            x={-32}
            y={-78}
            width={64}
            height={156}
            rx={12}
            fill="transparent"
            stroke={curtain.selected ? '#126b5e' : 'none'}
          />
        </g>
      </PuzzleArt>
      <p className={styles.note} role="status">
        {curtain.placed
          ? 'Rèm đã che ánh trăng. Bé ngủ ngon rồi!'
          : curtain.selected
            ? 'Đã chọn rèm. Chạm cửa sổ để che lại.'
            : 'Kéo đồ vật, hoặc chạm chọn rồi chạm nơi muốn đặt.'}
      </p>
    </div>
  );
}
