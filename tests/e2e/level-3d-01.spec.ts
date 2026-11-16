import { writeFile } from 'node:fs/promises';
import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/3d-01';

test.beforeEach(async ({ guard, browserName }) => {
  // Driver headless Chromium báo khi chụp framebuffer; không phải lỗi của game.
  if (browserName === 'chromium')
    guard.allow(/GL Driver Message .*GPU stall due to ReadPixels/);
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
});

test('3D-01: tải WebGL thật, góc đầu che số và hướng dẫn tự ẩn sau 5 giây', async ({
  page,
}, info) => {
  await openCampaignLevel(page, '3d-01');
  const canvas = page.locator('canvas');
  await expect(
    page.getByRole('group', { name: 'Ngôi nhà ống có sân thượng' }),
  ).toHaveAttribute('aria-busy', 'false');
  expect(
    await canvas.evaluate((node) =>
      Boolean((node as HTMLCanvasElement).getContext('webgl2')),
    ),
  ).toBe(true);
  await expect(page.locator('[data-number-readable]')).toHaveAttribute(
    'data-number-readable',
    'false',
  );
  await expect(page.getByTestId('drag-hint')).toBeVisible();
  await expect(page.getByTestId('drag-hint')).toHaveCount(0, { timeout: 6500 });
  await expectLayoutOk(page, '3D-01 mặt tiền');
  await page.screenshot({
    path: info.outputPath('3d-01-front.png'),
    animations: 'disabled',
  });
});

test('3D-01: kéo đổi camera, giới hạn góc/zoom, reset khôi phục đúng góc ban đầu', async ({
  page,
}) => {
  await openCampaignLevel(page, '3d-01');
  const reset = page.getByRole('button', { name: 'Về góc ban đầu' });
  await expect(reset).toBeEnabled();
  const canvas = page.locator('canvas');
  const initial = await canvas.evaluate((node) => ({
    azimuth: node.dataset.azimuth,
    polar: node.dataset.polar,
    distance: node.dataset.distance,
  }));
  const bounds = await canvas.boundingBox();
  if (!bounds) throw new Error('Thiếu Canvas');
  await page.mouse.move(
    bounds.x + bounds.width * 0.7,
    bounds.y + bounds.height * 0.5,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width * 0.25,
    bounds.y + bounds.height * 0.45,
    { steps: 12 },
  );
  await page.mouse.up();
  await expect(canvas).not.toHaveAttribute('data-azimuth', initial.azimuth!);
  await expect(page.getByTestId('drag-hint')).toHaveCount(0);
  for (let i = 0; i < 12; i++)
    await page.getByRole('button', { name: 'Lên', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-polar', '47.00');
  for (let i = 0; i < 12; i++)
    await page.getByRole('button', { name: 'Xuống', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-polar', '83.00');
  for (let i = 0; i < 6; i++)
    await page.getByRole('button', { name: 'Gần', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-distance', '9.00');
  for (let i = 0; i < 6; i++)
    await page.getByRole('button', { name: 'Xa', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-distance', '14.00');
  await reset.tap();
  await expect(canvas).toHaveAttribute('data-azimuth', initial.azimuth!);
  await expect(canvas).toHaveAttribute('data-polar', initial.polar!);
  await expect(canvas).toHaveAttribute('data-distance', initial.distance!);
  await expect(page.locator('[data-number-readable]')).toHaveAttribute(
    'data-number-readable',
    'false',
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('3D-01: sai có phản hồi, xoay ra sau và nhập 36 thắng chỉ bằng chạm; chơi lại giải được', async ({
  page,
  events,
}, info) => {
  await openCampaignLevel(page, '3d-01');
  await expect(
    page.getByRole('button', { name: 'Về góc ban đầu' }),
  ).toBeEnabled();
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await expectLayoutOk(page, '3D-01 bàn phím số');
  // Chụp mặt sau trước khi nhập; lời giải vẫn đi qua nút chạm thực tế.
  await page.locator('summary').tap();
  await page.getByRole('button', { name: 'Về góc ban đầu' }).tap();
  for (let i = 0; i < 14; i++)
    await page.getByRole('button', { name: 'Phải', exact: true }).tap();
  await page.getByRole('button', { name: 'Lên', exact: true }).tap();
  await expect(page.locator('[data-number-readable]')).toHaveAttribute(
    'data-number-readable',
    'true',
  );
  await expect(page.getByTestId('feedback')).toHaveCount(0, { timeout: 5000 });
  await page.locator('canvas').scrollIntoViewIfNeeded();
  await page
    .locator('canvas')
    .screenshot({ path: info.outputPath('3d-01-back-canvas.png') });
  await page.screenshot({
    path: info.outputPath('3d-01-back.png'),
    animations: 'disabled',
  });
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
    { timeout: 1000 },
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([
    { levelId: '3d-01', result: 'solved', hintsUsed: 0, wrongCount: 2 },
  ]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(page.locator('[data-number-readable]')).toHaveAttribute(
    'data-number-readable',
    'false',
  );
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toHaveLength(2);
});

test('3D-01: đo ngân sách toàn bộ lượt vẽ và tải 3D đầu tiên sau trang chủ', async ({
  page,
  browserName,
}, info) => {
  test.setTimeout(60_000);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const baseline = await page.evaluate(() =>
    performance.getEntriesByType('resource').map((entry) => entry.name),
  );
  // Trang chủ vừa tạo tiến trình rỗng; dựng lại fixture trước màn 3D, không thay đổi tài nguyên cache.
  await page.evaluate(() => localStorage.removeItem('latleo:v1'));
  await openCampaignLevel(page, '3d-01');
  await expect(
    page.getByRole('button', { name: 'Về góc ban đầu' }),
  ).toBeEnabled();
  await page.waitForLoadState('networkidle');
  const resources = await page.evaluate(
    (known) =>
      [
        ...performance.getEntriesByType('resource'),
        ...performance.getEntriesByType('navigation'),
      ]
        .filter(
          (entry): entry is PerformanceResourceTiming =>
            entry instanceof PerformanceResourceTiming &&
            !known.includes(entry.name),
        )
        .map((entry) => ({
          url: new URL(entry.name).pathname,
          encodedBytes: entry.encodedBodySize,
          transferBytes: entry.transferSize,
          decodedBytes: entry.decodedBodySize,
        })),
    baseline,
  );
  const canvas = page.locator('canvas');
  await expect(canvas).toHaveAttribute('data-draw-calls', /[1-9]\d*/);
  const samples: {
    azimuth: string | undefined;
    polar: string | undefined;
    calls: number;
    triangles: number;
  }[] = [];
  for (let polar = 0; polar < 3; polar++) {
    for (let i = 0; i < 36; i++)
      await page.getByRole('button', { name: 'Trái', exact: true }).tap();
    for (let i = 0; i < 36; i++) {
      await page.getByRole('button', { name: 'Phải', exact: true }).tap();
      samples.push(
        await canvas.evaluate((node) => ({
          azimuth: node.dataset.azimuth,
          polar: node.dataset.polar,
          calls: Number(node.dataset.drawCalls),
          triangles: Number(node.dataset.triangles),
        })),
      );
    }
    const direction = polar === 0 ? 'Lên' : 'Xuống';
    for (let i = 0; i < 4; i++)
      await page.getByRole('button', { name: direction, exact: true }).tap();
  }
  const report = {
    browser: browserName,
    project: info.project.name,
    resources,
    encodedBytes: resources.reduce((sum, entry) => sum + entry.encodedBytes, 0),
    transferBytes: resources.reduce(
      (sum, entry) => sum + entry.transferBytes,
      0,
    ),
    maxDrawCalls: Math.max(...samples.map((sample) => sample.calls)),
    maxTriangles: Math.max(...samples.map((sample) => sample.triangles)),
    samples,
  };
  await writeFile(
    info.outputPath('3d-01-budget.json'),
    JSON.stringify(report, null, 2),
  );
  expect(report.maxDrawCalls).toBeGreaterThan(0);
  expect(report.maxDrawCalls).toBeLessThan(50);
  if (browserName === 'chromium') {
    expect(report.encodedBytes).toBeGreaterThan(0);
    expect(report.transferBytes).toBeLessThan(1_000_000);
  }
});

test('3D-01: máy chậm tự hạ chất lượng và hướng dẫn tôn trọng giảm chuyển động', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    window.requestAnimationFrame = (callback) =>
      window.setTimeout(() => callback(performance.now()), 60);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  });
  await openCampaignLevel(page, '3d-01');
  await expect(
    page.getByRole('button', { name: 'Về góc ban đầu' }),
  ).toBeEnabled();
  expect(
    await page
      .getByTestId('drag-hint')
      .locator('g')
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe('none');
  const canvas = page.locator('canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Thiếu Canvas');
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  try {
    for (let i = 1; i <= 38; i++) {
      await page.mouse.move(
        box.x + box.width / 2 + Math.sin(i / 4) * 30,
        box.y + box.height / 2,
      );
      await page.waitForTimeout(65);
    }
  } finally {
    await page.mouse.up();
  }
  await expect(page.locator('[data-quality="low"]')).toBeVisible();
  const resolution = await canvas.evaluate((node) => ({
    pixels: (node as HTMLCanvasElement).width,
    css: node.clientWidth,
  }));
  expect(resolution.pixels).toBeLessThanOrEqual(resolution.css + 1);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
});
