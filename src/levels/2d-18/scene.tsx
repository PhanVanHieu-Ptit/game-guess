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

function Buffalo({
  x,
  y,
  small = false,
}: {
  x: number;
  y: number;
  small?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${small ? 0.38 : 1})`}>
      <path d="M-22 13v15m27-15v15m-27-33q-17 0-13 17" fill="none" />
      <ellipse rx={27} ry={17} fill="#a5a7bc" />
      <path
        d="M13-13q-5-18-16-18 0 18 15 20m17-2q7-18 19-18-2 18-18 20"
        fill="#fff1d0"
      />
      <ellipse cx={23} cy={-3} rx={16} ry={19} fill="#b8bbce" />
      <path d="M19-5v1m10-1v1" strokeWidth={3} />
      <ellipse cx={25} cy={7} rx={10} ry={5} fill="#efb08a" />
    </g>
  );
}

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const borrow = useDrag({
    svgRef,
    initialPosition: { x: 280, y: 76 },
    target: { x: 20, y: 142, width: 320, height: 174 },
    onDrop: onProgress,
    onMiss: () => wrong('miss'),
    onProgress,
  });
  const giveBack = useDrag({
    svgRef,
    initialPosition: { x: 280, y: 366 },
    target: { x: 230, y: 18, width: 112, height: 104 },
    onDrop: onSolved,
    onMiss: () => wrong('miss'),
    onProgress,
  });
  return (
    <div className={styles.scene}>
      <PuzzleArt
        svgRef={svgRef}
        label="Ba anh em, đàn 17 con trâu và một con trâu bên hàng xóm"
        height={420}
        reaction={reaction}
      >
        <path d="M0 0h360v420H0z" fill="#e3f4d5" stroke="none" />
        <g
          {...giveBack.targetProps}
          aria-disabled={false}
          aria-label="Trả về hàng xóm"
          data-touch-target
          onClick={() =>
            borrow.placed && giveBack.selected
              ? giveBack.targetProps.onClick()
              : wrong('fence')
          }
        >
          <rect
            x={230}
            y={18}
            width={112}
            height={104}
            rx={16}
            fill="#fff1d0"
          />
          <text
            x={286}
            y={42}
            textAnchor="middle"
            fontSize={16}
            fill="#231f3f"
            stroke="none"
          >
            Hàng xóm
          </text>
        </g>
        <ArtButton
          label="Hàng rào"
          x={18}
          y={38}
          width={180}
          height={84}
          onPress={() => wrong('fence')}
        >
          <path
            d="M28 111V54m35 57V54m35 57V54m35 57V54m35 57V54M24 73h149m-149 23h149"
            stroke="#c48a3b"
            strokeWidth={7}
          />
        </ArtButton>
        <g
          {...borrow.targetProps}
          aria-disabled={false}
          aria-label="Đàn trâu của ba anh em"
          data-touch-target
          onClick={() =>
            borrow.selected && !borrow.placed
              ? borrow.targetProps.onClick()
              : wrong('divide')
          }
        >
          <rect
            x={20}
            y={142}
            width={320}
            height={174}
            rx={18}
            fill="#fff8df"
          />
          {[
            { x: 72, fraction: '1/2', count: 9 },
            { x: 180, fraction: '1/3', count: 6 },
            { x: 288, fraction: '1/9', count: 2 },
          ].map(({ x, fraction, count }) => (
            <g key={fraction}>
              <Kid
                x={x}
                y={158}
                small
                shirt={x === 72 ? '#f3a3bd' : '#59b9d5'}
              />
              <text
                x={x}
                y={233}
                textAnchor="middle"
                fill="#231f3f"
                stroke="none"
                fontSize={18}
              >
                {fraction}
              </text>
              {borrow.placed &&
                Array.from({ length: count }, (_, i) => (
                  <Buffalo
                    key={i}
                    x={x - 30 + (i % 3) * 28}
                    y={252 + Math.floor(i / 3) * 21}
                    small
                  />
                ))}
            </g>
          ))}
          {!borrow.placed &&
            Array.from({ length: 17 }, (_, i) => (
              <Buffalo
                key={i}
                x={43 + (i % 9) * 33}
                y={262 + Math.floor(i / 9) * 30}
                small
              />
            ))}
        </g>
        {!borrow.placed && (
          <g
            {...borrow.dragProps}
            aria-label="Trâu hàng xóm"
            data-touch-target
            transform={`translate(${borrow.position.x} ${borrow.position.y})`}
          >
            <Buffalo x={0} y={0} />
            <rect
              x={-41}
              y={-31}
              width={82}
              height={66}
              rx={12}
              fill="transparent"
              stroke={borrow.selected ? '#126b5e' : 'none'}
            />
          </g>
        )}
        {borrow.placed && (
          <g
            {...giveBack.dragProps}
            aria-label="Trâu còn dư"
            data-touch-target
            transform={`translate(${giveBack.position.x} ${giveBack.position.y})`}
          >
            <Buffalo x={0} y={0} />
            <rect
              x={-41}
              y={-31}
              width={82}
              height={66}
              rx={12}
              fill="transparent"
              stroke={giveBack.selected ? '#126b5e' : 'none'}
            />
          </g>
        )}
      </PuzzleArt>
      <p className={styles.note} role="status">
        {borrow.placed
          ? 'Mượn thành 18: chia 9, 6, 2. Còn dư 1 con đang chờ trả.'
          : 'Đàn có 17 con. Ba anh em đang chờ chia nguyên con.'}
      </p>
      <p className={styles.note}>
        Kéo trâu, hoặc chạm chọn trâu rồi chạm nơi muốn đặt.
      </p>
    </div>
  );
}
