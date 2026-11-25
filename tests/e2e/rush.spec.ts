import {
  createRushDeck,
  dailySeed,
  vietnamDay,
  type RushPuzzle,
} from '@/domain/rush/puzzles';
import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import type { Page } from '@playwright/test';

const NOW = new Date('2026-11-25T05:00:00Z');
const deck = createRushDeck(dailySeed(vietnamDay(NOW.getTime())));

async function answer(page: Page, puzzle: RushPuzzle, correct: boolean) {
  const ids = correct
    ? puzzle.answer
    : [puzzle.options.find((option) => option.id !== puzzle.answer[0])!.id];
  for (const id of ids) {
    const option = puzzle.options.find((option) => option.id === id)!;
    await page
      .getByRole('button', {
        name: option.color
          ? `${option.label}, mực ${option.id.toLowerCase()}`
          : option.label,
        exact: true,
      })
      .tap();
  }
}

test('daily: all six mechanics, combo, timeout, personal record and replay', async ({
  page,
}, testInfo) => {
  await page.clock.install({ time: NOW });
  await page.goto('/daily');
  await expectLayoutOk(page, 'đấu trí giới thiệu');
  await expect(
    page.getByRole('button', { name: 'Vào trận · 60 giây →' }),
  ).toBeInViewport({ ratio: 1 });
  await page.screenshot({
    path: testInfo.outputPath('rush-intro.png'),
    fullPage: true,
    animations: 'disabled',
  });
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  for (const puzzle of deck.slice(0, 6)) {
    await expect(page.getByRole('timer')).toBeInViewport({ ratio: 1 });
    await expect(
      page.getByRole('heading', { name: puzzle.prompt, exact: true }),
    ).toBeVisible();
    await expectLayoutOk(page, `đấu trí ${puzzle.family}`);
    await answer(page, puzzle, true);
    await expect(page.getByRole('status')).toContainText('Chuẩn!');
    await page.getByRole('button', { name: 'Câu tiếp →' }).tap();
  }
  await expect(page.getByTestId('rush-score')).toHaveText('950');
  await page.screenshot({
    path: testInfo.outputPath('rush-playing.png'),
    fullPage: true,
    animations: 'disabled',
  });
  await page.clock.fastForward(61_000);
  await expect(page.getByTestId('rush-final-score')).toContainText('950');
  await expect(page.getByText('✦ KỶ LỤC CÁ NHÂN MỚI ✦')).toBeVisible();
  await expectLayoutOk(page, 'đấu trí kết quả');
  await page.screenshot({
    path: testInfo.outputPath('rush-result.png'),
    fullPage: true,
    animations: 'disabled',
  });
  await page.reload();
  await expect(page.getByText('Kỷ lục hôm nay của bạn:')).toContainText(
    '950 điểm',
  );
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await expect(
    page.getByRole('heading', { name: deck[0].prompt, exact: true }),
  ).toBeVisible();
  await expect(page.getByTestId('rush-score')).toHaveText('0');
});

test('three mistakes end the run, show the trap, and replay resets lives', async ({
  page,
}) => {
  await page.clock.install({ time: NOW });
  await page.goto('/daily');
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  for (let i = 0; i < 3; i++) {
    await answer(page, deck[i], false);
    if (i < 2) {
      await expect(page.getByLabel(`Còn ${2 - i} mạng`)).toBeVisible();
      await expect(page.getByRole('status')).toContainText(deck[i].explanation);
      await page.getByRole('button', { name: 'Câu tiếp →' }).tap();
    }
  }
  await expect(page.getByText('HẾT MẠNG, CHƯA HẾT VUI')).toBeVisible();
  await expect(
    page.getByText(`Cú lừa cuối: ${deck[2].explanation}`),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Gỡ kèo · Chơi lại →' }).tap();
  await expect(page.getByLabel('Còn 3 mạng')).toBeVisible();
  await expect(page.getByTestId('rush-score')).toHaveText('0');
});

test('homepage leads into a playable random run without campaign unlocks', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: /THỬ THÁCH TỐC ĐỘ/ }).tap();
  await expect(page).toHaveURL('/rush');
  await expect(
    page.getByRole('button', { name: 'Vào trận · 60 giây →' }),
  ).toBeInViewport({ ratio: 1 });
  await page.getByRole('button', { name: 'Vào trận · 60 giây →' }).tap();
  await expect(
    page.getByRole('region', { name: 'Trận đấu trí' }),
  ).toBeVisible();
  await expect(page.getByLabel('Còn 3 mạng')).toBeVisible();
  await expectLayoutOk(page, 'đấu trí ngẫu nhiên');
});
