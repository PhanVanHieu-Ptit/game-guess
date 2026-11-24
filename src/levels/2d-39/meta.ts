import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-39',
  title: 'Lật thẻ kiểm luật',
  prompt:
    'Mỗi thẻ có mặt chữ và mặt số. Luật: nguyên âm → số chẵn. Chọn ít thẻ nhất cần lật để kiểm tra luật.',
  thinking: 'logic',
  input: 'choose',
  difficulty: 5,
  hints: [
    'Cần tìm cả trường hợp có thể làm luật sai.',
    'Kiểm số sau A và kiểm chữ sau số lẻ. Số chẵn không buộc đi với nguyên âm.',
    'Chỉ chọn A và 7, rồi chạm Kiểm tra.',
  ],
  explanation:
    'Cần kiểm số sau A và chữ sau 7. Luật chỉ nói nguyên âm thì số chẵn, không nói số chẵn thì nguyên âm!',
  wrong: {
    empty: 'Chưa chọn thẻ thì luật vẫn đang trốn!',
    four: 'Số 4 không hứa mặt kia phải là nguyên âm!',
    missing: 'Còn thẻ có thể giấu trường hợp trái luật đó!',
    extra: 'Chọn thêm thẻ rồi, luật chỉ cần đội hình gọn thôi!',
  },
  ordinal: 42,
  kind: '2d',
  source: 'classic',
} as const satisfies LevelMeta;
