'use client';

import { useId, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import {
  areJugsSolved,
  INITIAL_JUGS,
  JUG_ACTIONS,
  moveWater,
  type JugAction,
  type JugState,
} from '@/domain/puzzles/water-jugs';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import art from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';
import styles from './scene.module.css';

const labels: Record<JugAction, string> = {
  'fill-large': 'Lấy đầy bình 5 lít',
  'fill-small': 'Lấy đầy bình 3 lít',
  'empty-large': 'Đổ hết bình 5 lít',
  'empty-small': 'Đổ hết bình 3 lít',
  'pour-large': 'Rót bình 5 sang bình 3',
  'pour-small': 'Rót bình 3 sang bình 5',
};

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const [state, setState] = useState<JugState>(INITIAL_JUGS);
  const [steps, setSteps] = useState(0);
  const [last, setLast] = useState('Hai bình đang trống.');
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const act = (action: JugAction) => {
    const result = moveWater(state, action);
    if (!result.ok) {
      wrong(result.reason);
      return;
    }
    setState(result.state);
    setSteps((value) => value + 1);
    setLast(labels[action]);
    onProgress();
    if (areJugsSolved(result.state)) onSolved();
  };
  return (
    <div className={`${art.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Bình lớn 5 lít và bình nhỏ 3 lít không có vạch chia"
        height={280}
        reaction={reaction}
      >
        <path d="M0 0h360v280H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 246h360v34H0z" fill="#ffe1b2" stroke="none" />
        <path d="M11 258h338" stroke="#b47b3c" strokeWidth={7} />
        {[
          {
            x: 26,
            y: 58,
            w: 112,
            h: 180,
            capacity: 5,
            amount: state[0],
            color: '#f3a3bd',
            key: 'large',
          },
          {
            x: 218,
            y: 110,
            w: 94,
            h: 128,
            capacity: 3,
            amount: state[1],
            color: '#ffd66e',
            key: 'small',
          },
        ].map((jug) => {
          const body = `M${jug.x} ${jug.y}h${jug.w}v${jug.h - 18}q0 18-18 18h-${jug.w - 36}q-18 0-18-18z`;
          const waterHeight = ((jug.h - 8) * jug.amount) / jug.capacity;
          return (
            <g key={jug.key}>
              <defs>
                <clipPath id={`${id}-${jug.key}`}>
                  <path d={body} />
                </clipPath>
              </defs>
              <path
                d={`M${jug.x + jug.w} ${jug.y + 25}h15q30 0 30 35t-30 35h-15`}
                fill="none"
                stroke={jug.color}
                strokeWidth={15}
              />
              <path d={body} fill="#fffdf3" />
              <g clipPath={`url(#${id}-${jug.key})`}>
                <rect
                  x={jug.x}
                  y={jug.y + jug.h - waterHeight}
                  width={jug.w}
                  height={waterHeight}
                  fill="#59b9d5"
                  stroke="none"
                />
              </g>
              <ArtButton
                label={`Bình ${jug.capacity} lít`}
                x={jug.x}
                y={jug.y}
                width={jug.w}
                height={jug.h}
                onPress={() => wrong('measure')}
              >
                <path d={body} fill="none" />
                <path
                  d={`M${jug.x - 5} ${jug.y}h${jug.w + 10}`}
                  stroke={jug.color}
                  strokeWidth={8}
                />
                <text
                  x={jug.x + jug.w / 2}
                  y={jug.y - 17}
                  textAnchor="middle"
                  fill="#231f3f"
                  stroke="none"
                  fontSize={24}
                  fontWeight={700}
                >
                  {jug.capacity} lít
                </text>
              </ArtButton>
            </g>
          );
        })}
      </PuzzleArt>
      <p className={art.note}>
        Nước lấy không giới hạn. Rót đến khi nguồn hết hoặc đích đầy; không đổ
        một phần hay ước lượng.
      </p>
      <div
        data-testid="jug-state"
        data-volumes={state.join(',')}
        data-steps={steps}
      >
        <p className={art.note} role="status">
          Bước {steps}: {last}
        </p>
      </div>
      <div
        className={styles.actions}
        role="group"
        aria-label="Đong nước bằng chạm"
      >
        {JUG_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            data-touch-target
            className={controls.button}
            onClick={() => act(action)}
          >
            {labels[action]}
          </button>
        ))}
      </div>
      <button
        type="button"
        data-touch-target
        className={controls.button}
        onClick={() => {
          setState(INITIAL_JUGS);
          setSteps(0);
          setLast('Hai bình đang trống.');
          onProgress();
        }}
      >
        Thử lại
      </button>
    </div>
  );
}
