/** Định dạng thời gian giải `m:ss` (docs/GDD.md mục 8: "Thời gian giải (mm:ss)"). Làm tròn tới giây; không có giờ. */
export function formatDuration(ms: number): string {
  const totalSeconds =
    Number.isFinite(ms) && ms > 0 ? Math.round(ms / 1000) : 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
