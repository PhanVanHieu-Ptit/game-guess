import { test, expect } from './fixtures';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution } from './solutions/2d-20';

for (const sample of ['cam', 'bưởi'] as const) {
  test(`2D-20: lấy ${sample}, sai không mất lượt; đủ ba nhãn mới thắng và chơi lại được`, async ({
    page,
    events,
  }, testInfo) => {
    await page.addInitScript((orange) => {
      Math.random = () => (orange ? 0.1 : 0.9);
    }, sample === 'cam');
    await openCampaignLevel(page, solution.meta.id);
    await expect(
      page.getByRole('button', { name: 'Túi nhãn CAM ban đầu', exact: true }),
    ).toBeVisible();
    await expectLayoutOk(page, '2D-20 trước khi lấy quả');
    for (const mistake of solution.mistakes) {
      await mistake.tap(page);
      await expect(page.getByTestId('feedback')).toContainText(
        mistake.feedback,
      );
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(page.getByRole('img', { name: /^Quả đã lấy:/ })).toHaveCount(
        0,
      );
    }
    const sampleBag = page.getByRole('button', {
      name: 'Túi nhãn CAM + BƯỞI ban đầu',
      exact: true,
    });
    await sampleBag.tap();
    await expect(
      page.getByRole('img', { name: `Quả đã lấy: ${sample}`, exact: true }),
    ).toBeVisible();
    await sampleBag.tap();
    await expect(page.getByTestId('feedback')).toContainText(
      solution.meta.wrong!.extra,
    );
    await expect(page.getByRole('img', { name: /^Quả đã lấy:/ })).toHaveCount(
      1,
    );
    await page.getByRole('button', { name: 'Nhãn CAM', exact: true }).tap();
    await page
      .getByRole('button', { name: 'Túi nhãn CAM ban đầu', exact: true })
      .tap();
    await expect(page.getByTestId('feedback')).toContainText(
      solution.meta.wrong!.label,
    );
    await expect(page.getByRole('img', { name: /^Đã dán/ })).toHaveCount(0);
    await expect(page.getByTestId('puzzle-art')).toHaveAttribute(
      'data-reaction',
      '5',
    );
    await expectLayoutOk(page, '2D-20 sau khi lấy quả và chọn sai nhãn');
    await expect(page.getByTestId('feedback')).toBeHidden();
    await page.screenshot({
      path: testInfo.outputPath(`2d-20-${sample}.png`),
      fullPage: true,
    });
    const bags =
      sample === 'cam'
        ? ['CAM + BƯỞI', 'CAM', 'BƯỞI']
        : ['BƯỞI', 'CAM + BƯỞI', 'CAM'];
    for (const [index, label] of ['CAM', 'BƯỞI', 'CAM + BƯỞI'].entries()) {
      await page
        .getByRole('button', { name: `Nhãn ${label}`, exact: true })
        .tap();
      await page
        .getByRole('button', {
          name: `Túi nhãn ${bags[index]} ban đầu`,
          exact: true,
        })
        .tap();
      if (index < 2) {
        await expect(page.getByRole('dialog')).toHaveCount(0);
        await expect(page.getByRole('img', { name: /^Đã dán/ })).toHaveCount(
          index + 1,
        );
      }
    }
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
    expect(
      events.filter((event) => event.type === 'level_complete'),
    ).toMatchObject([{ result: 'solved', wrongCount: 5, hintsUsed: 0 }]);
    // Chỉ đổi nguồn ngẫu nhiên cho lượt sau, không sửa trạng thái hay đáp án của cảnh.
    await page.evaluate((wasOrange) => {
      Math.random = () => (wasOrange ? 0.9 : 0.1);
    }, sample === 'cam');
    await page
      .getByRole('dialog')
      .getByRole('button', { name: 'Chơi lại', exact: true })
      .tap();
    await expect(page.getByRole('img', { name: /^Quả đã lấy:/ })).toHaveCount(
      0,
    );
    await expect(page.getByRole('img', { name: /^Đã dán/ })).toHaveCount(0);
    await solution.solve(page);
    await expect(
      page.getByRole('img', {
        name: `Quả đã lấy: ${sample === 'cam' ? 'bưởi' : 'cam'}`,
        exact: true,
      }),
    ).toBeVisible();
    await expect(page.getByRole('dialog')).toContainText(
      solution.meta.explanation,
    );
  });
}

test('2D-20: kéo nhãn sai trả về; đổi nhãn đang chọn và kéo đúng vẫn giải được', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Math.random = () => 0.1;
  });
  await openCampaignLevel(page, solution.meta.id);
  const bag = page.getByRole('button', {
    name: 'Túi nhãn CAM + BƯỞI ban đầu',
    exact: true,
  });
  await bag.tap();
  await page.getByRole('button', { name: 'Nhãn BƯỞI', exact: true }).tap();
  const label = page.getByRole('button', { name: 'Nhãn CAM', exact: true });
  await label.tap();
  await expect(
    page.getByRole('button', { name: 'Nhãn BƯỞI', exact: true }),
  ).toHaveAttribute('aria-pressed', 'false');
  await label.scrollIntoViewIfNeeded();
  const art = await page
    .getByRole('img', {
      name: 'Ba túi trái cây kín với ba nhãn đều sai',
      exact: true,
    })
    .boundingBox();
  if (!art) throw new Error('Thiếu ba túi');
  for (const x of [64, 296]) {
    await page.mouse.move(
      art.x + (art.width * 64) / 360,
      art.y + (art.height * 377) / 434,
    );
    await page.mouse.down();
    await page.mouse.move(
      art.x + (art.width * x) / 360,
      art.y + (art.height * 230) / 434,
      { steps: 8 },
    );
    await page.mouse.up();
    if (x === 64) {
      await expect(page.getByTestId('feedback')).toContainText(
        solution.meta.wrong!.label,
      );
      await expect(page.getByRole('dialog')).toHaveCount(0);
      await expect(label).toHaveAttribute('aria-pressed', 'false');
    }
  }
  await expect(
    page.getByRole('img', { name: 'Đã dán CAM', exact: true }),
  ).toBeVisible();
  await page.getByRole('button', { name: 'Nhãn BƯỞI', exact: true }).tap();
  await page
    .getByRole('button', { name: 'Túi nhãn CAM ban đầu', exact: true })
    .tap();
  await page
    .getByRole('button', { name: 'Nhãn CAM + BƯỞI', exact: true })
    .tap();
  await page
    .getByRole('button', { name: 'Túi nhãn BƯỞI ban đầu', exact: true })
    .tap();
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
