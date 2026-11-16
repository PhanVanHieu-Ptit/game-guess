'use client';

import { useEffect, useRef, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useShake } from '@/engine/input/use-shake';
import { SensorControls } from '@/engine/input/sensor-controls';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import motion from './scene.module.css';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [fallen, setFallen] = useState(false);
  const [taps, setTaps] = useState(0);
  const recentTaps = useRef<number[]>([]);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const drop = () => {
    setFallen(true);
    onProgress();
  };
  const shake = useShake(drop);
  const tapTree = () => {
    if (fallen) return;
    const now = performance.now();
    recentTaps.current = [
      ...recentTaps.current.filter((time) => now - time <= 2000),
      now,
    ];
    setTaps((value) => value + 1);
    onProgress();
    if (recentTaps.current.length >= 3) drop();
  };
  useEffect(() => {
    if (!fallen) return;
    const timer = setTimeout(onSolved, 600);
    return () => clearTimeout(timer);
  }, [fallen, onSolved]);
  const attempt = (code: string) => {
    if (!fallen) wrong(code);
  };
  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Cây xoài cao, bé và chiếc giỏ"
        height={340}
        reaction={reaction}
      >
        <path d="M0 0h360v340H0z" fill="#dff4f3" stroke="none" />
        <circle cx={46} cy={47} r={24} fill="#ffda72" stroke="none" />
        <path d="M0 300q180-36 360 0v40H0z" fill="#cfe8b8" stroke="none" />
        <ArtButton
          label="Thân cây"
          x={141}
          y={176}
          width={66}
          height={137}
          onPress={tapTree}
        >
          <g key={taps} className={taps > 0 ? motion.sway : undefined}>
            <path
              d="M153 309l9-133-32-39 13-11 32 35 45-34 10 15-44 41 7 126z"
              fill="#b8793a"
            />
            <path
              d="M85 163q-37-34-7-65-12-41 30-45 18-41 60-23 42-25 68 11 51-1 53 44 35 34 4 65-13 35-60 22-51 27-78-4-45 20-70-5z"
              fill="#73c892"
            />
            <path
              d="M110 99q20-14 39 0m47-30q20-15 39 0m-28 70q20-14 39 0"
              fill="none"
              stroke="#329d79"
            />
          </g>
        </ArtButton>
        <g
          className={fallen ? motion.fall : undefined}
          data-mango={fallen ? 'fallen' : 'hanging'}
        >
          <ArtButton
            label="Quả xoài"
            x={222}
            y={95}
            width={62}
            height={73}
            onPress={() => attempt('mango')}
          >
            <path
              d="M252 113q-23-4-23 21 2 29 25 16 26-15 9-34z"
              fill="#ffcf63"
            />
            <path d="M253 115l6-13m-2 6q14-15 22-3-9 11-22 3" fill="#329d79" />
          </ArtButton>
        </g>
        <g key={reaction} className={reaction ? motion.jump : undefined}>
          <ArtButton
            label="Bé hái xoài"
            x={40}
            y={238}
            width={68}
            height={88}
            onPress={() => attempt('child')}
          >
            <Kid x={74} y={247} shirt="#b694df" />
          </ArtButton>
        </g>
        <ArtButton
          label="Giỏ hứng xoài"
          x={247}
          y={277}
          width={87}
          height={60}
          onPress={() => attempt('basket')}
        >
          <path d="M254 294q34-37 68 0" fill="none" />
          <path d="M252 294h74l-10 35h-54z" fill="#dba05d" />
          <path
            d="M260 304h58m-54 12h50m-38-20v31m16-31v31m16-31v31"
            stroke="#996735"
            strokeWidth={2}
          />
        </ArtButton>
      </PuzzleArt>
      <p className={styles.note} role="status">
        {fallen
          ? 'Xoài rụng vào giỏ rồi!'
          : 'Không cần cảm biến: chạm thân cây 3 lần liên tục trong 2 giây.'}
      </p>
      <SensorControls
        sensor={{
          ...shake,
          fallbackProps: {
            ...shake.fallbackProps,
            onClick: tapTree,
            disabled: fallen,
          },
        }}
        label="Lắc"
      />
    </div>
  );
}
