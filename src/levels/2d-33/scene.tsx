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

type Place = 'tray' | 'left' | 'right';
type Result = 'left' | 'right' | 'equal';
const BALLS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const names = { tray: 'Khay', left: 'Trái', right: 'Phải' };
const outcomes = {
  left: 'Đĩa trái nhẹ hơn.',
  right: 'Đĩa phải nhẹ hơn.',
  equal: 'Hai đĩa bằng nhau.',
};
interface Weighing {
  left: number[];
  right: number[];
  result: Result;
}

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [light] = useState(() => Math.floor(Math.random() * 9) + 1);
  const [places, setPlaces] = useState<Place[]>(BALLS.map(() => 'tray'));
  const [selected, setSelected] = useState<number | null>(null);
  const [answering, setAnswering] = useState(false);
  const [history, setHistory] = useState<Weighing[]>([]);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const group = (place: Place) =>
    BALLS.filter((ball) => places[ball - 1] === place);
  const last = history.at(-1)?.result;
  const move = (place: Place) => {
    if (selected === null || answering) {
      wrong('choose');
      return;
    }
    setPlaces((current) =>
      current.map((value, index) => (index === selected - 1 ? place : value)),
    );
    setSelected(null);
    onProgress();
  };
  const weigh = () => {
    if (history.length >= 2) {
      wrong('limit');
      return;
    }
    const left = group('left');
    const right = group('right');
    if (!left.length || !right.length) {
      wrong('empty');
      return;
    }
    const weight = (balls: number[]) =>
      balls.reduce((sum, ball) => sum + (ball === light ? 9 : 10), 0);
    const difference = weight(left) - weight(right);
    const result = difference < 0 ? 'left' : difference > 0 ? 'right' : 'equal';
    setHistory((current) => [...current, { left, right, result }]);
    setSelected(null);
    onProgress();
  };
  const clear = () => {
    setPlaces(BALLS.map(() => 'tray'));
    setSelected(null);
    onProgress();
  };
  return (
    <div
      className={`${styles.scene} ${touch.scrollable}`}
      data-testid="balance-state"
      data-count={history.length}
    >
      <PuzzleArt
        label="Cân hai đĩa và bảng chọn chín viên bi đánh số 1 đến 9"
        height={410}
        reaction={reaction}
      >
        <path d="M0 0h360v410H0z" fill="#dff4f3" stroke="none" />
        <path d="M180 51v103m-37 5h74" stroke="#126b5e" strokeWidth={9} />
        <g
          transform={`rotate(${last === 'left' ? 5 : last === 'right' ? -5 : 0} 180 51)`}
          aria-hidden="true"
        >
          <path
            d="M67 51h226M67 51l-43 70m43-70 43 70m183-70-43 70m43-70 43 70"
            fill="none"
          />
          <path d="M17 122q50 36 100 0zm226 0q50 36 100 0z" fill="#ffd66e" />
        </g>
        {(['left', 'right'] as const).map((place) => (
          <ArtButton
            key={place}
            label={`Đặt bi lên đĩa ${place === 'left' ? 'trái' : 'phải'}`}
            x={place === 'left' ? 10 : 210}
            y={19}
            width={140}
            height={132}
            onPress={() => move(place)}
          >
            <text
              x={place === 'left' ? 79 : 280}
              y={29}
              textAnchor="middle"
              fontSize={19}
              fill="#231f3f"
              stroke="none"
            >
              Đĩa {place === 'left' ? 'trái' : 'phải'}
            </text>
            <text
              x={place === 'left' ? 79 : 280}
              y={87}
              textAnchor="middle"
              fontSize={18}
              fontWeight={800}
              fill="#231f3f"
              stroke="none"
            >
              <tspan x={place === 'left' ? 79 : 280}>
                {group(place).slice(0, 5).join(' ') || '—'}
              </tspan>
              <tspan x={place === 'left' ? 79 : 280} dy={23}>
                {group(place).slice(5).join(' ')}
              </tspan>
            </text>
          </ArtButton>
        ))}
        <rect x={20} y={171} width={320} height={226} rx={20} fill="#fff1d0" />
        {BALLS.map((ball, index) => {
          const x = 80 + (index % 3) * 100;
          const y = 210 + Math.floor(index / 3) * 74;
          return (
            <ArtButton
              key={ball}
              label={`Bi ${ball}, ${names[places[index]].toLowerCase()}`}
              x={x - 33}
              y={y - 30}
              width={66}
              height={72}
              onPress={() => {
                if (answering) {
                  if (ball === light) onSolved();
                  else wrong('answer');
                } else {
                  setSelected(ball);
                  onProgress();
                }
              }}
            >
              {selected === ball && (
                <rect
                  x={x - 33}
                  y={y - 30}
                  width={66}
                  height={72}
                  rx={12}
                  fill="#ffd66e"
                  stroke="#126b5e"
                />
              )}
              <circle
                cx={x}
                cy={y - 3}
                r={24}
                fill={places[index] === 'tray' ? '#59b9d5' : '#b8dedd'}
              />
              <path
                d={`M${x - 14} ${y - 14}l5-5`}
                stroke="#fffdf3"
                strokeWidth={4}
              />
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fontSize={24}
                fontWeight={800}
                fill="#231f3f"
                stroke="none"
              >
                {ball}
              </text>
              <text
                x={x}
                y={y + 37}
                textAnchor="middle"
                fontSize={17}
                fill="#231f3f"
                stroke="none"
              >
                {names[places[index]]}
              </text>
            </ArtButton>
          );
        })}
      </PuzzleArt>
      <p className={styles.note} role="status">
        {answering
          ? 'Chạm số viên bi bạn cho là nhẹ hơn.'
          : selected === null
            ? 'Chạm bi, rồi chạm đĩa trái hoặc phải. Số trên đĩa cho biết bi đang cân.'
            : `Đã chọn bi ${selected}. Chạm đĩa hoặc Trả về khay.`}
      </p>
      <p className={styles.note} role="status" aria-label="Kết quả cân">
        {last ? outcomes[last] : 'Chưa cân lần nào.'} Đã cân {history.length}/2
        lần.
      </p>
      <div className={controls.controls}>
        {!answering && (
          <>
            <button
              type="button"
              className={controls.button}
              data-touch-target
              onClick={() => move('tray')}
            >
              Trả về khay
            </button>
            <button
              type="button"
              className={controls.button}
              data-touch-target
              onClick={weigh}
            >
              Cân
            </button>
            <button
              type="button"
              className={controls.button}
              data-touch-target
              onClick={clear}
            >
              Dọn hai đĩa
            </button>
          </>
        )}
        <button
          type="button"
          className={controls.button}
          data-touch-target
          onClick={() => {
            setAnswering((value) => !value);
            setSelected(null);
            onProgress();
          }}
        >
          {answering ? 'Tiếp tục cân' : 'Chọn viên nhẹ'}
        </button>
        <button
          type="button"
          className={controls.button}
          data-touch-target
          onClick={() => {
            clear();
            setHistory([]);
            setAnswering(false);
          }}
        >
          Thử lại
        </button>
      </div>
      <div aria-label="Lịch sử cân" data-testid="weigh-history">
        <p className={styles.note}>
          Bi nhẹ giữ nguyên khi Thử lại. Lịch sử cân:
        </p>
        <ol>
          {history.map((entry, i) => (
            <li key={i} data-result={entry.result}>
              Lần {i + 1}: trái [{entry.left.join(', ')}], phải [
              {entry.right.join(', ')}]. {outcomes[entry.result]}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
