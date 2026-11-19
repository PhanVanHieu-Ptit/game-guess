import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-19';

test('2D-19: chọn sai số/dấu chưa thắng; dời một que từ 8 sang dấu trừ thì thắng', async ({
  page,
  events,
}, testInfo) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(
    page.getByRole('button', { name: 'Que trên bên phải số 8', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, solution.meta.id);
  await page.screenshot({
    path: testInfo.outputPath('2d-19.png'),
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
  await solution.solve(page);
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
    page.getByRole('button', { name: 'Que trên bên phải số 8', exact: true }),
  ).toBeVisible();
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-19: kéo que sang số 9 chưa thắng, trả lại rồi kéo vào dấu trừ', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const stick = page.getByRole('button', {
    name: 'Que trên bên phải số 8',
    exact: true,
  });
  await expect(stick).toBeVisible();
  await stick.scrollIntoViewIfNeeded();
  const box = await page
    .getByRole('img', {
      name: 'Phép tính bằng que diêm trên bàn gỗ: 8 trừ 3 bằng 9',
    })
    .boundingBox();
  if (!box) throw new Error('Thiếu phép tính');
  for (const x of [306, 118]) {
    await page.mouse.move(
      box.x + (70 * box.width) / 360,
      box.y + (110 * box.height) / 300,
    );
    await page.mouse.down();
    await page.mouse.move(
      box.x + (x * box.width) / 360,
      box.y + (135 * box.height) / 300,
      { steps: 8 },
    );
    await page.mouse.up();
    if (x === 306) {
      await expect(page.getByTestId('feedback')).toContainText(
        solution.meta.wrong?.miss ?? '',
      );
      await expect(page.getByRole('dialog')).toHaveCount(0);
    }
  }
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
