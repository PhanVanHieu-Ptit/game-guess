import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-29';

verifyExtra2D(solution);

test('2d-29: tám cặp rót sai chưa thắng và không được rót cốc thứ hai; chỉ 2 sang 5 thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  await expect(page.getByTestId('cup-row')).toHaveAttribute(
    'data-water',
    '111000',
  );
  const cases = [
    { from: 1, to: 4, result: '011100' },
    { from: 1, to: 5, result: '011010' },
    { from: 1, to: 6, result: '011001' },
    { from: 2, to: 4, result: '101100' },
    { from: 2, to: 6, result: '101001' },
    { from: 3, to: 4, result: '110100' },
    { from: 3, to: 5, result: '110010' },
    { from: 3, to: 6, result: '110001' },
  ];
  for (const { from, to, result } of cases) {
    await page
      .getByRole('button', { name: `Cốc ${from}, đầy`, exact: true })
      .tap();
    await page
      .getByRole('button', { name: `Cốc ${to}, rỗng`, exact: true })
      .tap();
    await expect(page.getByTestId('cup-row')).toHaveAttribute(
      'data-water',
      result,
    );
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(page.getByRole('button', { name: /^Cốc / })).toHaveCount(0);
    await page.getByRole('button', { name: 'Thử lại', exact: true }).tap();
    await expect(page.getByTestId('cup-row')).toHaveAttribute(
      'data-water',
      '111000',
    );
  }
  await solution.solve(page);
  await expect(page.getByTestId('cup-row')).toHaveAttribute(
    'data-water',
    '101010',
  );
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2d-29: kéo lệch và vào cốc đầy chưa thắng; kéo 2 sang 5 thì thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const art = page.getByTestId('puzzle-art').locator('..');
  await art.scrollIntoViewIfNeeded();
  const svg = await art.boundingBox();
  if (!svg) throw new Error('Thiếu sân SVG');
  const point = (x: number, y: number) => ({
    x: svg.x + (svg.width * x) / 360,
    y: svg.y + (svg.height * y) / 265,
  });
  const drag = async (
    from: { x: number; y: number },
    to: { x: number; y: number },
  ) => {
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(to.x, to.y, { steps: 12 });
    await page.mouse.up();
  };
  await drag(point(90, 140), point(90, 30));
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.miss,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(page.getByTestId('cup-row')).toHaveAttribute(
    'data-water',
    '111000',
  );
  await drag(point(30, 140), point(90, 140));
  await expect(page.getByTestId('feedback')).toContainText(
    solution.meta.wrong!.full,
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await drag(point(90, 140), point(270, 140));
  await expect(page.getByTestId('cup-row')).toHaveAttribute(
    'data-water',
    '101010',
  );
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
