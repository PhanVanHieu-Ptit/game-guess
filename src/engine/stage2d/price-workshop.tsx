'use client';

import { useState } from 'react';
import styles from './experiment.module.css';

export function PriceWorkshop({
  onProgress,
  onSolved,
}: {
  onProgress(): void;
  onSolved(): void;
}) {
  const [bag, setBag] = useState(1000);
  const cake = 11000 - bag;
  const valid = cake - bag === 10000;
  const money = (value: number) => `${value.toLocaleString('vi-VN')} đ`;
  return (
    <section className={styles.lab} aria-label="Quầy tính tiền thử">
      <p className={styles.title}>🧾 Thử chia 11.000 đồng</p>
      <p className={styles.readout} aria-live="polite">
        Túi {money(bag)} · Bánh {money(cake)}
        <br />
        Chênh lệch: {money(cake - bag)}
        <br />
        {valid
          ? 'Khớp! Bánh đắt hơn túi đúng 10.000 đ.'
          : 'Cần chênh đúng 10.000 đ. Thử điều chỉnh giá túi.'}
      </p>
      <div className={styles.actions}>
        <button
          type="button"
          data-touch-target
          disabled={bag === 0}
          onClick={() => {
            setBag(bag - 500);
            onProgress();
          }}
        >
          Bớt 500 đ cho túi
        </button>
        <button
          type="button"
          data-touch-target
          disabled={bag === 5500}
          onClick={() => {
            setBag(bag + 500);
            onProgress();
          }}
        >
          Thêm 500 đ cho túi
        </button>
        <button
          type="button"
          data-touch-target
          disabled={!valid}
          onClick={onSolved}
        >
          Chốt hóa đơn
        </button>
      </div>
    </section>
  );
}
