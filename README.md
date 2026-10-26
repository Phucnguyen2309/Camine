# Canimé — UI cửa hàng thức ăn thú cưng (React + Vite)

## Chạy dự án
```bash
npm install
npm run dev      # mở http://localhost:5173
npm run build    # xuất bản ra thư mục dist/
```

## Cấu trúc
```
public/canime-logo.svg        Logo vector (dùng làm favicon)
src/assets/canime-logo.svg    Logo dùng trong giao diện
src/data/products.js          Dữ liệu sản phẩm mẫu, danh mục, đánh giá
src/context/CartContext.jsx   Giỏ hàng (thêm/bớt/xoá, mã giảm giá, phí ship, tổng tiền)
src/components/
  AnimatedDog.jsx   Chú chó SVG chuyển động (vẫy đuôi, chớp mắt, nhìn theo chuột, bấm để sủa)
  Header / Hero / HomeSections / Products / Footer
  ProductModal.jsx  Xem chi tiết sản phẩm (chọn quy cách, số lượng, tab mô tả/thành phần/đánh giá)
  CartDrawer.jsx    Giỏ hàng trượt bên phải
  PackShot.jsx      Bao bì sản phẩm vẽ bằng SVG
src/pages/Checkout.jsx        Trang thanh toán + màn hình đặt hàng thành công
src/styles/global.css         Toàn bộ style, biến màu ở :root
```

## Tuỳ biến nhanh
- **Danh mục:** chỉ Chó & Mèo — sửa trong `CATEGORIES` / `PRODUCTS` ở `src/data/products.js`
- **Con trỏ khúc xương:** cuối file `global.css` (mục "Con trỏ chuột hình khúc xương"). Bản SVG gốc để chỉnh: `public/cursor-bone.svg`, `public/cursor-bone-hover.svg`
- **Chó nhìn theo chuột:** độ quay đầu / lệch mặt / con ngươi chỉnh ở `headTurn`, `faceShift`, `pupil` trong `AnimatedDog.jsx`

## Mã giảm giá để test
- `CANIME30` — giảm 30% (tối đa 200.000đ)
- `BOSS50K` — giảm 50.000đ cho đơn từ 300.000đ
- Miễn phí giao hàng cho đơn từ 499.000đ

## Màu & font
Đỏ đô `#9B111E` · Vàng tươi `#FFC000` · Nâu đất `#8C482D` · Kem nhạt `#FFF8E7` · Xanh cyan `#00B7CD`
Font: **Baloo 2** (tiêu đề) + **Be Vietnam Pro** (nội dung) — cả hai hỗ trợ tiếng Việt đầy đủ.

Đây là UI thuần (chưa có backend): dữ liệu là mẫu, thanh toán chỉ mô phỏng.
