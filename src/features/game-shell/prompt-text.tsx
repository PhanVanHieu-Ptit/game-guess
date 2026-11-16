'use client';
import {
  isPromptWord,
  promptParts,
  wordId,
  type LevelPrompt,
} from '@/domain/levels/prompt';
import { usePromptWords } from '@/engine/prompt-words';
import styles from './prompt-text.module.css';

export function PromptText({
  prompt,
  className,
  disabled,
  onTap,
}: {
  prompt: LevelPrompt;
  className?: string;
  disabled?: boolean;
  onTap?: () => void;
}) {
  const bus = usePromptWords();
  let wordIndex = 0;
  return (
    <p className={className} data-testid="prompt">
      {promptParts(prompt).map((part, index) => {
        if (!isPromptWord(part)) return part;
        const tap = { id: wordId(part), text: part.word, index: wordIndex++ };
        return (
          <button
            key={index}
            type="button"
            className={styles.word}
            data-touch-target
            disabled={disabled}
            onClick={() => {
              onTap?.();
              bus.tap(tap);
            }}
          >
            {part.word}
          </button>
        );
      })}
    </p>
  );
}
