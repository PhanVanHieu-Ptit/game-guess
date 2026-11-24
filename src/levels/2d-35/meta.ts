import type { LevelMeta } from '@/domain/levels/types';
export const meta = {
  id: '2d-35',
  title: 'Vượt ai rồi?',
  prompt:
    'Trong cuộc đua, bé vừa vượt người đang đứng thứ hai. Bây giờ bé đứng thứ mấy?',
  thinking: 'read',
  input: 'type',
  difficulty: 2,
  hints: [
    'Vượt một người thì bạn lấy vị trí của ai?',
    'Bạn vừa vượt người thứ hai, chưa vượt người dẫn đầu.',
    'Bé đứng thứ hai. Nhập 2.',
  ],
  explanation:
    'Vượt người thứ hai thì bạn đứng thứ hai. Muốn đứng đầu, còn phải vượt thêm một bạn nữa!',
  wrong: {
    first: 'Vượt một bạn mà lên tận đầu luôn hả?',
    other: 'Vị trí cũ nhường lại rồi, thử nghĩ thêm nhé!',
    runner: 'Bạn ấy đang chạy, chưa kịp trả lời đâu!',
  },
  ordinal: 38,
  kind: '2d',
  source: 'classic',
} as const satisfies LevelMeta;
