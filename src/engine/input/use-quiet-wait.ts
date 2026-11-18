'use client';

import {
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from 'react';

/** Đợi một khoảng yên liên tục; mở hộp thoại hoặc ẩn tab thì phải đợi lại từ đầu. */
export function useQuietWait(
  onComplete: () => void,
  { durationMs = 6000 }: { durationMs?: number } = {},
) {
  const [finished, setFinished] = useState(false);
  const completed = useRef(false);
  const restartTimer = useRef<(() => void) | null>(null);
  const complete = useEffectEvent(onComplete);
  const restart = useCallback(() => restartTimer.current?.(), []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    const blocked = () =>
      document.visibilityState === 'hidden' ||
      document.querySelector('dialog[open]') !== null;
    let wasBlocked = blocked();

    const clear = () => {
      if (timer !== null) clearTimeout(timer);
      timer = null;
    };
    const arm = () => {
      clear();
      if (completed.current || blocked()) return;
      timer = setTimeout(() => {
        timer = null;
        // Kiểm lại tại thời điểm hết giờ, kể cả khi sự kiện thay đổi vừa tới.
        if (completed.current || blocked()) return;
        completed.current = true;
        setFinished(true);
        complete();
      }, durationMs);
    };
    const availabilityChanged = () => {
      const next = blocked();
      if (next === wasBlocked) return;
      wasBlocked = next;
      arm();
    };

    restartTimer.current = arm;
    const interactions = ['pointerdown', 'touchstart', 'click', 'keydown'];
    for (const name of interactions) document.addEventListener(name, arm, true);
    document.addEventListener('visibilitychange', availabilityChanged);
    const observer = new MutationObserver(availabilityChanged);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open'],
    });
    arm();

    return () => {
      clear();
      restartTimer.current = null;
      observer.disconnect();
      for (const name of interactions)
        document.removeEventListener(name, arm, true);
      document.removeEventListener('visibilitychange', availabilityChanged);
    };
  }, [durationMs]);

  return { restart, finished };
}
