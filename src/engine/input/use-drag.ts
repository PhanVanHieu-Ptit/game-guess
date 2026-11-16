'use client';
import {
  useRef,
  useState,
  type PointerEvent,
  type RefObject,
  type KeyboardEvent,
} from 'react';

export interface Point {
  x: number;
  y: number;
}
export interface DropZone extends Point {
  width: number;
  height: number;
}
interface Options {
  svgRef: RefObject<SVGSVGElement | null>;
  initialPosition: Point;
  target: DropZone;
  onDrop(): void;
  onMiss?(): void;
  onProgress?(): void;
}
/** Kéo theo tọa độ viewBox (CTM), hoặc chạm chọn vật rồi chạm vùng đích. */
export function useDrag({
  svgRef,
  initialPosition,
  target,
  onDrop,
  onMiss,
  onProgress,
}: Options) {
  const [position, setPosition] = useState(initialPosition);
  const [selected, setSelected] = useState(false);
  const [placed, setPlaced] = useState(false);
  const gesture = useRef<{
    id: number;
    start: Point;
    origin: Point;
    moved: boolean;
  } | null>(null);
  const point = (event: PointerEvent<SVGElement>): Point | null => {
    const svg = svgRef.current;
    const matrix = svg?.getScreenCTM();
    if (!svg || !matrix) return null;
    const p = svg.createSVGPoint();
    p.x = event.clientX;
    p.y = event.clientY;
    try {
      return p.matrixTransform(matrix.inverse());
    } catch {
      return null;
    }
  };
  const finish = (p: Point) => {
    if (placed) return;
    const inside =
      p.x >= target.x &&
      p.x <= target.x + target.width &&
      p.y >= target.y &&
      p.y <= target.y + target.height;
    gesture.current = null;
    setSelected(false);
    if (inside) {
      setPosition(p);
      setPlaced(true);
      onDrop();
    } else {
      setPosition(initialPosition);
      onMiss?.();
    }
  };
  const tapTarget = () => {
    if (selected && !placed)
      finish({
        x: target.x + target.width / 2,
        y: target.y + target.height / 2,
      });
  };
  const key = (action: () => void) => (event: KeyboardEvent<SVGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };
  const select = () => {
    if (!placed) {
      setSelected(true);
      onProgress?.();
    }
  };
  return {
    position,
    selected,
    placed,
    dragProps: {
      role: 'button' as const,
      tabIndex: placed ? -1 : 0,
      'aria-pressed': selected,
      'aria-disabled': placed,
      style: { touchAction: 'none' as const, cursor: 'grab' },
      onKeyDown: key(select),
      onClick: select,
      onPointerDown: (event: PointerEvent<SVGElement>) => {
        if (placed || gesture.current || !event.isPrimary || event.button !== 0)
          return;
        const p = point(event);
        if (!p) {
          select();
          return;
        }
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        gesture.current = {
          id: event.pointerId,
          start: p,
          origin: position,
          moved: false,
        };
        select();
      },
      onPointerMove: (event: PointerEvent<SVGElement>) => {
        const g = gesture.current;
        if (!g || g.id !== event.pointerId) return;
        const p = point(event);
        if (!p) return;
        if (Math.hypot(p.x - g.start.x, p.y - g.start.y) > 3) g.moved = true;
        setPosition({
          x: g.origin.x + p.x - g.start.x,
          y: g.origin.y + p.y - g.start.y,
        });
      },
      onPointerUp: (event: PointerEvent<SVGElement>) => {
        const g = gesture.current;
        if (!g || g.id !== event.pointerId) return;
        const p = point(event);
        gesture.current = null;
        if (g.moved && p)
          finish({
            x: g.origin.x + p.x - g.start.x,
            y: g.origin.y + p.y - g.start.y,
          });
        if (event.currentTarget.hasPointerCapture(event.pointerId))
          event.currentTarget.releasePointerCapture(event.pointerId);
      },
      onPointerCancel: () => {
        gesture.current = null;
        setPosition(initialPosition);
        setSelected(false);
      },
      onLostPointerCapture: () => {
        if (gesture.current) {
          gesture.current = null;
          setPosition(initialPosition);
          setSelected(false);
        }
      },
    },
    targetProps: {
      role: 'button' as const,
      tabIndex: 0,
      'aria-disabled': !selected || placed,
      onClick: tapTarget,
      onKeyDown: (event: KeyboardEvent<SVGElement>) => key(tapTarget)(event),
    },
  };
}
