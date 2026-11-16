'use client';
import { useEffect, useEffectEvent, useRef, useState } from 'react';

export type SensorStatus =
  'idle' | 'requesting' | 'listening' | 'denied' | 'unsupported';
type SensorKind = 'motion' | 'orientation';
type PermissionConstructor = {
  requestPermission?: () => Promise<'granted' | 'denied'>;
};

/** Không xin quyền khi mount: enable phải được gọi trực tiếp từ một lần chạm. */
export function useSensor<K extends SensorKind>(
  kind: K,
  onSample: (
    event: K extends 'motion' ? DeviceMotionEvent : DeviceOrientationEvent,
  ) => boolean,
) {
  const [status, setStatus] = useState<SensorStatus>('idle');
  const mounted = useRef(false);
  const pending = useRef(false);
  const sample = useEffectEvent(onSample);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const enable = async () => {
    if (pending.current || status === 'listening') return;
    const constructor: PermissionConstructor | undefined =
      kind === 'motion'
        ? (window.DeviceMotionEvent as PermissionConstructor | undefined)
        : (window.DeviceOrientationEvent as PermissionConstructor | undefined);
    if (!constructor || window.isSecureContext === false) {
      setStatus('unsupported');
      return;
    }
    pending.current = true;
    setStatus('requesting');
    try {
      // Gọi trước bất kỳ await nào để giữ user activation của Safari.
      const permission = constructor.requestPermission
        ? await constructor.requestPermission()
        : 'granted';
      if (mounted.current)
        setStatus(permission === 'granted' ? 'listening' : 'denied');
    } catch {
      if (mounted.current) setStatus('denied');
    } finally {
      pending.current = false;
    }
  };

  useEffect(() => {
    if (status !== 'listening') return;
    // Có trình duyệt khai báo API nhưng không phát dữ liệu (desktop, policy chặn, cảm biến thiếu).
    const timeout = setTimeout(() => setStatus('unsupported'), 2500);
    const handle = (event: DeviceMotionEvent | DeviceOrientationEvent) => {
      if (
        sample(
          event as K extends 'motion'
            ? DeviceMotionEvent
            : DeviceOrientationEvent,
        )
      )
        clearTimeout(timeout);
    };
    const eventName = kind === 'motion' ? 'devicemotion' : 'deviceorientation';
    window.addEventListener(eventName, handle);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener(eventName, handle);
    };
  }, [kind, status]);
  return { status, enable };
}
