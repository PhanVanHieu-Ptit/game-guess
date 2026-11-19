import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-22',
  ordinal: 25,
  kind: '2d',
  title: 'Cái bóng đi lạc',
  prompt: 'Mặt trời ở bên phải bé. Chạm vào chiếc bóng đúng của bé.',
  thinking: 'visual',
  input: 'tap',
  difficulty: 3,
  hints: [
    'Bóng bắt đầu từ chân, còn ánh sáng đến từ đâu?',
    'Mặt trời ở bên phải, bóng phải đổ về phía đối diện.',
    'Chạm bóng kéo dài sang trái, nối liền với chân bé.',
  ],
  explanation:
    'Mặt trời bên phải thì bóng nằm bên trái. Bóng theo bạn cả ngày mà thỉnh thoảng cũng cần chỉ đường.',
  wrong: {
    right: 'Bóng này đang chạy về phía nắng mất rồi!',
    up: 'Chiếc bóng này đi lạc hướng rồi, gọi nó về nào!',
    sun: 'Đó là mặt trời, chưa phải bóng của bé!',
    kid: 'Bé đứng đúng chỗ rồi, bạn tìm bóng giúp bé nhé!',
  },
  source: 'original',
} as const satisfies LevelMeta;
