import type { LevelMeta } from './types';

// Giới hạn độ dài chữ hiển thị (docs/GDD.md mục 10.2).
export const MAX_PROMPT_LENGTH = 120;
export const MAX_HINT_LENGTH = 120;
export const MAX_EXPLANATION_LENGTH = 140;
export const MAX_WRONG_LENGTH = 60;

const ID_PATTERN = /^(2d|3d)-[a-z0-9]+(-[a-z0-9]+)*$/;

// Đếm theo ký tự người đọc thấy: chuẩn hóa NFC trước để "ế" luôn là một ký tự dù gõ kiểu nào.
const lengthOf = (text: string): number =>
  Array.from(text.normalize('NFC')).length;
const isBlank = (text: unknown): boolean =>
  typeof text !== 'string' || text.trim() === '';

/**
 * Kiểm danh sách màn có đúng cấu trúc không. Trả về danh sách lỗi (rỗng nghĩa là hợp lệ);
 * mỗi lỗi nêu mã màn và tên trường sai (docs/backlog.md LL-004, tiêu chí 1).
 *
 * Chỉ kiểm quy tắc áp được cho mọi danh sách. Quy tắc riêng của bộ 25 màn (đủ 25, 20 màn 2D và 5 màn 3D,
 * đường cong độ khó, không lặp kiểu quá 2 màn liền; docs/TECH.md mục 5.5) sẽ thêm khi có đủ nội dung.
 */
export function validateLevelMetas(metas: readonly LevelMeta[]): string[] {
  const problems: string[] = [];
  const seenIds = new Set<string>();

  metas.forEach((meta, index) => {
    const at = `[${meta.id}]`;

    if (!ID_PATTERN.test(meta.id)) {
      problems.push(
        `${at} id: phải có dạng "2d-xxx" hoặc "3d-xxx", viết thường`,
      );
    }
    if (seenIds.has(meta.id)) problems.push(`${at} id: bị trùng`);
    seenIds.add(meta.id);

    if (meta.kind !== meta.id.slice(0, 2)) {
      problems.push(`${at} kind: "${meta.kind}" không khớp tiền tố của id`);
    }
    if (meta.ordinal !== index + 1) {
      problems.push(
        `${at} ordinal: phải là ${index + 1} (liên tục từ 1, đúng thứ tự trong danh sách), đang là ${meta.ordinal}`,
      );
    }
    if (
      !Number.isInteger(meta.difficulty) ||
      meta.difficulty < 1 ||
      meta.difficulty > 5
    ) {
      problems.push(`${at} difficulty: phải là số nguyên từ 1 đến 5`);
    }

    if (isBlank(meta.title)) problems.push(`${at} title: không được để trống`);
    if (isBlank(meta.prompt))
      problems.push(`${at} prompt: không được để trống`);
    else if (lengthOf(meta.prompt) > MAX_PROMPT_LENGTH) {
      problems.push(`${at} prompt: dài quá ${MAX_PROMPT_LENGTH} ký tự`);
    }
    if (isBlank(meta.explanation))
      problems.push(`${at} explanation: không được để trống`);
    else if (lengthOf(meta.explanation) > MAX_EXPLANATION_LENGTH) {
      problems.push(
        `${at} explanation: dài quá ${MAX_EXPLANATION_LENGTH} ký tự`,
      );
    }

    if (!Array.isArray(meta.hints) || meta.hints.length !== 3) {
      problems.push(`${at} hints: phải có đúng 3 gợi ý`);
    } else {
      meta.hints.forEach((hint, i) => {
        if (isBlank(hint))
          problems.push(`${at} hints[${i}]: không được để trống`);
        else if (lengthOf(hint) > MAX_HINT_LENGTH) {
          problems.push(`${at} hints[${i}]: dài quá ${MAX_HINT_LENGTH} ký tự`);
        }
      });
    }

    for (const [code, text] of Object.entries(meta.wrong ?? {})) {
      if (isBlank(text))
        problems.push(`${at} wrong["${code}"]: không được để trống`);
      else if (lengthOf(text) > MAX_WRONG_LENGTH) {
        problems.push(
          `${at} wrong["${code}"]: dài quá ${MAX_WRONG_LENGTH} ký tự`,
        );
      }
    }

    // Thao tác cảm biến luôn phải có cách thay bằng chạm (docs/GDD.md mục 11, quy tắc 5).
    if (meta.input === 'shake' && isBlank(meta.sensors?.shake?.touchFallback)) {
      problems.push(
        `${at} sensors.shake.touchFallback: màn có thao tác lắc phải mô tả cách thay bằng chạm`,
      );
    }
  });

  return problems;
}
