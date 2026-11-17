import { writeFile } from 'node:fs/promises';
import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { sceneTarget, tapSceneTarget } from './helpers/scene-3d';
import { inspectPot, solution } from './solutions/3d-03';

test.beforeEach(async ({ guard, browserName }) => {
  // Cảnh báo framebuffer của driver headless khi chụp Canvas, theo các màn 3D đã có.
  if (browserName === 'chromium')
    guard.allow(/GL Driver Message .*GPU stall due to ReadPixels/);
  // Next dev preload CSS UI trước khi dùng, cùng ngoại lệ có giới hạn ở 3D-01/02.
  if (process.env.E2E_DEV === '1')
    guard.allow(
      /The resource http:\/\/localhost:3100\/_next\/static\/chunks\/src_features_ui_[\w.-]+\.css was preloaded using link preload but not used/,
    );
});

test('3D-03: nắp đóng giấu bánh; mở nắp chỉ thấy bốn; nghiêng thấy đủ năm', async ({
  page,
}, info) => {
  await openCampaignLevel(page, '3d-03');
  const canvas = page.locator('canvas');
  await expect(
    page.getByRole('group', { name: 'Nồi bánh chưng ngày Tết' }),
  ).toHaveAttribute('aria-busy', 'false');
  expect(
    await canvas.evaluate((node) =>
      Boolean((node as HTMLCanvasElement).getContext('webgl2')),
    ),
  ).toBe(true);
  await expect(canvas).toHaveAttribute('data-visible-cakes', '');
  await expect(page.getByTestId('drag-hint')).toHaveCount(0);
  await expectLayoutOk(page, '3D-03 góc đầu');
  await canvas.screenshot({ path: info.outputPath('3d-03-closed.png') });
  await tapSceneTarget(page, 'lid');
  await canvas.screenshot({ path: info.outputPath('3d-03-four.png') });
  await expect(canvas).toHaveAttribute(
    'data-visible-cakes',
    'cake-1,cake-2,cake-3,cake-4',
  );
  await expect(canvas).toHaveAttribute('data-bottom-visible', 'false');
  await inspectPot(page);
  await canvas.screenshot({ path: info.outputPath('3d-03-five.png') });
  await expect(canvas).toHaveAttribute(
    'data-visible-cakes',
    'cake-1,cake-2,cake-3,cake-4,cake-5',
  );
  await expectLayoutOk(page, '3D-03 nghiêng nồi');
  await page.screenshot({
    path: info.outputPath('3d-03-scene.png'),
    animations: 'disabled',
  });
});

test('3D-03: kéo nồi không xoay camera, hủy kéo phục hồi; xoay nền và reset đúng', async ({
  page,
}) => {
  await openCampaignLevel(page, '3d-03');
  await tapSceneTarget(page, 'lid');
  const canvas = page.locator('canvas');
  const initial = await canvas.evaluate((node) => ({
    azimuth: node.dataset.azimuth!,
    polar: node.dataset.polar!,
    distance: node.dataset.distance!,
  }));
  const start = await sceneTarget(page, 'pot-handle');
  await page.mouse.move(start.x, start.y);
  await page.mouse.down();
  await page.mouse.move(start.x, start.y + 45, { steps: 10 });
  await expect(page.locator('[data-dragging]')).toHaveAttribute(
    'data-dragging',
    'true',
  );
  await expect(page.locator('[data-pot-tilt]')).not.toHaveAttribute(
    'data-pot-tilt',
    '0.00',
  );
  for (const [name, value] of Object.entries(initial))
    await expect(canvas).toHaveAttribute(`data-${name}`, value);
  await canvas.dispatchEvent('pointercancel', {
    pointerId: 1,
    pointerType: 'mouse',
    isPrimary: true,
  });
  await page.mouse.up();
  await expect(page.locator('[data-dragging]')).toHaveAttribute(
    'data-dragging',
    'false',
  );
  await expect(page.locator('[data-pot-tilt]')).toHaveAttribute(
    'data-pot-tilt',
    '0.00',
  );
  const again = await sceneTarget(page, 'pot-handle');
  await page.mouse.move(again.x, again.y);
  await page.mouse.down();
  await page.mouse.move(again.x, again.y + 45, { steps: 10 });
  await page.mouse.up();
  await expect(canvas).toHaveAttribute('data-bottom-visible', 'true');
  for (const [name, value] of Object.entries(initial))
    await expect(canvas).toHaveAttribute(`data-${name}`, value);
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Thiếu Canvas');
  await page.mouse.move(box.x + box.width * 0.9, box.y + 15);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.55, box.y + 20, { steps: 10 });
  await page.mouse.up();
  await expect(canvas).not.toHaveAttribute('data-azimuth', initial.azimuth);
  await page.getByRole('button', { name: 'Về góc ban đầu' }).tap();
  for (const [name, value] of Object.entries(initial))
    await expect(canvas).toHaveAttribute(`data-${name}`, value);
  await expect(page.locator('[data-pot-tilt]')).not.toHaveAttribute(
    'data-pot-tilt',
    '0.00',
  );
  await page.getByRole('button', { name: 'Đặt nồi thẳng', exact: true }).tap();
  await expect(canvas).toHaveAttribute('data-bottom-visible', 'false');
});

test('3D-03: nhập bốn sai; chọn quai/nghiêng/nhập năm thắng bằng chạm; chơi lại đóng nắp', async ({
  page,
  events,
}) => {
  await openCampaignLevel(page, '3d-03');
  for (const mistake of solution.mistakes) {
    await mistake.tap(page);
    await expect(page.getByTestId('feedback')).toContainText(mistake.feedback);
    await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
    { timeout: 1000 },
  );
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toMatchObject([
    { levelId: '3d-03', result: 'solved', wrongCount: 2, hintsUsed: 0 },
  ]);
  await page
    .getByRole('dialog')
    .getByRole('button', { name: 'Chơi lại', exact: true })
    .tap();
  await expect(page.locator('[data-lid-open]')).toHaveAttribute(
    'data-lid-open',
    'false',
  );
  await expect(page.locator('[data-pot-tilt]')).toHaveAttribute(
    'data-pot-tilt',
    '0.00',
  );
  await expect(page.locator('canvas')).toHaveAttribute(
    'data-visible-cakes',
    '',
  );
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
  expect(
    events.filter((event) => event.type === 'level_complete'),
  ).toHaveLength(2);
});

test('3D-03: tự hạ chất lượng vẫn giấu tầng dưới trước khi nghiêng và giải được', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.addInitScript(() => {
    window.requestAnimationFrame = (callback) =>
      window.setTimeout(() => callback(performance.now()), 60);
    window.cancelAnimationFrame = (id) => window.clearTimeout(id);
  });
  await openCampaignLevel(page, '3d-03');
  await expect(
    page.getByRole('button', { name: 'Về góc ban đầu' }),
  ).toBeEnabled();
  const canvas = page.locator('canvas');
  const box = await canvas.boundingBox();
  if (!box) throw new Error('Thiếu Canvas');
  await page.mouse.move(box.x + box.width * 0.86, box.y + 12);
  await page.mouse.down();
  try {
    for (let i = 1; i <= 42; i++) {
      await page.mouse.move(
        box.x + box.width * 0.86 + Math.sin(i / 4) * 18,
        box.y + 12,
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
  await page.getByRole('button', { name: 'Về góc ban đầu' }).tap();
  await tapSceneTarget(page, 'lid');
  await expect(canvas).toHaveAttribute('data-bottom-visible', 'false');
  await solution.solve(page);
  await expect(page.getByRole('dialog')).toBeVisible();
});

test('3D-03: đo tải 3D lần đầu và draw call qua ba trạng thái, các góc và khoảng cách', async ({
  page,
}, info) => {
  test.setTimeout(90_000);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const baseline = await page.evaluate(() =>
    performance.getEntriesByType('resource').map((entry) => entry.name),
  );
  await page.evaluate(() => localStorage.removeItem('latleo:v1'));
  await openCampaignLevel(page, '3d-03');
  const reset = page.getByRole('button', { name: 'Về góc ban đầu' });
  await expect(reset).toBeEnabled();
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
          url: new URL(resource.name).pathname,
          encodedBytes: resource.encodedBodySize,
          transferBytes: resource.transferSize,
        };
      }),
    baseline,
  );
  const samples: {
    phase: string;
    azimuth: string | undefined;
    polar: string | undefined;
    distance: string | undefined;
    calls: number;
    triangles: number;
  }[] = [];
  const canvas = page.locator('canvas');
  for (const phase of ['closed', 'open', 'tilted']) {
    await reset.tap();
    if (phase === 'open') await tapSceneTarget(page, 'lid');
    if (phase === 'tilted') await inspectPot(page);
    for (const height of ['initial', 'up', 'down']) {
      for (const zoom of ['near', 'far']) {
        await reset.tap();
        if (height !== 'initial') {
          for (let i = 0; i < 3; i++)
            await page
              .getByRole('button', {
                name: height === 'up' ? 'Lên' : 'Xuống',
                exact: true,
              })
              .tap();
          await expect(canvas).toHaveAttribute(
            'data-polar',
            height === 'up' ? '25.00' : '31.00',
          );
        }
        for (let i = 0; i < 4; i++)
          await page
            .getByRole('button', {
              name: zoom === 'near' ? 'Gần' : 'Xa',
              exact: true,
            })
            .tap();
        await expect(canvas).toHaveAttribute(
          'data-distance',
          zoom === 'near' ? '6.50' : '9.00',
        );
        for (let i = 0; i < 6; i++)
          await page.getByRole('button', { name: 'Trái', exact: true }).tap();
        await expect(canvas).toHaveAttribute('data-azimuth', '-30.00');
        for (let i = 0; i <= 6; i++) {
          if (i > 0)
            await page.getByRole('button', { name: 'Phải', exact: true }).tap();
          const requestedView = await canvas.evaluate((node) => ({
            azimuth: node.dataset.azimuth,
            polar: node.dataset.polar,
            distance: node.dataset.distance,
          }));
          await expect(canvas).toHaveAttribute(
            'data-render-view',
            JSON.stringify(requestedView),
          );
          samples.push({
            phase,
            ...(await canvas.evaluate((node) => ({
              azimuth: node.dataset.azimuth,
              polar: node.dataset.polar,
              distance: node.dataset.distance,
              calls: Number(node.dataset.drawCalls),
              triangles: Number(node.dataset.triangles),
            }))),
          });
          if (phase === 'open')
            await expect(canvas).toHaveAttribute(
              'data-bottom-visible',
              'false',
            );
        }
        await expect(canvas).toHaveAttribute('data-azimuth', '30.00');
      }
    }
  }
  const report = {
    project: info.project.name,
    transferBytes: resources.reduce(
      (sum, resource) => sum + resource.transferBytes,
      0,
    ),
    encodedBytes: resources.reduce(
      (sum, resource) => sum + resource.encodedBytes,
      0,
    ),
    maxDrawCalls: Math.max(...samples.map((sample) => sample.calls)),
    maxTriangles: Math.max(...samples.map((sample) => sample.triangles)),
    resources,
    samples,
  };
  await writeFile(
    info.outputPath('3d-03-budget.json'),
    JSON.stringify(report, null, 2),
  );
  expect(report.maxDrawCalls).toBeGreaterThan(0);
  expect(report.maxDrawCalls).toBeLessThan(50);
  if (process.env.E2E_DEV !== '1') {
    expect(report.transferBytes).toBeGreaterThan(0);
    expect(report.transferBytes).toBeLessThan(1_000_000);
  }
});
