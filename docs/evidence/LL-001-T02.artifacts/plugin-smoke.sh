#!/usr/bin/env bash
# Harness một lần cho bằng chứng LL-001-T02 (không phải test của sản phẩm). Tương thích bash 3.2.
# Chạy từ gốc repo:  bash docs/evidence/LL-001-T02.artifacts/plugin-smoke.sh <file-log-đầu-ra>
# Mục đích: chứng minh các plugin có khoảng peer chỉ tới ESLint 9 (react, import, jsx-a11y) và các plugin
# còn lại của eslint-config-next THỰC SỰ chạy dưới ESLint 10 (không chỉ "không báo gì"). Một fixture, mỗi plugin
# một vi phạm cố ý; kỳ vọng ESLint in đúng rule id của từng plugin và thoát bằng 1 (không crash, không exit 2).
set -u
OUT="$1"
F=src/tmp-fixture-plugins.tsx
trap 'rm -f "$F"' EXIT

# Lưu ý: react-hooks chỉ phân loại component/hook có TÊN (chữ hoa đầu hoặc tiền tố use), nên vi phạm hook đặt trong
# component `Broken` có tên; export default ẩn danh dành cho import/no-anonymous-default-export.
cat > "$F" <<'EOF'
import { useEffect, useState } from 'react';

function Broken({ label }: { label: string }) {
  if (label) {
    useState(0);
  }
  useEffect(() => {
    console.log(label);
  }, []);
  return <p>{label}</p>;
}

export default function () {
  const items = [1, 2, 3];
  return (
    <ul>
      {items.map((n) => (
        <li>{n}</li>
      ))}
      <img src="/x.png" />
      <Broken label="x" />
    </ul>
  );
}
EOF

{
  echo "# Plugin smoke — LL-001-T02 — $(TZ=Asia/Ho_Chi_Minh date '+%Y-%m-%d %H:%M:%S %z')"
  echo "# eslint $(npx --no-install eslint -v)"
  echo
  echo '## fixture src/tmp-fixture-plugins.tsx'
  echo '```tsx'
  cat "$F"
  echo '```'
  echo
  echo '## npx eslint src/tmp-fixture-plugins.tsx --max-warnings 0'
  echo '```'
} > "$OUT"

npx eslint "$F" --max-warnings 0 >> "$OUT" 2>&1
ec=$?
{
  echo '```'
  echo "exit=$ec  (1 = có lỗi lint; 2 = ESLint/plugin crash)"
  echo
  echo "## Rule id theo plugin đã xuất hiện trong kết quả:"
  for rule in \
    'react-hooks/rules-of-hooks' \
    'react-hooks/exhaustive-deps' \
    'react/jsx-key' \
    'jsx-a11y/alt-text' \
    '@next/next/no-img-element' \
    'import/no-anonymous-default-export'
  do
    if grep -q "$rule" "$OUT"; then echo "- [x] $rule"; else echo "- [ ] $rule (KHÔNG xuất hiện)"; fi
  done
} >> "$OUT"

rm -f "$F"
echo "exit=$ec"; sed -n '/Rule id theo plugin/,$p' "$OUT"
