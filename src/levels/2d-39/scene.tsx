'use client';

import { useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import art from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

const cards = ['A', 'B', '4', '7'] as const;

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const toggle = (card: string) => {
    setSelected((previous) =>
      previous.includes(card)
        ? previous.filter((value) => value !== card)
        : [...previous, card],
    );
    onProgress();
  };
  const check = () => {
    if (
      selected.length === 2 &&
      selected.includes('A') &&
      selected.includes('7')
    ) {
      onSolved();
      return;
    }
    wrong(
      selected.length === 0
        ? 'empty'
        : selected.includes('4')
          ? 'four'
          : selected.length > 2
            ? 'extra'
            : 'missing',
    );
  };
  return (
    <div className={`${art.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Bốn thẻ A, B, 4, 7, chưa lật mặt sau"
        height={312}
        reaction={reaction}
      >
        <path d="M0 0h360v312H0z" fill="#dff4f3" stroke="none" />
        <path d="M12 298h336" stroke="#b47b3c" strokeWidth={8} />
        {cards.map((card, index) => {
          const x = index % 2 ? 193 : 25,
            y = index < 2 ? 18 : 160;
          const active = selected.includes(card);
          return (
            <ArtButton
              key={card}
              label={`Thẻ ${card}`}
              x={x}
              y={y}
              width={142}
              height={118}
              onPress={() => toggle(card)}
            >
              <rect
                x={x + 3}
                y={y + 5}
                width={142}
                height={118}
                rx={18}
                fill="#b8dedd"
                stroke="none"
              />
              <rect
                x={x}
                y={y}
                width={142}
                height={118}
                rx={18}
                fill={active ? '#e3f4d5' : '#fffdf3'}
                stroke={active ? '#30764e' : '#231f3f'}
                strokeWidth={active ? 5 : 3.5}
              />
              <text
                x={x + 71}
                y={y + 79}
                textAnchor="middle"
                fontSize={52}
                fontWeight={800}
                fill="#231f3f"
                stroke="none"
              >
                {card}
              </text>
              {active && (
                <g>
                  <circle
                    cx={x + 119}
                    cy={y + 23}
                    r={13}
                    fill="#30764e"
                    stroke="none"
                  />
                  <path
                    d={`M${x + 112} ${y + 23}l5 5 9-10`}
                    fill="none"
                    stroke="#fffdf3"
                    strokeWidth={3}
                  />
                </g>
              )}
            </ArtButton>
          );
        })}
      </PuzzleArt>
      <p className={art.note}>
        Nếu mặt chữ là nguyên âm thì mặt số phải chẵn. Luật không nói số chẵn
        phải đi với nguyên âm.
      </p>
      <p className={art.note}>
        Chạm thẻ để chọn hoặc bỏ chọn, rồi kiểm tra cả nhóm. Chưa lật thẻ khi
        đang chọn.
      </p>
      <p
        className={art.note}
        role="status"
        data-testid="card-selection"
        data-selected={cards
          .filter((card) => selected.includes(card))
          .join(',')}
      >
        Đã chọn:{' '}
        {cards.filter((card) => selected.includes(card)).join(', ') ||
          'chưa có thẻ nào'}
        .
      </p>
      <button
        type="button"
        data-touch-target
        className={controls.button}
        onClick={check}
      >
        Kiểm tra
      </button>
      <button
        type="button"
        data-touch-target
        className={controls.button}
        onClick={() => {
          setSelected([]);
          onProgress();
        }}
      >
        Bỏ chọn hết
      </button>
    </div>
  );
}
