'use client';

import { ErrorView } from '@/features/game-shell/error-view';

export default function PlayError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return <ErrorView retry={retry} backHref="/levels" />;
}
