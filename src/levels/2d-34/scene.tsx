'use client';

import { useState } from 'react';
import type { SceneProps } from '@/engine/scene';
import {
  crossRiver,
  INITIAL_RIVER,
  isRiverSolved,
  type RiverCargo,
  type RiverState,
} from '@/domain/puzzles/river-crossing';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

const CARGO: readonly RiverCargo[] = ['wolf', 'goat', 'cabbage'];
const NAMES = { wolf: 'Sói', goat: 'Dê', cabbage: 'Bắp cải' };

function Passenger({ cargo }: { cargo: RiverCargo }) {
  return (
    <g aria-hidden="true">
      {cargo === 'wolf' ? (
        <>
          <path d="M-24-4l-5-30 22 12m17 0 20-12-5 31" fill="#a5a7bc" />
          <path d="M-26-9q26-23 52 0l-5 25-21 14-21-14z" fill="#b8bbce" />
          <path d="M-12 7q12-8 24 0l-12 17z" fill="#fffdf3" />
          <path d="M-10-3v2m20-2v2" strokeWidth={4} />
          <ellipse cy={9} rx={6} ry={4} fill="#231f3f" />
        </>
      ) : cargo === 'goat' ? (
        <>
          <path
            d="M-14-14q-11-23-1-29m29 29q11-23 1-29"
            fill="none"
            stroke="#b47b3c"
            strokeWidth={6}
          />
          <path
            d="M-17-8q-28-17-24-2l21 11m37-9q28-17 24-2L20 1"
            fill="#efb08a"
          />
          <ellipse cy={3} rx={22} ry={28} fill="#fffdf3" />
          <path d="M-9 26l9 11 9-11" fill="#fffdf3" />
          <path
            d="M-8-2v2m16-2v2m-13 16q5 4 10 0"
            fill="none"
            strokeWidth={3}
          />
        </>
      ) : (
        <>
          <circle r={30} fill="#70bb87" />
          <path
            d="M-26 8q22-35 39-24-4 8-10 13 28-2 23 14-4 20-33 16"
            fill="#a8d796"
          />
          <path
            d="M-14 24q-12-28 16-41m-4 16q-16 1-16 15m22-6q15 0 14 13"
            fill="none"
            stroke="#126b5e"
            strokeWidth={2.5}
          />
        </>
      )}
    </g>
  );
}

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const [state, setState] = useState<RiverState>({ ...INITIAL_RIVER });
  const [selected, setSelected] = useState<RiverCargo | null>(null);
  const [trips, setTrips] = useState(0);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const boatX = state.farmer === 0 ? 124 : 236;
  const cross = () => {
    const result = crossRiver(state, selected);
    setSelected(null);
    if (!result.ok) {
      wrong(result.reason);
      return;
    }
    setState(result.state);
    setTrips((value) => value + 1);
    onProgress();
    if (isRiverSolved(result.state)) onSolved();
  };
  return (
    <div
      className={`${styles.scene} ${touch.scrollable}`}
      data-testid="river-state"
      data-positions={`${state.farmer}${state.wolf}${state.goat}${state.cabbage}`}
      data-trips={trips}
    >
      <p className={styles.note}>
        Thuyền chở bác và tối đa một món. Bác được đi một mình. Bờ vắng bác
        không được có sói với dê hoặc dê với bắp cải.
      </p>
      <PuzzleArt
        label="Sói, dê và bắp cải ở hai bờ sông; bác chèo thuyền chở tối đa một món"
        height={450}
        reaction={reaction}
      >
        <path d="M0 0h360v450H0z" fill="#59b9d5" stroke="none" />
        <path
          d="M0 0h103q35 100 0 195 35 100 0 255H0zm360 0H257q-35 100 0 195-35 100 0 255h103z"
          fill="#e3f4d5"
          stroke="none"
        />
        {[50, 140, 230, 320].map((y) => (
          <path
            key={y}
            d={`M145 ${y}q17 11 34 0m6 14q17 11 34 0`}
            fill="none"
            stroke="#b8dedd"
            strokeWidth={3}
          />
        ))}
        <text
          x={54}
          y={27}
          textAnchor="middle"
          fontSize={18}
          fill="#231f3f"
          stroke="none"
        >
          Bờ trái
        </text>
        <text
          x={306}
          y={27}
          textAnchor="middle"
          fontSize={18}
          fill="#231f3f"
          stroke="none"
        >
          Bờ phải
        </text>
        {CARGO.map((cargo, index) => {
          const x = state[cargo] === 0 ? 54 : 306;
          const y = 79 + index * 100;
          return (
            <ArtButton
              key={cargo}
              label={`${NAMES[cargo]}, bờ ${state[cargo] === 0 ? 'trái' : 'phải'}`}
              x={x - 47}
              y={y - 43}
              width={94}
              height={91}
              onPress={() => {
                if (state[cargo] !== state.farmer) {
                  wrong('shore');
                  return;
                }
                setSelected((value) => (value === cargo ? null : cargo));
                onProgress();
              }}
            >
              {selected === cargo && (
                <rect
                  x={x - 47}
                  y={y - 43}
                  width={94}
                  height={91}
                  rx={14}
                  fill="#ffd66e"
                  stroke="#126b5e"
                />
              )}
              <g transform={`translate(${x} ${y - 3})`}>
                <Passenger cargo={cargo} />
              </g>
              <text
                x={x}
                y={y + 45}
                textAnchor="middle"
                fontSize={18}
                fill="#231f3f"
                stroke="none"
              >
                {NAMES[cargo]}
              </text>
            </ArtButton>
          );
        })}
        <ArtButton
          label={`Chèo thuyền sang bờ ${state.farmer === 0 ? 'phải' : 'trái'}`}
          x={boatX - 55}
          y={339}
          width={110}
          height={100}
          onPress={cross}
        >
          <Kid x={boatX} y={345} shirt="#ef6b68" />
          <path d={`M${boatX - 24} 343q24-29 48 0z`} fill="#ffd66e" />
          <path d={`M${boatX - 53} 405h106l-20 30h-66z`} fill="#b47b3c" />
          <path
            d={`M${boatX + 25} 365l24 63`}
            stroke="#fff1d0"
            strokeWidth={7}
          />
        </ArtButton>
      </PuzzleArt>
      <p className={styles.note} role="status">
        Bác ở bờ {state.farmer === 0 ? 'trái' : 'phải'}.{' '}
        {selected
          ? `Đã chọn ${NAMES[selected].toLowerCase()}. Chạm thuyền để đi.`
          : 'Chạm khách rồi chạm thuyền, hoặc chạm thuyền để đi một mình.'}{' '}
        Đã đi {trips} chuyến.
      </p>
      <button
        type="button"
        className={controls.button}
        data-touch-target
        onClick={() => {
          setState({ ...INITIAL_RIVER });
          setSelected(null);
          setTrips(0);
          onProgress();
        }}
      >
        Thử lại
      </button>
    </div>
  );
}
