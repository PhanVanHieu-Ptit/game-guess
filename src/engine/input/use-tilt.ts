'use client';
import { useRef } from 'react';
import { useSensor } from './use-sensor';

export interface Tilt {
  x: number;
  y: number;
}
/** Góc tương đối với tư thế đầu tiên; x là nghiêng ngang, y là nghiêng dọc, đơn vị độ. */
export function useTilt(
  onTilt: (tilt: Tilt) => void,
  {
    deadZone = 3,
    fallback = { x: 30, y: 0 },
  }: { deadZone?: number; fallback?: Tilt } = {},
) {
  const baseline = useRef<Tilt | null>(null);
  const sensor = useSensor('orientation', (event) => {
    if (
      event.beta === null ||
      event.gamma === null ||
      !Number.isFinite(event.beta) ||
      !Number.isFinite(event.gamma)
    )
      return false;
    const current = { x: event.gamma, y: event.beta };
    baseline.current ??= current;
    const wrap = (angle: number) => ((angle + 540) % 360) - 180;
    const x = wrap(current.x - baseline.current.x);
    const y = wrap(current.y - baseline.current.y);
    if (Math.hypot(x, y) >= deadZone) onTilt({ x, y });
    return true;
  });
  return {
    ...sensor,
    explanation:
      'Cho phép cảm biến chuyển động để nghiêng điện thoại trong màn này. Bạn cũng có thể chạm nút Nghiêng.',
    fallbackProps: {
      type: 'button' as const,
      onClick: () => onTilt(fallback),
      'aria-label': 'Nghiêng',
    },
    tilt: onTilt,
  };
}
