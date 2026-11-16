'use client';

import type { SceneProps } from '@/engine/scene';
import { ChooseScene, type ChooseOption } from '@/engine/stage2d/scenes/choose';
import { PuzzleDrawing, usePuzzleFeedback } from '@/engine/stage2d/puzzle-art';

const OPTIONS: readonly ChooseOption[] = [
  { id: 'left', label: 'Bên trái' },
  { id: 'right', label: 'Bên phải' },
  { id: 'down', label: 'Rơi thẳng xuống' },
  { id: 'rooster', label: 'Gà trống không đẻ trứng' },
];

export default function Scene(props: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(props.onWrong);
  return (
    <ChooseScene
      {...props}
      onWrong={wrong}
      options={OPTIONS}
      correctId="rooster"
      artLabel="Gà trống đứng trên mái nhà"
      groupLabel="Chọn hướng trứng lăn"
      art={
        <PuzzleDrawing reaction={reaction}>
          <rect width={360} height={240} rx={20} fill="#dff4f3" stroke="none" />
          <circle cx={303} cy={43} r={23} fill="#ffda72" stroke="none" />
          <path d="M70 218v-47l110-63 110 63v47" fill="#fff1d0" />
          <path d="M37 179l143-76 143 76-17 21-126-66-126 66z" fill="#ef6b68" />
          <path
            d="M86 169l16 20m26-44 16 21m72-21-16 21m72 3-16 20"
            stroke="#bd5057"
          />
          <path
            d="M168 94l-4 18m22-18 6 18m-35 0h17m11 0h17"
            fill="none"
            stroke="#c77a30"
          />
          <path
            d="M155 65q-38-48-50-20 5 21 40 33-50-16-49 6 11 17 51 6"
            fill="#59b9d5"
          />
          <path
            d="M146 65q18-26 43-9l17 14q4 31-30 31-29 0-30-36z"
            fill="#fff8df"
          />
          <path d="M157 71q26-10 23 16-18 8-23-16" fill="#ffcf63" />
          <path
            d="M194 37q-13-17-18-7-14-13-17-1-14-2-10 11l26 15"
            fill="#ef6b68"
          />
          <circle cx={187} cy={49} r={19} fill="#ef6b68" />
          <path d="M206 44l18 8-18 7" fill="#ffcf63" />
          <circle cx={192} cy={44} r={2.5} fill="#231f3f" stroke="none" />
          <path d="M195 67q9 17 15 3" fill="#ef6b68" />
          <path
            d="M240 80q-12-14-3-26 17-14 26 0 16 19-5 28z"
            fill="#ffffff"
            strokeDasharray="5 5"
          />
          <text
            x={250}
            y={73}
            textAnchor="middle"
            fontSize={23}
            fontWeight={800}
            fill="#53415b"
            stroke="none"
          >
            ?
          </text>
          <path d="M231 91l-7 6m-5 4-4 3" fill="none" strokeDasharray="2 4" />
        </PuzzleDrawing>
      }
    />
  );
}
