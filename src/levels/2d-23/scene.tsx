'use client';

import { useRef, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

type Stone = 'large' | 'small';
const OPTIONS = [
  { id: 'left', label: 'Cốc trái' },
  { id: 'right', label: 'Cốc phải' },
  { id: 'equal', label: 'Bằng nhau' },
  { id: 'unknown', label: 'Không thể biết' },
] as const;

function Rock({ large }: { large: boolean }) {
  return (
    <g aria-hidden="true">
      <rect
        x={large ? -30 : -15}
        y={large ? -35 : -15}
        width={large ? 60 : 30}
        height={large ? 70 : 30}
        rx={8}
        fill="#b8bbce"
      />
      <path
        d={large ? 'M-20-21l11-6m12 44l16 10' : 'M-8-6l7-3'}
        stroke="#817a99"
        fill="none"
      />
      <rect
        x={-35}
        y={large ? -40 : -32}
        width={70}
        height={large ? 80 : 64}
        rx={10}
        fill="transparent"
        stroke="none"
      />
    </g>
  );
}

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const [active, setActive] = useState<Stone | null>(null);
  const target = { x: 20, y: 337, width: 320, height: 89 };
  const large = useDrag({
    svgRef,
    initialPosition: { x: 95, y: 262 },
    target,
    onDrop: () => {
      setActive(null);
      onProgress();
    },
    onMiss: () => {
      setActive(null);
      wrong('miss');
    },
    onProgress: () => {
      setActive('large');
      onProgress();
    },
  });
  const small = useDrag({
    svgRef,
    initialPosition: { x: 265, y: 276 },
    target,
    onDrop: () => {
      setActive(null);
      onProgress();
    },
    onMiss: () => {
      setActive(null);
      wrong('miss');
    },
    onProgress: () => {
      setActive('small');
      onProgress();
    },
  });
  const drags = { large, small };
  const selected = active && drags[active].selected ? active : null;
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        svgRef={svgRef}
        label="Hai cốc giống nhau có cùng mực nước, đá lớn bên trái và đá nhỏ bên phải"
        height={448}
        reaction={reaction}
      >
        <path d="M0 0h360v448H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 306h360v142H0z" fill="#ffe1b2" stroke="none" />
        <text
          x={180}
          y={37}
          textAnchor="middle"
          fontSize={18}
          fontWeight={800}
          fill="#231f3f"
          stroke="none"
        >
          Hai cốc có cùng kích thước
        </text>
        <path d="M27 68h306" stroke="#fff8df" strokeWidth={8} />
        {[
          { x: 95, id: 'left', label: 'TRÁI', water: large.placed ? 212 : 170 },
          {
            x: 265,
            id: 'right',
            label: 'PHẢI',
            water: small.placed ? 179 : 170,
          },
        ].map(({ x, id, label, water }) => (
          <ArtButton
            key={id}
            label={`Thành cốc ${id === 'left' ? 'trái' : 'phải'}`}
            x={x - 54}
            y={128}
            width={108}
            height={176}
            onPress={() => wrong('glass')}
          >
            <defs>
              <clipPath id={`glass-${id}`}>
                <rect x={x - 50} y={133} width={100} height={167} rx={10} />
              </clipPath>
            </defs>
            <text
              x={x}
              y={109}
              textAnchor="middle"
              fontSize={18}
              fontWeight={800}
              fill="#231f3f"
              stroke="none"
            >
              {label}
            </text>
            <rect
              x={x - 50}
              y={133}
              width={100}
              height={167}
              rx={10}
              fill="#fff8df"
              stroke="none"
            />
            {/* Cốc có tiết diện đều: lấy đá lớn 60×70 ra hạ 42 đơn vị, đá nhỏ 30×30 hạ 9. */}
            <rect
              data-testid={`water-${id}`}
              x={x - 50}
              y={water}
              width={100}
              height={300 - water}
              fill="#59b9d5"
              stroke="none"
              clipPath={`url(#glass-${id})`}
            />
            <path
              d={`M${x - 50} ${water}h100`}
              stroke="#2786a5"
              strokeWidth={3}
            />
            <path
              d={`M${x - 54} 128v161q0 15 15 15h78q15 0 15-15V128`}
              fill="none"
            />
            <path d={`M${x - 42} 143v19`} stroke="#fff" strokeWidth={5} />
          </ArtButton>
        ))}
        <ArtButton
          label="Khay đựng đá"
          x={20}
          y={337}
          width={320}
          height={89}
          onPress={() =>
            selected ? drags[selected].targetProps.onClick() : wrong('tray')
          }
        >
          <rect x={20} y={337} width={320} height={89} rx={16} fill="#fff1d0" />
          <path d="M28 419h304" stroke="#c48a3b" />
          <text
            x={180}
            y={411}
            textAnchor="middle"
            fontSize={17}
            fill="#231f3f"
            stroke="none"
          >
            KHAY ĐÁ
          </text>
        </ArtButton>
        {(['large', 'small'] as const).map((stone) => {
          const drag = drags[stone];
          const x = drag.placed
            ? stone === 'large'
              ? 95
              : 265
            : drag.position.x;
          const y = drag.placed ? 378 : drag.position.y;
          return drag.placed ? (
            <g
              key={stone}
              role="img"
              aria-label={
                stone === 'large' ? 'Đá lớn đã ở khay' : 'Đá nhỏ đã ở khay'
              }
              transform={`translate(${x} ${y})`}
              pointerEvents="none"
            >
              <Rock large={stone === 'large'} />
            </g>
          ) : (
            <g
              key={stone}
              {...drag.dragProps}
              aria-label={
                stone === 'large' ? 'Đá lớn ở cốc trái' : 'Đá nhỏ ở cốc phải'
              }
              aria-pressed={selected === stone}
              data-touch-target
              transform={`translate(${x} ${y})`}
            >
              <Rock large={stone === 'large'} />
              {selected === stone && (
                <rect
                  x={-35}
                  y={stone === 'large' ? -40 : -32}
                  width={70}
                  height={stone === 'large' ? 80 : 64}
                  rx={10}
                  fill="none"
                  stroke="#126b5e"
                />
              )}
            </g>
          );
        })}
      </PuzzleArt>
      <p className={styles.note}>
        Ban đầu, đá chìm hoàn toàn và không hút nước.
      </p>
      <p className={styles.note} role="status">
        {large.placed && small.placed
          ? 'Đã lấy cả hai viên đá ra. Giờ so sánh lượng nước nhé.'
          : selected
            ? 'Đã chọn đá. Chạm khay để lấy đá ra.'
            : 'Có thể kéo đá ra khay, hoặc chạm chọn đá rồi chạm khay.'}
      </p>
      <div
        className={controls.controls}
        role="group"
        aria-label="Cốc nào chứa nhiều nước hơn?"
      >
        {OPTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            data-touch-target
            className={controls.button}
            onClick={() => (id === 'right' ? onSolved() : wrong(id))}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
