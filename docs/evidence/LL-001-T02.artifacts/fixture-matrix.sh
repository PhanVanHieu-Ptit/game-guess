#!/usr/bin/env bash
# Harness một lần cho bằng chứng LL-001-T02 (không phải test của sản phẩm). Tương thích bash 3.2.
# Chạy từ gốc repo:  bash docs/evidence/LL-001-T02.artifacts/fixture-matrix.sh <file-log-đầu-ra>
# Mỗi fixture chứa đúng MỘT loại lỗi, đặt tạm trong src/, chạy lần lượt ba script, ghi exit code,
# và luôn xóa fixture khi kết thúc (kể cả khi lỗi).
set -u
OUT="$1"
: > "$OUT"

content_for() {
  case "$1" in
    type)   printf '%s\n' "export const typeError: number = 'không phải số';" ;;
    lint)   printf '%s\n' "export const anything: any = 1;" ;;
    format) printf '%s\n' "export const   spaced  =   1" ;;
    warn)   printf '%s\n' 'export function Pic() {' '  return <img src="/x.png" alt="" />;' '}' ;;
  esac
}
file_for() { case "$1" in warn) echo "src/tmp-fixture-warn.tsx" ;; *) echo "src/tmp-fixture-$1.ts" ;; esac; }

cleanup() { rm -f src/tmp-fixture-type.ts src/tmp-fixture-lint.ts src/tmp-fixture-format.ts src/tmp-fixture-warn.tsx; }
trap cleanup EXIT

{
  echo "# Fixture matrix — LL-001-T02 — $(TZ=Asia/Ho_Chi_Minh date '+%Y-%m-%d %H:%M:%S %z')"
  echo "# Mỗi fixture chứa đúng một loại lỗi. Kỳ vọng: đúng một script fail (exit != 0), hai script còn lại pass (exit 0)."
  echo
} >> "$OUT"

for kind in type lint format warn; do
  f="$(file_for "$kind")"
  content_for "$kind" > "$f"
  echo "## fixture '$kind': $f" >> "$OUT"
  echo '```' >> "$OUT"
  cat "$f" >> "$OUT"
  echo '```' >> "$OUT"
  for s in lint format:check typecheck; do
    log="$(npm run "$s" 2>&1)"; ec=$?
    printf '### npm run %s -> exit=%s\n' "$s" "$ec" >> "$OUT"
    printf '%s\n' "$log" | grep -vE '^$|^> game-guess|^> (eslint|prettier|tsc)' | head -12 >> "$OUT"
    echo >> "$OUT"
    printf '%-7s | %-13s | exit=%s\n' "$kind" "$s" "$ec"
  done
  if [ "$kind" = warn ]; then
    # fixture chỉ có CẢNH BÁO: `eslint` trần (không --max-warnings 0) phải pass, chứng minh cờ có tác dụng
    npx eslint "$f" > /dev/null 2>&1; ec=$?
    printf '### npx eslint %s (KHÔNG có --max-warnings 0) -> exit=%s\n\n' "$f" "$ec" >> "$OUT"
    printf '%-7s | %-13s | exit=%s\n' "$kind" "eslint (no flag)" "$ec"
  fi
  rm -f "$f"
  echo "(fixture '$kind' đã xóa)" >> "$OUT"
  echo >> "$OUT"
done

echo "## Sau khi xóa mọi fixture" >> "$OUT"
for s in lint format:check typecheck; do
  npm run "$s" > /dev/null 2>&1; ec=$?
  printf '### npm run %s -> exit=%s\n' "$s" "$ec" >> "$OUT"
  printf '%-7s | %-13s | exit=%s\n' "after" "$s" "$ec"
done
echo >> "$OUT"
echo "Fixture còn sót trong src/: $(ls src | grep -c 'tmp-fixture' || true)" >> "$OUT"
