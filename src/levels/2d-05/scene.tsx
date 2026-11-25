'use client';

import { useEffect, useRef, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import { TetDialogue } from '@/engine/stage2d/tet-dialogue';
import tet from '@/engine/stage2d/tet.module.css';
import styles from '@/engine/stage2d/puzzle.module.css';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [crowed, setCrowed] = useState(false);
  const [lastWrong, setLastWrong] = useState('');
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const reject = (code: string) => {
    if (crowed) return;
    setLastWrong(code);
    wrong(code);
  };
  const cloud = useDrag({
    svgRef,
    initialPosition: { x: 258, y: 77 },
    target: { x: 12, y: 15, width: 132, height: 110 },
    onDrop: onProgress,
    onMiss: () => reject('miss'),
    onProgress,
  });
  useEffect(() => {
    if (!crowed) return;
    const timer = setTimeout(onSolved, 550);
    return () => clearTimeout(timer);
  }, [crowed, onSolved]);

  return (
    <div className={styles.scene}>
      <PuzzleArt
        svgRef={svgRef}
        label="Gà trống ngái ngủ trên mái; tia nắng ló sau mây"
        height={320}
        reaction={reaction}
      >
        <path
          d="M0 0h360v320H0z"
          fill={cloud.placed ? '#dff4f3' : '#b8c7dd'}
          stroke="none"
        />
        <g
          {...cloud.targetProps}
          aria-label="Khoảng trời bên trái"
          data-touch-target
        >
          <rect
            x={12}
            y={15}
            width={132}
            height={110}
            rx={28}
            fill="transparent"
            stroke={cloud.selected ? '#fffdf3' : 'none'}
            strokeDasharray="6 7"
          />
        </g>
        <g className={tet.sun}>
          <circle cx={258} cy={65} r={30} fill="#ffcf63" />
          <path
            d="M258 18V8m0 101v12m-47-56h-13m107 0h13m-94-33-9-9m77 9 9-9m-77 75-9 9m77-9 9 9"
            stroke="#e3a42c"
            strokeWidth={5}
          />
        </g>
        <ArtButton
          label="Mái nhà"
          x={37}
          y={206}
          width={286}
          height={90}
          onPress={() => reject('roof')}
        >
          <path d="M70 320v-72l110-58 110 58v72" fill="#fff1d0" />
          <path d="M35 254l145-83 145 83-17 22-128-68-128 68z" fill="#ef6b68" />
          <path
            d="M86 236l16 20m26-45 16 21m72-21-16 21m72 4-16 20"
            stroke="#bd5057"
          />
          <rect x={160} y={277} width={40} height={43} rx={4} fill="#b8793a" />
        </ArtButton>
        <ArtButton
          label="Gà trống"
          x={118}
          y={112}
          width={108}
          height={100}
          onPress={() => {
            if (crowed) return;
            if (!cloud.placed) {
              reject('sleep');
              return;
            }
            setCrowed(true);
            onProgress();
          }}
        >
          <g
            key={reaction}
            className={lastWrong === 'sleep' || crowed ? tet.react : undefined}
          >
            <path
              d="M167 193v14m22-14 6 14m-38 0h17m14 0h17"
              fill="none"
              stroke="#c77a30"
            />
            <path
              d="M154 153q-36-48-49-20 6 21 40 33-49-16-48 6 11 17 51 6"
              fill="#59b9d5"
            />
            <path
              d="M146 153q18-26 43-9l17 14q4 31-30 31-29 0-30-36z"
              fill="#fff8df"
            />
            <path d="M157 159q26-10 23 16-18 8-23-16" fill="#ffcf63" />
            <path
              d="M194 125q-13-17-18-7-14-13-17-1-14-2-10 11l26 15"
              fill="#ef6b68"
            />
            <circle cx={187} cy={137} r={19} fill="#ef6b68" />
            <path
              d={
                crowed
                  ? 'M206 124l21 4-20 9m0 2 18 10-19 1'
                  : 'M206 132l18 8-18 7'
              }
              fill="#ffcf63"
            />
            {cloud.placed ? (
              <circle cx={192} cy={132} r={3} fill="#231f3f" stroke="none" />
            ) : (
              <path d="M186 133q6 6 12 0" fill="none" />
            )}
          </g>
        </ArtButton>
        {!cloud.placed && (
          <text
            x={112}
            y={119}
            fontSize={26}
            fontWeight={800}
            stroke="none"
            fill="#53415b"
            className={tet.float}
          >
            z Z
          </text>
        )}
        {crowed && (
          <g
            className={tet.reveal}
            fill="none"
            stroke="#c77a30"
            strokeWidth={4}
          >
            <path d="M230 130l27-12m-26 24h32m-32 13 26 13" />
          </g>
        )}
        <g
          {...cloud.dragProps}
          aria-label="Đám mây"
          data-touch-target
          transform={`translate(${cloud.position.x} ${cloud.position.y})`}
        >
          <path
            d="M-65 15q-16-27 11-38 0-27 27-23 16-23 36-3 30-12 38 13 32-2 30 25 21 25-11 34h-106z"
            fill="#fffdf3"
            stroke={cloud.selected ? '#126b5e' : '#53415b'}
            className={tet.cloud}
          />
          <rect
            x={-72}
            y={-50}
            width={144}
            height={85}
            fill="transparent"
            stroke="none"
          />
        </g>
      </PuzzleArt>
      <TetDialogue
        speaker={
          lastWrong === 'roof' && !cloud.placed ? 'Mái nhà:' : 'Gà trống:'
        }
      >
        {crowed
          ? 'Ò ó o! Cả nhà ơi, ra sân ăn Tết!'
          : cloud.placed
            ? 'Nắng lên rồi! Chạm mình một cái, mình gọi cả nhà nhé.'
            : cloud.selected
              ? 'Mây đi đâu thì đi, chừa cho tui chút nắng nha.'
              : lastWrong === 'sleep'
                ? 'Tối thế này… cho tui ngủ thêm năm phút.'
                : lastWrong === 'roof'
                  ? 'Tui chỉ biết che mưa, chưa biết gáy đâu!'
                  : 'Nghe bảo sáng rồi, mà sao chỗ tui vẫn tối thui?'}
      </TetDialogue>
      {cloud.selected && (
        <p className={tet.hint}>
          Có thể kéo, hoặc chạm khoảng trời bên trái để dời mây.
        </p>
      )}
    </div>
  );
}
