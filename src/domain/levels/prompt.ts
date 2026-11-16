import { normalizeAnswer } from '@/domain/answers/normalize';

// Đề bài của màn (docs/TECH.md mục 5.1). Thường chỉ là một câu chữ. Với kiểu màn "chạm vào chữ trong đề" thì khai báo
// dưới dạng danh sách đoạn và đánh dấu chữ nào chạm được bằng `word()`; khung chơi vẽ chữ đó thành nút chạm
// (≥ 44 px) và báo cho cảnh qua `usePromptWordTap` (engine/prompt-words.ts).

/** Một chữ trong đề mà người chơi chạm được. */
export interface PromptWord {
  /** Chữ hiển thị đúng như trong đề (có dấu). Có thể gồm nhiều tiếng, ví dụ "học sinh". */
  word: string;
  /** Mã của chữ khi báo cho cảnh. Bỏ trống thì suy ra từ chữ: không dấu, chữ thường, nối bằng "-" ("các" → "cac"). */
  id?: string;
}

/** Một đoạn của đề: chữ thường hoặc chữ chạm được. */
export type PromptPart = string | PromptWord;

/** Đề bài: một câu chữ, hoặc danh sách đoạn khi có chữ chạm được. */
export type LevelPrompt = string | readonly PromptPart[];

/** Một lần người chơi chạm vào chữ trong đề. */
export interface PromptWordTap {
  id: string;
  text: string;
  /** Thứ tự (từ 0) của chữ này trong các chữ chạm được của đề. */
  index: number;
}

export const isPromptWord = (part: PromptPart): part is PromptWord =>
  typeof part !== 'string';

/** Đánh dấu một chữ chạm được: `word('các')` hoặc `word('các', 'cac-tuyet')` khi cần mã riêng. */
export function word(text: string, id?: string): PromptWord {
  return id === undefined ? { word: text } : { word: text, id };
}

const slug = (text: string): string => normalizeAnswer(text).replace(/ /g, '-');

/** Mã của một chữ chạm được: mã đặt tay nếu có, không thì suy ra từ chữ. */
export function wordId(part: PromptWord): string {
  return part.id ?? slug(part.word);
}

export const promptParts = (prompt: LevelPrompt): readonly PromptPart[] =>
  typeof prompt === 'string' ? [prompt] : prompt;

/** Đề bài dưới dạng chữ thuần (không phân biệt chữ chạm được), dùng để đếm độ dài, đặt tiêu đề, so sánh. */
export function promptText(prompt: LevelPrompt): string {
  return promptParts(prompt)
    .map((part) => (isPromptWord(part) ? part.word : part))
    .join('');
}

/** Các chữ chạm được của đề, theo thứ tự xuất hiện. */
export function promptWords(prompt: LevelPrompt): PromptWordTap[] {
  return promptParts(prompt)
    .filter(isPromptWord)
    .map((part, index) => ({ id: wordId(part), text: part.word, index }));
}

// Một chữ = chuỗi chữ cái/chữ số (kể cả dấu rời của dạng NFD), có thể nối bằng dấu nháy hoặc gạch ngang.
const WORD_PATTERN = /[\p{L}\p{N}\p{M}]+(?:['’-][\p{L}\p{N}\p{M}]+)*/gu;

/**
 * Biến MỌI chữ trong câu thành chữ chạm được, dấu câu và khoảng trắng giữ nguyên là chữ thường.
 * Chữ lặp lại được đánh mã riêng để không trùng: "trời trời" → `troi`, `troi-2`.
 * Dùng khi đề là một câu mà người chơi phải chọn một chữ trong đó (ghép với đoạn dẫn: `['Chạm vào chữ thừa: ', ...tappableWords(câu)]`).
 */
export function tappableWords(text: string): PromptPart[] {
  const parts: PromptPart[] = [];
  const seen = new Map<string, number>();
  const used = new Set<string>();
  let cursor = 0;

  for (const match of text.matchAll(WORD_PATTERN)) {
    const start = match.index ?? 0;
    if (start > cursor) parts.push(text.slice(cursor, start));
    const base = slug(match[0]);
    let count = (seen.get(base) ?? 0) + 1;
    while (used.has(count === 1 ? base : `${base}-${count}`)) count += 1;
    seen.set(base, count);
    used.add(count === 1 ? base : `${base}-${count}`);
    parts.push({
      word: match[0],
      id: count === 1 ? base : `${base}-${count}`,
    });
    cursor = start + match[0].length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}
