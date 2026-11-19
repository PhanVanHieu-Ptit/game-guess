'use client';

import { useRef } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const shoulder = useDrag({
    svgRef,
    initialPosition: { x: 180, y: 166 },
    target: { x: 132.8, y: 105, width: 14.4, height: 110 },
    onDrop: onSolved,
    onMiss: () => wrong('miss'),
    onProgress,
  });
  const angle = Math.max(-18, Math.min(18, (140 - shoulder.position.x) * 0.35));
  return (
    <div className={styles.scene}>
      <PuzzleArt
        svgRef={svgRef}
        label="Bà gánh thúng 6 ký bên trái và 3 ký bên phải"
        height={340}
        reaction={reaction}
      >
        <path d="M0 280h360v60H0z" fill="#e3f4d5" stroke="none" />
        <path d="M18 66h68M278 46h59" stroke="#fff" strokeWidth={12} />
        <g
          data-testid="carrying-pole"
          transform={`rotate(${angle} ${shoulder.position.x} 150)`}
        >
          <path d="M60 150h240" stroke="#c48a3b" strokeWidth={10} />
          {[
            { x: 60, weight: 6, color: '#f3a3bd' },
            { x: 300, weight: 3, color: '#59b9d5' },
          ].map(({ x, weight, color }) => (
            <ArtButton
              key={x}
              label={`Thúng ${weight} ký`}
              x={x - 34}
              y={152}
              width={68}
              height={108}
              onPress={() => wrong('basket')}
            >
              <path d={`M${x - 27} 222l27-68 27 68`} fill="none" />
              <path d={`M${x - 30} 220h60l-8 36h-44z`} fill={color} />
              <text
                x={x}
                y={245}
                textAnchor="middle"
                fill="#231f3f"
                stroke="none"
                fontSize={19}
                fontWeight={800}
              >
                {weight} ký
              </text>
            </ArtButton>
          ))}
        </g>
        <g
          {...shoulder.dragProps}
          aria-label="Vai bà"
          data-touch-target
          transform={`translate(${shoulder.position.x} 166)`}
        >
          <g transform="translate(0 -40) scale(1.5)">
            <Kid x={0} y={0} shirt="#b7a0dc" />
          </g>
          <path d="M-28-39q28-34 56 0z" fill="#ffd66e" />
          <circle r={10} fill={shoulder.selected ? '#ffd66e' : '#efb08a'} />
          <rect
            x={-32}
            y={-24}
            width={64}
            height={130}
            fill="transparent"
            stroke="none"
          />
        </g>
      </PuzzleArt>
      <p className={styles.note} role="status">
        {shoulder.selected
          ? 'Đã chọn vai bà. Chạm vị trí muốn đặt, tính từ thúng 6 ký.'
          : 'Kéo vai bà dọc đòn gánh, hoặc chạm vai rồi chọn vị trí.'}
      </p>
      <div
        className={controls.controls}
        role="group"
        aria-label="Vị trí tính từ đầu thúng 6 ký"
      >
        {[
          ['1/6', false],
          ['1/3', true],
          ['1/2', false],
          ['2/3', false],
          ['5/6', false],
        ].map(([label, correct]) => (
          <button
            key={String(label)}
            type="button"
            data-touch-target
            className={controls.button}
            onClick={() => {
              if (!shoulder.selected) wrong('select');
              else if (correct) shoulder.targetProps.onClick();
              else wrong('miss');
            }}
          >
            Đặt vai ở {label} đòn gánh
          </button>
        ))}
      </div>
    </div>
  );
}
