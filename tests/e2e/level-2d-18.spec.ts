import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-18';

test('2D-18: chia ngay chưa được; phải mượn rồi trả trâu mới thắng', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Trâu hàng xóm', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-18.png'),
    fullPage: true,
  });
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
    'data-reaction',
    '3',
  );
  await page.getByRole('button', { name: 'Trâu hàng xóm', exact: true }).tap();
  await page
    .getByRole('button', { name: 'Đàn trâu của ba anh em', exact: true })
    .tap();
  await expect(
    page.getByRole('status').filter({ hasText: 'Mượn thành 18' }),
  ).toContainText('chia 9, 6, 2');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('button', { name: 'Trâu còn dư', exact: true }).tap();
  await page
    .getByRole('button', { name: 'Trả về hàng xóm', exact: true })
    .tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(events.filter((e) => e.type === 'level_complete')).toMatchObject([
    { result: 'solved', wrongCount: 3 },
  ]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(
    page.getByRole('button', { name: 'Trâu còn dư', exact: true }),
  ).toHaveCount(0);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-18: kéo sai trả trâu về; kéo mượn rồi kéo trả thành công', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const buffalo = page.getByRole('button', {
    name: 'Trâu hàng xóm',
    exact: true,
  });
  await expect(buffalo).toBeVisible();
  await buffalo.scrollIntoViewIfNeeded();
  const drag = async (x1: number, y1: number, x2: number, y2: number) => {
    const box = await page
      .getByRole('img', {
        name: 'Ba anh em, đàn 17 con trâu và một con trâu bên hàng xóm',
      })
      .boundingBox();
    if (!box) throw new Error('Thiếu đàn trâu');
    await page.mouse.move(
      box.x + (x1 * box.width) / 360,
      box.y + (y1 * box.height) / 420,
    );
    await page.mouse.down();
    await page.mouse.move(
      box.x + (x2 * box.width) / 360,
      box.y + (y2 * box.height) / 420,
      { steps: 8 },
    );
    await page.mouse.up();
  };
  await drag(280, 76, 180, 76);
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong?.miss ?? '',
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await drag(280, 76, 180, 260);
  await expect(
    page.getByRole('button', { name: 'Trâu còn dư', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page
    .getByRole('button', { name: 'Trâu còn dư', exact: true })
    .scrollIntoViewIfNeeded();
  await drag(280, 366, 280, 76);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
