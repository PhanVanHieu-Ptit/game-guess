'use client';

import { useId } from 'react';
import { WordWorkshop } from '@/engine/stage2d/word-workshop';
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

const ACCEPTED = ['bật mí', 'bat mi'] as const;

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const { reaction, wrong } = usePuzzleFeedback(onWrong);

  const answer = useAnswerInput({
    accepted: ACCEPTED,
    onSolved,
    onProgress,
    onWrong: () => {
      const normalized = normalizeAnswer(answer.value);
      if (['bi mat', 'bimat'].includes(normalized)) {
        wrong('same');
      } else if (['mat bi', 'matbi'].includes(normalized)) {
        wrong('reversed');
      } else {
        wrong('other');
      }
    },
  });

  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Chiếc rương bí mật có dán chữ BÍ MẬT và khóa kín"
        height={220}
        reaction={reaction}
      >
        {/* Nền phòng bí ẩn */}
        <path d="M0 0h360v220H0z" fill="#f5eef9" stroke="none" />
        <path d="M0 175h360v45H0z" fill="#dfd0e8" stroke="none" />
        <path d="M0 175h360" stroke="#bda6c9" strokeWidth={3} />

        {/* Ngôi sao lấp lánh bí ẩn */}
        <g fill="#ffda72" stroke="none">
          <path d="M60 45l4 9 9 4-9 4-4 9-4-9-9-4 9-4z" />
          <path d="M300 55l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M85 110l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
          <path d="M280 120l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" />
        </g>

        {/* Chiếc rương bí mật tương tác */}
        <ArtButton
          label="Chiếc rương bí mật"
          x={90}
          y={40}
          width={180}
          height={140}
          onPress={() => wrong('open_box')}
        >
          {/* Thân rương */}
          <rect
            x={100}
            y={100}
            width={160}
            height={70}
            rx={10}
            fill="#a66e38"
          />
          {/* Nắp rương vòm cong */}
          <path d="M95 102q85-45 170 0v-6q-85-45-170 0z" fill="#bf8546" />
          <path
            d="M95 96q85-45 170 0"
            fill="none"
            stroke="#7a4b1f"
            strokeWidth={3}
          />

          {/* Dải nẹp kim loại vàng */}
          <rect x={125} y={75} width={16} height={95} fill="#ffcf63" />
          <rect x={219} y={75} width={16} height={95} fill="#ffcf63" />

          {/* Nhãn chữ BÍ MẬT dán trên rương */}
          <rect
            x={130}
            y={110}
            width={100}
            height={32}
            rx={6}
            fill="#fff8df"
            stroke="#231f3f"
            strokeWidth={2.5}
          />
          <text
            x={180}
            y={133}
            textAnchor="middle"
            fontSize={18}
            fontWeight={900}
            fill="#ef6b68"
            stroke="none"
            letterSpacing="2"
          >
            BÍ MẬT
          </text>

          {/* Ổ khóa to chính giữa */}
          <circle cx={180} cy={95} r={14} fill="#ffda72" />
          <path
            d="M174 95a6 6 0 0 1 12 0v5h-12z"
            fill="none"
            stroke="#231f3f"
            strokeWidth={2.5}
          />
          <circle cx={180} cy={97} r={2.5} fill="#231f3f" stroke="none" />
          <path d="M180 97v4" stroke="#231f3f" strokeWidth={2} />
        </ArtButton>
      </PuzzleArt>

      <WordWorkshop onProgress={onProgress} onSolved={onSolved} />

      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Từ nói lái của &quot;bí mật&quot;</label>
        <input
          id={id}
          {...answer.inputProps}
          className={controls.input}
          aria-describedby={`${id}-message`}
          data-touch-target
          placeholder="Gõ từ mới..."
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
