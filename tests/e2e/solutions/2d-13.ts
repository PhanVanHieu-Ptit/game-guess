import { meta } from '@/levels/2d-13/meta';
import type { LevelSolution } from './types';

export const solution: LevelSolution = {
  meta,
  mistakes: [
    {
      tap: (page) =>
        page.getByRole('button', { name: 'Dòng sông', exact: true }).tap(),
      feedback: meta.wrong.water,
    },
    {
      tap: (page) =>
        page
          .getByRole('button', { name: 'Cây tre tay vịn', exact: true })
          .tap(),
      feedback: meta.wrong.release,
    },
  ],
  solve: async (page) => {
    const rail = page.getByRole('button', {
      name: 'Cây tre tay vịn',
      exact: true,
    });
    await rail.scrollIntoViewIfNeeded();
    const box = await rail.boundingBox();
    if (!box) throw new Error('Không thấy tay vịn');
    const x = box.x + box.width / 2;
    const y = box.y + box.height / 2;
    const client = await page
      .context()
      .newCDPSession(page)
      .catch(() => null);
    if (client) {
      await client.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{ x, y }],
      });
      await page.waitForTimeout(4200);
      await client.send('Input.dispatchTouchEvent', {
        type: 'touchEnd',
        touchPoints: [],
      });
      await client.detach();
    } else {
      await rail.dispatchEvent('pointerdown', {
        pointerType: 'touch',
        pointerId: 31,
        isPrimary: true,
        button: 0,
        clientX: x,
        clientY: y,
      });
      await page.waitForTimeout(4200);
      await rail.dispatchEvent('pointerup', {
        pointerType: 'touch',
        pointerId: 31,
        isPrimary: true,
        button: 0,
        clientX: x,
        clientY: y,
      });
    }
  },
};
