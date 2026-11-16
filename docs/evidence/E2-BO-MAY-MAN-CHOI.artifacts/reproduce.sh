#!/bin/sh
set -eu
# Chạy từ gốc repo; cần Node .nvmrc, npm ci và browser Playwright đã cài.
python3 docs/ai-planning/verify_plan.py
npm run check
npm run test
npm run build
npm run test:e2e
npm run test:examples
E2E_DEV=1 npm run test:examples
