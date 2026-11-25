import type { Metadata } from 'next';
import { RushGame } from '@/features/rush/rush-game';

export const metadata: Metadata = { title: 'Đấu trí 60 giây' };

export default function RushPage() {
  return <RushGame />;
}
