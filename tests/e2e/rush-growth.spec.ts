import { createRushDeck, dailySeed } from '@/domain/rush/puzzles';
import { rushChallengeUrl } from '@/domain/share/rush-challenge';
import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';

test('a shared daily stays on its original deck after midnight, tracks replay, and can return to today', async ({
  page,
  growthEvents,
}, testInfo) => {
  await page.clock.install({ time: new Date('2026-11-26T05:00:00Z') });
  const day = '2026-11-25';
  const seed = dailySeed(day);
  const url = new URL(
    rushChallengeUrl('http://localhost:3100', {
      version: 1,
      seed,
      score: 950,
      day,
    }),
  );
  await page.goto(url.pathname + url.search);
  await expect(
    page.getByRole('complementary', { name: 'Lời thách đấu' }),
  ).toContainText('950 điểm');
  await expect(
    page.getByText(`Bộ câu ngày ${day} · giờ Việt Nam.`),
  ).toBeVisible();
  await expectLayoutOk(page, 'lời thách đấu');
  await expect(
    page.getByRole('button', { name: 'Vào trận · 60 giây →' }),
  ).toBeInViewport({ ratio: 1 });
  await page.screenshot({
    path: testInfo.outputPath('challenge-intro.png'),
    fullPage: true,
  });
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await expect(
    page.getByRole('heading', {
      name: createRushDeck(seed)[0].prompt,
      exact: true,
    }),
  ).toBeVisible();
  await page.clock.fastForward(61_000);
  await expect(page.getByTestId('rush-final-score')).toContainText('0');
  await expect
    .poll(() => growthEvents.filter((e) => e.type === 'rush_complete'))
    .toHaveLength(1);
  await page.getByRole('button', { name: 'Gỡ kèo · Chơi lại →' }).tap();
  await expect
    .poll(() => growthEvents.filter((e) => e.type === 'rush_start'))
    .toHaveLength(2);
  expect(growthEvents.filter((e) => e.type === 'rush_start')).toMatchObject([
    { seed, day, attempt: 1, challenged: true },
    { seed, day, attempt: 2, challenged: true },
  ]);
  await page.clock.fastForward(61_000);
  await page
    .getByRole('link', { name: 'Chơi bộ câu hôm nay', exact: true })
    .tap();
  await expect(page).toHaveURL('/daily');
  await expect(
    page.getByRole('button', { name: 'Vào trận · 60 giây →' }),
  ).toBeVisible();
  await expect(
    page.getByRole('complementary', { name: 'Lời thách đấu' }),
  ).toHaveCount(0);
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await expect(
    page.getByRole('heading', {
      name: createRushDeck(dailySeed('2026-11-26'))[0].prompt,
      exact: true,
    }),
  ).toBeVisible();
  expect(growthEvents.filter((e) => e.type === 'page_view')[0]).toMatchObject({
    source: 'friend',
    page: 'daily',
  });
});

test('copy fallback preserves a random deck, target and a usable invite URL', async ({
  page,
  growthEvents,
}, testInfo) => {
  await page.clock.install({ time: new Date('2026-11-26T05:00:00Z') });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: () => Promise.reject(new Error('denied')) },
    });
  });
  await page.goto('/rush?src=playtest');
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await page.clock.fastForward(61_000);
  await expect(page.getByTestId('rush-final-score')).toBeVisible();
  await page
    .getByRole('button', { name: 'Sao chép lời thách đấu', exact: true })
    .tap();
  const text = await page.getByRole('status').innerText();
  const invite = new URL(text.match(/https?:\/\/\S+$/)![0]);
  const run = growthEvents.find((e) => e.type === 'rush_start')!;
  expect(invite.searchParams.get('seed')).toBe(String(run.seed));
  expect(invite.searchParams.get('score')).toBe('0');
  expect(growthEvents.find((e) => e.type === 'rush_share')).toMatchObject({
    outcome: 'manual',
    runId: run.runId,
  });
  await expectLayoutOk(page, 'sao chép bị chặn');
  await page.screenshot({
    path: testInfo.outputPath('challenge-share.png'),
    fullPage: true,
  });
  await page.goto(invite.pathname + invite.search);
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await expect(
    page.getByRole('heading', {
      name: createRushDeck(Number(run.seed))[0].prompt,
      exact: true,
    }),
  ).toBeVisible();
});

test('leaving a live run emits one abandon with the same anonymous identity as the landing', async ({
  page,
  growthEvents,
}) => {
  await page.goto('/rush?src=community');
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await page.getByRole('link', { name: '← Trang chủ', exact: true }).tap();
  await expect(page).toHaveURL('/');
  await expect
    .poll(() => growthEvents.filter((e) => e.type === 'rush_abandon'))
    .toHaveLength(1);
  const start = growthEvents.find((e) => e.type === 'rush_start')!;
  const abandon = growthEvents.find((e) => e.type === 'rush_abandon')!;
  expect(abandon.runId).toBe(start.runId);
  expect(abandon.installId).toBe(growthEvents[0].installId);
  expect(growthEvents.filter((e) => e.type === 'rush_complete')).toHaveLength(
    0,
  );
});

test('invalid challenge links explain the fallback and still allow playing', async ({
  page,
}) => {
  await page.goto('/rush?v=2&seed=-1&score=999999');
  await expect(page.getByRole('status')).toContainText(
    'Link thách đấu không hợp lệ',
  );
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await expect(
    page.getByRole('region', { name: 'Trận đấu trí' }),
  ).toBeVisible();
});

test('cancelling native share does not count as a sent invitation', async ({
  page,
  growthEvents,
}) => {
  await page.clock.install({ time: new Date('2026-11-26T05:00:00Z') });
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'share', {
      configurable: true,
      value: () => Promise.reject(new DOMException('Cancelled', 'AbortError')),
    });
  });
  await page.goto('/rush');
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await page.clock.fastForward(61_000);
  await page
    .getByRole('button', { name: 'Thách đấu bạn bè', exact: true })
    .tap();
  await expect
    .poll(() => growthEvents.filter((e) => e.type === 'rush_share'))
    .toMatchObject([{ outcome: 'cancelled' }]);
});
