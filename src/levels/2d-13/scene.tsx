'use client';

import type { SceneProps } from '@/engine/scene';
import { useHold } from '@/engine/input/use-hold';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import motion from './scene.module.css';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const hold = useHold(onSolved, {
    durationMs: 4000,
    onRelease: () => wrong('release'),
    onStart: onProgress,
  });
  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Cầu khỉ bằng tre bắc qua sông, có cây tre tay vịn chạy dọc cầu"
        height={330}
        reaction={reaction}
      >
        <path d="M0 0h360v330H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 220q180-20 360 0v110H0z" fill="#59b9d5" stroke="none" />
        <path d="M0 210h65l-7 120H0m302-120h58v120h-60z" fill="#73c892" />
        <path
          d="M84 284q12-9 24 0t24 0m70 20q12-9 24 0t24 0m-74-50q12-9 24 0t24 0"
          fill="none"
          stroke="#b6eee9"
        />
        <path
          d="M58 235l246-1m-210 0-9 41m180-40 10 41"
          stroke="#be8b51"
          strokeWidth={13}
        />
        <path d="M80 243v-98m196 98V145" stroke="#438a63" strokeWidth={8} />
        <path d="M302 98h52v84h-52z" fill="#ffda72" />
        <path d="M296 99l33-29 29 29z" fill="#ef6b68" />
        <path d="M322 182v-30h17v30" fill="#b694df" />
        <g
          transform={`translate(${hold.progress * 256} 0)`}
          data-crossing={
            hold.finished ? 'across' : hold.holding ? 'steady' : 'wobbling'
          }
        >
          <g
            className={
              hold.holding || hold.finished ? undefined : motion.wobble
            }
          >
            <ArtButton
              label="Bé trên cầu"
              x={13}
              y={158}
              width={62}
              height={89}
              onPress={() => wrong('child')}
            >
              <Kid x={44} y={161} shirt="#ef6b68" />
            </ArtButton>
          </g>
        </g>
        <ArtButton
          label="Dòng sông"
          x={80}
          y={270}
          width={200}
          height={60}
          onPress={() => wrong('water')}
        >
          <path
            d="M112 291q13-15 26 0m-35 6-9-6m53 6 9-6"
            fill="none"
            stroke="#dff4f3"
            strokeWidth={5}
          />
        </ArtButton>
        <g {...hold.holdProps} aria-label="Cây tre tay vịn" data-touch-target>
          <path
            d="M52 135l253-5"
            stroke={hold.holding ? '#ffbd59' : '#73c892'}
            strokeWidth={13}
          />
          {[78, 122, 166, 210, 254, 296].map((x) => (
            <path key={x} d={`M${x} 125v16`} stroke="#438a63" />
          ))}
          <rect
            x={50}
            y={104}
            width={258}
            height={55}
            fill="transparent"
            stroke="none"
          />
        </g>
      </PuzzleArt>
      <p className={styles.note} role="status">
        {hold.finished
          ? 'Bé đã sang bờ, ngoại ơi!'
          : hold.holding
            ? 'Vững rồi! Bé đang từng bước qua cầu…'
            : 'Cầu cứ chao qua chao lại, bé cần một điểm tựa.'}
      </p>
      <progress
        className={motion.progress}
        aria-label="Bé qua cầu"
        value={hold.progress}
        max={1}
      />
    </div>
  );
}
