'use client';

import { useId } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useAnswerInput } from '@/engine/input/use-answer-input';
import { NumberPad } from '@/engine/input/number-pad';
import { normalizeAnswer } from '@/domain/answers/normalize';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

const accepted = ['2', 'hai'];

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const reject = (value: string) =>
    wrong(['3', 'ba'].includes(normalizeAnswer(value)) ? 'total' : 'other');
  const answer = useAnswerInput({
    accepted,
    onSolved,
    onProgress,
    onWrong: () => reject(answer.value),
  });
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Cân thăng bằng: rổ cam bên trái, quả cân 3 kg bên phải"
        height={300}
        reaction={reaction}
      >
        <path d="M0 0h360v300H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 264h360v36H0z" fill="#ffe1b2" stroke="none" />
        <path
          d="M180 82v172m-59 10h118l-23-20h-72z"
          fill="#59b9d5"
          strokeWidth={8}
        />
        <path
          d="M65 82h230M65 82l-40 132m40-132 40 132m190-132-40 132m40-132 40 132"
          fill="none"
        />
        <circle cx={180} cy={82} r={12} fill="#f3a3bd" />
        <path d="M15 216q50 36 100 0zm230 0q50 36 100 0z" fill="#59b9d5" />
        <ArtButton
          label="Rổ cam trên cân"
          x={25}
          y={116}
          width={105}
          height={100}
          onPress={() => wrong('basket')}
        >
          <path
            d="M39 177v-28q0-46 52-13l7 41"
            fill="none"
            stroke="#b47b3c"
            strokeWidth={7}
          />
          {[
            { x: 48, y: 167 },
            { x: 78, y: 157 },
            { x: 96, y: 179 },
          ].map(({ x, y }) => (
            <g key={x}>
              <circle cx={x} cy={y} r={19} fill="#ffab4a" />
              <path
                d={`M${x} ${y - 18}q1-12 12-10-1 11-12 10z`}
                fill="#70bb87"
                strokeWidth={2}
              />
            </g>
          ))}
          <path d="M27 183h79l-11 29H38z" fill="#ffd66e" />
          <path
            d="M34 195h65m-48-10 4 25m22-25-4 25"
            stroke="#b47b3c"
            strokeWidth={2}
          />
        </ArtButton>
        <path d="M269 144h52l13 68h-78z" fill="#b8bbce" />
        <path d="M285 143v-10q10-15 20 0v10" fill="none" strokeWidth={6} />
        <text
          x={295}
          y={191}
          textAnchor="middle"
          fontSize={28}
          fontWeight={800}
          fill="#231f3f"
          stroke="none"
        >
          3 kg
        </text>
      </PuzzleArt>
      <p className={styles.note}>
        Cân đang thăng bằng. <strong>Rổ rỗng: 1 kg.</strong>
      </p>
      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Số ký cam</label>
        <input
          id={id}
          {...answer.inputProps}
          data-touch-target
          className={controls.input}
          aria-describedby={`${id}-message`}
        />
        <p id={`${id}-message`} role="status">
          {answer.message}
        </p>
        <button type="submit" data-touch-target className={controls.button}>
          Trả lời
        </button>
      </form>
      <NumberPad
        label="Nhập số ký bằng chạm"
        valueLabel="Số ký cam"
        maxDigits={1}
        onProgress={onProgress}
        onSubmit={(value) => (value === '2' ? onSolved() : reject(value))}
      />
    </div>
  );
}
