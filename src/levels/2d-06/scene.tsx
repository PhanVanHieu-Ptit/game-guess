'use client';

import { useEffect, useRef, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import { usePromptWordTap } from '@/engine/prompt-words';
import { useDrag } from '@/engine/input/use-drag';
import { TetDialogue } from '@/engine/stage2d/tet-dialogue';
import tet from '@/engine/stage2d/tet.module.css';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [found, setFound] = useState(false);
  const [lastWrong, setLastWrong] = useState('');
  const { reaction, wrong: feedback } = usePuzzleFeedback(onWrong);
  const wrong = (code: string) => {
    if (!fish.placed) {
      setLastWrong(code);
      feedback(code);
    }
  };
  const fish = useDrag({
    svgRef,
    initialPosition: { x: 186, y: 185 },
    target: { x: 14, y: 274, width: 84, height: 76 },
    onDrop: onProgress,
    onMiss: () => wrong('miss'),
    onProgress,
  });
  const deliver = () => {
    if (fish.selected) fish.targetProps.onClick();
    else if (!fish.placed) wrong(found ? 'basket' : 'empty');
  };
  useEffect(() => {
    if (!fish.placed) return;
    const timer = setTimeout(onSolved, 500);
    return () => clearTimeout(timer);
  }, [fish.placed, onSolved]);

  usePromptWordTap(({ id }) => {
    if (id === 'ca') {
      if (!found) {
        setFound(true);
        onProgress();
      }
    } else {
      wrong('not_fish');
    }
  });

  return (
    <div className={styles.scene}>
      <PuzzleArt
        svgRef={svgRef}
        label="Ao sen không có cá và chiếc giỏ của ngoại"
        reaction={reaction}
      >
        {/* Nền trời và mặt ao */}
        <path d="M0 0h360v360H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 110q180-25 360 0v250H0z" fill="#a7e3db" stroke="none" />

        {/* Bờ ao cỏ xanh bên trái và góc trên */}
        <ArtButton
          label="Bờ cỏ"
          x={0}
          y={60}
          width={120}
          height={80}
          onPress={() => wrong('not_fish')}
        >
          <path d="M-10 65q90-10 120 45t-40 40H-10z" fill="#73c892" />
          <path
            d="M10 80q15-18 20 0m22-12q12-16 18 2"
            fill="none"
            stroke="#439c63"
            strokeWidth={3}
          />
        </ArtButton>

        {/* Cần câu cắm bên bờ, dây buông xuống nước */}
        <ArtButton
          label="Cần câu"
          x={40}
          y={30}
          width={130}
          height={140}
          onPress={() => wrong('fishing_rod')}
        >
          {/* Cần tre uốn cong */}
          <path
            d="M20 135q50-70 140-75"
            fill="none"
            stroke="#c77a30"
            strokeWidth={6}
          />
          {/* Khớp trúc */}
          <path
            d="M50 108l4 6m45-38l3 7m44-12l1 7"
            stroke="#8b4d12"
            strokeWidth={3}
          />
          {/* Dây cước và phao */}
          <path
            d="M160 60q15 45 10 95"
            fill="none"
            stroke="#53415b"
            strokeWidth={1.5}
            strokeDasharray="4 2"
          />
          {/* Phao câu tròn */}
          <circle cx={170} cy={155} r={8} fill="#ef6b68" />
          <path d="M162 155h16" stroke="#fff1d0" strokeWidth={3} />
        </ArtButton>

        {/* Gợn sóng nước và bong bóng */}
        <path
          d="M185 160q20-8 40 0m-80 50q25-6 50 0m60 30q30-7 60 0m-200 45q35-8 70 0"
          fill="none"
          stroke="#7ec2ba"
          strokeWidth={3}
        />
        <circle
          cx={145}
          cy={185}
          r={4}
          fill="#ffffff"
          stroke="none"
          opacity={0.7}
        />
        <circle
          cx={152}
          cy={175}
          r={2.5}
          fill="#ffffff"
          stroke="none"
          opacity={0.7}
        />
        <circle
          cx={250}
          cy={220}
          r={5}
          fill="#ffffff"
          stroke="none"
          opacity={0.7}
        />

        {/* Mặt nước ao chạm được */}
        <ArtButton
          label="Mặt nước"
          x={140}
          y={150}
          width={80}
          height={70}
          onPress={() => wrong('water')}
        >
          <path
            d="M145 170q25-10 50 0t30 15"
            fill="none"
            stroke="#5fa9a0"
            strokeWidth={3}
          />
        </ArtButton>

        {/* Cụm lá sen lớn bên phải */}
        <ArtButton
          label="Lá sen"
          x={210}
          y={120}
          width={130}
          height={110}
          onPress={() => wrong('lotus')}
        >
          <ellipse cx={275} cy={175} rx={55} ry={35} fill="#50b892" />
          <path
            d="M275 175l-40-10m40 10l-20-22m20 22l15-24m-15 24l40-5m-40 5l30 20m-30-20l-15 22m15-22l-35 15"
            fill="none"
            stroke="#3a9874"
            strokeWidth={2.5}
          />
          {/* Giọt sương trên lá sen */}
          <circle cx={285} cy={165} r={5} fill="#dff4f3" />
        </ArtButton>

        {/* Hoa sen hồng đang nở */}
        <ArtButton
          label="Hoa sen"
          x={90}
          y={210}
          width={110}
          height={110}
          onPress={() => wrong('lotus')}
        >
          {/* Cuống sen */}
          <path
            d="M145 285q5 25 2 55"
            fill="none"
            stroke="#3a9874"
            strokeWidth={5}
          />
          {/* Cánh hoa sen */}
          <path
            d="M145 235q-25 15-20 45 20 8 40 0 5-30-20-45z"
            fill="#fca5b7"
          />
          <path d="M115 260q-15 15 5 28 20-5 25-20z" fill="#f78da7" />
          <path d="M175 260q15 15-5 28-20-5-25-20z" fill="#f78da7" />
          {/* Nhụy sen vàng */}
          <ellipse cx={145} cy={270} rx={10} ry={7} fill="#ffda72" />
        </ArtButton>

        {/* Lá sen nhỏ góc dưới */}
        <ArtButton
          label="Lá sen nhỏ"
          x={200}
          y={255}
          width={110}
          height={85}
          onPress={() => wrong('lotus')}
        >
          <ellipse cx={255} cy={295} rx={42} ry={26} fill="#50b892" />
          <path
            d="M255 295l-30-5m30 5l10-18m-10 18l28 2m-28-2l-15 16m15-16l18 14"
            fill="none"
            stroke="#3a9874"
            strokeWidth={2}
          />
        </ArtButton>

        {/* Chú chuồn chuồn đậu trên cần câu */}
        <g transform="translate(155, 48) scale(0.85)">
          <path
            d="M0 0q15-8 30 0t-30 0"
            fill="#e3f4f2"
            stroke="#53415b"
            strokeWidth={2}
          />
          <path
            d="M0 4q15 8 30 0t-30 0"
            fill="#e3f4f2"
            stroke="#53415b"
            strokeWidth={2}
          />
          <ellipse cx="2" cy="2" rx="12" ry="3" fill="#ef6b68" />
          <circle cx="-10" cy="2" r="3" fill="#231f3f" />
        </g>
        <g
          {...fish.targetProps}
          aria-disabled={fish.placed}
          aria-label="Giỏ của ngoại"
          data-touch-target
          onClick={deliver}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              deliver();
            }
          }}
        >
          <path d="M23 306q33-36 66 0" fill="none" />
          <path d="M18 306h75l-12 37H30z" fill="#dba05d" />
          <path
            d="M26 318h58m-54 12h50m-41-22v31m17-31v31m17-31v31"
            stroke="#996735"
            strokeWidth={2}
          />
          <rect
            x={14}
            y={274}
            width={84}
            height={76}
            fill="transparent"
            stroke="none"
          />
        </g>
        {found && (
          <g
            {...fish.dragProps}
            aria-label="Cá vừa tìm thấy"
            data-touch-target
            transform={`translate(${fish.position.x} ${fish.position.y})`}
          >
            <g className={tet.reveal}>
              <path d="M18 0l25-20v40z" fill="#ef6b68" />
              <ellipse
                rx={30}
                ry={19}
                fill="#ffcf63"
                stroke={fish.selected ? '#126b5e' : '#231f3f'}
              />
              <path d="M-3-18l12-12 7 14m-13 32 11 10" fill="#ef6b68" />
              <circle cx={-17} cy={-5} r={3} fill="#231f3f" stroke="none" />
              <path d="M-12 6q5 5 9 0" fill="none" />
            </g>
            <rect
              x={-34}
              y={-30}
              width={82}
              height={60}
              fill="transparent"
              stroke="none"
            />
          </g>
        )}
      </PuzzleArt>
      <TetDialogue speaker={found && !fish.placed ? 'Cá:' : 'Ngoại:'}>
        {fish.placed
          ? 'Đủ mặt cả nhà rồi. Ngoại mời con vào mâm!'
          : fish.selected
            ? 'Chọn mình rồi, chạm giỏ để đưa mình về nhé!'
            : found
              ? 'Bơi từ lời nhắn ra đây rồi! Giờ cho mình vào giỏ nhé.'
              : lastWrong === 'fishing_rod'
                ? 'Phao nhúc nhích… kéo lên chỉ thấy một chiếc lá!'
                : lastWrong === 'lotus'
                  ? 'Sen đẹp thì đẹp, nhưng chưa mọc vây đâu con.'
                  : lastWrong === 'water'
                    ? 'Ao trong veo. Có khi con phải tìm ngoài bức tranh.'
                    : lastWrong === 'empty'
                      ? 'Giỏ đang chờ khách. Con tìm cá trước nhé.'
                      : 'Mọi thứ trên màn hình đều có thể giấu điều bất ngờ.'}
      </TetDialogue>
    </div>
  );
}
