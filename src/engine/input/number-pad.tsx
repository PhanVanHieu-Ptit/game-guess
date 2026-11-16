'use client';

import { useId, useState } from 'react';
import styles from './number-pad.module.css';

/** Bàn phím số bằng DOM: chạm hoàn toàn, không bật bàn phím hệ thống che cảnh. */
export function NumberPad({
  label,
  maxDigits,
  disabled = false,
  onSubmit,
  onProgress,
}: {
  label: string;
  maxDigits: number;
  disabled?: boolean;
  onSubmit(value: string): void;
  onProgress(): void;
}) {
  const [value, setValue] = useState('');
  const id = useId();
  return (
    <details className={styles.pad}>
      <summary data-touch-target>{label}</summary>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (value && !disabled) onSubmit(value);
        }}
      >
        <label htmlFor={id}>Số nhà</label>
        <output id={id} aria-live="polite" className={styles.value}>
          {value || '— —'}
        </output>
        <div className={styles.keys} role="group" aria-label="Bàn phím số">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map((digit) => (
            <button
              key={digit}
              type="button"
              data-touch-target
              disabled={disabled || value.length >= maxDigits}
              onClick={() => {
                setValue((current) => (current + digit).slice(0, maxDigits));
                onProgress();
              }}
            >
              {digit}
            </button>
          ))}
          <button
            type="button"
            data-touch-target
            disabled={disabled || !value}
            onClick={() => {
              setValue((current) => current.slice(0, -1));
              onProgress();
            }}
          >
            Xóa
          </button>
          <button type="submit" data-touch-target disabled={disabled || !value}>
            Gửi
          </button>
        </div>
      </form>
    </details>
  );
}
