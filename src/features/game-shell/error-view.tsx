'use client';

import { strings } from '@/features/strings';
import { Button, ButtonLink } from '@/features/ui/button';
import { MessagePage } from '@/features/ui/message-page';

/** Trang lỗi chung: không bao giờ để trang trắng (docs/backlog.md LL-048). Có Thử lại và đường về. */
export function ErrorView({
  retry,
  backHref = '/',
}: {
  retry: () => void;
  backHref?: string;
}) {
  return (
    <MessagePage title={strings.errors.title}>
      <p>{strings.errors.body}</p>
      <Button block variant="primary" onClick={retry}>
        {strings.errors.retry}
      </Button>
      <ButtonLink block href={backHref}>
        {backHref === '/' ? strings.errors.home : strings.play.back}
      </ButtonLink>
    </MessagePage>
  );
}
