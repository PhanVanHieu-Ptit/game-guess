#!/bin/sh
set -eu
# Chạy từ gốc repo, dùng Node .nvmrc; cần browser Playwright đã cài.
python3 docs/ai-planning/verify_plan.py
npm run check
npm run test
npm run test:e2e -- --workers=3
npm run test:examples
# Ví dụ tự dọn khỏi catalog; dựng lại bản sản phẩm đúng năm màn.
npm run build
