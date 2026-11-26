import type { Metadata } from 'next';
import { RushEntry, type RushPageProps } from '@/features/rush/rush-entry';

export const metadata: Metadata = { title: 'Đấu trí mỗi ngày' };

export default function DailyPage(props: RushPageProps) {
  return <RushEntry {...props} daily />;
}
