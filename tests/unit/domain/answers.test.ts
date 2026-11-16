import { describe, expect, it } from 'vitest';
import { checkAnswer, createAnswerChecker } from '@/domain/answers/match';
import { MAX_ANSWER_LENGTH, normalizeAnswer } from '@/domain/answers/normalize';

describe('normalizeAnswer', () => {
  it('không phân biệt hoa/thường', () => {
    expect(normalizeAnswer('CUA')).toBe('cua');
    expect(normalizeAnswer('Con Cua')).toBe('con cua');
  });

  it('bỏ dấu, đổi đ/Đ thành d', () => {
    expect(normalizeAnswer('Đàn vịt')).toBe('dan vit');
    expect(normalizeAnswer('ĐÁP ÁN')).toBe('dap an');
    expect(normalizeAnswer('Người Việt')).toBe('nguoi viet');
    expect(normalizeAnswer('mưa rào, hơi nước')).toBe('mua rao hoi nuoc');
  });

  it('gõ kiểu NFC hay NFD đều cho cùng kết quả', () => {
    const composed = 'ế'.normalize('NFC');
    const decomposed = 'ế'.normalize('NFD');
    expect(composed).not.toBe(decomposed);
    expect(normalizeAnswer(composed)).toBe('e');
    expect(normalizeAnswer(decomposed)).toBe('e');
  });

  it('"hòa" và "hoà" (dấu đặt khác chỗ) bằng nhau, và bằng "hoa"', () => {
    expect(normalizeAnswer('hòa')).toBe(normalizeAnswer('hoà'));
    expect(normalizeAnswer('hòa')).toBe('hoa');
  });

  it('gộp khoảng trắng thừa, tab và xuống dòng', () => {
    expect(normalizeAnswer('  con   cua \n')).toBe('con cua');
    expect(normalizeAnswer('con\tcua')).toBe('con cua');
  });

  it('dấu câu thành khoảng trắng (không dính hai chữ vào nhau)', () => {
    expect(normalizeAnswer('Con cua!!!')).toBe('con cua');
    expect(normalizeAnswer('cua,be')).toBe('cua be');
    expect(normalizeAnswer('"cua"')).toBe('cua');
  });

  it('bỏ ký tự vô hình chèn vào khi dán chữ', () => {
    expect(normalizeAnswer('cua​')).toBe('cua');
  });

  it('giữ nguyên chữ số', () => {
    expect(normalizeAnswer(' 36 ')).toBe('36');
    expect(normalizeAnswer('8h20')).toBe('8h20');
  });

  it('chuỗi rỗng, chỉ khoảng trắng hoặc chỉ dấu câu cho chuỗi rỗng', () => {
    expect(normalizeAnswer('')).toBe('');
    expect(normalizeAnswer('   ')).toBe('');
    expect(normalizeAnswer('?!...')).toBe('');
  });

  it('chuẩn hóa hai lần không đổi thêm (lũy đẳng)', () => {
    for (const sample of ['Đàn Vịt!', 'hoà  bình', 'ẾCH ƠI', '  8:20  ']) {
      const once = normalizeAnswer(sample);
      expect(normalizeAnswer(once)).toBe(once);
    }
  });
});

describe('checkAnswer: nhiều đáp án đúng, không phân biệt hoa thường, gõ không dấu', () => {
  const accepted = ['cua', 'con cua', 'cua bể', 'cua đồng'];

  it('nhận từng đáp án trong danh sách', () => {
    for (const answer of accepted) {
      expect(checkAnswer(answer, accepted)).toEqual({
        kind: 'correct',
        accepted: answer,
      });
    }
  });

  it('nhận bất kể hoa/thường và khoảng trắng thừa', () => {
    expect(checkAnswer('  CON   CUA ', accepted)).toEqual({
      kind: 'correct',
      accepted: 'con cua',
    });
  });

  it('nhận đáp án gõ không dấu và ngược lại', () => {
    expect(checkAnswer('cua be', accepted)).toEqual({
      kind: 'correct',
      accepted: 'cua bể',
    });
    expect(checkAnswer('cua dong', accepted).kind).toBe('correct');
    expect(checkAnswer('nước', ['nuoc']).kind).toBe('correct');
    expect(checkAnswer('nuoc', ['nước']).kind).toBe('correct');
    expect(checkAnswer('NƯỚC', ['Nuoc']).kind).toBe('correct');
  });

  it('đáp án sai thì báo sai', () => {
    expect(checkAnswer('con tôm', accepted)).toEqual({ kind: 'wrong' });
    expect(checkAnswer('cuaa', accepted)).toEqual({ kind: 'wrong' });
    // Đủ chữ nhưng không đủ cả cụm.
    expect(checkAnswer('con', accepted)).toEqual({ kind: 'wrong' });
  });

  it('chưa gõ gì (hoặc chỉ dấu câu) thì báo rỗng, không tính là sai', () => {
    expect(checkAnswer('', accepted)).toEqual({ kind: 'empty' });
    expect(checkAnswer('   ', accepted)).toEqual({ kind: 'empty' });
    expect(checkAnswer('?!', accepted)).toEqual({ kind: 'empty' });
  });

  it(`từ chối chuỗi dài quá ${MAX_ANSWER_LENGTH} ký tự (sau chuẩn hóa), đúng ${MAX_ANSWER_LENGTH} thì còn chấm`, () => {
    expect(checkAnswer('a'.repeat(MAX_ANSWER_LENGTH), accepted).kind).toBe(
      'wrong',
    );
    expect(checkAnswer('a'.repeat(MAX_ANSWER_LENGTH + 1), accepted)).toEqual({
      kind: 'too-long',
    });
    // Khoảng trắng thừa không tính vào độ dài.
    const padded = `${' '.repeat(40)}${'a'.repeat(MAX_ANSWER_LENGTH)}${' '.repeat(40)}`;
    expect(checkAnswer(padded, accepted).kind).toBe('wrong');
  });

  it('đáp án chấp nhận trùng nhau sau chuẩn hóa thì trả về cái khai báo trước', () => {
    expect(checkAnswer('nuoc', ['Nước', 'nuoc'])).toEqual({
      kind: 'correct',
      accepted: 'Nước',
    });
  });

  it('danh sách rỗng hoặc chỉ có đáp án rỗng thì không có gì đúng', () => {
    expect(checkAnswer('cua', [])).toEqual({ kind: 'wrong' });
    expect(checkAnswer('cua', ['', '  ', '!!'])).toEqual({ kind: 'wrong' });
    expect(checkAnswer('', ['', '  '])).toEqual({ kind: 'empty' });
  });

  it('createAnswerChecker chấm nhiều lần với cùng danh sách', () => {
    const check = createAnswerChecker(['bốn', '4']);
    expect(check('4').kind).toBe('correct');
    expect(check('BON').kind).toBe('correct');
    expect(check('6').kind).toBe('wrong');
  });
});
