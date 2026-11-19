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

const accepted = ['8:20', '8h20', '820', '08:20', '0820', '8 giờ 20'];

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const reject = (value: string) =>
    wrong(
      ['340', '0340'].includes(normalizeAnswer(value).replace(/[^0-9]/g, ''))
        ? 'mirror'
        : 'other',
    );
  const answer = useAnswerInput({
    accepted,
    onSolved,
    onProgress,
    onWrong: () => reject(answer.value),
  });
  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Đồng hồ kim phản chiếu trong gương ở quán cà phê"
        height={285}
        reaction={reaction}
      >
        <rect x={35} y={12} width={290} height={225} rx={25} fill="#d8f1f7" />
        <path d="M55 53l25-23m211 181l15-15" stroke="#fff" strokeWidth={7} />
        <g transform="translate(360 0) scale(-1 1)">
          <circle cx={180} cy={118} r={88} fill="#ffd66e" />
          <circle cx={180} cy={118} r={78} fill="#fffdf3" />
          {Array.from({ length: 12 }, (_, i) => {
            const angle = ((i + 1) * Math.PI) / 6;
            return (
              <text
                key={i}
                x={180 + 64 * Math.sin(angle)}
                y={125 - 64 * Math.cos(angle)}
                fontSize={18}
                textAnchor="middle"
                fill="#231f3f"
                stroke="none"
                fontWeight={800}
              >
                {i + 1}
              </text>
            );
          })}
          <path d="M180 118l47.63 27.5" stroke="#ef6b68" strokeWidth={5} />
          <path d="M180 118l-35.71 13" strokeWidth={8} />
          <circle cx={180} cy={118} r={5} fill="#231f3f" />
        </g>
        <ArtButton
          label="Đồng hồ trong gương"
          x={88}
          y={26}
          width={184}
          height={184}
          onPress={() => wrong('clock')}
        >
          <path d="M175 262h-41v-16h41m0 3q18 0 10 10h-10" fill="#f3a3bd" />
          <path d="M138 271h45" />
        </ArtButton>
      </PuzzleArt>
      <p className={styles.note}>
        Trong gương: <strong>3:40</strong>
      </p>
      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Giờ thật</label>
        <input
          id={id}
          {...answer.inputProps}
          data-touch-target
          className={controls.input}
          aria-describedby={`${id}-message`}
          placeholder="Gõ giờ thật..."
        />
        <p id={`${id}-message`} role="status">
          {answer.message}
        </p>
        <button type="submit" data-touch-target className={controls.button}>
          Trả lời
        </button>
      </form>
      <NumberPad
        label="Nhập giờ bằng chạm"
        valueLabel="Giờ và phút, viết liền"
        maxDigits={4}
        onProgress={onProgress}
        onSubmit={(value) =>
          ['820', '0820'].includes(value) ? onSolved() : reject(value)
        }
      />
    </div>
  );
}
