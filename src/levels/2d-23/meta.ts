import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-23',
  ordinal: 35,
  kind: '2d',
  title: 'Cốc nào nhiều nước hơn?',
  prompt:
    'Hai cốc giống nhau, mực nước bằng nhau. Cốc nào chứa nhiều nước hơn?',
  thinking: 'physics',
  input: 'drag',
  difficulty: 4,
  hints: [
    'Mực nước và lượng nước có luôn giống nhau không?',
    'Đá chiếm chỗ trong cốc. Thử lấy cả hai viên đá ra.',
    'Đá nhỏ chiếm ít chỗ hơn, nên cốc bên phải chứa nhiều nước hơn.',
  ],
  explanation:
    'Mực nước bằng nhau nhưng đá chiếm chỗ khác nhau. Cốc phải có đá nhỏ nên được phần nước nhiều hơn, không cần uống thử.',
  wrong: {
    left: 'Cốc trái dành nhiều chỗ cho đá quá rồi!',
    equal: 'Mực nước bằng nhau, nhưng đá có chịu bằng nhau đâu!',
    unknown: 'Hai viên đá đang giữ manh mối, thử mời chúng ra nhé!',
    glass: 'Nhìn mực nước thôi chưa biết hết chuyện trong cốc đâu!',
    tray: 'Khay đang chờ đá, chưa chờ nước chanh!',
    miss: 'Đá đi lạc rồi! Mời về khay, đừng về cốc bên cạnh.',
  },
  source: 'original',
} as const satisfies LevelMeta;
