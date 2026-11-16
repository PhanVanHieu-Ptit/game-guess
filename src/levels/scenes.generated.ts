// Tự sinh bởi npm run levels:generate; không sửa tay.
'use client';
import type { Level } from '@/engine/scene';

export const SCENES: Readonly<Partial<Record<string, Level['component']>>> = {
  '2d-sample-01': () => import('./2d-sample-01/scene'),
  '2d-sample-02': () => import('./2d-sample-02/scene'),
};
