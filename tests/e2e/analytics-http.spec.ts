import { test, expect } from '@playwright/test';

test('keepalive fallback sends accepted events with one stable anonymous identity', async ({
  page,
}) => {
  test.skip(
    process.env.E2E_ANALYTICS !== 'http',
    'Run with E2E_ANALYTICS=http to exercise the real transport',
  );
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'sendBeacon', {
      configurable: true,
      value: () => false,
    });
  });
  const accepted: Record<string, unknown>[] = [];
  const failures: string[] = [];
  page.on('pageerror', (error) => failures.push(error.message));
  page.on('response', async (response) => {
    if (!response.url().endsWith('/api/events')) return;
    if (response.request().method() !== 'POST') return;
    if (response.status() !== 204)
      failures.push(`analytics HTTP ${response.status()}`);
    accepted.push(response.request().postDataJSON() as Record<string, unknown>);
  });
  await page.clock.install({ time: new Date('2026-11-26T05:00:00Z') });
  await page.goto('/rush?src=playtest');
  await expect
    .poll(() => accepted.some((e) => e.type === 'page_view'))
    .toBe(true);
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await expect
    .poll(() => accepted.some((e) => e.type === 'rush_start'))
    .toBe(true);
  await page.clock.fastForward(61_000);
  await expect(page.getByTestId('rush-final-score')).toBeVisible();
  await expect
    .poll(() => accepted.filter((e) => e.type === 'rush_complete'))
    .toHaveLength(1);
  expect(new Set(accepted.map((e) => e.installId)).size).toBe(1);
  expect(accepted.find((e) => e.type === 'page_view')).toMatchObject({
    source: 'playtest',
  });
  await page.reload();
  await expect
    .poll(() => accepted.filter((e) => e.type === 'page_view'))
    .toHaveLength(2);
  expect(new Set(accepted.map((e) => e.installId)).size).toBe(1);
  expect(failures).toEqual([]);
});

test('default production beacons are accepted for landing, start and completion', async ({
  page,
}) => {
  test.skip(
    process.env.E2E_ANALYTICS !== 'http',
    'Run with E2E_ANALYTICS=http',
  );
  const statuses: number[] = [];
  page.on('response', (response) => {
    if (
      response.url().endsWith('/api/events') &&
      response.request().method() === 'POST'
    )
      statuses.push(response.status());
  });
  await page.clock.install({ time: new Date('2026-11-26T05:00:00Z') });
  await page.goto('/rush?src=playtest');
  await expect.poll(() => statuses.length).toBe(1);
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await expect.poll(() => statuses.length).toBe(2);
  await page.clock.fastForward(61_000);
  await expect(page.getByTestId('rush-final-score')).toBeVisible();
  await expect.poll(() => statuses.length).toBe(3);
  expect(statuses).toEqual([204, 204, 204]);
});
