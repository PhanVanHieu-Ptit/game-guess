import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution as s16 } from './solutions/2d-16';
import { solution as s17 } from './solutions/2d-17';
import { solution as s18 } from './solutions/2d-18';
import { solution as s19 } from './solutions/2d-19';
import { solution as s20 } from './solutions/2d-20';
import { solution as s21 } from './solutions/2d-21';
import { solution as s22 } from './solutions/2d-22';
import { solution as s23 } from './solutions/2d-23';
import { solution as s24 } from './solutions/2d-24';

test.use({
  isMobile: false,
  hasTouch: true,
  viewport: { width: 1366, height: 768 },
});

test('2D-16…24: lô 4 và bốn màn bổ sung giải bằng chạm ở 1366 px', async ({
  page,
}) => {
  for (const solution of [s16, s17, s18, s19, s20, s21, s22, s23, s24]) {
    await openCampaignLevel(page, solution.meta.id);
    await expect(page.getByTestId('puzzle-art')).toBeVisible();
    await expectLayoutOk(page, `${solution.meta.id} rộng 1366`);
    await solution.mistakes[0].tap(page);
    await expect(page.getByTestId('feedback')).toContainText(
      solution.mistakes[0].feedback,
    );
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await solution.solve(page);
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
    await expectLayoutOk(page, `${solution.meta.id} kết quả rộng 1366`);
  }
});
