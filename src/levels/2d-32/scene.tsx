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

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const reject = (value: string) =>
    wrong(['5', 'nam'].includes(normalizeAnswer(value)) ? 'five' : 'other');
  const answer = useAnswerInput({
    accepted: ['3', 'ba'],
    onSolved,
    onProgress,
    onWrong: () => reject(answer.value),
  });
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Ốc sên ở chân bức tường cao 5 m, có vạch chia từng mét"
        height={300}
        reaction={reaction}
      >
        <path d="M0 0h360v300H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 270h360v30H0z" fill="#e3f4d5" stroke="none" />
        <circle cx={48} cy={45} r={22} fill="#ffd66e" />
        <path
          d="M48 12V5m0 80v-7M15 45H8m80 0h-7M23 20l-6-6m62 62-6-6"
          stroke="#ffab4a"
        />
        <ArtButton
          label="Bức tường cao 5 m"
          x={188}
          y={25}
          width={111}
          height={245}
          onPress={() => wrong('wall')}
        >
          <rect x={190} y={30} width={104} height={240} rx={5} fill="#efb08a" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <path
                d={`M190 ${270 - i * 48}h111`}
                stroke="#b47b3c"
                strokeWidth={3}
              />
              <text
                x={306}
                y={277 - i * 48}
                fontSize={19}
                fill="#231f3f"
                stroke="none"
              >
                {i} m
              </text>
              {i < 5 && (
                <path
                  d={`M${i % 2 ? 219 : 260} ${270 - i * 48}v-48`}
                  stroke="#b47b3c"
                  strokeWidth={2}
                />
              )}
            </g>
          ))}
        </ArtButton>
        <path d="M39 265q-6-19 25-19h69l11-20 17 9-5 30z" fill="#70bb87" />
        <circle cx={91} cy={234} r={29} fill="#ffd66e" />
        <path
          d="M106 247q-37 8-31-20 7-20 25-8 14 14-5 18-8 0-6-7"
          fill="none"
          stroke="#b47b3c"
        />
        <path d="M147 237l-2-19m12 23 9-18" fill="none" />
        <circle cx={145} cy={216} r={4} fill="#231f3f" stroke="none" />
        <circle cx={167} cy={220} r={4} fill="#231f3f" stroke="none" />
        <path d="M155 250q5 5 10-1" fill="none" strokeWidth={2} />
      </PuzzleArt>
      <p className={styles.note}>
        Ngày: lên 3 m. Đêm: tụt 2 m. Chạm đỉnh là dừng.
      </p>
      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Số ngày leo tường</label>
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
        label="Nhập số ngày bằng chạm"
        valueLabel="Số ngày leo tường"
        maxDigits={1}
        onProgress={onProgress}
        onSubmit={(value) => (value === '3' ? onSolved() : reject(value))}
      />
    </div>
  );
}
