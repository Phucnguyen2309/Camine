import { useState } from 'react'
import Logo from './Logo.jsx'
import { Icon, Social } from './Icons.jsx'
import { Marquee, Sparkle } from './Decor.jsx'

export default function Footer({ onNav }) {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)
  const go = (id) => (e) => { e.preventDefault(); onNav && onNav(id) }

  return (
    <footer className="footer" id="contact">
      <Marquee items={['Canimé', 'Bữa ngon mỗi ngày']} bg="#00B7CD" fg="#FFF8E7" star="#FFC000" speed="40s" />
      <div className="container footer__top">
        <div className="footer__news">
          <span className="eyebrow eyebrow--mark">Stay updated</span>
          <h2 className="display">Đừng bỏ lỡ<br />bữa ngon nào</h2>
          <p>Nhận công thức mới, mẹo chăm Boss và mã giảm giá riêng — mỗi tháng một lá thư, không spam.</p>
          {done ? (
            <p className="footer__ok"><Icon name="check" size={18} /> Cảm ơn bạn! Thư đầu tiên sẽ tới hộp thư sớm thôi.</p>
          ) : (
            <form className="newsletter" onSubmit={(e) => { e.preventDefault(); if (/\S+@\S+\.\S+/.test(email)) setDone(true) }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email của bạn" aria-label="Email" required />
              <button className="btn btn--yellow btn--sm" type="submit">Đăng ký</button>
            </form>
          )}
        </div>

        <div className="footer__cols">
          <div>
            <h4>Khám phá</h4>
            <a href="#top" onClick={go('top')}>Trang chủ</a>
            <a href="#story" onClick={go('story')}>Câu chuyện</a>
            <a href="#shop" onClick={go('shop')}>Cửa hàng</a>
            <a href="#blog" onClick={go('blog')}>Góc chăm Boss</a>
          </div>
          <div>
            <h4>Chính sách</h4>
            <a href="#">Điều khoản dịch vụ</a>
            <a href="#">Bảo mật thông tin</a>
            <a href="#">Đổi trả & hoàn tiền</a>
            <a href="#">Câu hỏi thường gặp</a>
          </div>
          <div>
            <h4>Liên hệ</h4>
            <span className="footer__line"><Icon name="phone" size={16} /> +84 92 919 66 34</span>
            <span className="footer__line"><Icon name="mail" size={16} /> canimelop4nhom6@gmail.com</span>
            <span className="footer__line"><Icon name="pin" size={16} /> 69/68 Đặng Thuỳ Trâm, An Nhơn, TP. Hồ Chí Minh</span>
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <Logo light size={40} onClick={() => onNav && onNav('top')} />
        <p className="footer__tag"><Sparkle className="footer__spark" /> Made with love for every Boss</p>
        <div className="socials">
          <a href="https://www.facebook.com/profile.php?id=61595154759863" target="_blank" rel="noopener noreferrer" aria-label="Facebook Canimé">{Social.facebook()}</a>
          <a href="#" aria-label="Instagram">{Social.instagram()}</a>
          <a href="https://www.tiktok.com/@canime06_" target="_blank" rel="noopener noreferrer" aria-label="TikTok Canimé">{Social.tiktok()}</a>
          <a href="#" aria-label="YouTube">{Social.youtube()}</a>
        </div>
      </div>
      <div className="footer__copy">© 2026 Canimé. Bảo lưu mọi quyền.</div>
    </footer>
  )
}
