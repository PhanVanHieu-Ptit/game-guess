import { strings } from '@/features/strings';
import { ButtonLink } from '@/features/ui/button';
import { MessagePage } from '@/features/ui/message-page';

export default function NotFound() {
  return (
    <MessagePage title={strings.notFound.title}>
      <p>{strings.notFound.body}</p>
      <ButtonLink block variant="primary" href="/">
        {strings.notFound.home}
      </ButtonLink>
    </MessagePage>
  );
}
