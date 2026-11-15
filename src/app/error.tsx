'use client';

import { ErrorView } from '@/features/game-shell/error-view';

export default function AppError({
  retry,
}: {
  error: unknown;
  retry: () => void;
}) {
  return <ErrorView retry={retry} />;
}
