import { MAX_ANSWER_LENGTH, normalizeAnswer } from './normalize';

// Chấm đáp án gõ vào (docs/TECH.md mục 7.3): nhận nhiều đáp án đúng, không phân biệt hoa/thường, chấp nhận gõ không dấu.

export type AnswerVerdict =
  /** Khớp một đáp án chấp nhận; `accepted` là đáp án đó đúng như người soạn màn đã viết. */
  | { kind: 'correct'; accepted: string }
  /** Không khớp đáp án nào. */
  | { kind: 'wrong' }
  /** Chưa gõ gì (hoặc chỉ gõ dấu câu, khoảng trắng). */
  | { kind: 'empty' }
  /** Dài quá `MAX_ANSWER_LENGTH` ký tự. */
  | { kind: 'too-long' };

export type AnswerChecker = (input: string) => AnswerVerdict;

/**
 * Dựng bộ chấm từ danh sách đáp án chấp nhận. Danh sách được chuẩn hóa một lần ở đây nên chấm nhiều lần vẫn rẻ.
 * Đáp án chấp nhận cứ viết tự nhiên (có dấu, hoa thường tùy ý); đáp án rỗng sau khi chuẩn hóa bị bỏ qua.
 */
export function createAnswerChecker(
  accepted: readonly string[],
): AnswerChecker {
  const lookup = new Map<string, string>();
  for (const answer of accepted) {
    const key = normalizeAnswer(answer);
    if (key !== '' && !lookup.has(key)) lookup.set(key, answer);
  }

  return (input) => {
    const value = normalizeAnswer(input);
    if (value === '') return { kind: 'empty' };
    if (Array.from(value).length > MAX_ANSWER_LENGTH)
      return { kind: 'too-long' };
    const hit = lookup.get(value);
    return hit === undefined
      ? { kind: 'wrong' }
      : { kind: 'correct', accepted: hit };
  };
}

/** Chấm một lần. Chấm nhiều lần với cùng danh sách thì dùng `createAnswerChecker`. */
export function checkAnswer(
  input: string,
  accepted: readonly string[],
): AnswerVerdict {
  return createAnswerChecker(accepted)(input);
}
