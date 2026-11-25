'use client';

import { useEffect, useId, useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import { normalizeAnswer } from '@/domain/answers/normalize';
import { useAnswerInput } from '@/engine/input/use-answer-input';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import { TetDialogue } from '@/engine/stage2d/tet-dialogue';
import tet from '@/engine/stage2d/tet.module.css';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';

const ACCEPTED = ['cua', 'con cua', 'cua bể', 'cua đồng'] as const;

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const id = useId();
  const [caught, setCaught] = useState(false);
  const [visitor, setVisitor] = useState('');
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const reject = (code: string) => {
    if (caught) return;
    setVisitor(code);
    wrong(code);
  };
  const answer = useAnswerInput({
    accepted: ACCEPTED,
    onSolved: () => setCaught(true),
    onProgress,
    onWrong: () =>
      reject(
        ['tom', 'con tom'].includes(normalizeAnswer(answer.value))
          ? 'shrimp'
          : 'animal',
      ),
  });
  useEffect(() => {
    if (!caught) return;
    const timer = setTimeout(onSolved, 450);
    return () => clearTimeout(timer);
  }, [caught, onSolved]);

  return (
    <div className={styles.scene}>
      <PuzzleArt
        label="Ao nhà ngoại: cá, tôm và cua có hai càng khác cỡ"
        height={300}
        reaction={reaction}
      >
        <path d="M0 0h360v300H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 65q180-35 360 0v235H0z" fill="#a7e3db" stroke="none" />
        <path d="M0 245q180-35 360 0v55H0z" fill="#ffda85" stroke="none" />
        <path
          d="M18 257q-12-40 5-61m7 60q24-20 17-48m280 49q-21-34-9-63"
          fill="none"
          stroke="#329d79"
          strokeWidth={7}
        />
        <ArtButton
          label="Mặt nước"
          x={130}
          y={15}
          width={100}
          height={60}
          onPress={() => reject('water')}
        >
          <path d="M139 45q20-10 40 0t40 0" stroke="#5fa9a0" fill="none" />
          {visitor === 'water' && (
            <g className={tet.reveal}>
              <circle cx={170} cy={30} r={8} fill="white" />
              <circle cx={192} cy={17} r={5} fill="white" />
            </g>
          )}
        </ArtButton>
        <ArtButton
          label="Con cá"
          x={15}
          y={100}
          width={100}
          height={95}
          onPress={() => reject('animal')}
        >
          <g
            key={visitor === 'animal' ? reaction : 'fish'}
            className={visitor === 'animal' ? tet.react : tet.float}
          >
            <path d="M76 143l30-23v44z" fill="#ef6b68" />
            <ellipse cx={57} cy={143} rx={33} ry={22} fill="#ffcf63" />
            <circle cx={43} cy={137} r={3} fill="#231f3f" stroke="none" />
            <path d="M59 122l12-12 7 18m-21 31 13 12" fill="#ef6b68" />
          </g>
        </ArtButton>
        <ArtButton
          label="Con tôm"
          x={130}
          y={105}
          width={93}
          height={100}
          onPress={() => reject('shrimp')}
        >
          <g
            key={visitor === 'shrimp' ? reaction : 'shrimp'}
            className={visitor === 'shrimp' ? tet.react : undefined}
          >
            <path
              d="M157 141q23-28 43-7 20 30-17 46l-15-9q35-8 19-27-9-8-19 6z"
              fill="#f3917d"
            />
            <path
              d="M158 139q-22-27-29-15m34 19q-11-33-24-32m33 50-8 13m20-11-4 15m10-26 9 10"
              fill="none"
            />
            <circle cx={164} cy={134} r={3} fill="#231f3f" stroke="none" />
          </g>
        </ArtButton>
        <ArtButton
          label="Con cua"
          x={237}
          y={115}
          width={110}
          height={110}
          onPress={() => {
            if (!caught) {
              setCaught(true);
              onProgress();
            }
          }}
        >
          <g className={caught ? tet.react : undefined}>
            <path
              d="M272 184l-18 13m22-7-14 19m36-25 20 13m-23-7 15 19"
              fill="none"
            />
            <ellipse cx={285} cy={179} rx={26} ry={18} fill="#ef6b68" />
            <path d="M268 165l-17-20m49 22 18-12" fill="none" strokeWidth={6} />
            <path
              d="M252 153q-25-6-18-26l15 10 8-18q24 17-5 34z"
              fill="#ef6b68"
            />
            <path
              d="M317 161q-15-4-10-16l9 5 5-10q15 11-4 21z"
              fill="#ef6b68"
            />
            <path d="M277 163v-12m16 12v-12" fill="none" />
            <circle cx={277} cy={150} r={5} fill="white" />
            <circle cx={293} cy={150} r={5} fill="white" />
            <path d="M278 181q7 7 14 0" fill="none" />
          </g>
        </ArtButton>
        <path
          d="M90 236q15-9 30 0m82-16q15-9 30 0"
          fill="none"
          stroke="#5fa9a0"
        />
      </PuzzleArt>
      <TetDialogue
        speaker={
          caught
            ? 'Cua:'
            : visitor === 'shrimp'
              ? 'Tôm:'
              : visitor === 'animal'
                ? 'Cá:'
                : 'Ngoại:'
        }
      >
        {caught
          ? 'Một càng to, một càng nhỏ. Bị phát hiện rồi!'
          : visitor === 'shrimp'
            ? 'Con chỉ biết búng, không biết kẹp chữ đâu!'
            : visitor === 'animal'
              ? 'Con có vây thôi. Càng là món gì vậy?'
              : visitor === 'water'
                ? 'Ao chỉ trả lời bằng bong bóng thôi con ơi.'
                : 'Ngoại đố một câu. Mấy bạn dưới ao cũng đang hóng đó!'}
      </TetDialogue>
      <details className={tet.optional}>
        <summary data-touch-target>Mình muốn gõ đáp án</summary>
        <form className={controls.controls} onSubmit={answer.submit}>
          <label htmlFor={id}>Đáp án của bạn</label>
          <input
            id={id}
            {...answer.inputProps}
            disabled={caught || answer.inputProps.disabled}
            className={controls.input}
            aria-describedby={`${id}-message`}
            data-touch-target
          />
          <p id={`${id}-message`} role="status">
            {answer.message}
          </p>
          <button
            type="submit"
            className={controls.button}
            data-touch-target
            disabled={caught}
          >
            Trả lời
          </button>
        </form>
      </details>
    </div>
  );
}
