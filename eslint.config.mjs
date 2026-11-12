import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Mặc định của eslint-config-next (đã được tài liệu Next 16.4.6 giữ lại khi ghi đè).
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    // Script một lần đính kèm bằng chứng nghiệm thu, không phải mã sản phẩm.
    'docs/evidence/**',
  ]),
]);

export default eslintConfig;
