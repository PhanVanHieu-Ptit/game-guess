'use client';

import { useRef, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

type Fruit = 'orange' | 'pomelo' | 'mixed';
const LABELS: readonly Fruit[] = ['orange', 'pomelo', 'mixed'];
const NAMES = { orange: 'CAM', pomelo: 'BƯỞI', mixed: 'CAM + BƯỞI' };
const CENTERS = [64, 180, 296] as const;

function Label({ fruit, x, y }: { fruit: Fruit; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`} aria-hidden="true">
      <rect
        x={-46}
        y={-32}
        width={92}
        height={64}
        rx={12}
        fill={
          fruit === 'orange'
            ? '#ffd66e'
            : fruit === 'pomelo'
              ? '#e3f4d5'
              : '#f3a3bd'
        }
      />
      <text
        textAnchor="middle"
        fill="#231f3f"
        stroke="none"
        fontSize={17}
        fontWeight={800}
      >
        {fruit === 'mixed' ? (
          <>
            <tspan x={0} y={-4}>
              CAM +
            </tspan>
            <tspan x={0} y={19}>
              BƯỞI
            </tspan>
          </>
        ) : (
          <tspan x={0} y={6}>
            {NAMES[fruit]}
          </tspan>
        )}
      </text>
    </g>
  );
}

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  // Hai hoán vị không nhãn nào đúng; giữ nguyên trong lượt, chọn lại khi Chơi lại.
  const [sample] = useState(() => (Math.random() < 0.5 ? 'orange' : 'pomelo'));
  const contents: readonly Fruit[] =
    sample === 'orange'
      ? ['pomelo', 'mixed', 'orange']
      : ['mixed', 'orange', 'pomelo'];
  const [drawn, setDrawn] = useState(false);
  const [active, setActive] = useState<Fruit | null>(null);
  const [placedCount, setPlacedCount] = useState(0);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const target = (fruit: Fruit) => ({
    x: CENTERS[contents.indexOf(fruit)] - 48,
    y: 171,
    width: 96,
    height: 142,
  });
  const placed = () => {
    setActive(null);
    setPlacedCount(placedCount + 1);
    onProgress();
    if (placedCount === 2) onSolved();
  };
  const missed = () => {
    setActive(null);
    wrong('label');
  };
  const orange = useDrag({
    svgRef,
    initialPosition: { x: 64, y: 377 },
    target: target('orange'),
    onDrop: placed,
    onMiss: missed,
    onProgress: () => {
      setActive('orange');
      onProgress();
    },
  });
  const pomelo = useDrag({
    svgRef,
    initialPosition: { x: 180, y: 377 },
    target: target('pomelo'),
    onDrop: placed,
    onMiss: missed,
    onProgress: () => {
      setActive('pomelo');
      onProgress();
    },
  });
  const mixed = useDrag({
    svgRef,
    initialPosition: { x: 296, y: 377 },
    target: target('mixed'),
    onDrop: placed,
    onMiss: missed,
    onProgress: () => {
      setActive('mixed');
      onProgress();
    },
  });
  const drags = { orange, pomelo, mixed };
  const selected = active && drags[active].selected ? active : null;
  const tapBag = (index: number) => {
    if (!drawn) {
      if (index !== 2) {
        wrong('draw');
        return;
      }
      setDrawn(true);
      onProgress();
    } else if (selected) {
      if (contents[index] === selected) drags[selected].targetProps.onClick();
      else wrong('label');
    } else wrong('extra');
  };

  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        svgRef={svgRef}
        label="Ba túi trái cây kín với ba nhãn đều sai"
        height={434}
        reaction={reaction}
      >
        <path d="M0 0h360v434H0z" fill="#e3f4d5" stroke="none" />
        <path d="M0 305h360v129H0z" fill="#ffe1b2" stroke="none" />
        <Kid x={52} y={22} shirt="#b7a0dc" />
        <path d="M27 28q25-32 50 0z" fill="#ffd66e" />
        <text
          x={220}
          y={45}
          textAnchor="middle"
          fontSize={19}
          fontWeight={800}
          fill="#231f3f"
          stroke="none"
        >
          Nhãn nào cũng SAI!
        </text>
        {drawn ? (
          <g
            role="img"
            aria-label={`Quả đã lấy: ${sample === 'orange' ? 'cam' : 'bưởi'}`}
            transform="translate(0 -10)"
          >
            <ellipse cx={180} cy={134} rx={48} ry={9} fill="#fff8df" />
            <circle
              cx={180}
              cy={108}
              r={sample === 'orange' ? 23 : 29}
              fill={sample === 'orange' ? '#ffac4b' : '#a8ce70'}
            />
            <path d="M180 83q5-16 19-13-2 16-19 13" fill="#69b88d" />
            <path
              d="M172 104v1m16-1v1m-12 9q4 4 8 0"
              fill="none"
              strokeWidth={2.5}
            />
          </g>
        ) : (
          <text
            x={220}
            y={108}
            textAnchor="middle"
            fontSize={17}
            fill="#231f3f"
            stroke="none"
          >
            Chỉ lấy một quả
          </text>
        )}
        {LABELS.map((label, index) => (
          <ArtButton
            key={label}
            label={`Túi nhãn ${NAMES[label]} ban đầu`}
            x={CENTERS[index] - 48}
            y={164}
            width={96}
            height={150}
            onPress={() => tapBag(index)}
          >
            <path
              d={`M${CENTERS[index] - 23} 187l-9-19h64l-9 19q39 105-23 112-62-7-23-112z`}
              fill="#fff1d0"
            />
            <path
              d={`M${CENTERS[index] - 26} 188h52`}
              stroke="#c48a3b"
              strokeWidth={6}
            />
            <Label fruit={label} x={CENTERS[index]} y={253} />
            {drawn && (
              <text
                x={CENTERS[index]}
                y={153}
                textAnchor="middle"
                fontSize={16}
                fill="#231f3f"
                stroke="none"
              >
                {label === 'mixed' ? (
                  <>
                    <tspan x={CENTERS[index]} dy={-9}>
                      Cũ: CAM +
                    </tspan>
                    <tspan x={CENTERS[index]} dy={19}>
                      BƯỞI
                    </tspan>
                  </>
                ) : (
                  `Cũ: ${NAMES[label]}`
                )}
              </text>
            )}
          </ArtButton>
        ))}
        <text
          x={180}
          y={334}
          textAnchor="middle"
          fontSize={16}
          fill="#231f3f"
          stroke="none"
        >
          Nhãn mới
        </text>
        {LABELS.map((fruit, index) => {
          const drag = drags[fruit];
          if (!drawn)
            return (
              <ArtButton
                key={fruit}
                label={`Nhãn ${NAMES[fruit]}`}
                x={CENTERS[index] - 46}
                y={345}
                width={92}
                height={64}
                onPress={() => wrong('first')}
              >
                <Label fruit={fruit} x={CENTERS[index]} y={377} />
              </ArtButton>
            );
          if (drag.placed)
            return (
              <g
                key={fruit}
                role="img"
                aria-label={`Đã dán ${NAMES[fruit]}`}
                pointerEvents="none"
              >
                <Label
                  fruit={fruit}
                  x={CENTERS[contents.indexOf(fruit)]}
                  y={253}
                />
                <path
                  d={`M${CENTERS[contents.indexOf(fruit)] - 9} 304l6 6 12-14`}
                  stroke="#126b5e"
                  fill="none"
                />
              </g>
            );
          return (
            <g
              key={fruit}
              {...drag.dragProps}
              aria-label={`Nhãn ${NAMES[fruit]}`}
              aria-pressed={selected === fruit}
              data-touch-target
            >
              <Label fruit={fruit} x={drag.position.x} y={drag.position.y} />
              {selected === fruit && (
                <rect
                  x={drag.position.x - 49}
                  y={drag.position.y - 35}
                  width={98}
                  height={70}
                  rx={14}
                  fill="none"
                  stroke="#126b5e"
                />
              )}
            </g>
          );
        })}
      </PuzzleArt>
      <p className={styles.note} role="status">
        {drawn
          ? `Đã lấy đúng 1 quả: ${sample === 'orange' ? 'cam' : 'bưởi'}. Đã dán ${placedCount}/3 nhãn.`
          : 'Chạm một túi để lấy một quả làm manh mối.'}
      </p>
      <p className={styles.note}>
        Kéo nhãn mới, hoặc chạm chọn nhãn rồi chạm túi.
      </p>
    </div>
  );
}
