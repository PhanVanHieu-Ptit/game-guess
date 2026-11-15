#!/usr/bin/env bash
# Chạy lại toàn bộ kiểm chứng của docs/evidence/E1-NEN-TANG.md. Chạy từ GỐC repo: bash docs/evidence/E1-NEN-TANG.artifacts/reproduce.sh
# Điều kiện: Node 22.22.3 (.nvmrc), đã `npm ci`, và trình duyệt Playwright: `npx playwright install chromium webkit`.
# Đầu ra mỗi bước ghi vào thư mục này (đuôi .txt vì .gitignore loại *.log); mã thoát gom ở exit-codes.txt.
set -u
OUT="docs/evidence/E1-NEN-TANG.artifacts"
: > "$OUT/exit-codes.txt"

run() { # run <tên-file> <lệnh...>
  local name="$1"; shift
  echo "==> $*"
  "$@" >"$OUT/$name.txt" 2>&1
  local code=$?
  echo "$name: exit $code  ($*)" | tee -a "$OUT/exit-codes.txt"
}

run 01-verify-plan      python3 docs/ai-planning/verify_plan.py
run 02-npm-ci-dry-run   npm ci --dry-run
run 03-check            npm run check
run 04-unit             npx vitest run --reporter=verbose
run 05-build            npm run build
run 06-e2e-prod         npx playwright test --reporter=list
run 07-e2e-prod-lap-3   npx playwright test --repeat-each=3 --reporter=dot
run 08-e2e-dev          env E2E_DEV=1 npx playwright test --workers=2 --reporter=list
run 09-audit-prod       npm audit --omit=dev
run 10-audit-tat-ca     npm audit
run 11-npm-ls           npm ls --all

# Đo hiệu năng gần đúng (Slow 4G + CPU 4× bằng CDP) trên bản production vừa dựng ở bước 05 (cổng 3200).
npm run build >/dev/null 2>&1
NEXT_PUBLIC_ANALYTICS=console npx next start --port 3200 >"$OUT/12-perf-server.txt" 2>&1 &
SERVER_PID=$!
for _ in $(seq 1 60); do curl -s -o /dev/null http://localhost:3200/ && break; sleep 0.5; done
run 12-perf node "$OUT/perf-measure.mjs"
kill "$SERVER_PID" 2>/dev/null; wait "$SERVER_PID" 2>/dev/null

# Dấu vết three.js trong mã đã build (phải không có): trang 2D không được tải 3D.
{
  echo "import three/R3F/drei trong src/ và tests/:"
  grep -rEn "from ['\"](three|@react-three/(fiber|drei))" src tests || echo "  (không có)"
  echo "chunk đã build chứa dấu vết three.js:"
  grep -rlE "WebGLRenderer|__THREE__|OrbitControls" .next/static 2>/dev/null || echo "  (không có)"
} >"$OUT/13-khong-co-three.txt" 2>&1
echo "13-khong-co-three: xong" | tee -a "$OUT/exit-codes.txt"
