import { strings } from '@/features/strings';
import { ButtonLink } from '@/features/ui/button';
import { MessagePage } from '@/features/ui/message-page';

/** Trang "không tìm thấy màn": mã màn sai thì hiện trang này chứ không sập (docs/backlog.md LL-004, tiêu chí 2). */
export function NotFoundView() {
  return (
    <MessagePage title={strings.play.notFound.title}>
      <p>{strings.play.notFound.body}</p>
      <ButtonLink block variant="primary" href="/levels">
        {strings.play.back}
      </ButtonLink>
    </MessagePage>
  );
}
