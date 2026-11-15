#!/usr/bin/env bash
# Chạy từ gốc repo sau npm ci và npx playwright install chromium webkit.
# Playwright tự dựng production và mở cổng 3100; không dùng lại máy chủ cũ.
set -euo pipefail
OUT="docs/evidence/E1-NEN-TANG-RECHECK.artifacts"
mkdir -p "$OUT"
: > "$OUT/exit-codes.txt"

run() {
  local name="$1"
  shift
  if "$@" > "$OUT/$name.txt" 2>&1; then
    echo "$name: exit 0 ($*)" | tee -a "$OUT/exit-codes.txt"
  else
    local code=$?
    echo "$name: exit $code ($*)" | tee -a "$OUT/exit-codes.txt"
    tail -80 "$OUT/$name.txt"
    return "$code"
  fi
}

run 01-verify-plan python3 docs/ai-planning/verify_plan.py
run 02-check npm run check
run 03-unit npm run test
run 04-build npm run build
run 05-e2e npm run test:e2e
