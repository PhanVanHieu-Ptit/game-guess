'use client';

import { useEffect, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import motion from './scene.module.css';
import { TetDialogue } from '@/engine/stage2d/tet-dialogue';

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [red, setRed] = useState(false);
  const [crossing, setCrossing] = useState(false);
  const [lastWrong, setLastWrong] = useState('');
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  useEffect(() => {
    if (!crossing) return;
    const timer = setTimeout(onSolved, 700);
    return () => clearTimeout(timer);
  }, [crossing, onSolved]);
  const attempt = (code: string) => {
    if (!red) {
      setLastWrong(code);
      wrong(code);
    }
  };
  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Bé bên vạch qua đường và đèn giao thông"
        reaction={reaction}
      >
        <path d="M0 0h360v360H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 130h360v135H0z" fill="#9eacc4" stroke="none" />
        <path d="M0 130h360M0 265h360" fill="none" />
        <path d="M115 198h245" stroke="#fff1d0" strokeDasharray="24 19" />
        {[139, 166, 193, 220, 247].map((y) => (
          <rect
            key={y}
            x={32}
            y={y}
            width={58}
            height={12}
            rx={3}
            fill="white"
            stroke="none"
          />
        ))}
        <path
          d="M14 318q90 25 157 0m36-237h47m-134-39h58"
          stroke="#9ed5bb"
          fill="none"
          strokeWidth={8}
        />
        <ArtButton
          label="Đèn giao thông"
          x={266}
          y={10}
          width={80}
          height={118}
          onPress={() => {
            if (!red) {
              setRed(true);
              onProgress();
            }
          }}
        >
          <path d="M306 91v35" strokeWidth={8} />
          <rect x={284} y={17} width={44} height={80} rx={14} fill="#53415b" />
          <circle
            cx={306}
            cy={39}
            r={13}
            fill={red ? '#ef6b68' : '#77667b'}
            stroke={red ? '#fff1d0' : '#231f3f'}
          />
          <circle
            cx={306}
            cy={75}
            r={13}
            fill={red ? '#77667b' : '#73c892'}
            stroke={red ? '#231f3f' : '#fff1d0'}
          />
        </ArtButton>
        <g data-traffic={red ? 'stopped' : 'moving'}>
          <ArtButton
            label="Xe màu vàng"
            x={108}
            y={140}
            width={120}
            height={60}
            onPress={() => attempt('car')}
          >
            <g className={`${motion.cars} ${red ? motion.stopped : ''}`}>
              <path d="M119 171l19-23h45l15 18h15v19h-94z" fill="#ffcf63" />
              <path d="M143 153h34l10 14h-54z" fill="#e3f4f2" />
              <circle cx={139} cy={186} r={9} fill="#53415b" />
              <circle cx={194} cy={186} r={9} fill="#53415b" />
            </g>
          </ArtButton>
          <ArtButton
            label="Xe màu tím"
            x={226}
            y={200}
            width={116}
            height={64}
            onPress={() => attempt('car')}
          >
            <g className={`${motion.cars} ${red ? motion.stopped : ''}`}>
              <rect
                x={236}
                y={208}
                width={57}
                height={38}
                rx={7}
                fill="#b694df"
              />
              <path d="M293 221h24l14 15v10h-38z" fill="#ef6b68" />
              <circle cx={252} cy={249} r={9} fill="#53415b" />
              <circle cx={315} cy={249} r={9} fill="#53415b" />
            </g>
          </ArtButton>
        </g>
        <g
          key={reaction}
          className={
            crossing
              ? motion.crossing
              : reaction && !red
                ? motion.retreat
                : undefined
          }
        >
          <ArtButton
            label="Bé qua đường"
            x={22}
            y={271}
            width={70}
            height={86}
            onPress={() => {
              if (red && !crossing) {
                setCrossing(true);
                onProgress();
              } else attempt('child');
            }}
          >
            <Kid x={57} y={278} shirt="#ef6b68" />
          </ArtButton>
        </g>
      </PuzzleArt>
      <TetDialogue speaker={lastWrong === 'car' && !red ? 'Bác tài:' : 'Bé:'}>
        {crossing
          ? 'Qua được rồi! Ngoại ơi, con về nè!'
          : red
            ? 'Xe dừng rồi. Chạm vào mình, hai đứa cùng qua nhé!'
            : lastWrong === 'car'
              ? 'Chạm mui xe không phải nút phanh đâu nha!'
              : lastWrong === 'child'
                ? 'Mình muốn ăn Tết, chưa muốn thi chạy với xe!'
                : 'Ngoại ở bên kia đường. Mình chờ một chút cho an toàn nhé.'}
      </TetDialogue>
    </div>
  );
}
