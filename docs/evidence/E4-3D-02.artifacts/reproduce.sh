#!/bin/sh
set -eu
# Chạy từ gốc repo, Node theo .nvmrc; cần Chromium và WebKit của Playwright đã cài.
python3 docs/ai-planning/verify_plan.py
npm run check
npm run test
E2E_DEV=1 npm run test:e2e -- --workers=2 tests/e2e/level-3d-02.spec.ts --grep 'tải WebGL|ba chỗ sai'
npm run test:e2e -- --workers=2
