#!/usr/bin/env bash
# Harness một lần cho bằng chứng LL-001-T02 (không phải test của sản phẩm). Tương thích bash 3.2.
# Chạy từ gốc repo:  bash docs/evidence/LL-001-T02.artifacts/reproduce.sh
# Cài sạch từ lockfile, chạy ba script + script gộp `check` (kể cả khi có lỗi), build, rồi ghi
# thông tin cây phụ thuộc. Ghi vào npm-ci-scripts-build.txt cạnh file này.
set -u
A=docs/evidence/LL-001-T02.artifacts
LOG=$A/npm-ci-scripts-build.txt
: > "$LOG"
stamp() { TZ=Asia/Ho_Chi_Minh date '+%Y-%m-%d %H:%M:%S %z'; }
sum() { shasum -a 256 "$1" | cut -c1-64; }
run() { # run <nhãn> <lệnh...>: ghi vào LOG, in một dòng gọn, trả về exit code của lệnh
  label="$1"; shift
  { echo; echo "\$ $*   # $(stamp)"; } >> "$LOG"
  "$@" >> "$LOG" 2>&1; ec=$?
  echo "exit=$ec" >> "$LOG"
  printf '%-40s exit=%s\n' "$label" "$ec"
  return $ec
}

{
  echo "# Môi trường — $(stamp)"
  echo "node $(node -v) | npm $(npm -v) | tsc $(npx --no-install tsc -v) | eslint $(npx --no-install eslint -v) | prettier $(npx --no-install prettier -v)"
  echo "HEAD $(git rev-parse HEAD)"
  echo
} >> "$LOG"

echo "lockfile sha256 trước npm ci: $(sum package-lock.json)" | tee -a "$LOG"
run "npm ci" npm ci --no-fund
echo "lockfile sha256 sau  npm ci: $(sum package-lock.json)" | tee -a "$LOG"

run "npm run lint" npm run lint
run "npm run format:check" npm run format:check
run "npm run typecheck" npm run typecheck
run "npm run check (cây sạch)" npm run check

# script gộp phải fail VÀ dừng sớm khi có lỗi (fixture format: lint pass, format fail, typecheck không chạy)
printf '%s\n' "export const   spaced  =   1" > src/tmp-fixture-check.ts
{ echo; echo "--- check khi có fixture format ---"; } >> "$LOG"
run "npm run check (có fixture format)" npm run check
rm -f src/tmp-fixture-check.ts
echo "fixture còn sót: $(ls src | grep -c tmp-fixture)" | tee -a "$LOG"
run "npm run check (sau khi xóa fixture)" npm run check

run "npm run build (hồi quy)" npm run build
run "npm ls --all (thông tin)" npm ls --all
run "npm ls eslint (thông tin)" npm ls eslint
run "npm audit (thông tin)" npm audit
