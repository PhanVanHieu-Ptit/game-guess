import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '3d-01',
  // Màn thứ 6 trong bản đang có; vị trí #8 của bộ đủ 25 màn sau khi thêm 2D-06/07.
  ordinal: 6,
  kind: '3d',
  title: 'Nhà số mấy?',
  prompt: 'Shipper đang tìm nhà, mặt tiền không thấy số. Nhà số mấy?',
  thinking: 'visual',
  input: 'rotate',
  difficulty: 2,
  hints: [
    'Mặt tiền nhà không có số. Số nhà phải nằm ở đâu đó khác.',
    'Xoay ra sau nhà, và nhớ nhìn lên cao.',
    'Số 36 viết trên bồn nước ở sân thượng, mặt sau nhà.',
  ],
  explanation:
    'Ai viết số nhà lên bồn nước? Chủ nhà. Mẹo: đừng chỉ nhìn mặt tiền, hãy đi vòng quanh và ngẩng đầu.',
  wrong: {
    wrong: 'Số này chưa đúng. Thử nhìn quanh nhà thêm nhé!',
    reversed: 'Hình như bạn đọc ngược thứ tự hai chữ số rồi!',
  },
  source: 'original',
} as const satisfies LevelMeta;
