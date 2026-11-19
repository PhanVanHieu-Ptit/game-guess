import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-24',
  ordinal: 27,
  kind: '2d',
  title: 'Qua cổng hội chợ',
  prompt: 'Chỉ một tấm biển nói đúng. Chạm cổng dẫn ra ngoài.',
  thinking: 'logic',
  input: 'tap',
  difficulty: 5,
  hints: [
    'Thử giả sử từng cổng là lối ra rồi đếm biển đúng.',
    'Nếu đi ra ở B hoặc C, sẽ có hai biển nói đúng.',
    'Chọn cổng A: biển A sai, biển B đúng, biển C sai.',
  ],
  explanation:
    'Chọn A thì chỉ biển B nói đúng. Ở hội chợ này, đọc biển cũng phải biết kiểm tra chéo, kẻo đi một vòng lại về quầy bắp.',
  wrong: {
    b: 'Ra ở B thì hai biển cùng đúng, đông quá rồi!',
    c: 'Ra ở C cũng có hai biển đúng, chưa khớp đề đâu!',
  },
  source: 'original',
} as const satisfies LevelMeta;
