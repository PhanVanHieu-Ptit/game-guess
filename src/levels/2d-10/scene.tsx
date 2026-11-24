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

const ACCEPTED = ['4', 'bốn', 'bon', 'bốn con', '4 con'] as const;

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const [counted, setCounted] = useState<number[]>([]);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);

  const answer = useAnswerInput({
    accepted: ACCEPTED,
    onSolved,
    onProgress,
    onWrong: () => {
      const normalized = normalizeAnswer(answer.value);
      if (['6', 'sau', 'sáu', '6 con', 'sau con'].includes(normalized)) {
        wrong('six');
      } else {
        wrong('other');
      }
    },
  });

  // Tọa độ 4 chú vịt xếp hàng một
  const ducks = [60, 135, 210, 285];

  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Bốn chú vịt vàng đang nối đuôi nhau lạch bạch đi dạo"
        height={210}
        reaction={reaction}
      >
        {/* Nền bờ cỏ và dòng suối */}
        <path d="M0 0h360v210H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 70q180-20 360 0v140H0z" fill="#e3f4d5" stroke="none" />
        <path d="M0 160q180-15 360 0v50H0z" fill="#a7e3db" stroke="none" />
        <path
          d="M0 160q180-15 360 0"
          stroke="#7dc6bd"
          strokeWidth={2.5}
          fill="none"
        />

        {/* Cây cỏ và hoa nhỏ bên đường */}
        <g fill="#73c892" stroke="none">
          <ellipse cx={25} cy={60} rx={18} ry={10} />
          <ellipse cx={335} cy={55} rx={22} ry={12} />
        </g>
        <circle cx={40} cy={80} r={4} fill="#ffda72" stroke="none" />
        <circle cx={320} cy={75} r={5} fill="#ffda72" stroke="none" />
        <circle cx={170} cy={68} r={3.5} fill="#ffda72" stroke="none" />

        {/* Đàn vịt chạm được */}
        <ArtButton
          label="Đàn vịt"
          x={30}
          y={80}
          width={300}
          height={85}
          onPress={() => wrong('duck')}
        >
          {ducks.map((x, index) => (
            <g key={index} transform={`translate(${x} 115)`}>
              {/* Vết chân vịt phía sau */}
              <path
                d="M-22 22l-6 5m3-8l-3 8m0-8l3 8"
                fill="none"
                stroke="#c48a3b"
                strokeWidth={1.5}
              />
              {/* Chân vịt */}
              <path d="M-4 18v7m10-7v7" stroke="#ff7a29" strokeWidth={2.5} />
              <path d="M-6 25h5m5 0h5" stroke="#ff7a29" strokeWidth={2.5} />
              {/* Thân vịt bầu bĩnh */}
              <ellipse cx="2" cy="6" rx="20" ry="14" fill="#ffd043" />
              {/* Đuôi vịt vểnh lên */}
              <path d="M-17 4q-8-8 0-11 5 4 4 11" fill="#ffd043" />
              {/* Cánh vịt */}
              <path d="M-8 4q12-10 18 2-6 8-18-2z" fill="#ffbe26" />
              {/* Đầu vịt tròn */}
              <circle cx="16" cy="-8" r="12" fill="#ffd043" />
              {/* Mỏ vịt cam */}
              <path d="M25-9q10 3 0 7z" fill="#ff7a29" />
              {/* Mắt vịt đen lay láy */}
              <circle cx="19" cy="-10" r="2.5" fill="#231f3f" stroke="none" />
              <circle cx="18.5" cy="-11" r="0.8" fill="#ffffff" stroke="none" />
              {counted.includes(index) && (
                <text
                  x={0}
                  y={-34}
                  textAnchor="middle"
                  fontSize={22}
                  fontWeight={800}
                  stroke="none"
                  fill="#126b5e"
                >
                  ✓
                </text>
              )}
            </g>
          ))}
        </ArtButton>

        {/* Làn sóng gợn nhẹ dưới mép suối */}
        <path
          d="M20 185q25-6 50 0m80 5q20-5 40 0m90-2q25-6 50 0"
          fill="none"
          stroke="#7dc6bd"
          strokeWidth={2}
        />
      </PuzzleArt>

      <section className={lab.lab} aria-label="Điểm danh vịt">
        <p className={lab.title}>🦆 Điểm danh từng bạn, đừng đếm lời kể!</p>
        <div className={lab.actions}>
          {ducks.map((_, index) => (
            <button
              key={index}
              type="button"
              data-touch-target
              aria-pressed={counted.includes(index)}
              onClick={() => {
                setCounted((previous) =>
                  previous.includes(index)
                    ? previous.filter((value) => value !== index)
                    : [...previous, index],
                );
                onProgress();
              }}
            >
              Vịt {index + 1}
              {counted.includes(index) ? ' ✓' : ''}
            </button>
          ))}
        </div>
        <p aria-live="polite">Đã điểm danh: {counted.length} bạn.</p>
        <div className={lab.actions}>
          <button
            type="button"
            data-touch-target
            onClick={() => (counted.length === 4 ? onSolved() : wrong('other'))}
          >
            Chốt số vịt đã đếm
          </button>
        </div>
      </section>

      <form className={controls.controls} onSubmit={answer.submit}>
        <label htmlFor={id}>Có tất cả mấy con vịt?</label>
        <input
          id={id}
          {...answer.inputProps}
          className={controls.input}
          aria-describedby={`${id}-message`}
          data-touch-target
          placeholder="Nhập số con vịt..."
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
