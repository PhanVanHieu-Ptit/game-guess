#!/bin/sh
set -eu
# Chạy từ gốc repo, Node theo .nvmrc, cần Chromium/WebKit Playwright đã cài.
python3 docs/ai-planning/verify_plan.py
npm run check
npm run test
E2E_DEV=1 npm run test:e2e -- --workers=2 tests/e2e/level-3d-01.spec.ts
npm run test:examples
# Ví dụ tự dọn; lần production cuối dựng lại đúng catalog sáu màn sản phẩm.
npm run test:e2e -- --workers=2
