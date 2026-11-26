import type { Metadata } from 'next';
import { RushEntry, type RushPageProps } from '@/features/rush/rush-entry';

export const metadata: Metadata = { title: 'Đấu trí 60 giây' };

export default function RushPage(props: RushPageProps) {
  return <RushEntry {...props} />;
}
