'use client';

import { useId } from 'react';
import { PriceWorkshop } from '@/engine/stage2d/price-workshop';
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
    wrong(
      ['1000', '1.000', '1 nghin', 'mot nghin', '1000 dong'].includes(
        normalizeAnswer(value),
      )
        ? 'thousand'
        : 'other',
    );
  const answer = useAnswerInput({
    accepted: [
      '500',
      '500 đồng',
      '0,5 nghìn',
      '0.5 nghìn',
      'năm trăm',
      'năm trăm đồng',
    ],
    onSolved,
    onProgress,
    onWrong: () => reject(answer.value),
  });
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Một chiếc bánh và một chiếc túi ở quầy bánh"
        height={240}
        reaction={reaction}
      >
        <path d="M0 0h360v240H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 20h360v39H0z" fill="#ef6b68" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M${i * 60 + 12} 21v36`}
            stroke="#fffdf3"
            strokeWidth={24}
          />
        ))}
        <path d="M0 200h360v40H0z" fill="#ffe1b2" stroke="none" />
        <path d="M12 213h336" stroke="#b47b3c" strokeWidth={7} />
        <ArtButton
          label="Chiếc bánh"
          x={31}
          y={82}
          width={135}
          height={118}
          onPress={() => wrong('cake')}
        >
          <ellipse cx={99} cy={190} rx={63} ry={12} fill="#fffdf3" />
          <path
            d="M46 148q-9-51 49-50 58-5 59 50v31q-53 22-108 0z"
            fill="#ffd66e"
          />
          <path
            d="M49 146q52-43 102 0M78 112l-9 20m31-28v20m25-14 8 19"
            fill="none"
            stroke="#b47b3c"
            strokeWidth={5}
          />
          <path d="M79 160v3m38-3v3m-27 10q8 7 16 0" fill="none" />
        </ArtButton>
        <path
          d="M222 110V93q0-39 40-39 38 0 38 39v17"
          fill="none"
          stroke="#b47b3c"
          strokeWidth={8}
        />
        <path d="M207 103h108l12 89q-65 18-132 0z" fill="#f3a3bd" />
        <circle cx={229} cy={110} r={4} fill="#fffdf3" />
        <circle cx={294} cy={110} r={4} fill="#fffdf3" />
        <path d="M244 145h36m-28 13h20" stroke="#fffdf3" strokeWidth={5} />
      </PuzzleArt>
      <PriceWorkshop onProgress={onProgress} onSolved={onSolved} />
      <p className={styles.note}>
        Tổng: 11.000 đồng. Bánh đắt hơn túi: 10.000 đồng.
      </p>
      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Giá túi (đồng)</label>
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
        label="Nhập giá túi bằng chạm"
        valueLabel="Giá túi (đồng)"
        maxDigits={5}
        onProgress={onProgress}
        onSubmit={(value) =>
          Number(value) === 500 ? onSolved() : reject(value)
        }
      />
    </div>
  );
}
