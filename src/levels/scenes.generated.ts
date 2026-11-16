// Tự sinh bởi npm run levels:generate; không sửa tay.
'use client';
import type { Level } from '@/engine/scene';

export const SCENES: Readonly<Partial<Record<string, Level['component']>>> = {
  '2d-01': () => import('./2d-01/scene'),
  '2d-02': () => import('./2d-02/scene'),
  '2d-03': () => import('./2d-03/scene'),
  '2d-04': () => import('./2d-04/scene'),
  '2d-05': () => import('./2d-05/scene'),
};
