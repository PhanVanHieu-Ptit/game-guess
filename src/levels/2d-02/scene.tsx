'use client';

import { useId, useState } from 'react';
import lab from '@/engine/stage2d/experiment.module.css';
import type { SceneProps } from '@/engine/scene';
import { normalizeAnswer } from '@/domain/answers/normalize';
import { useAnswerInput } from '@/engine/input/use-answer-input';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';

const ACCEPTED = ['cua', 'con cua', 'cua bể', 'cua đồng'] as const;

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const [size, setSize] = useState(0);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const answer = useAnswerInput({
    accepted: ACCEPTED,
    onSolved,
    onProgress,
    onWrong: (): void =>
      wrong(
        ['tom', 'con tom'].includes(normalizeAnswer(answer.value))
          ? 'shrimp'
          : 'animal',
      ),
  });
  return (
    <div className={styles.scene}>
      <PuzzleArt label="Góc ao với dấu hỏi" height={230} reaction={reaction}>
        <path d="M0 0h360v230H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 187q80-20 160 0t200-5v48H0z" fill="#ffda85" stroke="none" />
        <path
          d="M36 194q-15-36 1-68m8 67q25-26 19-49m252 50q-23-23-12-46"
          fill="none"
          stroke="#329d79"
          strokeWidth={8}
        />
        <circle cx={80} cy={67} r={10} fill="white" />
        <circle cx={291} cy={93} r={7} fill="white" />
        <ArtButton
          label="Mặt nước"
          x={115}
          y={30}
          width={130}
          height={160}
          onPress={() => wrong('water')}
        >
          <path
            d="M127 168q-25-48 0-62 8-27 30-15 23-24 44 0 25-7 31 17 26 15 1 60z"
            fill="#b694df"
          />
          <path
            d="M140 159l-9-35m28 35-3-45m24 45v-45m21 45 7-38m-70 47h85"
            fill="none"
            stroke="#786298"
          />
          <text
            x={180}
            y={79}
            textAnchor="middle"
            fontSize={52}
            fontWeight={800}
            stroke="none"
            fill="#231f3f"
          >
            ?
          </text>
        </ArtButton>
      </PuzzleArt>
      <section className={lab.lab} aria-label="Thử nghĩa của to và nhỏ">
        <p className={lab.title}>🫧 “To” theo cách nào nhỉ?</p>
        <p className={lab.readout} aria-live="polite">
          <span style={{ fontSize: `${24 + size * 8}px` }}>TO</span>
          <span style={{ fontSize: `${32 - size * 5}px` }}>nhỏ</span>
        </p>
        <div className={lab.actions}>
          <button
            type="button"
            data-touch-target
            onClick={() => {
              setSize((size + 1) % 4);
              onProgress();
            }}
          >
            Cho “to” thêm một chút
          </button>
        </div>
      </section>
      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Đáp án của bạn</label>
        <input
          id={id}
          {...answer.inputProps}
          className={controls.input}
          aria-describedby={`${id}-message`}
          data-touch-target
        />
        <p id={`${id}-message`} role="status">
          {answer.message}
        </p>
        <button
          type="submit"
          className={controls.button}
          data-touch-target
          disabled={answer.inputProps.disabled}
        >
          Trả lời
        </button>
      </form>
    </div>
  );
}
