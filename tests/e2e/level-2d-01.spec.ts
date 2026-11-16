import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-01';

test('2D-01: bé khác chưa thắng; dời bao rồi chạm bé ẩn mới thắng bằng chạm', async ({
  page,
  events,
  guard,
}, testInfo) => {
  // Next dev nạp trước CSS của hộp kết quả khi hộp chưa mở; không phải lỗi cảnh.
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
  await page.goto('/play/2d-01');
  await expect(
    page.getByRole('button', { name: 'Bao lì xì', exact: true }),
  ).toBeVisible();
  await expectLayoutOk(page, '2D-01');
  await page.screenshot({
    path: testInfo.outputPath('2d-01.png'),
    animations: 'disabled',
  });
  await expect(
    page.getByRole('button', { name: 'Bé nhỏ nhất', exact: true }),
  ).toHaveCount(0);
  for (const mistake of solution.mistakes.slice(0, 3)) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
    'data-reaction',
    '3',
  );
  await page.getByRole('button', { name: 'Bao lì xì', exact: true }).tap();
  await page
    .getByRole('button', { name: 'Chỗ trống bên trái', exact: true })
    .tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expectLayoutOk(page, '2D-01 sau khi dời bao');
  await page.getByRole('button', { name: 'Bé nhỏ nhất', exact: true }).tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
});

test('2D-01: kéo sai trả bao về; kéo đúng chưa thắng; chơi lại che bé và vẫn giải được', async ({
  page,
  guard,
}) => {
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
  await page.goto('/play/2d-01');
  const envelope = page.getByRole('button', { name: 'Bao lì xì', exact: true });
  const initial = await envelope.boundingBox();
  if (!initial) throw new Error('Thiếu bao lì xì');
  // Bổ sung kiểm đường kéo thật; ca phía trên đã kiểm thắng hoàn toàn bằng chạm.
  await page.mouse.move(
    initial.x + initial.width / 2,
    initial.y + initial.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(initial.x - 30, initial.y - 80, { steps: 6 });
  await page.mouse.up();
  await expect(page.getByTestId('feedback')).toContainText(
    'Bao lì xì thích nằm gọn sang bên cơ!',
  );
  await expect
    .poll(async () => (await envelope.boundingBox())?.x)
    .toBeCloseTo(initial.x, 0);
  await expect(
    page.getByRole('button', { name: 'Bé nhỏ nhất', exact: true }),
  ).toHaveCount(0);
  const target = await page
    .getByRole('button', { name: 'Chỗ trống bên trái', exact: true })
    .boundingBox();
  if (!target) throw new Error('Thiếu chỗ trống');
  await page.mouse.move(
    initial.x + initial.width / 2,
    initial.y + initial.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    target.x + target.width / 2,
    target.y + target.height / 2,
    { steps: 8 },
  );
  await page.mouse.up();
  await expect(
    page.getByRole('button', { name: 'Bé nhỏ nhất', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page
    .locator('header')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(
    page.getByRole('button', { name: 'Bé nhỏ nhất', exact: true }),
  ).toHaveCount(0);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
