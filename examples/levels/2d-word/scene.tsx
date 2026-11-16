'use client';
import type { SceneProps } from '@/engine/scene';
import { usePromptWordTap } from '@/engine/prompt-words';
export default function Scene({ onSolved, onWrong }: SceneProps) {
  usePromptWordTap(({ id }) => {
    if (id === 'tet-2') onSolved();
    else onWrong();
  });
  return <p>Hãy tìm chữ bị lặp ngay trong đề bài phía trên.</p>;
}
