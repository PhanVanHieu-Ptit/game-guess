'use client';

import { useState } from 'react';
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
  const [home, setHome] = useState(false);
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Ốc sên mang vỏ trên lưng, bên cạnh nhà và bụi cây dưới mây mưa"
        height={330}
        reaction={reaction}
      >
        <path d="M0 0h360v330H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 260q160-25 360 0v70H0z" fill="#e3f4d5" stroke="none" />
        <path
          d="M170 40q-12-28-35-12-27-14-31 16-24 23 7 26h71q25-18-12-30z"
          fill="#b8bbce"
        />
        <path d="M114 85l-6 12m34-12-6 12m34-12-6 12" stroke="#2786a5" />
        <ArtButton
          label="Ngôi nhà"
          x={236}
          y={91}
          width={104}
          height={124}
          onPress={() => wrong('house')}
        >
          <path d="M245 146v65h84v-65l-42-40z" fill="#ffd66e" />
          <path
            d="M238 149l49-49 49 49"
            fill="none"
            stroke="#ef6b68"
            strokeWidth={10}
          />
          <rect x={277} y={165} width={26} height={46} rx={5} fill="#f3a3bd" />
          <circle cx={295} cy={190} r={2} fill="#231f3f" />
        </ArtButton>
        <ArtButton
          label="Bụi cây"
          x={20}
          y={140}
          width={88}
          height={78}
          onPress={() => wrong('bush')}
        >
          <path
            d="M30 206q-25-30 5-43 4-29 27-16 29-14 32 20 23 34-10 39z"
            fill="#70bb87"
          />
          <path d="M46 177l12 7m15 4l9-9" fill="none" />
        </ArtButton>
        {!home && (
          <ArtButton
            label="Thân ốc sên"
            x={205}
            y={229}
            width={114}
            height={69}
            onPress={() => wrong('body')}
          >
            <path
              d="M140 284h144q33 0 18-28l-14-18q-25-10-29 17H155z"
              fill="#ffd66e"
            />
            <path d="M275 239l-4-20m18 18 9-20" fill="none" />
            <circle cx={270} cy={216} r={5} fill="#fffdf3" />
            <circle cx={300} cy={214} r={5} fill="#fffdf3" />
            <path d="M279 260q8 7 15-2" fill="none" />
          </ArtButton>
        )}
        <ArtButton
          label="Vỏ ốc sên"
          x={107}
          y={164}
          width={118}
          height={118}
          onPress={() => {
            setHome(true);
            onSolved();
          }}
        >
          <circle cx={166} cy={223} r={57} fill="#f3a3bd" />
          <path
            d="M166 259c-52 0-50-72-4-72 38 0 40 53 7 53-21 0-20-28-3-28 11 0 12 12 5 14"
            fill="none"
            stroke="#a44971"
            strokeWidth={5}
          />
        </ArtButton>
        <path d="M83 307h169" stroke="#b6d59a" strokeWidth={5} />
      </PuzzleArt>
    </div>
  );
}
