'use client';
import {
  createContext,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
  type ReactNode,
} from 'react';
import type { PromptWordTap } from '@/domain/levels/prompt';

type Listener = (tap: PromptWordTap) => void;
const Context = createContext<{
  subscribe(listener: Listener): () => void;
  tap: Listener;
} | null>(null);
export function PromptWordsProvider({ children }: { children: ReactNode }) {
  const [bus] = useState(() => {
    const listeners = new Set<Listener>();
    return {
      subscribe(listener: Listener) {
        listeners.add(listener);
        return () => {
          listeners.delete(listener);
        };
      },
      tap(event: PromptWordTap) {
        listeners.forEach((listener) => listener(event));
      },
    };
  });
  return <Context value={bus}>{children}</Context>;
}
export function usePromptWords() {
  const bus = useContext(Context);
  if (!bus)
    throw new Error('Đề bài cần nằm trong LevelShell hoặc PromptWordsProvider');
  return bus;
}
/** Cảnh đăng ký chạm chữ; tự gỡ khi chơi lại hoặc rời màn. */
export function usePromptWordTap(listener: Listener) {
  const bus = usePromptWords();
  const onTap = useEffectEvent(listener);
  useEffect(() => bus.subscribe((event) => onTap(event)), [bus]);
}
