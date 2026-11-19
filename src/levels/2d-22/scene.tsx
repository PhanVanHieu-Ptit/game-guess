'use client';

import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

/** Cả ba bóng dùng cùng một dáng người, chân cùng ở (180, 262). */
function Shadow({ x, y }: { x: number; y: number }) {
  const length = Math.hypot(x - 180, y - 262);
  return (
    <g
      transform={`matrix(${((y - 262) / length) * 0.72} ${((180 - x) / length) * 0.72} ${(180 - x) / 73} ${(262 - y) / 73} 180 262)`}
      fill="#817a99"
      stroke="#625a80"
      strokeWidth={3}
    >
      <path d="M-11 0v-15h-11l5-31 5-5h24l5 5 5 31H11V0M-18-42l-8 16m44-16l8 16" />
      <circle cy={-60} r={18} />
      <path d="M-17-65q0-23 28-10l7 9-16-4-9 5" />
    </g>
  );
}

export default function Scene({ onSolved, onWrong }: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Mặt trời bên phải, bé ở giữa và ba chiếc bóng nối từ chân bé"
        height={400}
        reaction={reaction}
      >
        <path d="M0 0h360v400H0z" fill="#dff4f3" stroke="none" />
        <path
          d="M0 157q100-29 180 0 100-26 180 0v243H0z"
          fill="#e3f4d5"
          stroke="none"
        />
        <path
          d="M30 64h78m-64 9h49M26 178l7-9 7 9m247 200l7-9 7 9"
          stroke="#fff8df"
          strokeWidth={7}
          fill="none"
        />
        <ArtButton
          label="Mặt trời"
          x={258}
          y={24}
          width={84}
          height={84}
          onPress={() => wrong('sun')}
        >
          <circle cx={300} cy={66} r={28} fill="#ffd66e" />
          <path
            d="M300 25v-7m0 89v7m-41-48h-7m89 0h7m-77-29l-5-5m68 68l-5-5m-58 0l-5 5m68-68l-5 5"
            fill="none"
            stroke="#eeb14a"
          />
          <path
            d="M290 65v1m20-1v1m-16 10q6 6 12 0"
            fill="none"
            strokeWidth={2.5}
          />
        </ArtButton>
        <ArtButton
          label="Bóng bên trái"
          x={16}
          y={268}
          width={148}
          height={100}
          onPress={onSolved}
        >
          <Shadow x={48} y={326} />
        </ArtButton>
        <ArtButton
          label="Bóng bên phải phía dưới"
          x={224}
          y={280}
          width={116}
          height={94}
          onPress={() => wrong('right')}
        >
          <Shadow x={300} y={333} />
        </ArtButton>
        <ArtButton
          label="Bóng bên phải phía trên"
          x={238}
          y={151}
          width={102}
          height={79}
          onPress={() => wrong('up')}
        >
          <Shadow x={300} y={198} />
        </ArtButton>
        <ArtButton
          label="Bé đứng giữa sân"
          x={148}
          y={179}
          width={64}
          height={88}
          onPress={() => wrong('kid')}
        >
          <Kid x={180} y={189} shirt="#59b9d5" />
        </ArtButton>
        <path d="M39 379h77m146 0h66" stroke="#69b88d" fill="none" />
      </PuzzleArt>
      <p className={styles.note}>
        Ba chiếc bóng, chỉ một chiếc đúng hướng ánh sáng.
      </p>
    </div>
  );
}
