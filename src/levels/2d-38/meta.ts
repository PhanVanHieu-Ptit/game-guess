import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-38',
  title: 'Đong nước nấu chè',
  prompt:
    'Có bình 5 lít và bình 3 lít, đều không có vạch chia. Đong đúng 4 lít vào bình lớn.',
  thinking: 'logic',
  input: 'tap',
  difficulty: 4,
  hints: [
    'Bình nhỏ có thể giúp giữ lại phần nước dư.',
    'Tạo 2 lít trong bình nhỏ, rồi lấy đầy bình lớn.',
    'Đầy 5 → rót sang 3 → đổ hết 3 → rót 5 sang 3 → đầy 5 → rót sang 3. Bình lớn còn 4 lít.',
  ],
  explanation:
    'Bình nhỏ đang có 2 lít nên chỉ nhận thêm 1 lít. Bình lớn đầy 5 lít rót đi 1, còn đúng 4 lít nấu chè!',
  wrong: {
    full: 'Bình đầy rồi, nước cũng cần chỗ đứng!',
    empty: 'Bình trống trơn, rót cả không khí à?',
    blocked: 'Bên nhận đầy rồi, chè chưa cần ngập bếp!',
    measure: 'Bình không có vạch, dùng nút để đong nhé!',
  },
  ordinal: 38,
  kind: '2d',
  source: 'classic',
} as const satisfies LevelMeta;
