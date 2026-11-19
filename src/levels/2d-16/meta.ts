import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-16',
  ordinal: 19,
  kind: '2d',
  title: 'Gánh hàng rong',
  prompt:
    'Bà bán hàng rong gánh thúng 6 ký bên trái, thúng 3 ký bên phải. Vai bà bị lệch. Giúp bà gánh thăng bằng.',
  thinking: 'physics',
  input: 'drag',
  difficulty: 3,
  hints: [
    'Đừng đổi hàng, hãy nghĩ tới điểm tựa.',
    'Bên nặng cần điểm tựa ở gần nó hơn.',
    'Kéo vai bà về phía thúng 6 ký tới khi đòn gánh nằm ngang.',
  ],
  explanation:
    'Đòn bẩy phiên bản chợ sớm: bên nặng thì gần vai, bên nhẹ thì xa vai. Bà bán hàng biết từ trước khi có sách giáo khoa.',
  wrong: {
    basket: 'Thúng chỉ biết lắc, chưa biết tự giảm ký!',
    miss: 'Vai còn lệch, bà chưa mở lớp múa đòn gánh đâu!',
    select: 'Chạm chọn vai bà trước, rồi chọn chỗ đặt nhé!',
  },
  source: 'original',
} as const satisfies LevelMeta;
