'use client';
import { useId } from 'react';
import type { SceneProps } from '@/engine/scene';
import { useAnswerInput } from '@/engine/input/use-answer-input';
import styles from '@/engine/input/input.module.css';

export function TypedAnswer({
  accepted,
  label = 'Đáp án của bạn',
  ...events
}: SceneProps & { accepted: readonly string[]; label?: string }) {
  const answer = useAnswerInput({ accepted, ...events });
  const id = useId();
  return (
    <form className={styles.controls} onSubmit={answer.submit}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        {...answer.inputProps}
        className={styles.input}
        aria-describedby={`${id}-message`}
      />
      <p id={`${id}-message`} role="status">
        {answer.message}
      </p>
      <button
        type="submit"
        className={styles.button}
        data-touch-target
        disabled={answer.inputProps.disabled}
      >
        Trả lời
      </button>
    </form>
  );
}
