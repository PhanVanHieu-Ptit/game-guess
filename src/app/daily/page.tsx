import type { Metadata } from 'next';
import { strings } from '@/features/strings';
import { ButtonLink } from '@/features/ui/button';
import { MessagePage } from '@/features/ui/message-page';

export const metadata: Metadata = { title: strings.daily.title };

// Kho câu đố mỗi ngày chưa có nội dung (câu hỏi H2, docs/GDD.md mục 13.2), nên trang báo "chưa có câu hôm nay"
// thay vì lỗi (docs/TECH.md mục 9.3). Khi có kho, trang này chọn câu theo ngày giờ Việt Nam và chạy trong khung chơi.
export default function DailyPage() {
  return (
    <MessagePage title={strings.daily.title}>
      <p data-testid="daily-empty">{strings.daily.empty}</p>
      <ButtonLink block variant="primary" href="/">
        {strings.daily.home}
      </ButtonLink>
      <ButtonLink block href="/levels">
        {strings.home.levels}
      </ButtonLink>
    </MessagePage>
  );
}
