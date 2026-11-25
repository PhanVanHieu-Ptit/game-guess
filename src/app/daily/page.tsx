import type { Metadata } from 'next';
import { RushGame } from '@/features/rush/rush-game';

export const metadata: Metadata = { title: 'Đấu trí mỗi ngày' };

export default function DailyPage() {
  return <RushGame daily />;
}
