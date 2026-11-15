import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { GameShell } from '@/features/game-shell/game-shell';
import { strings } from '@/features/strings';
import { findLevel, LEVEL_METAS } from '@/levels';

// Các mã màn có thật được dựng sẵn lúc build. Mã lạ KHÔNG đặt `dynamicParams = false`: khi đó Next trả thẳng trang 404
// gốc của ứng dụng (chỉ có nút về trang chủ) và không bao giờ dùng `not-found.tsx` của route này. Để mặc định thì mã
// lạ đi qua `notFound()` bên dưới, trả 404 kèm trang "không tìm thấy màn" có nút "Về chọn màn" (docs/TECH.md mục 3).
export function generateStaticParams() {
  return LEVEL_METAS.map(({ id }) => ({ id }));
}

type PlayPageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PlayPageProps): Promise<Metadata> {
  const { id } = await params;
  const meta = findLevel(id);
  // Tiêu đề chỉ có số màn, không có tên màn (tên có thể gợi ra mẹo).
  return { title: meta ? `Màn ${meta.ordinal}` : strings.play.notFound.title };
}

export default async function PlayPage({ params }: PlayPageProps) {
  const { id } = await params;
  const meta = findLevel(id);
  if (!meta) notFound();
  // `key` để chuyển màn (Màn tiếp) dựng lại khung chơi từ đầu thay vì dùng lại trạng thái của màn trước.
  return <GameShell key={meta.id} levelId={meta.id} />;
}
