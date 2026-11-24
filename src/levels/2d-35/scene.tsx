'use client';

import { useId } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useAnswerInput } from '@/engine/input/use-answer-input';
import { NumberPad } from '@/engine/input/number-pad';
import { normalizeAnswer } from '@/domain/answers/normalize';
import {
  ArtButton,
  Kid,
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
    wrong(
      ['1', 'mot', 'thu nhat', 'nhat'].includes(normalizeAnswer(value))
        ? 'first'
        : 'other',
    );
  const answer = useAnswerInput({
    accepted: ['2', 'hai', 'thứ hai'],
    onSolved,
    onProgress,
    onWrong: () => reject(answer.value),
  });
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Các bạn nhỏ chạy đua trên con đường làng"
        height={260}
        reaction={reaction}
      >
        <path d="M0 0h360v260H0z" fill="#dff4f3" stroke="none" />
        <circle cx={305} cy={37} r={22} fill="#ffd66e" />
        <path
          d="M0 119q80-40 170 0t190 0v141H0z"
          fill="#bce3b1"
          stroke="none"
        />
        <path d="M0 162q120-31 360-2v83q-188-36-360 0z" fill="#efb08a" />
        <path
          d="M10 207q150-30 340-7"
          fill="none"
          stroke="#fffdf3"
          strokeDasharray="18 17"
          strokeWidth={5}
        />
        <path d="M43 109V34l46 17-46 17m255 82V80l41 16-41 16" fill="#ef6b68" />
        {[
          { x: 94, y: 102, shirt: '#f3a3bd' },
          { x: 179, y: 110, shirt: '#59b9d5' },
          { x: 263, y: 115, shirt: '#ffd66e' },
        ].map(({ x, y, shirt }, index) => (
          <ArtButton
            key={x}
            label={`Bạn chạy ${index + 1}`}
            x={x - 30}
            y={y - 10}
            width={62}
            height={98}
            onPress={() => wrong('runner')}
          >
            <Kid x={x} y={y} shirt={shirt} />
            <path
              d={`M${x - 34} ${y + 41}h-12m10 15h-14`}
              stroke="#b47b3c"
              strokeWidth={3}
            />
          </ArtButton>
        ))}
      </PuzzleArt>
      <p className={styles.note}>
        Bé vừa vượt người thứ hai. Bé chưa vượt người dẫn đầu.
      </p>
      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Vị trí của bé</label>
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
        label="Nhập vị trí bằng chạm"
        valueLabel="Vị trí của bé"
        maxDigits={1}
        onProgress={onProgress}
        onSubmit={(value) => (value === '2' ? onSolved() : reject(value))}
      />
    </div>
  );
}
