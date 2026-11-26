'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import type { EntrySource, EventPayloads } from '@/services/analytics/events';
import { track } from '@/services/analytics/track';
import { ensureProgressHydrated } from '@/stores/progress';
import { wireAnalyticsContext } from '@/features/game-shell/analytics-context';

const SOURCES: readonly EntrySource[] = [
  'friend',
  'community',
  'short_video',
  'playtest',
];

export function PageAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.toString();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    // The ref prevents StrictMode's effect replay from double-counting a view.
    const location = `${pathname}?${query}`;
    if (previous.current === location) return;
    previous.current = location;
    ensureProgressHydrated();
    wireAnalyticsContext();
    const candidate = new URLSearchParams(query).get('src');
    const source = SOURCES.find((value) => value === candidate) ?? 'direct';
    const pages: Record<string, EventPayloads['page_view']['page']> = {
      '/': 'home',
      '/rush': 'rush',
      '/daily': 'daily',
      '/levels': 'levels',
    };
    track('page_view', {
      page: pathname.startsWith('/play/')
        ? 'play'
        : (pages[pathname] ?? 'other'),
      source,
    });
  }, [pathname, query]);

  return null;
}
