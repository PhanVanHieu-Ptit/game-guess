'use client';

import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

const cards = [
  { word: 'XANH', color: '#c62f3b', name: 'đỏ', x: 24, y: 38, code: null },
  {
    word: 'ĐỎ',
    color: '#2163b0',
    name: 'xanh dương',
    x: 192,
    y: 38,
    code: 'red',
  },
  {
    word: 'VÀNG',
    color: '#75449c',
    name: 'tím',
    x: 24,
    y: 174,
    code: 'yellow',
  },
  {
    word: 'TÍM',
    color: '#846100',
    name: 'vàng',
    x: 192,
    y: 174,
    code: 'purple',
  },
] as const;

export default function Scene({ onSolved, onWrong }: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Bốn thẻ tên màu được viết bằng màu mực khác với tên"
        height={330}
        reaction={reaction}
      >
        <path d="M0 0h360v330H0z" fill="#dff4f3" stroke="none" />
        <path
          d="M9 307q165-18 342 0"
          stroke="#70bb87"
          strokeWidth={8}
          fill="none"
        />
        {cards.map((card) => (
          <ArtButton
            key={card.word}
            label={`Chữ ${card.word} tô màu ${card.name}`}
            x={card.x}
            y={card.y}
            width={144}
            height={104}
            onPress={() => (card.code ? wrong(card.code) : onSolved())}
          >
            <rect
              x={card.x + 3}
              y={card.y + 6}
              width={144}
              height={104}
              rx={18}
              fill="#b8dedd"
              stroke="none"
            />
            <rect
              x={card.x}
              y={card.y}
              width={144}
              height={104}
              rx={18}
              fill="#fffdf3"
            />
            <circle
              cx={card.x + 72}
              cy={card.y + 12}
              r={5}
              fill="#b47b3c"
              strokeWidth={2}
            />
            <text
              x={card.x + 72}
              y={card.y + 66}
              fill={card.color}
              stroke="none"
              textAnchor="middle"
              fontSize={32}
              fontWeight={800}
            >
              {card.word}
            </text>
          </ArtButton>
        ))}
      </PuzzleArt>
      <p className={styles.note}>
        Chọn theo màu mực của chữ, không theo tên màu được viết.
      </p>
    </div>
  );
}
