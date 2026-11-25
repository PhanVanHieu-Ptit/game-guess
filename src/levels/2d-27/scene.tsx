'use client';

import { useId, useState } from 'react';
import lab from '@/engine/stage2d/experiment.module.css';
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

const accepted = ['5', 'năm'];

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const [corners, setCorners] = useState<number[]>([]);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const reject = (value: string) =>
    wrong(['3', 'ba'].includes(normalizeAnswer(value)) ? 'subtract' : 'other');
  const answer = useAnswerInput({
    accepted,
    onSolved,
    onProgress,
    onWrong: () => reject(answer.value),
  });
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Tờ giấy còn lại có đường viền năm cạnh; mảnh tam giác bị cắt nằm riêng bên phải"
        height={320}
        reaction={reaction}
      >
        <path d="M0 0h360v320H0z" fill="#ffe1b2" stroke="none" />
        <path d="M18 300h324" stroke="#e2b57b" strokeWidth={5} />
        <path d="M40 70h170l60 60v170H40z" fill="#d6ac76" stroke="none" />
        <path
          data-testid="remaining-paper"
          d="M30 60h170l60 60v170H30z"
          fill="#fffdf3"
        />
        <path d="M200 60l60 60" stroke="#ef6b68" strokeWidth={5} />
        <path d="M50 87h117m-117 25h74" stroke="#dff4f3" strokeWidth={8} />
        {[
          [30, 60],
          [200, 60],
          [260, 120],
          [260, 290],
          [30, 290],
        ].map(([x, y], index) => (
          <ArtButton
            key={index}
            label={`Đánh dấu góc ${index + 1}`}
            x={x - 29}
            y={y - 29}
            width={58}
            height={58}
            onPress={() => {
              setCorners((previous) =>
                previous.includes(index)
                  ? previous.filter((value) => value !== index)
                  : [...previous, index],
              );
              onProgress();
            }}
          >
            <circle
              cx={x}
              cy={y}
              r={15}
              fill={corners.includes(index) ? '#73c892' : '#ffda72'}
              strokeWidth={2}
            />
            <text
              x={x}
              y={y + 6}
              textAnchor="middle"
              fontSize={18}
              fontWeight={800}
              stroke="none"
              fill="#231f3f"
            >
              {corners.includes(index) ? '✓' : '·'}
            </text>
          </ArtButton>
        ))}
        <ArtButton
          label="Mảnh giấy đã cắt rời"
          x={235}
          y={20}
          width={88}
          height={88}
          onPress={() => wrong('scrap')}
        >
          <path d="M248 25h65v65z" fill="#fffdf3" />
          <path d="M248 25l65 65" stroke="#ef6b68" strokeWidth={5} />
        </ArtButton>
        <path
          d="M296 181l10 10m-10 0 10-10m7 69l8 8m-8 0 8-8"
          stroke="#b47b3c"
          fill="none"
        />
      </PuzzleArt>
      <p className={styles.note}>Chỉ đếm góc của phần giấy lớn còn lại.</p>
      <section className={lab.lab} aria-label="Đếm góc bằng chạm">
        <p>✂️ Chạm từng góc giấy để đánh dấu.</p>
        <p aria-live="polite">
          Đã đánh dấu: {corners.length} góc. Chạm lại để bỏ dấu.
        </p>
        <div className={lab.actions}>
          <button
            type="button"
            data-touch-target
            onClick={() => (corners.length === 5 ? onSolved() : wrong('other'))}
          >
            Chốt các góc đã đánh dấu
          </button>
        </div>
      </section>
      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Số góc còn lại</label>
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
        label="Nhập số góc bằng chạm"
        valueLabel="Số góc"
        maxDigits={1}
        onProgress={onProgress}
        onSubmit={(value) => (value === '5' ? onSolved() : reject(value))}
      />
    </div>
  );
}
