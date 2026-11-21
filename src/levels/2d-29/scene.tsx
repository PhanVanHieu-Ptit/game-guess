'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import {
  ArtButton,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

const INITIAL = [true, true, true, false, false, false];
const center = (cup: number) => 30 + (cup - 1) * 60;
const cupLabel = (cup: number, full: boolean) =>
  `Cốc ${cup}, ${full ? 'đầy' : 'rỗng'}`;

function Cup({
  cup,
  full,
  selected = false,
}: {
  cup: number;
  full: boolean;
  selected?: boolean;
}) {
  return (
    <g aria-hidden="true">
      {selected && (
        <rect
          x={-27}
          y={-62}
          width={54}
          height={148}
          rx={12}
          fill="#ffd66e"
          stroke="#126b5e"
        />
      )}
      <path d="M-22-50v88q0 10 10 10h24q10 0 10-10v-88z" fill="#fffdf3" />
      {full && (
        <path
          d="M-20-42h40v80q0 8-10 8h-20q-10 0-10-8z"
          fill="#59b9d5"
          stroke="none"
        />
      )}
      {full && <path d="M-20-42h40" stroke="#2786a5" strokeWidth={2} />}
      <path d="M-14-39v12" stroke="#b8bbce" strokeWidth={3} />
      <text
        x={0}
        y={77}
        textAnchor="middle"
        fontSize={25}
        fontWeight={800}
        fill="#231f3f"
        stroke="none"
      >
        {cup}
      </text>
      <rect
        x={-28}
        y={-62}
        width={56}
        height={148}
        fill="transparent"
        stroke="none"
      />
    </g>
  );
}

/** useDrag xử lý toàn bộ pointer/capture/cancel; cảnh chỉ quyết định cốc nhận nước. */
function PourableCup({
  cup,
  svgRef,
  selected,
  onSelect,
  onPour,
  onMiss,
  onProgress,
}: {
  cup: number;
  svgRef: RefObject<SVGSVGElement | null>;
  selected: boolean;
  onSelect(cup: number): void;
  onPour(from: number, to: number): void;
  onMiss(): void;
  onProgress(): void;
}) {
  const reported = useRef(false);
  const drag = useDrag({
    svgRef,
    initialPosition: { x: center(cup), y: 140 },
    target: { x: 0, y: 60, width: 360, height: 170 },
    onDrop: onProgress,
    onMiss,
    onProgress: () => {
      onSelect(cup);
      onProgress();
    },
  });
  useEffect(() => {
    if (!drag.placed || reported.current) return;
    reported.current = true;
    onPour(cup, Math.min(6, Math.floor(drag.position.x / 60) + 1));
  }, [cup, drag.placed, drag.position.x, onPour]);
  return (
    <g
      {...drag.dragProps}
      aria-label={cupLabel(cup, true)}
      aria-pressed={selected}
      data-touch-target
      transform={`translate(${drag.position.x} ${drag.position.y})`}
    >
      <Cup cup={cup} full selected={selected} />
    </g>
  );
}

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const [selected, setSelected] = useState<number | null>(null);
  const [poured, setPoured] = useState<boolean[] | null>(null);
  const pour = (from: number, to: number) => {
    setSelected(null);
    if (INITIAL[to - 1]) {
      wrong('full');
      return;
    }
    const next = INITIAL.map((full, index) =>
      index === from - 1 ? false : index === to - 1 ? true : full,
    );
    setPoured(next);
    onProgress();
    if (next.every((full, index) => full === (index % 2 === 0))) onSolved();
    else wrong('pour');
  };
  const water = poured ?? INITIAL;
  return (
    <div className={`${styles.scene} ${touch.scrollable}`}>
      <PuzzleArt
        svgRef={svgRef}
        label="Sáu cốc giống nhau, ban đầu ba cốc đầu đầy và ba cốc sau rỗng"
        height={265}
        reaction={reaction}
      >
        <path d="M0 0h360v265H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 190h360v75H0z" fill="#ffe1b2" stroke="none" />
        <path d="M8 238h344" stroke="#b47b3c" strokeWidth={5} />
        <g data-testid="cup-row" data-water={water.map(Number).join('')}>
          {water.map((full, index) => {
            const cup = index + 1;
            if (poured)
              return (
                <g
                  key={cup}
                  role="img"
                  aria-label={cupLabel(cup, full)}
                  transform={`translate(${center(cup)} 140)`}
                >
                  <Cup cup={cup} full={full} />
                </g>
              );
            // Cốc đầy được vẽ sau các đích để không che cốc đang kéo.
            if (full) return null;
            return (
              <ArtButton
                key={cup}
                label={cupLabel(cup, false)}
                x={center(cup) - 28}
                y={78}
                width={56}
                height={148}
                onPress={() =>
                  selected ? pour(selected, cup) : wrong('empty')
                }
              >
                <g transform={`translate(${center(cup)} 140)`}>
                  <Cup cup={cup} full={false} />
                </g>
              </ArtButton>
            );
          })}
          {!poured &&
            [1, 2, 3].map((cup) => (
              <PourableCup
                key={cup}
                cup={cup}
                svgRef={svgRef}
                selected={selected === cup}
                onSelect={setSelected}
                onPour={pour}
                onProgress={onProgress}
                onMiss={() => {
                  setSelected(null);
                  wrong('miss');
                }}
              />
            ))}
        </g>
      </PuzzleArt>
      <p className={styles.note}>
        Các cốc đánh số 1–6 từ trái sang phải. Chỉ nhấc một cốc để rót hết, rồi
        đặt lại chỗ cũ. Không đổi chỗ cốc.
      </p>
      <p className={styles.note} role="status">
        {poured
          ? `Sau khi rót: ${water.map((full) => (full ? 'đầy' : 'rỗng')).join(', ')}.`
          : selected
            ? `Đã chọn cốc ${selected}. Chạm cốc muốn nhận nước.`
            : 'Kéo cốc đầy đến cốc khác, hoặc chạm chọn cốc rồi chạm đích.'}
      </p>
      {poured && (
        <button
          type="button"
          className={controls.button}
          data-touch-target
          onClick={() => {
            setPoured(null);
            setSelected(null);
            onProgress();
          }}
        >
          Thử lại
        </button>
      )}
    </div>
  );
}
