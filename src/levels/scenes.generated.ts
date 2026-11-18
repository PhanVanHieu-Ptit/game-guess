// Tự sinh bởi npm run levels:generate; không sửa tay.
'use client';
import type { Level } from '@/engine/scene';

export const SCENES: Readonly<Partial<Record<string, Level['component']>>> = {
  '2d-01': () => import('./2d-01/scene'),
  '2d-02': () => import('./2d-02/scene'),
  '2d-03': () => import('./2d-03/scene'),
  '2d-04': () => import('./2d-04/scene'),
  '2d-05': () => import('./2d-05/scene'),
  '2d-06': () => import('./2d-06/scene'),
  '2d-07': () => import('./2d-07/scene'),
  '2d-08': () => import('./2d-08/scene'),
  '2d-09': () => import('./2d-09/scene'),
  '2d-10': () => import('./2d-10/scene'),
  '2d-11': () => import('./2d-11/scene'),
  '2d-12': () => import('./2d-12/scene'),
  '2d-13': () => import('./2d-13/scene'),
  '2d-14': () => import('./2d-14/scene'),
  '3d-01': () => import('./3d-01/scene'),
  '3d-02': () => import('./3d-02/scene'),
  '3d-03': () => import('./3d-03/scene'),
};
