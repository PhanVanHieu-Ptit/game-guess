import { test, expect } from './fixtures';
import { expectLayoutOk } from './helpers/layout';
import { openCampaignLevel } from './helpers/campaign';
import { solution } from './solutions/2d-04';

test.beforeEach(({ guard }) => {
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
});

test('2D-04: xoài, giỏ, bé chưa thắng; từ chối cảm biến vẫn giải bằng chạm cây', async ({
  page,
  events,
}, testInfo) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'DeviceMotionEvent', {
      configurable: true,
      value: Object.assign(class extends Event {}, {
        requestPermission: async () => 'denied',
      }),
    });
  });
  await openCampaignLevel(page, '2d-04');
  await expect(
    page.getByRole('button', { name: 'Quả xoài', exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: testInfo.outputPath('2d-04.png'),
    animations: 'disabled',
  });
  await page.getByRole('button', { name: 'Bật cảm biến', exact: true }).tap();
  await expect(
    page.getByText('Bạn chưa cho phép cảm biến.', { exact: false }),
  ).toBeVisible();
  await expectLayoutOk(page, '2D-04, cảm biến bị từ chối');
  await page.screenshot({
    path: testInfo.outputPath('2d-04-permission.png'),
    animations: 'disabled',
  });
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await solution.solve(page);
  await expect(page.locator('[data-mango]')).toHaveAttribute(
    'data-mango',
    'fallen',
  );
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([{ result: 'solved', wrongCount: 3 }]);
});

test('2D-04: bật cảm biến rồi mẫu lắc làm xoài rụng', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'DeviceMotionEvent', {
      configurable: true,
      value: Object.assign(class extends Event {}, {
        requestPermission: async () => 'granted',
      }),
    });
  });
  await openCampaignLevel(page, '2d-04');
  await page.getByRole('button', { name: 'Bật cảm biến', exact: true }).tap();
  await expect(
    page.getByRole('button', { name: 'Bật cảm biến', exact: true }),
  ).toHaveCount(0);
  await page.evaluate(() => {
    const sample = new Event('devicemotion');
    Object.defineProperty(sample, 'acceleration', {
      value: { x: 15, y: 0, z: 0 },
    });
    window.dispatchEvent(sample);
  });
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-04: hai chạm chưa đủ; chạm thưa quá 2 giây không cộng dồn; đủ ba chạm nhanh thì thắng', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-04');
  const tree = page.getByRole('button', { name: 'Thân cây', exact: true });
  await tree.tap();
  await tree.tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.waitForTimeout(2100);
  await tree.tap();
  await expect(page.locator('[data-mango]')).toHaveAttribute(
    'data-mango',
    'hanging',
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await tree.tap();
  await tree.tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2D-04: nút Lắc thay thế luôn sẵn và cũng cần ba lần chạm', async ({
  page,
}) => {
  await openCampaignLevel(page, '2d-04');
  const shake = page.getByRole('button', { name: 'Lắc', exact: true });
  await shake.tap();
  await shake.tap();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await shake.tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
