# Bộ Teach Template

Biến AI coding agent thành gia sư 1-1: mỗi buổi học sinh ra một bài học HTML có
mục lục, quiz, nút copy và lộ trình bám đúng mục tiêu của bạn.

Dùng được với **Claude Code**, **Codex** và **Antigravity** — cả ba đều đọc
chuẩn `SKILL.md`.

## Trong này có gì

```
skills/teach/
├── SKILL.md               Skill /teach của Matt Pocock (MIT)
├── TEACH-PREFERENCES.md   Bộ rule dạy học: chất lượng dạy + UX bài học HTML
├── assets/                lesson.css, lesson-enhance.js, 2 template HTML
└── *-FORMAT.md            Định dạng MISSION / learning record / glossary / resources
```

Rule và asset nằm **bên trong** thư mục skill và được trỏ tới bằng đường dẫn
tương đối, nên không cần khai báo gì thêm trong `CLAUDE.md` hay `AGENTS.md`.

## Cài đặt

Giải nén vào đúng thư mục skill của tool bạn dùng:

```bash
# Claude Code
unzip teach-template.zip -d ~/.claude

# Codex
unzip teach-template.zip -d ~/.agents

# Antigravity
unzip teach-template.zip -d ~/.gemini/config
```

Cả ba lệnh tạo ra `<đích>/skills/teach/`. Muốn dùng cho riêng một project thì
giải nén vào `.agents/` ở thư mục gốc project (Codex và Antigravity đều đọc).

## Dùng

Mở agent trong thư mục bạn muốn làm không gian học, rồi:

| Tool | Gọi thế nào |
| --- | --- |
| Claude Code | `/teach` |
| Codex | `$teach` |
| Antigravity | nhắc tên skill `teach`, hoặc để agent tự chọn |

AI sẽ hỏi mục tiêu học của bạn trước, trình bày toàn cảnh lộ trình để bạn duyệt,
rồi mới bắt đầu dạy. Bài học nằm ở `lessons/`, mở `lessons/index.html` bằng
trình duyệt để xem mục lục và tiến độ.

## Sửa cho hợp bạn

Mở `skills/teach/TEACH-PREFERENCES.md` và sửa dòng mô tả người học ở đầu file —
bản gốc đang tả chủ nhân của nó (học bằng tiếng Việt, có nền lập trình). AI bám
vào dòng đó để chọn cách giải thích, nên sửa cho đúng bạn sẽ khác biệt rõ.

Muốn đổi giao diện bài học thì sửa `skills/teach/assets/lesson.css`, rồi copy đè
vào thư mục `lessons/` của các khoá đang học.

Lưu ý nhỏ: `SKILL.md` có `disable-model-invocation: true` để Claude Code không tự
gọi skill khi bạn không yêu cầu. Codex và Antigravity bỏ qua field này nên có thể
tự kích hoạt khi thấy liên quan — xoá dòng đó nếu bạn muốn hành vi đồng nhất.

## Bản quyền & ghi công

| Phần | Của ai | Giấy phép |
| --- | --- | --- |
| `skills/teach/SKILL.md` và các file `*-FORMAT.md` | Matt Pocock | MIT |
| `skills/teach/TEACH-PREFERENCES.md` | Phần bổ sung riêng | Dùng và sửa thoải mái |
| `skills/teach/assets/` | Phần bổ sung riêng | Dùng và sửa thoải mái |

Skill `/teach` lấy từ repo công khai <https://github.com/mattpocock/skills>, phát
hành theo giấy phép MIT. MIT cho phép dùng lại, chỉnh sửa và phân phối lại miễn là
giữ nguyên thông báo bản quyền — nên bản quyền đầy đủ nằm ở `LICENSE-teach-skill.txt`
kèm trong gói này.

Đây **không phải sản phẩm chính thức** của Matt Pocock và không được tác giả gốc
bảo trợ hay kiểm duyệt. Muốn bản gốc nguyên vẹn thì lấy thẳng từ repo trên —
hoàn toàn miễn phí.
