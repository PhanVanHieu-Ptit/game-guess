import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { NextConfig } from 'next';

// Phiên bản ứng dụng ghi vào mọi sự kiện đo lường (trường `appVersion`). Lấy từ package.json lúc dựng.
const { version } = JSON.parse(
  readFileSync(join(process.cwd(), 'package.json'), 'utf8'),
) as { version: string };

const nextConfig: NextConfig = {
  // Không để `next dev` tự tạo/cập nhật AGENTS.md (khối chỉ dẫn do Next viết) khi phát hiện AI coding agent.
  // Chỉ dẫn cho agent của dự án do nhóm tự quản lý. Quyết định OPS-1, xem docs/ai-planning/PROGRESS.md.
  agentRules: false,
  env: { NEXT_PUBLIC_APP_VERSION: version },
};

export default nextConfig;
