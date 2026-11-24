import { test, expect } from './fixtures';
import { verifyExtra2D } from './helpers/extra-2d';
import { openCampaignLevel } from './helpers/campaign';
import { expectLayoutOk } from './helpers/layout';
import { solution, jugStep } from './solutions/2d-38';

verifyExtra2D(solution);

test('2d-38: lời giải sáu bước; sai giữ tiến triển; chỉ thắng khi đủ 4 lít', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  const state = page.getByTestId('jug-state');
  const sequence = [
    'Lấy đầy bình 5 lít',
    'Rót bình 5 sang bình 3',
    'Đổ hết bình 3 lít',
    'Rót bình 5 sang bình 3',
    'Lấy đầy bình 5 lít',
    'Rót bình 5 sang bình 3',
  ];
  const volumes = ['5,0', '2,3', '2,0', '0,2', '5,2', '4,3'];
  for (const [index, label] of sequence.entries()) {
    await jugStep(page, label);
    await expect(state).toHaveAttribute('data-volumes', volumes[index]);
    await expect(state).toHaveAttribute('data-steps', String(index + 1));
    if (index === 1) {
      await jugStep(page, 'Rót bình 5 sang bình 3');
      await expect(page.getByTestId('feedback')).toContainText(
        solution.meta.wrong!.blocked,
      );
      await expect(state).toHaveAttribute('data-volumes', '2,3');
      await expect(state).toHaveAttribute('data-steps', '2');
      await expectLayoutOk(page, '2d-38 sau bước sai');
    }
    if (index < 5) await expect(page.getByRole('dialog')).toHaveCount(0);
  }
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});

test('2d-38: nhận lời giải khác tám bước; Thử lại xóa lượng nước và bộ đếm', async ({
  page,
}) => {
  await openCampaignLevel(page, solution.meta.id);
  await jugStep(page, 'Lấy đầy bình 5 lít');
  await jugStep(page, 'Thử lại');
  await expect(page.getByTestId('jug-state')).toHaveAttribute(
    'data-volumes',
    '0,0',
  );
  await expect(page.getByTestId('jug-state')).toHaveAttribute(
    'data-steps',
    '0',
  );
  for (const label of [
    'Lấy đầy bình 3 lít',
    'Rót bình 3 sang bình 5',
    'Lấy đầy bình 3 lít',
    'Rót bình 3 sang bình 5',
    'Đổ hết bình 5 lít',
    'Rót bình 3 sang bình 5',
    'Lấy đầy bình 3 lít',
    'Rót bình 3 sang bình 5',
  ])
    await jugStep(page, label);
  await expect(page.getByTestId('jug-state')).toHaveAttribute(
    'data-volumes',
    '4,0',
  );
  await expect(page.getByRole('dialog')).toContainText(
    solution.meta.explanation,
  );
});
