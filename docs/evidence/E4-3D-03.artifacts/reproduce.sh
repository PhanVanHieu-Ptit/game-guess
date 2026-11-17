#!/bin/sh
set -eu
# Từ gốc repo; Node theo .nvmrc, cần Chromium/WebKit của Playwright đã cài.
python3 docs/ai-planning/verify_plan.py
npm run check
npm run test
E2E_DEV=1 npm run test:e2e -- --workers=2 tests/e2e/level-3d-03.spec.ts --grep 'nắp đóng|kéo nồi|nhập bốn'
npm run test:e2e -- --workers=1
