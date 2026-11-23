'use client';

import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

export default function Scene({ onSolved, onWrong }: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Que diêm, cây nến và đèn dầu chưa cháy trên bàn"
        height={300}
        reaction={reaction}
      >
        <path d="M0 0h360v300H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 230h360v70H0z" fill="#ffe1b2" stroke="none" />
        <path d="M12 268h336" stroke="#b47b3c" strokeWidth={6} />
        <ArtButton
          label="Que diêm chưa châm"
          x={16}
          y={140}
          width={94}
          height={108}
          onPress={onSolved}
        >
          <rect x={25} y={209} width={77} height={38} rx={9} fill="#ef6b68" />
          <path d="M35 221h57m-57 13h57" stroke="#ffd66e" strokeWidth={3} />
          <path d="M47 194l27-35" stroke="#b47b3c" strokeWidth={10} />
          <ellipse
            cx={77}
            cy={155}
            rx={10}
            ry={13}
            transform="rotate(36 77 155)"
            fill="#ef6b68"
          />
        </ArtButton>
        <ArtButton
          label="Cây nến"
          x={126}
          y={93}
          width={87}
          height={156}
          onPress={() => wrong('candle')}
        >
          <ellipse cx={170} cy={242} rx={40} ry={10} fill="#b8bbce" />
          <rect x={145} y={119} width={50} height={121} rx={9} fill="#ffd66e" />
          <path
            d="M146 129q10 20 17 0 7-14 12 7 10 17 19-7"
            fill="none"
            stroke="#fffdf3"
            strokeWidth={7}
          />
          <path d="M170 118v-19" fill="none" strokeWidth={5} />
        </ArtButton>
        <ArtButton
          label="Đèn dầu"
          x={237}
          y={53}
          width={107}
          height={198}
          onPress={() => wrong('lamp')}
        >
          <path d="M267 154q-28-51 5-90h35q33 39 5 90z" fill="#fffdf3" />
          <path
            d="M279 76q-19 34-7 55"
            fill="none"
            stroke="#b8dedd"
            strokeWidth={6}
          />
          <path d="M289 166v-25" fill="none" strokeWidth={5} />
          <path d="M265 166h49l14 62q-39 28-78 0z" fill="#59b9d5" />
          <path d="M257 239h66" strokeWidth={7} />
          <circle cx={317} cy={185} r={9} fill="#ffd66e" />
        </ArtButton>
      </PuzzleArt>
      <p className={styles.note}>Cả ba đều chưa cháy. Bạn bắt đầu từ đâu?</p>
    </div>
  );
}
