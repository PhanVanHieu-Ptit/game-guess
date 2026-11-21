import { test, expect } from '../fixtures';
import { openCampaignLevel } from './campaign';
import { expectLayoutOk } from './layout';
import { hints, play, result } from './ui';
import { strings } from '@/features/strings';
import type { LevelSolution } from '../solutions/types';

/** Cùng tiêu chí nghiệm thu cho từng màn, vẫn chạy riêng trước màn tiếp. */
export function verifyExtra2D(solution: LevelSolution) {
  const { meta } = solution;
  test(`${meta.id}: sai không thắng, phản hồi vui, giải bằng chạm và chơi lại`, async ({
    page,
    events,
  }, testInfo) => {
    await openCampaignLevel(page, meta.id);
    await expect(page.getByTestId('puzzle-art')).toBeVisible();
    await expectLayoutOk(page, meta.id);
    await page.screenshot({
      path: testInfo.outputPath(`${meta.id}.png`),
      fullPage: true,
    });
    for (const [index, mistake] of solution.mistakes.entries()) {
      await mistake.tap(page);
      await expect(play.feedback(page)).toContainText(mistake.feedback);
      await expect(result.dialog(page)).toHaveCount(0);
      await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
        'data-reaction',
        String(index + 1),
      );
    }
    await solution.solve(page);
    await expect(result.dialog(page)).toContainText(meta.explanation);
    expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
      { result: 'solved', wrongCount: solution.mistakes.length, hintsUsed: 0 },
    ]);
    await result
      .dialog(page)
      .getByRole('button', { name: 'Chơi lại', exact: true })
      .tap();
    await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
      'data-reaction',
      '0',
    );
    await solution.solve(page);
    await expect(result.dialog(page)).toContainText(meta.explanation);
  });

  test(`${meta.id}: ba gợi ý đúng thứ tự, giải thích và đo lường`, async ({
    page,
    events,
  }) => {
    await openCampaignLevel(page, meta.id);
    await expect(page.getByTestId('puzzle-art')).toBeVisible();
    await play.hintButton(page).tap();
    await expect(hints.open(page, 2)).toHaveCount(0);
    await hints.open(page, 1).tap();
    await expect(hints.sheet(page)).toContainText(meta.hints[0]);
    await hints.open(page, 2).tap();
    await expect(hints.sheet(page)).toContainText(meta.hints[1]);
    await hints.open(page, 3).tap();
    await hints
      .sheet(page)
      .getByRole('button', { name: strings.hints.confirmYes, exact: true })
      .tap();
    await expect(result.dialog(page)).toContainText(meta.hints[2]);
    await expect(result.dialog(page)).toContainText(meta.explanation);
    expect(
      events.filter((e) => e.type === 'hint_used').map((e) => e.tier),
    ).toEqual([1, 2, 3]);
    expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
      { result: 'revealed', hintsUsed: 3 },
    ]);
    await expectLayoutOk(page, `${meta.id} gợi ý`);
  });

  test(`${meta.id}: bố cục rộng, vẫn giải bằng chạm`, async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await openCampaignLevel(page, meta.id);
    await expect(page.getByTestId('puzzle-art')).toBeVisible();
    await expectLayoutOk(page, `${meta.id} rộng`);
    await solution.solve(page);
    await expect(result.dialog(page)).toContainText(meta.explanation);
  });
}
