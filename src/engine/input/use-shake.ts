'use client';
import { useRef } from 'react';
import { useSensor } from './use-sensor';

export function useShake(
  onShake: () => void,
  { threshold = 12, cooldownMs = 800 } = {},
) {
  const previous = useRef<readonly number[] | null>(null);
  const lastShake = useRef(-Infinity);
  const sensor = useSensor('motion', (event) => {
    const acceleration = event.acceleration;
    const linear =
      acceleration &&
      [acceleration.x, acceleration.y, acceleration.z].every(
        (n) => typeof n === 'number' && Number.isFinite(n),
      );
    const data = linear ? acceleration : event.accelerationIncludingGravity;
    if (
      !data ||
      ![data.x, data.y, data.z].every(
        (n) => typeof n === 'number' && Number.isFinite(n),
      )
    )
      return false;
    const values = [data.x!, data.y!, data.z!];
    // Khi chỉ có gia tốc gồm trọng lực, lấy chênh lệch hai mẫu để đứng yên không thành lắc.
    const prior = previous.current;
    previous.current = values;
    const force = Math.hypot(
      ...values.map((value, i) =>
        linear ? value : prior ? value - prior[i] : 0,
      ),
    );
    const now = performance.now();
    if (force >= threshold && now - lastShake.current >= cooldownMs) {
      lastShake.current = now;
      onShake();
    }
    return true;
  });
  return {
    ...sensor,
    explanation:
      'Cho phép cảm biến chuyển động để lắc điện thoại trong màn này. Bạn cũng có thể chạm nút Lắc.',
    fallbackProps: {
      type: 'button' as const,
      onClick: onShake,
      'aria-label': 'Lắc',
    },
  };
}
