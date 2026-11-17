import { writeFile } from 'node:fs/promises';
import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { sceneTarget, tapSceneTarget } from './helpers/scene-3d';
import { solution } from './solutions/3d-02';

test.beforeEach(async ({ guard, browserName }) => {
  // Chụp Canvas trên driver Chromium headless có thể báo stall ReadPixels.
  if (browserName === 'chromium')
    guard.allow(/GL Driver Message .*GPU stall due to ReadPixels/);
  // Next dev preload CSS UI trước khi cảnh dùng tới, cùng cảnh báo đã ghi nhận ở 3D-01.
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
});

test('3D-02: tải WebGL, góc đầu giấu chìa, hướng dẫn kéo tự ẩn', async ({
  page,
}, info) => {
  await openCampaignLevel(page, '3d-02');
  await expect(
    page.getByRole('group', { name: 'Phòng khách nhà ống' }),
  ).toHaveAttribute('aria-busy', 'false');
  const canvas = page.locator('canvas');
  expect(
    await canvas.evaluate((node) =>
      Boolean((node as HTMLCanvasElement).getContext('webgl2')),
    ),
  ).toBe(true);
  await expect(page.locator('[data-key-state]')).toHaveAttribute(
    'data-key-state',
    'searching',
  );
  await expect(canvas).not.toHaveAttribute('data-target-key', /./);
  await expect(page.getByTestId('drag-hint')).toBeVisible();
  await expect(page.getByTestId('drag-hint')).toHaveCount(0, { timeout: 6500 });
  await expectLayoutOk(page, '3D-02 góc đầu');
  await canvas.screenshot({
    path: info.outputPath('3d-02-initial-canvas.png'),
  });
  await page.screenshot({
    path: info.outputPath('3d-02-initial.png'),
    animations: 'disabled',
  });
});

test('3D-02: kéo qua dép không lật, camera có giới hạn và reset đúng góc đầu', async ({
  page,
}) => {
  await openCampaignLevel(page, '3d-02');
  const reset = page.getByRole('button', { name: 'Về góc ban đầu' });
  await expect(reset).toBeEnabled();
  const canvas = page.locator('canvas');
  const initial = await canvas.evaluate((node) => ({
    azimuth: node.dataset.azimuth!,
    polar: node.dataset.polar!,
    distance: node.dataset.distance!,
  }));
  const start = await sceneTarget(page, 'slippers');
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x - 90, start.y - 30, { steps: 12 });
  await page.mouse.up();
  await expect(canvas).not.toHaveAttribute('data-azimuth', initial.azimuth);
  await expect(page.locator('[data-key-state]')).toHaveAttribute(
    'data-key-state',
    'searching',
  );
  await expect(page.getByTestId('drag-hint')).toHaveCount(0);
  for (let i = 0; i < 18; i++)
    await page.getByRole('button', { name: 'Phải', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-azimuth', '75.00');
  for (let i = 0; i < 8; i++)
    await page.getByRole('button', { name: 'Lên', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-polar', '35.00');
  for (let i = 0; i < 8; i++)
    await page.getByRole('button', { name: 'Xuống', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-polar', '76.00');
  for (let i = 0; i < 5; i++)
    await page.getByRole('button', { name: 'Gần', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-distance', '9.00');
  for (let i = 0; i < 5; i++)
    await page.getByRole('button', { name: 'Xa', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-distance', '14.00');
  await reset.tap();
  for (const [name, value] of Object.entries(initial))
    await expect(canvas).toHaveAttribute(`data-${name}`, value);
});

test('3D-02: ba chỗ sai có phản hồi, lật dép rồi chạm chìa mới thắng; chơi lại giấu chìa', async ({
  page,
  events,
}, info) => {
  await openCampaignLevel(page, '3d-02');
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  for (let i = 0; i < 5; i++)
    await page.getByRole('button', { name: 'Phải', exact: true }).tap();
  await tapSceneTarget(page, 'slippers');
  await expect(page.locator('[data-key-state]')).toHaveAttribute(
    'data-key-state',
    'flipped',
  );
  await expect(page.getByRole('dialog')).toHaveCount(0);
  // Reset camera giữ nguyên bước đã tìm, còn Chơi lại khởi tạo lại toàn bộ câu đố.
  await page.getByRole('button', { name: 'Về góc ban đầu' }).tap();
  await expect(page.locator('[data-key-state]')).toHaveAttribute(
    'data-key-state',
    'flipped',
  );
  await expect(page.getByTestId('feedback')).toHaveCount(0, { timeout: 5000 });
  await expectLayoutOk(page, '3D-02 đã lật dép');
  for (let i = 0; i < 2; i++)
    await page.getByRole('button', { name: 'Gần', exact: true }).tap();
  await page
    .locator('canvas')
    .screenshot({ path: info.outputPath('3d-02-key-canvas.png') });
  await tapSceneTarget(page, 'key');
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
    { timeout: 1000 },
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([
    { levelId: '3d-02', result: 'solved', hintsUsed: 0, wrongCount: 3 },
  ]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(page.locator('[data-key-state]')).toHaveAttribute(
    'data-key-state',
    'searching',
  );
  await expect(page.locator('canvas')).not.toHaveAttribute(
    'data-target-key',
    /./,
  );
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toHaveLength(2);
});

test('3D-02: chạm lệch tâm 20 px vẫn tìm được vật khi gần và xa', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, '3d-02');
  for (const zoom of ['Gần', 'Xa']) {
    for (let i = 0; i < 6; i++)
      await page.getByRole('button', { name: zoom, exact: true }).tap();
    for (const [dx, dy] of [
      [-20, 0],
      [20, 0],
      [0, -20],
      [0, 20],
    ]) {
      const target = await sceneTarget(page, 'table');
      await page.touchscreen.tap(target.x + dx, target.y + dy);
      await expect(page.getByTestId('feedback')).toContainText(
        solution.meta.wrong?.table ?? 'Bàn sạch quá!',
      );
    }
  }
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(events.find((event) => event.type === 'level_complete')).toMatchObject(
    { wrongCount: 8 },
  );
});

test('3D-02: máy chậm tự hạ chất lượng, giảm chuyển động và vẫn giải được', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    window.requestAnimationFrame = (callback) =>
      window.setTimeout(() => callback(performance.now()), 60);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  });
  await openCampaignLevel(page, '3d-02');
  await expect(
    page.getByRole('button', { name: 'Về góc ban đầu' }),
  ).toBeEnabled();
  expect(
    await page
      .getByTestId('drag-hint')
      .locator('g')
      .evaluate((node) => getComputedStyle(node).animationName),
  ).toBe('none');
  const box = await page.locator('canvas').boundingBox();
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
  const resolution = await page.locator('canvas').evaluate((node) => ({
    pixels: (node as HTMLCanvasElement).width,
    css: node.clientWidth,
  }));
  expect(resolution.pixels).toBeLessThanOrEqual(resolution.css + 1);
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('3D-02: đo tải 3D lần đầu và draw call trước/sau lật qua các góc', async ({
  page,
}, info) => {
  test.setTimeout(90_000);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const baseline = await page.evaluate(() =>
    performance.getEntriesByType('resource').map((entry) => entry.name),
  );
  await page.evaluate(() => localStorage.removeItem('latleo:v1'));
  await openCampaignLevel(page, '3d-02');
  await expect(
    page.getByRole('button', { name: 'Về góc ban đầu' }),
  ).toBeEnabled();
  await page.waitForLoadState('networkidle');
  const resources = await page.evaluate(
    (known) =>
      [
        ...performance.getEntriesByType('navigation'),
        ...performance
          .getEntriesByType('resource')
          .filter((entry) => !known.includes(entry.name)),
      ].map((entry) => {
        const resource = entry as PerformanceResourceTiming;
        return {
          name: resource.name,
          encodedBodySize: resource.encodedBodySize,
          transferSize: resource.transferSize,
        };
      }),
    baseline,
  );
  const samples: {
    phase: string;
    azimuth: string | undefined;
    polar: string | undefined;
    drawCalls: number;
    triangles: number;
  }[] = [];
  for (const phase of ['searching', 'flipped']) {
    if (phase === 'flipped') {
      await page.getByRole('button', { name: 'Về góc ban đầu' }).tap();
      await tapSceneTarget(page, 'slippers');
    }
    for (const height of ['initial', 'up', 'down']) {
      await page.getByRole('button', { name: 'Về góc ban đầu' }).tap();
      if (height !== 'initial')
        for (let i = 0; i < 8; i++)
          await page
            .getByRole('button', {
              name: height === 'up' ? 'Lên' : 'Xuống',
              exact: true,
            })
            .tap();
      for (let i = 0; i < 16; i++)
        await page.getByRole('button', { name: 'Trái', exact: true }).tap();
      for (let i = 0; i <= 15; i++) {
        if (i > 0)
          await page.getByRole('button', { name: 'Phải', exact: true }).tap();
        await page.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() => resolve()),
            ),
        );
        samples.push({
          phase,
          ...(await page.locator('canvas').evaluate((canvas) => ({
            azimuth: canvas.dataset.azimuth,
            polar: canvas.dataset.polar,
            drawCalls: Number(canvas.dataset.drawCalls),
            triangles: Number(canvas.dataset.triangles),
          }))),
        });
      }
    }
  }
  const transferBytes = resources.reduce(
    (sum, resource) => sum + resource.transferSize,
    0,
  );
  const encodedBytes = resources.reduce(
    (sum, resource) => sum + resource.encodedBodySize,
    0,
  );
  const maxDrawCalls = Math.max(...samples.map((sample) => sample.drawCalls));
  const report = {
    project: info.project.name,
    transferBytes,
    encodedBytes,
    maxDrawCalls,
    resources,
    samples,
  };
  await writeFile(
    info.outputPath('3d-02-budget.json'),
    JSON.stringify(report, null, 2),
  );
  await info.attach('3d-02-budget', {
    body: JSON.stringify(report),
    contentType: 'application/json',
  });
  expect(maxDrawCalls).toBeGreaterThan(0);
  expect(maxDrawCalls).toBeLessThan(50);
  // Dev gửi mã chưa nén; ngưỡng tải chỉ đánh giá build production.
  if (process.env.E2E_DEV !== '1') {
    expect(transferBytes).toBeGreaterThan(0);
    expect(transferBytes).toBeLessThan(1_000_000);
  }
});
