// Chuẩn hóa đáp án gõ bằng tiếng Việt (docs/TECH.md mục 7.3, giả định G9). Đáp án người chơi gõ và danh sách đáp án
// chấp nhận của màn đều đi qua đúng một hàm này, nên "Hòa", "hoà", "HOA" và "hoa" luôn bằng nhau.

/** Độ dài tối đa (đếm ký tự, sau khi chuẩn hóa) của một đáp án gõ vào; dài hơn thì bị từ chối. */
export const MAX_ANSWER_LENGTH = 64;

// U+0300–U+036F: dấu thanh, mũ, móc, trăng… khi chữ đã tách rời khỏi dấu (dạng NFD).
const COMBINING_MARKS = /[̀-ͯ]/g;
const NOT_LETTER_DIGIT_OR_SPACE = /[^\p{L}\p{N}\s]/gu;

/**
 * Đưa một chuỗi về dạng so sánh được:
 *  1. NFC (gõ bằng bộ gõ nào cũng cho cùng một dạng);
 *  2. chữ thường theo tiếng Việt (`Đ` → `đ`);
 *  3. bỏ dấu (NFD rồi xóa dấu rời), `đ` → `d`;
 *  4. dấu câu và ký tự lạ thành khoảng trắng (nên "cua,be" và "cua be" bằng nhau);
 *  5. gộp khoảng trắng liền nhau và cắt hai đầu.
 */
export function normalizeAnswer(raw: string): string {
  return raw
    .normalize('NFC')
    .toLocaleLowerCase('vi')
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .replace(/đ/g, 'd')
    .replace(NOT_LETTER_DIGIT_OR_SPACE, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
