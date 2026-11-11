import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Không để `next dev` tự tạo/cập nhật AGENTS.md (khối chỉ dẫn do Next viết) khi phát hiện AI coding agent.
  // Chỉ dẫn cho agent của dự án do nhóm tự quản lý. Quyết định OPS-1, xem docs/ai-planning/PROGRESS.md.
  agentRules: false,
};

export default nextConfig;
