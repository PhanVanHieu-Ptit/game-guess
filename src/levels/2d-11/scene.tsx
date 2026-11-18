'use client';

import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';

export default function Scene({ onSolved, onWrong }: SceneProps) {
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Bạn An đi học cùng xe đạp, cặp, nón và bảng tên trên áo"
        reaction={reaction}
      >
        <path d="M0 0h360v360H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 255q180-25 360 0v105H0z" fill="#e3f4d5" stroke="none" />
        <path
          d="M20 75h76m-60 20h45m180-35h65"
          stroke="#fff"
          strokeWidth={12}
        />
        <rect x={128} y={28} width={110} height={45} rx={12} fill="#ffda72" />
        <text
          x={183}
          y={58}
          fontSize={21}
          fontWeight={800}
          textAnchor="middle"
          stroke="none"
          fill="#231f3f"
        >
          ĐI HỌC
        </text>
        <ArtButton
          label="Bạn học sinh"
          x={125}
          y={85}
          width={120}
          height={100}
          onPress={() => wrong('child')}
        >
          <g transform="translate(-184 -122) scale(2)">
            <Kid x={184} y={106} shirt="#59b9d5" />
          </g>
        </ArtButton>
        <ArtButton
          label="Bảng tên trên áo"
          x={145}
          y={184}
          width={82}
          height={62}
          onPress={onSolved}
        >
          <rect x={145} y={189} width={82} height={48} rx={9} fill="#fff8df" />
          <circle cx={157} cy={201} r={3} fill="#ef6b68" stroke="none" />
          <text
            x={186}
            y={223}
            fontSize={22}
            fontWeight={800}
            textAnchor="middle"
            stroke="none"
            fill="#231f3f"
          >
            AN
          </text>
        </ArtButton>
        <ArtButton
          label="Nón"
          x={22}
          y={125}
          width={88}
          height={70}
          onPress={() => wrong('hat')}
        >
          <path d="M33 169q0-48 59 0" fill="#ffda72" />
          <ellipse cx={63} cy={171} rx={38} ry={12} fill="#ffbd59" />
          <path d="M44 157h37" stroke="#ef6b68" strokeWidth={8} />
        </ArtButton>
        <ArtButton
          label="Cặp sách"
          x={264}
          y={177}
          width={74}
          height={93}
          onPress={() => wrong('bag')}
        >
          <path d="M285 194v-10q17-15 30 0v10" fill="none" />
          <rect x={271} y={194} width={60} height={70} rx={15} fill="#b694df" />
          <rect x={281} y={226} width={40} height={25} rx={7} fill="#d9c7f0" />
          <path d="M286 211h30" stroke="#fff8df" />
        </ArtButton>
        <ArtButton
          label="Xe đạp"
          x={19}
          y={272}
          width={172}
          height={75}
          onPress={() => wrong('bike')}
        >
          <circle cx={51} cy={318} r={25} fill="#fff8df" />
          <circle cx={153} cy={318} r={25} fill="#fff8df" />
          <path
            d="M51 318l32-45 27 45H51l24-36h64l14 36m-14-36-6-16h15m-74 7h22"
            fill="none"
            stroke="#ef6b68"
            strokeWidth={6}
          />
        </ArtButton>
        <path
          d="M263 314l5-12 5 12m33 15 5-12 5 12"
          fill="none"
          stroke="#73c892"
        />
      </PuzzleArt>
      <p className={styles.note}>
        Bạn An đã sẵn sàng đến lớp. Chạm vào thứ bạn chọn.
      </p>
    </div>
  );
}
