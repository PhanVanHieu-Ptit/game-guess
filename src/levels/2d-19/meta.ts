import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-19',
  ordinal: 34,
  kind: '2d',
  title: 'Que diêm',
  prompt:
    'Phép tính trên bàn sai rồi! Chỉ được dời đúng một que diêm để phép tính thành đúng.',
  thinking: 'visual',
  input: 'drag',
  difficulty: 4,
  hints: [
    'Không chỉ số mới đổi được, dấu cũng đổi được.',
    'Lấy que từ một số rồi đặt vào dấu.',
    'Lấy que ở số 8 thành 6, đặt vào dấu trừ thành cộng: 6 + 3 = 9.',
  ],
  explanation:
    'Que diêm vừa nhóm lửa vừa sửa phép tính. Mẹo: đổi một dấu là đổi cả phép tính.',
  wrong: {
    number: 'Que này xin đứng yên. Thử que khác nhé!',
    sign: 'Dấu trừ đang chờ thêm một que, không chờ phép màu!',
    equal: 'Dấu bằng xin nghỉ, hôm nay chưa đổi nghề!',
    miss: 'Que đi lạc rồi! Phép tính vẫn chưa đúng đâu.',
  },
  source: 'classic',
} as const satisfies LevelMeta;
