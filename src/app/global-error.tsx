'use client';

// global-error thay luôn cả layout gốc nên phải tự có <html> và <body>, và không có CSS toàn cục của ứng dụng
// (docs của Next 16: global-error render document riêng). Vì vậy nạp lại token và CSS toàn cục ở đây.
import '@/styles/tokens.css';
import '@/styles/globals.css';
import { strings } from '@/features/strings';
import { Button } from '@/features/ui/button';
import { MessagePage } from '@/features/ui/message-page';

export default function GlobalError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return (
    <html lang="vi">
      <body>
        <MessagePage title={strings.errors.title}>
          <p>{strings.errors.body}</p>
          <Button block variant="primary" onClick={retry}>
            {strings.errors.retry}
          </Button>
        </MessagePage>
      </body>
    </html>
  );
}
