'use client';

import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

const days = [
  { label: 'Thứ Năm', id: 'thursday' },
  { label: 'Thứ Sáu', id: 'friday' },
  { label: 'Thứ Bảy', id: 'saturday' },
  { label: 'Chủ nhật', id: 'sunday' },
] as const;

export default function Scene({ onSolved, onWrong }: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        label="Bà ngồi bên cuốn lịch chưa điền ngày, đang kể chuyện hôm qua"
        height={260}
        reaction={reaction}
      >
        <path d="M0 0h360v260H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 216h360v44H0z" fill="#ffe1b2" stroke="none" />
        <path
          d="M41 232v-49h109v49m-99-16h86"
          stroke="#b47b3c"
          strokeWidth={8}
          fill="none"
        />
        <path d="M68 190l-8 40m48-40 8 40" strokeWidth={8} fill="none" />
        <path d="M60 126q36-18 63 0l12 66H49z" fill="#f3a3bd" />
        <path
          d="M59 138l-13 29 28 5m47-35 16 20 20-17"
          fill="none"
          strokeWidth={8}
        />
        <circle cx={91} cy={83} r={38} fill="#ffd0a1" />
        <circle cx={69} cy={49} r={20} fill="#b8bbce" />
        <path
          d="M54 81q-3-43 37-42 41 2 39 44l-21-21q-19 16-55 19z"
          fill="#b8bbce"
        />
        <circle cx={76} cy={88} r={10} fill="#fffdf3" />
        <circle cx={106} cy={88} r={10} fill="#fffdf3" />
        <path d="M86 87h10m-12 20q8 7 16 0" fill="none" strokeWidth={2.5} />
        <ArtButton
          label="Cuốn lịch chưa điền ngày"
          x={207}
          y={44}
          width={126}
          height={163}
          onPress={() => wrong('calendar')}
        >
          <rect
            x={211}
            y={56}
            width={117}
            height={147}
            rx={12}
            fill="#fffdf3"
          />
          <path d="M212 90h115V68q0-12-12-12h-91q-12 0-12 12z" fill="#ef6b68" />
          <path d="M239 44v26m60-26v26" strokeWidth={7} />
          <path
            d="M239 128h59m-59 27h59m-59 27h35"
            stroke="#b8bbce"
            strokeWidth={5}
          />
        </ArtButton>
      </PuzzleArt>
      <p className={styles.note}>
        Hôm qua bà nói: <strong>“Ngày mai là thứ Sáu.”</strong>
      </p>
      <div
        className={controls.controls}
        role="group"
        aria-label="Hôm nay là thứ mấy?"
      >
        {days.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            data-touch-target
            className={controls.button}
            onClick={() => (id === 'friday' ? onSolved() : wrong(id))}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
