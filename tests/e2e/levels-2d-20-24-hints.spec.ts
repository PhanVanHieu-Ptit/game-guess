import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { hints, play, result } from './helpers/ui';
import { strings } from '@/features/strings';
import { meta as m20 } from '@/levels/2d-20/meta';
import { meta as m21 } from '@/levels/2d-21/meta';
import { meta as m22 } from '@/levels/2d-22/meta';
import { meta as m23 } from '@/levels/2d-23/meta';
import { meta as m24 } from '@/levels/2d-24/meta';

for (const meta of [m20, m21, m22, m23, m24]) {
  test(`${meta.id}: ba gợi ý tuần tự, lời giải thích và sự kiện qua khung chung`, async ({
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
