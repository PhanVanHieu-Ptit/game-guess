import { safeStorage } from './safe-storage';

const PREFIX = 'latleo:rush:v1:';
const listeners = new Set<() => void>();

export function readRushBest(key: string): number {
  const value = Number(safeStorage.getItem(PREFIX + key));
  return Number.isSafeInteger(value) && value >= 0 && value <= 14_400
    ? value
    : 0;
}

export function saveRushBest(key: string, score: number): void {
  if (!Number.isSafeInteger(score) || score < 0 || score > 14_400) return;
  if (score <= readRushBest(key)) return;
  safeStorage.setItem(PREFIX + key, String(score));
  listeners.forEach((listener) => listener());
}

export function subscribeRushBest(listener: () => void): () => void {
  listeners.add(listener);
  window.addEventListener('storage', listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', listener);
  };
}
