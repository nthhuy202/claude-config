// Cài lại plugin trên máy mới theo đúng danh sách trong settings.json.
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

// 2. Cài từng plugin đang bật (dạng "tên@marketplace")
const failed = Object.entries(settings.enabledPlugins ?? {})
  .filter(([, on]) => on)
  .filter(([id]) => run(['plugin', 'install', id]) !== 0)
  .map(([id]) => id);

console.log(failed.length ? `\n❌ Cài lỗi: ${failed.join(', ')}` : '\n✅ Đã cài đủ plugin trong settings.json');
process.exit(failed.length ? 1 : 0);
