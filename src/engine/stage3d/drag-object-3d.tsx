'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useThree } from '@react-three/fiber';
import { Plane, Vector3 } from 'three';
import type { Vec3 } from '@/domain/view/view-check';

interface CaptureTarget {
  hasPointerCapture(id: number): boolean;
  setPointerCapture(id: number): void;
  releasePointerCapture(id: number): void;
}

function canCapture(target: unknown): target is CaptureTarget {
  return (
    typeof target === 'object' &&
    target !== null &&
    'hasPointerCapture' in target &&
    typeof target.hasPointerCapture === 'function' &&
    'setPointerCapture' in target &&
    typeof target.setPointerCapture === 'function' &&
    'releasePointerCapture' in target &&
    typeof target.releasePointerCapture === 'function'
  );
}

/** Kéo vật theo mặt phẳng hướng camera; khóa OrbitControls ngay khi nhận con trỏ. */
export function DragObject3D({
  children,
  enabled = true,
  onStart,
  onDrag,
  onEnd,
}: {
  children: ReactNode;
  enabled?: boolean;
  onStart(): void;
  onDrag(delta: Vec3): void;
  onEnd(cancelled: boolean): void;
}) {
  const { camera, gl, invalidate } = useThree();
  const get = useThree((state) => state.get);
  const active = useRef<{
    pointerId: number;
    target: CaptureTarget;
    start: Vector3;
    plane: Plane;
    restoreControls(): void;
  } | null>(null);
  const callbacks = useRef({ onStart, onDrag, onEnd });
  useEffect(() => {
    callbacks.current = { onStart, onDrag, onEnd };
  }, [onStart, onDrag, onEnd]);
  const finish = (cancelled: boolean) => {
    const drag = active.current;
    if (!drag) return;
    active.current = null;
    if (drag.target.hasPointerCapture(drag.pointerId))
      drag.target.releasePointerCapture(drag.pointerId);
    drag.restoreControls();
    callbacks.current.onEnd(cancelled);
    invalidate();
  };
  useEffect(() => {
    const cancel = (notify = true) => {
      const drag = active.current;
      if (!drag) return;
      active.current = null;
      if (drag.target.hasPointerCapture(drag.pointerId))
        drag.target.releasePointerCapture(drag.pointerId);
      drag.restoreControls();
      if (notify) callbacks.current.onEnd(true);
      invalidate();
    };
    const hidden = () => {
      if (document.hidden) cancel();
    };
    const blur = () => cancel();
    const pointerCancel = (event: PointerEvent) => {
      if (active.current?.pointerId === event.pointerId) cancel();
    };
    const deferred = new Set<number>();
    // R3F 9 không chuyển pointercancel/lostpointercapture vào mesh; nghe sự kiện Canvas thật.
    const lost = (event: PointerEvent) => {
      const timer = window.requestAnimationFrame(() => {
        deferred.delete(timer);
        if (active.current?.pointerId === event.pointerId) cancel();
      });
      deferred.add(timer);
    };
    gl.domElement.addEventListener('pointercancel', pointerCancel);
    gl.domElement.addEventListener('lostpointercapture', lost);
    window.addEventListener('blur', blur);
    document.addEventListener('visibilitychange', hidden);
    return () => {
      gl.domElement.removeEventListener('pointercancel', pointerCancel);
      gl.domElement.removeEventListener('lostpointercapture', lost);
      for (const timer of deferred) window.cancelAnimationFrame(timer);
      window.removeEventListener('blur', blur);
      document.removeEventListener('visibilitychange', hidden);
      cancel(false);
    };
  }, [gl, invalidate]);
  return (
    <group
      onPointerDown={(event) => {
        if (
          !enabled ||
          active.current ||
          event.button !== 0 ||
          !event.isPrimary
        )
          return;
        const target = event.target;
        if (!canCapture(target)) return;
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const normal = camera.getWorldDirection(new Vector3());
        const plane = new Plane().setFromNormalAndCoplanarPoint(
          normal,
          event.point,
        );
        const start = event.ray.intersectPlane(plane, new Vector3());
        if (!start) return;
        let restoreControls = () => {};
        const controls = get().controls;
        if (
          controls &&
          'enabled' in controls &&
          typeof controls.enabled === 'boolean'
        ) {
          const previous = controls.enabled;
          controls.enabled = false;
          restoreControls = () => {
            controls.enabled = previous;
          };
        }
        active.current = {
          pointerId: event.pointerId,
          target,
          plane,
          start,
          restoreControls,
        };
        target.setPointerCapture(event.pointerId);
        callbacks.current.onStart();
      }}
      onPointerMove={(event) => {
        const drag = active.current;
        if (!drag || event.pointerId !== drag.pointerId) return;
        event.stopPropagation();
        const point = event.ray.intersectPlane(drag.plane, new Vector3());
        if (point) {
          point.sub(drag.start);
          callbacks.current.onDrag([point.x, point.y, point.z]);
          invalidate();
        }
      }}
      onPointerUp={(event) => {
        if (event.pointerId === active.current?.pointerId) {
          event.stopPropagation();
          finish(false);
        }
      }}
    >
      {children}
    </group>
  );
}
