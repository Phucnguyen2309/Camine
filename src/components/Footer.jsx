import Logo from './Logo.jsx'
import { Icon, Social } from './Icons.jsx'

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>Thức ăn tươi ngon, lành mạnh dành riêng cho chó và mèo.</p>
          <div className="socials">
            <a href="#" aria-label="Facebook">{Social.facebook()}</a>
            <a href="#" aria-label="Instagram">{Social.instagram()}</a>
            <a href="#" aria-label="TikTok">{Social.tiktok()}</a>
            <a href="#" aria-label="YouTube">{Social.youtube()}</a>
          </div>
        </div>
        <div>
          <h4>Thông tin</h4>
          <a href="#">Cách đặt hàng</a>
          <a href="#">Tư vấn từ chuyên gia</a>
          <a href="#">Câu hỏi thường gặp</a>
        </div>
        <div>
          <h4>Về chúng tôi</h4>
          <a href="#">Trang chủ</a>
          <a href="#">Câu chuyện Camine</a>
          <a href="#">Thức ăn</a>
          <a href="#">Liên hệ</a>
        </div>
        <div>
          <h4>Chính sách</h4>
          <a href="#">Điều khoản dịch vụ</a>
          <a href="#">Bảo mật thông tin</a>
          <a href="#">Đổi trả & hoàn tiền</a>
        </div>
        <div>
          <h4>Liên hệ</h4>
          <span className="footer__line"><Icon name="phone" size={16} /> 0901 234 567</span>
          <span className="footer__line"><Icon name="mail" size={16} /> hello@camine.vn</span>
          <span className="footer__line"><Icon name="pin" size={16} /> 123 Lê Lợi, Q.1, TP.HCM</span>
        </div>
      </div>
      <div className="footer__bottom">© 2026 Camine. Bảo lưu mọi quyền.</div>
    </footer>
  )
}
