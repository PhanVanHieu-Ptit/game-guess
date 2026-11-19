import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { hints, play, result } from './helpers/ui';
import { strings } from '@/features/strings';
import { meta as m15 } from '@/levels/2d-15/meta';
import { meta as m16 } from '@/levels/2d-16/meta';
import { meta as m17 } from '@/levels/2d-17/meta';
import { meta as m18 } from '@/levels/2d-18/meta';
import { meta as m19 } from '@/levels/2d-19/meta';

for (const meta of [m15, m16, m17, m18, m19]) {
  test(`${meta.id}: ba gợi ý tuần tự và lời giải thích qua khung chung`, async ({
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
    await expectLayoutOk(page, `${meta.id} xem đáp án`);
    expect(
      events
        .filter((event) => event.type === 'hint_used')
        .map((event) => event.tier),
    ).toEqual([1, 2, 3]);
    expect(
      events.filter((event) => event.type === 'level_complete'),
    ).toMatchObject([{ result: 'revealed', hintsUsed: 3 }]);
  });
}
