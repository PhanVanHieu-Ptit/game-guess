import type { Page } from '@playwright/test';
import { LEVEL_METAS } from '@/levels';

/** Chỉ dựng tiến trình trước màn đang kiểm; thắng vẫn phải bằng thao tác trong cảnh. */
export async function openCampaignLevel(page: Page, id: string) {
  const ordinal = LEVEL_METAS.find((meta) => meta.id === id)?.ordinal;
  if (!ordinal) throw new Error(`Không có màn ${id}`);
  const previousIds = LEVEL_METAS.filter((meta) => meta.ordinal < ordinal).map(
    (meta) => meta.id,
  );
  await page.addInitScript((ids) => {
    if (localStorage.getItem('latleo:v1')) return;
    localStorage.setItem(
      'latleo:v1',
      JSON.stringify({
        version: 1,
        state: {
          installId: '11111111-1111-4111-8111-111111111111',
          levels: Object.fromEntries(
            ids.map((levelId) => [
              levelId,
              {
                status: 'solved',
                bestMs: 1000,
                bestHints: 0,
                lastSolvedAt: '2026-11-16T00:00:00.000Z',
              },
            ]),
          ),
        },
      }),
    );
  }, previousIds);
  await page.goto(`/play/${id}`);
}
