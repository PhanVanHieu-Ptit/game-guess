'use client';
import type { ButtonHTMLAttributes } from 'react';
import type { SensorStatus } from './use-sensor';
import styles from './input.module.css';

/** Đặt cạnh sân chơi; đường chạm luôn sẵn, kể cả khi cảm biến đang hoạt động. */
export function SensorControls({
  sensor,
  label,
}: {
  sensor: {
    status: SensorStatus;
    explanation: string;
    enable(): Promise<void>;
    fallbackProps: ButtonHTMLAttributes<HTMLButtonElement>;
  };
  label: string;
}) {
  const unavailable =
    sensor.status === 'denied' || sensor.status === 'unsupported';
  return (
    <div className={styles.controls}>
      <p>{sensor.explanation}</p>
      {unavailable && (
        <p role="status">
          {sensor.status === 'denied'
            ? 'Bạn chưa cho phép cảm biến.'
            : 'Thiết bị không gửi dữ liệu cảm biến.'}{' '}
          Hãy dùng nút chạm bên dưới.
        </p>
      )}
      {sensor.status !== 'listening' && !unavailable && (
        <button
          type="button"
          data-touch-target
          className={styles.button}
          disabled={sensor.status === 'requesting'}
          onClick={sensor.enable}
        >
          Bật cảm biến
        </button>
      )}
      <button
        {...sensor.fallbackProps}
        data-touch-target
        className={styles.button}
      >
        {label}
      </button>
    </div>
  );
}
