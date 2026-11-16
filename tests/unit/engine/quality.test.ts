import { expect, it } from 'vitest';
import { InteractionQuality } from '@/engine/stage3d/quality';
it('không coi khoảng nghỉ demand là FPS thấp; hạ chất lượng một lần khi xoay chậm liên tục', () => {
  const quality = new InteractionQuality();
  for (let i = 0; i < 30; i++)
    expect(quality.sample(i * 1000, false)).toBe(false);
  for (let i = 0; i < 30; i++) expect(quality.sample(i * 16, true)).toBe(false);
  quality.sample(5000, false);
  let downgraded = 0;
  for (let i = 0; i < 50; i++)
    if (quality.sample(6000 + i * 50, true)) downgraded++;
  expect(downgraded).toBe(1);
});
