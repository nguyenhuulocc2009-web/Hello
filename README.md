# 🎃 Interactive Link Demo

Một website tương tác nhỏ bằng HTML + CSS + JavaScript, phù hợp để đăng lên GitHub Pages.

## Có gì trong mẫu?

- Màn hình mở đầu dạng glassmorphism.
- Nút "Có" tạo chuyển cảnh, flash, confetti và hiệu ứng rung/zoom nhẹ.
- Nút "Không" né chuột/chạm.
- Âm thanh Web Audio API, không cần file nhạc ngoài.
- Responsive cho điện thoại.
- Không dùng framework hoặc server.
- Không cần cài Node.js.

## Chạy thử trên máy

Chỉ cần mở `index.html` bằng trình duyệt.

## Đưa lên GitHub Pages

1. Tạo một repository mới trên GitHub, ví dụ `loi-moi-dac-biet`.
2. Upload `index.html`, `style.css`, `script.js` và `.nojekyll`.
3. Vào **Settings → Pages**.
4. Ở **Build and deployment → Source**, chọn **Deploy from a branch**.
5. Chọn branch `main`, folder `/ (root)`, rồi **Save**.
6. Chờ GitHub deploy và mở đường link Pages.

URL project site thường có dạng:

`https://TEN-GITHUB-CUA-BAN.github.io/loi-moi-dac-biet/`

## Đổi nội dung

Trong `index.html`, sửa:

- `Bạn có muốn tham gia không?`
- `Bấm thử một nút bên dưới nhé 👀`

Trong `script.js`, sửa phần:

- `Bạn đã chọn đúng rồi!`
- `Chúc bạn một ngày thật vui ✨`

## Đổi giao diện

Trong `style.css`, các biến ở đầu file:

```css
:root {
  --accent: #ff7a18;
  --accent2: #a855f7;
}
```

có thể đổi để tạo màu khác.

## Lưu ý

Nếu thêm ảnh hoặc âm thanh riêng, nên đặt chúng trong thư mục của repository và dùng đường dẫn tương đối, ví dụ:

`assets/my-photo.jpg`

`assets/music.mp3`

Trình duyệt có thể chặn âm thanh tự phát. Vì vậy mẫu này yêu cầu người xem bấm "Bật âm thanh" trước.
