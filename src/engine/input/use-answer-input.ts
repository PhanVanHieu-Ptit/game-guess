'use client';
import { useMemo, useRef, useState, type FormEvent } from 'react';
import {
  createAnswerChecker,
  type AnswerVerdict,
} from '@/domain/answers/match';
import { MAX_ANSWER_LENGTH } from '@/domain/answers/normalize';

export function useAnswerInput({
  accepted,
  onSolved,
  onWrong,
  onProgress,
}: {
  accepted: readonly string[];
  onSolved(): void;
  onWrong?(code?: string): void;
  onProgress?(): void;
}) {
  const [value, setValue] = useState('');
  const composing = useRef(false);
  const solved = useRef(false);
  const [verdict, setVerdict] = useState<AnswerVerdict | null>(null);
  const check = useMemo(() => createAnswerChecker(accepted), [accepted]);
  const submit = (event?: FormEvent) => {
    event?.preventDefault();
    if (solved.current || composing.current) return;
    const result = check(value);
    setVerdict(result);
    if (result.kind === 'correct') {
      solved.current = true;
      onSolved();
    }
    if (result.kind === 'wrong') onWrong?.();
  };
  return {
    value,
    verdict,
    submit,
    message:
      verdict?.kind === 'empty'
        ? 'Bạn chưa nhập đáp án.'
        : verdict?.kind === 'too-long'
          ? `Đáp án tối đa ${MAX_ANSWER_LENGTH} ký tự.`
          : '',
    inputProps: {
      value,
      type: 'text' as const,
      autoComplete: 'off',
      autoCapitalize: 'none',
      spellCheck: false,
      onCompositionStart: () => {
        composing.current = true;
      },
      onCompositionEnd: () => {
        composing.current = false;
      },
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          event.key === 'Enter' &&
          (event.nativeEvent.isComposing || composing.current)
        )
          event.preventDefault();
      },
      disabled: verdict?.kind === 'correct',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setVerdict(null);
        onProgress?.();
      },
    },
  };
}
