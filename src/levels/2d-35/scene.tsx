'use client';

import { useId, useState } from 'react';
import lab from '@/engine/stage2d/experiment.module.css';
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
  const [overtaken, setOvertaken] = useState(false);
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
            <g
              style={{
                transform: `translateX(${index === 0 ? 0 : index === 1 ? (overtaken ? 84 : 0) : overtaken ? -84 : 0}px)`,
              }}
            >
              <Kid x={x} y={y} shirt={shirt} />
              <text
                x={x}
                y={y - 20}
                textAnchor="middle"
                fontSize={18}
                fontWeight={800}
                fill="#231f3f"
                stroke="none"
              >
                {index === 2 ? 'BÉ' : index === 0 ? 'DẪN ĐẦU' : 'THỨ HAI'}
              </text>
            </g>
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
      <section className={lab.lab} aria-label="Diễn lại pha vượt người">
        <p className={lab.title}>🏃 Xem vị trí đổi thế nào</p>
        <div className={lab.actions}>
          <button
            type="button"
            data-touch-target
            onClick={() => {
              setOvertaken(!overtaken);
              onProgress();
            }}
          >
            {overtaken ? 'Trở về trước khi vượt' : 'Vượt người thứ hai'}
          </button>
        </div>
        <p aria-live="polite">
          {overtaken
            ? 'Bé đã đổi chỗ với người thứ hai. Người dẫn đầu vẫn ở phía trước.'
            : 'Bé ở phía sau người thứ hai. Chạy về bên trái nhé!'}
        </p>
      </section>
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
