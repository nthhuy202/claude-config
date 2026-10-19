// Cài lại + cập nhật plugin theo đúng danh sách trong settings.json (máy mới hoặc sau mỗi lần pull).
// Vì sao cần: settings.json chỉ "bật" plugin, KHÔNG tự tải về máy mới.
// Chạy: node ~/.claude/setup-plugins.mjs   (chạy lại nhiều lần vẫn an toàn)
import { readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';
import { join } from 'node:path';

const settings = JSON.parse(readFileSync(join(homedir(), '.claude', 'settings.json'), 'utf8'));
const run = (args) => spawnSync('claude', args, { stdio: 'inherit', shell: true }).status;

// 1. Đăng ký marketplace bên thứ 3 (official đã có sẵn, vẫn add cho chắc trên máy chưa mở session nào)
run(['plugin', 'marketplace', 'add', 'anthropics/claude-plugins-official']);
for (const { source } of Object.values(settings.extraKnownMarketplaces ?? {})) {
  if (source.source === 'github') run(['plugin', 'marketplace', 'add', source.repo]);
}

// 2. Làm mới danh mục marketplace để thấy bản mới nhất
run(['plugin', 'marketplace', 'update']);

// 3. Cài plugin còn thiếu + nâng lên bản mới nhất (dạng "tên@marketplace")
const failed = Object.entries(settings.enabledPlugins ?? {})
  .filter(([, on]) => on)
  .filter(([id]) => run(['plugin', 'install', id]) !== 0 || run(['plugin', 'update', id]) !== 0)
  .map(([id]) => id);

console.log(failed.length ? `\n❌ Lỗi: ${failed.join(', ')}` : '\n✅ Đã cài + cập nhật đủ plugin trong settings.json');
process.exit(failed.length ? 1 : 0);
