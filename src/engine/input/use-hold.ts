'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent,
} from 'react';

type HoldGesture =
  | { kind: 'pointer'; id: number; target: SVGElement }
  | { kind: 'keyboard'; key: string };

const isBlocked = () =>
  document.visibilityState === 'hidden' ||
  document.querySelector('dialog[open]') !== null;

function releaseCapture(gesture: HoldGesture) {
  if (
    gesture.kind === 'pointer' &&
    gesture.target.hasPointerCapture?.(gesture.id)
  )
    gesture.target.releasePointerCapture(gesture.id);
}

/** Một lần giữ liên tục; thả sớm phải giữ lại từ đầu, ngắt tương tác thì hủy. */
export function useHold(
  onComplete: () => void,
  {
    durationMs = 4000,
    onRelease,
    onStart,
  }: {
    durationMs?: number;
    onRelease?: () => void;
    onStart?: () => void;
  } = {},
) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [finished, setFinished] = useState(false);
  const mounted = useRef(false);
  const completed = useRef(false);
  const gesture = useRef<HoldGesture | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ticker = useRef<ReturnType<typeof setInterval> | null>(null);
  const callbacks = useRef({ onComplete, onRelease, onStart });

  useEffect(() => {
    callbacks.current = { onComplete, onRelease, onStart };
  }, [onComplete, onRelease, onStart]);

  const clear = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    if (ticker.current !== null) clearInterval(ticker.current);
    timer.current = null;
    ticker.current = null;
  }, []);

  const cancel = useCallback(
    (notify = false) => {
      const active = gesture.current;
      if (!active) return;
      gesture.current = null;
      clear();
      releaseCapture(active);
      if (mounted.current) {
        setHolding(false);
        setProgress(0);
        if (notify) callbacks.current.onRelease?.();
      }
    },
    [clear],
  );

  const begin = (active: HoldGesture) => {
    if (!mounted.current || completed.current || gesture.current || isBlocked())
      return;
    gesture.current = active;
    const startedAt = performance.now();
    setHolding(true);
    setProgress(0);
    ticker.current = setInterval(() => {
      if (
        isBlocked() ||
        (active.kind === 'pointer' && !active.target.isConnected)
      ) {
        cancel();
        return;
      }
      setProgress(Math.min(1, (performance.now() - startedAt) / durationMs));
    }, 100);
    timer.current = setTimeout(() => {
      if (gesture.current !== active || !mounted.current) return;
      if (
        isBlocked() ||
        (active.kind === 'pointer' && !active.target.isConnected)
      ) {
        cancel();
        return;
      }
      completed.current = true;
      gesture.current = null;
      clear();
      releaseCapture(active);
      setHolding(false);
      setProgress(1);
      setFinished(true);
      callbacks.current.onComplete();
    }, durationMs);
    callbacks.current.onStart?.();
  };

  useEffect(() => {
    mounted.current = true;
    const stop = () => cancel();
    const availabilityChanged = () => {
      if (isBlocked()) cancel();
    };
    const pointerUp = (event: globalThis.PointerEvent) => {
      if (
        gesture.current?.kind === 'pointer' &&
        gesture.current.id === event.pointerId
      )
        cancel(true);
    };
    const pointerCancel = (event: globalThis.PointerEvent) => {
      if (
        gesture.current?.kind === 'pointer' &&
        gesture.current.id === event.pointerId
      )
        cancel();
    };
    window.addEventListener('blur', stop);
    document.addEventListener('visibilitychange', availabilityChanged);
    document.addEventListener('pointerup', pointerUp, true);
    document.addEventListener('pointercancel', pointerCancel, true);
    const observer = new MutationObserver(availabilityChanged);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['open'],
    });
    return () => {
      mounted.current = false;
      cancel();
      clear();
      window.removeEventListener('blur', stop);
      document.removeEventListener('visibilitychange', availabilityChanged);
      document.removeEventListener('pointerup', pointerUp, true);
      document.removeEventListener('pointercancel', pointerCancel, true);
      observer.disconnect();
    };
  }, [cancel, clear]);

  return {
    holding,
    progress,
    finished,
    holdProps: {
      role: 'button' as const,
      tabIndex: 0,
      'aria-pressed': holding,
      'aria-disabled': progress === 1,
      style: { touchAction: 'none' as const, userSelect: 'none' as const },
      onPointerDown: (event: PointerEvent<SVGElement>) => {
        if (
          !event.isPrimary ||
          event.button !== 0 ||
          gesture.current ||
          completed.current ||
          isBlocked()
        )
          return;
        event.preventDefault();
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // Nếu trình duyệt không giữ được capture, listener toàn trang vẫn bắt lúc thả.
        }
        begin({
          kind: 'pointer',
          id: event.pointerId,
          target: event.currentTarget,
        });
      },
      onPointerUp: (event: PointerEvent<SVGElement>) => {
        if (
          gesture.current?.kind === 'pointer' &&
          gesture.current.id === event.pointerId
        )
          cancel(true);
      },
      onPointerCancel: (event: PointerEvent<SVGElement>) => {
        if (
          gesture.current?.kind === 'pointer' &&
          gesture.current.id === event.pointerId
        )
          cancel();
      },
      onLostPointerCapture: (event: PointerEvent<SVGElement>) => {
        if (
          gesture.current?.kind === 'pointer' &&
          gesture.current.id === event.pointerId
        )
          cancel();
      },
      onKeyDown: (event: KeyboardEvent<SVGElement>) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        if (!event.repeat) begin({ kind: 'keyboard', key: event.key });
      },
      onKeyUp: (event: KeyboardEvent<SVGElement>) => {
        if (
          gesture.current?.kind === 'keyboard' &&
          gesture.current.key === event.key
        )
          cancel(true);
      },
      onBlur: () => cancel(),
    },
  };
}
