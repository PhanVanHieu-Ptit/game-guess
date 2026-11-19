'use client';

import { useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';
import local from './scene.module.css';

const SIGNS = [
  { id: 'a', letter: 'A', text: 'Lối ra ở B.', color: '#59b9d5' },
  { id: 'b', letter: 'B', text: 'Lối ra không ở B.', color: '#f3a3bd' },
  { id: 'c', letter: 'C', text: 'Lối ra không ở A.', color: '#ffd66e' },
] as const;

export default function Scene({ onSolved, onWrong }: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const [open, setOpen] = useState(false);
  const choose = (id: string) => {
    if (id === 'a') {
      setOpen(true);
      onSolved();
    } else wrong(id);
  };
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Hội chợ có ba cổng A, B, C và những dây cờ màu"
        height={280}
        reaction={reaction}
      >
        <path d="M0 0h360v280H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 231h360v49H0z" fill="#e3f4d5" stroke="none" />
        <path d="M8 31q172 61 344 0" fill="none" />
        {[
          { x: 29, y: 38, c: '#f3a3bd' },
          { x: 83, y: 49, c: '#ffd66e' },
          { x: 137, y: 57, c: '#59b9d5' },
          { x: 191, y: 60, c: '#f3a3bd' },
          { x: 245, y: 54, c: '#ffd66e' },
          { x: 299, y: 43, c: '#59b9d5' },
        ].map(({ x, y, c }) => (
          <path
            key={x}
            d={`M${x} ${y}l13 26 13-23z`}
            fill={c}
            strokeWidth={2.5}
          />
        ))}
        <text
          x={180}
          y={27}
          textAnchor="middle"
          fontSize={23}
          fontWeight={800}
          fill="#231f3f"
          stroke="none"
        >
          HỘI CHỢ
        </text>
        {SIGNS.map(({ id, letter, color }, index) => {
          const x = 67 + index * 113;
          return (
            <ArtButton
              key={id}
              label={`Cổng ${letter} trên hình`}
              x={x - 44}
              y={93}
              width={88}
              height={157}
              onPress={() => choose(id)}
            >
              <path
                d={`M${x - 40} 244V139q0-42 40-42t40 42v105z`}
                fill={color}
              />
              <path
                d={`M${x - 29} 244v-97h58v97`}
                fill={open && id === 'a' ? '#e3f4d5' : '#fff1d0'}
              />
              <path d={`M${x} 148v96m-18-55h6m24 0h6`} fill="none" />
              <text
                x={x}
                y={133}
                textAnchor="middle"
                fontSize={25}
                fontWeight={800}
                fill="#231f3f"
                stroke="none"
              >
                {letter}
              </text>
              <path d={`M${x - 43} 248h86`} stroke="#c48a3b" strokeWidth={7} />
            </ArtButton>
          );
        })}
      </PuzzleArt>
      <p className={styles.note}>Chỉ có một cổng dẫn ra ngoài.</p>
      <div
        className={controls.controls}
        role="group"
        aria-label="Đọc biển rồi chọn cổng"
      >
        {SIGNS.map(({ id, letter, text, color }) => (
          <button
            key={id}
            type="button"
            aria-label={`Cổng ${letter}`}
            aria-describedby={`gate-sign-${id}`}
            data-touch-target
            className={`${controls.button} ${local.sign}`}
            onClick={() => choose(id)}
          >
            <span
              className={local.badge}
              style={{ background: color }}
              aria-hidden="true"
            >
              {letter}
            </span>
            <span id={`gate-sign-${id}`}>
              Biển {letter}: {text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
