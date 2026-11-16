import type { LevelMeta } from '@/domain/levels/types';

export const meta = {
  id: '2d-04',
  ordinal: 4,
  kind: '2d',
  title: 'Hái xoài cho bé',
  prompt: 'Xoài chín trên cao, bé với mãi không tới. Giúp bé hái xoài.',
  thinking: 'physics',
  input: 'shake',
  difficulty: 1,
  hints: [
    'Cây cao quá, nhưng quả chín thì dễ rụng.',
    'Làm cho cái cây rung lên.',
    'Lắc điện thoại (hoặc chạm liên tục vào thân cây) để xoài rụng.',
  ],
  explanation:
    'Không có thang thì có điện thoại! Lắc cho xoài rụng, nhớ hứng bằng giỏ chứ đừng bằng đầu.',
  wrong: {
    mango: 'Bé nhảy rồi mà vẫn hụt. Xoài chưa chịu xuống!',
    basket: 'Giỏ chỉ biết hứng, chưa biết trèo cây đâu!',
    child: 'Tay bé chưa dài bằng cây. Thử nhờ cái cây xem!',
  },
  sensors: {
    shake: {
      touchFallback: 'Chạm thân cây hoặc nút Lắc ít nhất 3 lần trong 2 giây.',
    },
  },
  source: 'original',
} as const satisfies LevelMeta;
