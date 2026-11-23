'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useDrag } from '@/engine/input/use-drag';
import {
  ArtButton,
  Kid,
  PuzzleArt,
  usePuzzleFeedback,
} from '@/engine/stage2d/puzzle-art';
import styles from '@/engine/stage2d/puzzle.module.css';
import controls from '@/engine/input/input.module.css';
import touch from '@/engine/stage2d/touch-scene.module.css';

type GiftId = number | 'basket';
const kidX = (kid: number) => 60 + kid * 120;

function Cake() {
  return (
    <g aria-hidden="true">
      <path d="M-27 0q0-27 27-27T27 0v16q-27 14-54 0z" fill="#ffd66e" />
      <path
        d="M-14-12l5 9m10-13 5 10m8-7 4 7"
        stroke="#b47b3c"
        strokeWidth={3}
      />
      <path d="M-24 8q24 10 48 0" fill="none" stroke="#efb08a" />
    </g>
  );
}

function Basket({ count }: { count: number }) {
  return (
    <g aria-hidden="true">
      <path
        d="M-112-6v-12q0-55 112-55t112 55v12"
        fill="none"
        stroke="#b47b3c"
        strokeWidth={9}
      />
      <path d="M-130-10h260l-22 87h-216z" fill="#ffca70" />
      <path
        d="M-121 12h242m-236 24h230m-224 24h218m-175-66 12 80m35-80 4 80m35-80-4 80m35-80-12 80"
        stroke="#b47b3c"
        strokeWidth={3}
      />
      <text
        x={0}
        y={51}
        textAnchor="middle"
        fontSize={23}
        fontWeight={800}
        fill="#231f3f"
        stroke="none"
      >
        {count} bánh
      </text>
    </g>
  );
}

/** Hook chung quản lý kéo; cảnh chỉ xác định bé nhận theo điểm thả. */
function DraggableGift({
  item,
  cakes,
  svgRef,
  selected,
  onSelect,
  onGive,
  onMiss,
  onProgress,
}: {
  item: GiftId;
  cakes: readonly number[];
  svgRef: RefObject<SVGSVGElement | null>;
  selected: boolean;
  onSelect(item: GiftId): void;
  onGive(item: GiftId, kid: number): void;
  onMiss(): void;
  onProgress(): void;
}) {
  const reported = useRef(false);
  const basket = item === 'basket';
  const drag = useDrag({
    svgRef,
    initialPosition: {
      x: basket ? 180 : 100 + item * 80,
      y: basket ? 105 : 65,
    },
    target: { x: 0, y: 213, width: 360, height: 163 },
    onDrop: onProgress,
    onMiss,
    onProgress: () => {
      onSelect(item);
      onProgress();
    },
  });
  useEffect(() => {
    if (!drag.placed || reported.current) return;
    reported.current = true;
    onGive(item, Math.min(2, Math.floor(drag.position.x / 120)));
  }, [drag.placed, drag.position.x, item, onGive]);
  return (
    <g
      {...drag.dragProps}
      aria-label={basket ? 'Giỏ bánh' : `Bánh ${item + 1}`}
      aria-pressed={selected}
      data-touch-target
      transform={`translate(${drag.position.x} ${drag.position.y})`}
    >
      {basket ? <Basket count={cakes.length} /> : <Cake />}
      {selected && (
        <rect
          x={basket ? -135 : -33}
          y={basket ? -76 : -33}
          width={basket ? 270 : 66}
          height={basket ? 160 : 66}
          rx={12}
          fill="none"
          stroke="#126b5e"
          strokeDasharray="7 6"
        />
      )}
      <rect
        x={basket ? -133 : -32}
        y={basket ? -20 : -32}
        width={basket ? 266 : 64}
        height={basket ? 100 : 64}
        fill="transparent"
        stroke="none"
      />
    </g>
  );
}

export default function Scene({ onSolved, onWrong, onProgress }: SceneProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const { reaction, wrong } = usePuzzleFeedback(onWrong);
  const [received, setReceived] = useState<(number | null)[]>([
    null,
    null,
    null,
  ]);
  const [basketKid, setBasketKid] = useState<number | null>(null);
  const [selected, setSelected] = useState<GiftId | null>(null);
  const [revision, setRevision] = useState(0);
  const cakes = [0, 1, 2].filter((cake) => !received.includes(cake));
  const give = (item: GiftId, kid: number) => {
    setSelected(null);
    setRevision((value) => value + 1);
    if (received[kid] !== null) {
      wrong('occupied');
      return;
    }
    if (item === 'basket' && cakes.length !== 1) {
      wrong(cakes.length ? 'many' : 'empty');
      return;
    }
    const next = received.map((cake, index) =>
      index === kid ? (item === 'basket' ? cakes[0] : item) : cake,
    );
    setReceived(next);
    onProgress();
    if (item === 'basket') {
      setBasketKid(kid);
      onSolved();
    } else if (next.every((cake) => cake !== null)) wrong('empty');
  };
  const miss = () => {
    setSelected(null);
    setRevision((value) => value + 1);
    wrong('miss');
  };
  return (
    <div
      className={`${styles.scene} ${touch.scrollable}`}
      data-testid="gift-state"
      data-basket-kid={basketKid ?? 'none'}
    >
      <PuzzleArt
        svgRef={svgRef}
        label="Ba bánh trong giỏ và ba bé đang chờ nhận bánh"
        height={390}
        reaction={reaction}
      >
        <path d="M0 0h360v390H0z" fill="#dff4f3" stroke="none" />
        <path d="M0 207h360v183H0z" fill="#e3f4d5" stroke="none" />
        {[0, 1, 2].map((kid) => (
          <ArtButton
            key={kid}
            label={`Bé ${kid + 1}${received[kid] === null ? ', chưa có bánh' : ', đã có bánh'}`}
            x={kid * 120 + 6}
            y={218}
            width={108}
            height={157}
            onPress={() =>
              selected === null ? wrong('choose') : give(selected, kid)
            }
          >
            <Kid
              x={kidX(kid)}
              y={237}
              shirt={['#59b9d5', '#ef6b68', '#ffd66e'][kid]}
            />
            <text
              x={kidX(kid)}
              y={228}
              textAnchor="middle"
              fontSize={19}
              fill="#231f3f"
              stroke="none"
            >
              Bé {kid + 1}
            </text>
            {received[kid] !== null && (
              <g transform={`translate(${kidX(kid)} 348)`}>
                {basketKid === kid ? (
                  <g transform="scale(0.34)">
                    <Basket count={1} />
                    <g transform="translate(0 -22)">
                      <Cake />
                    </g>
                  </g>
                ) : (
                  <Cake />
                )}
              </g>
            )}
          </ArtButton>
        ))}
        {basketKid === null && (
          <DraggableGift
            key={`basket-${revision}`}
            item="basket"
            cakes={cakes}
            svgRef={svgRef}
            selected={selected === 'basket'}
            onSelect={setSelected}
            onGive={give}
            onMiss={miss}
            onProgress={onProgress}
          />
        )}
        {basketKid === null &&
          cakes.map((cake) => (
            <DraggableGift
              key={`${cake}-${revision}`}
              item={cake}
              cakes={cakes}
              svgRef={svgRef}
              selected={selected === cake}
              onSelect={setSelected}
              onGive={give}
              onMiss={miss}
              onProgress={onProgress}
            />
          ))}
      </PuzzleArt>
      <p className={styles.note} role="status">
        {basketKid !== null
          ? `Bé ${basketKid + 1} nhận giỏ còn một bánh.`
          : `Trong giỏ còn ${cakes.length} bánh. ${selected === null ? 'Chọn bánh hoặc giỏ, rồi chạm bé nhận.' : selected === 'basket' ? 'Đã chọn cả giỏ. Chạm bé nhận.' : `Đã chọn bánh ${selected + 1}. Chạm bé nhận.`}`}
      </p>
      <button
        type="button"
        className={controls.button}
        data-touch-target
        onClick={() => {
          setReceived([null, null, null]);
          setBasketKid(null);
          setSelected(null);
          setRevision((value) => value + 1);
          onProgress();
        }}
      >
        Thử lại
      </button>
    </div>
  );
}
