import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// Quy tắc phụ thuộc giữa các tầng (docs/TECH.md mục 3 và 12). Mọi import qua tầng khác dùng bí danh `@/…`
// nên chỉ cần chặn theo bí danh. Import tương đối đi lên (`../`) bị cấm ở mọi nơi (docs/TECH.md mục 12);
// `./` trong cùng thư mục vẫn dùng được.
// Trong flat config, khối sau ghi đè khối trước cho cùng một rule (không gộp), nên mọi khối đều
// phải tự kèm `noParentRelative`.
const noParentRelative = {
  group: ['../*'],
  message: 'Dùng bí danh `@/…` thay cho import tương đối đi lên.',
};
const layerPattern = (layer, message) => ({
  group: [`@/${layer}`, `@/${layer}/**`],
  message,
});
const restrict = (...patterns) => ({
  'no-restricted-imports': [
    'error',
    { patterns: [...patterns, noParentRelative] },
  ],
});

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
    // Báo cáo do Playwright sinh ra.
    'playwright-report/**',
    'test-results/**',
  ]),

  // Mặc định cho mã nguồn; các khối bên dưới ghi đè bằng tập quy tắc đầy đủ của từng tầng.
  // Test (tests/) được import tương đối tới tests/fixtures.
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: restrict(),
  },

  // domain/: TypeScript thuần, không React, không DOM, không tầng nào khác.
  {
    files: ['src/domain/**/*.{ts,tsx}'],
    rules: restrict(
      {
        group: [
          'react',
          'react-dom',
          'react-dom/**',
          'next',
          'next/**',
          'zustand',
          'zustand/**',
          'three',
          'three/**',
          '@react-three/**',
        ],
        message:
          'domain/ phải là TypeScript thuần: không React, Next, Zustand hay three.',
      },
      layerPattern('stores', 'domain/ không được import stores/.'),
      layerPattern('services', 'domain/ không được import services/.'),
      layerPattern('engine', 'domain/ không được import engine/.'),
      layerPattern('features', 'domain/ không được import features/.'),
      layerPattern('levels', 'domain/ không được import levels/.'),
      layerPattern('app', 'domain/ không được import app/.'),
    ),
  },
  // services/: chỉ dựa vào domain/ (và thư viện).
  {
    files: ['src/services/**/*.{ts,tsx}'],
    rules: restrict(
      layerPattern('stores', 'services/ không được import stores/.'),
      layerPattern('engine', 'services/ không được import engine/.'),
      layerPattern('features', 'services/ không được import features/.'),
      layerPattern('levels', 'services/ không được import levels/.'),
      layerPattern('app', 'services/ không được import app/.'),
    ),
  },
  // stores/: dựa vào domain/ và services/ (lưu trữ).
  {
    files: ['src/stores/**/*.{ts,tsx}'],
    rules: restrict(
      layerPattern('engine', 'stores/ không được import engine/.'),
      layerPattern('features', 'stores/ không được import features/.'),
      layerPattern('levels', 'stores/ không được import levels/.'),
      layerPattern('app', 'stores/ không được import app/.'),
    ),
  },
  // engine/: không biết khung chơi (features/) và không tự gọi đo lường (services/).
  {
    files: ['src/engine/**/*.{ts,tsx}'],
    rules: restrict(
      layerPattern('stores', 'engine/ không được import stores/.'),
      layerPattern(
        'services',
        'engine/ không được tự gọi services/ (đo lường do khung chơi lo).',
      ),
      layerPattern('features', 'engine/ không được import features/.'),
      layerPattern('levels', 'engine/ không được import levels/.'),
      layerPattern('app', 'engine/ không được import app/.'),
    ),
  },
  // levels/: nói chuyện với khung chơi chỉ qua LevelSession; không import sâu vào màn khác.
  {
    files: ['src/levels/**/*.{ts,tsx}'],
    rules: restrict(
      layerPattern('stores', 'levels/ không được import stores/.'),
      layerPattern(
        'services',
        'levels/ không được tự gọi services/ (đo lường do khung chơi lo).',
      ),
      layerPattern(
        'features',
        'levels/ không được import features/; dùng LevelSession được truyền vào.',
      ),
      layerPattern('levels', 'levels/ không được import sâu vào màn khác.'),
      layerPattern('app', 'levels/ không được import app/.'),
    ),
  },
  // features/: không import app/ (app/ mới là nơi ghép các feature).
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: restrict(layerPattern('app', 'features/ không được import app/.')),
  },
]);

export default eslintConfig;
