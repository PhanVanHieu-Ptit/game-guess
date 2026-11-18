'use client';

import { useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useQuietWait } from '@/engine/input/use-quiet-wait';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import motion from './scene.module.css';

export default function Scene({ onSolved, onWrong }: SceneProps) {
  const [noise, setNoise] = useState(0);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const quiet = useQuietWait(onSolved);
  const disturb = (code: string) => {
    quiet.restart();
    setNoise((value) => value + 1);
    wrong(code);
  };
  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Dòng xe đông đúc giờ tan tầm, phía xa đường đang thông dần"
        reaction={reaction}
        height={320}
      >
        <path d="M0 0h360v320H0z" fill="#dff4f3" stroke="none" />
        {[15, 90, 260].map((x, i) => (
          <g key={x}>
            <rect
              x={x}
              y={25 + i * 6}
              width={64}
              height={90}
              rx={8}
              fill={i === 1 ? '#b694df' : '#ffda72'}
            />
            <path
              d={`M${x + 14} 48h12m12 0h12m-36 23h12m12 0h12`}
              stroke="#fff8df"
              strokeWidth={8}
            />
          </g>
        ))}
        <ArtButton
          label="Mặt đường"
          x={0}
          y={110}
          width={360}
          height={210}
          onPress={() => disturb('road')}
        >
          <path d="M0 112h360v208H0z" fill="#9eacc4" />
          <path d="M0 211h360" stroke="#fff8df" strokeDasharray="22 18" />
          <path d="M286 122h64m-50 14h50" stroke="#fff8df" />
        </ArtButton>
        <g
          className={quiet.finished ? motion.leaving : undefined}
          data-traffic={quiet.finished ? 'moving' : 'waiting'}
        >
          {[
            { x: 14, y: 142, color: '#ffbd59', name: 'Xe vàng' },
            { x: 134, y: 142, color: '#ef6b68', name: 'Xe đỏ' },
            { x: 74, y: 238, color: '#b694df', name: 'Xe tím' },
            { x: 214, y: 238, color: '#73c892', name: 'Xe xanh' },
          ].map((car) => (
            <ArtButton
              key={car.name}
              label={car.name}
              x={car.x}
              y={car.y - 12}
              width={110}
              height={70}
              onPress={() => disturb('car')}
            >
              <g transform={`translate(${car.x} ${car.y})`}>
                <path d="M4 25l20-25h44l17 25h17v25H4z" fill={car.color} />
                <path d="M29 6h33l12 20H17z" fill="#dff4f3" />
                <circle cx={25} cy={49} r={10} fill="#53415b" />
                <circle cx={82} cy={49} r={10} fill="#53415b" />
                <path d="M94 33h7" stroke="#fff8df" strokeWidth={5} />
              </g>
            </ArtButton>
          ))}
        </g>
        <path
          d="M302 172l14-7m-11 19h18m-21 12 14 7"
          fill="none"
          stroke="#ffda72"
          strokeWidth={6}
          opacity={noise ? 1 : 0.3}
        />
      </PuzzleArt>
      <button
        className={motion.horn}
        type="button"
        data-touch-target
        onClick={() => disturb('horn')}
      >
        Bấm còi · Bíp bíp!
      </button>
      <p className={styles.note} role="status">
        {quiet.finished
          ? 'Đường thông rồi, xe đi thôi!'
          : `Độ ồn: ${noise} · ${noise ? 'Cả phố nghe thấy rồi đó!' : 'Giờ tan tầm, ai cũng muốn về nhà.'}`}
      </p>
    </div>
  );
}
