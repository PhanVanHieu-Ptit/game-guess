import type { Metadata } from 'next';
import { LevelSelect } from '@/features/level-select/level-select';
import { strings } from '@/features/strings';

export const metadata: Metadata = { title: strings.levels.title };

export default function LevelsPage() {
  return <LevelSelect />;
}
