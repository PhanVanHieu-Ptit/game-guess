'use client';

import { useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import art from '@/engine/stage2d/puzzle.module.css';
import styles from './scene.module.css';

const words = ['HỌC', 'SINH', 'HỌC', 'SINH', 'HỌC'];

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [cuts, setCuts] = useState<boolean[]>([false, false, false, false]);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const groups = words.reduce<string[]>((result, text, index) => {
    if (!index || cuts[index - 1]) result.push(text);
    else result[result.length - 1] += ` ${text}`;
    return result;
  }, []);
  return (
    <div className={art.scene}>
      <PuzzleArt
        label="Lớp học với bảng xanh và bạn học sinh"
        reaction={reaction}
        height={160}
      >
        <rect x={25} y={16} width={236} height={126} rx={14} fill="#65b6a0" />
        <path
          d="M49 47h181M49 72h144M49 97h172"
          stroke="#d4f4d5"
          strokeWidth={6}
        />
        <path d="M46 135h180" stroke="#e5bb77" strokeWidth={10} />
        <Kid x={308} y={58} shirt="#f3a3bd" />
        <ArtButton
          label="Bảng xanh"
          x={25}
          y={16}
          width={236}
          height={126}
          onPress={() => wrong('board')}
        >
          <path d="M224 116h15" stroke="#fff" strokeWidth={5} />
        </ArtButton>
      </PuzzleArt>
      <div
        className={styles.sentence}
        aria-label="Câu cần tách, đọc từ trên xuống"
      >
        {words.map((text, index) => (
          <div className={styles.row} key={index}>
            <span className={styles.word}>{text}</span>
            {index < 4 && (
              <button
                type="button"
                data-touch-target
                aria-label={`Khe thứ ${index + 1}`}
                aria-pressed={cuts[index]}
                className={styles.gap}
                onClick={() => {
                  setCuts((previous) =>
                    previous.map((cut, i) => (i === index ? !cut : cut)),
                  );
                  onProgress();
                }}
              >
                {cuts[index] ? '┃' : '┊'}
                <span>Khe {index + 1}</span>
              </button>
            )}
          </div>
        ))}
      </div>
      <p className={art.note} role="status">
        {groups.map((group) => `[${group}]`).join(' ')}
      </p>
      <button
        type="button"
        data-touch-target
        className={styles.done}
        onClick={() =>
          cuts.every((cut, index) => cut === (index === 1 || index === 2))
            ? onSolved()
            : wrong('split')
        }
      >
        Xong
      </button>
      <p className={art.note}>Chạm khe để đặt hoặc bỏ vạch tách từ.</p>
    </div>
  );
}
