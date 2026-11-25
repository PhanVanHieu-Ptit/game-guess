'use client';

import { useState } from 'react';
import styles from './experiment.module.css';

export function WordWorkshop({
  onProgress,
  onSolved,
}: {
  onProgress(): void;
  onSolved(): void;
}) {
  const [reversed, setReversed] = useState(false);
  const [swapped, setSwapped] = useState(false);
  const words = swapped ? ['BẬT', 'MÍ'] : ['BÍ', 'MẬT'];
  const display = reversed ? [...words].reverse() : words;
  return (
    <section className={styles.lab} aria-label="Xưởng nghịch chữ">
      <p className={styles.title}>🔐 Thử xoay mật khẩu ngay trên rương</p>
      <div className={styles.tiles} aria-live="polite">
        {display.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          data-touch-target
          onClick={() => {
            setReversed(!reversed);
            onProgress();
          }}
        >
          Đổi chỗ hai tiếng
        </button>
        <button
          type="button"
          data-touch-target
          onClick={() => {
            setSwapped(!swapped);
            onProgress();
          }}
        >
          Đổi vần và thanh
        </button>
        <button
          type="button"
          data-touch-target
          onClick={() => {
            if (swapped && !reversed) onSolved();
            else onProgress();
          }}
          disabled={!swapped || reversed}
        >
          Mở bằng mật khẩu này
        </button>
      </div>
    </section>
  );
}
