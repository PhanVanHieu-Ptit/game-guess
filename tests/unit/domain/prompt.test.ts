import { describe, expect, it } from 'vitest';
import {
  promptParts,
  promptText,
  promptWords,
  tappableWords,
  word,
  wordId,
} from '@/domain/levels/prompt';

describe('đề bài dạng danh sách đoạn', () => {
  const prompt = ['Chạm vào con vật có vảy trong ', word('các'), ' hình.'];

  it('đề là chữ thuần thì coi như một đoạn duy nhất', () => {
    expect(promptParts('Đề bài.')).toEqual(['Đề bài.']);
    expect(promptText('Đề bài.')).toBe('Đề bài.');
    expect(promptWords('Đề bài.')).toEqual([]);
  });

  it('chữ thuần của đề ghép các đoạn, không có dấu đánh dấu thừa', () => {
    expect(promptText(prompt)).toBe('Chạm vào con vật có vảy trong các hình.');
  });

  it('word() không tạo khóa id khi không đặt', () => {
    expect(word('các')).toEqual({ word: 'các' });
    expect('id' in word('các')).toBe(false);
    expect(word('các', 'cac-chu')).toEqual({ word: 'các', id: 'cac-chu' });
  });

  it('mã chữ suy ra từ chữ: không dấu, thường, nối bằng gạch ngang; mã đặt tay thì được ưu tiên', () => {
    expect(wordId(word('các'))).toBe('cac');
    expect(wordId(word('Học sinh'))).toBe('hoc-sinh');
    expect(wordId(word('Đàn'))).toBe('dan');
    expect(wordId(word('các', 'chu-cac'))).toBe('chu-cac');
  });

  it('liệt kê chữ chạm được theo thứ tự kèm số thứ tự', () => {
    expect(
      promptWords(['a ', word('một'), ' b ', word('hai', 'so-2'), ' c']),
    ).toEqual([
      { id: 'mot', text: 'một', index: 0 },
      { id: 'so-2', text: 'hai', index: 1 },
    ]);
  });
});

describe('tappableWords: mọi chữ trong câu thành chữ chạm được', () => {
  it('giữ nguyên dấu câu và khoảng trắng, ghép lại đúng câu gốc', () => {
    const text = 'Hôm nay trời mưa, rất to!';
    expect(promptText(tappableWords(text))).toBe(text);
  });

  it('chỉ chữ là chữ chạm được; dấu câu và khoảng trắng là chữ thường', () => {
    expect(tappableWords('Trời mưa.')).toEqual([
      { word: 'Trời', id: 'troi' },
      ' ',
      { word: 'mưa', id: 'mua' },
      '.',
    ]);
  });

  it('chữ lặp lại được đánh mã riêng để không trùng', () => {
    const ids = promptWords(tappableWords('Trời trời mưa trời')).map(
      (tap) => tap.id,
    );
    expect(ids).toEqual(['troi', 'troi-2', 'mua', 'troi-3']);
  });

  it('chữ có gạch nối hoặc dấu nháy là một chữ', () => {
    expect(
      promptWords(tappableWords('Tây-Nguyên nhé')).map((t) => t.text),
    ).toEqual(['Tây-Nguyên', 'nhé']);
  });

  it('chữ gõ kiểu NFD vẫn nguyên một chữ', () => {
    const decomposed = 'Việt Nam'.normalize('NFD');
    expect(promptWords(tappableWords(decomposed)).map((t) => t.id)).toEqual([
      'viet',
      'nam',
    ]);
  });

  it('chuỗi rỗng không có đoạn nào', () => {
    expect(tappableWords('')).toEqual([]);
  });

  it('ghép với đoạn dẫn để làm đề hoàn chỉnh', () => {
    const prompt = ['Chạm vào chữ thừa: ', ...tappableWords('Trời trời mưa.')];
    expect(promptText(prompt)).toBe('Chạm vào chữ thừa: Trời trời mưa.');
    expect(promptWords(prompt)).toHaveLength(3);
  });
});
