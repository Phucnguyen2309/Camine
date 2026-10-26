import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons.jsx'
import PetArt from './PetArt.jsx'
import logoUrl from '../assets/canime-logo.svg'
import { CATEGORIES } from '../data/products.js'

/* ---------- Thống kê (đếm số khi cuộn tới) ---------- */
function useInView(ref) {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.3 })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, seen])
  return seen
}

function Counter({ to, suffix, decimals = 0, run }) {
  const [v, setV] = useState(0)
  useEffect(() => {
    if (!run) return
    let raf, start
    const tick = (t) => {
      start ??= t
      const p = Math.min(1, (t - start) / 1400)
      setV(to * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [run, to])
  return <>{v.toFixed(decimals).replace('.', ',')}{suffix}</>
}

export function Stats() {
  const ref = useRef(null)
  const run = useInView(ref)
  const items = [
    { ic: 'users', to: 1.2, d: 1, s: 'M+', l: 'Khách hàng hài lòng' },
    { ic: 'bag', to: 100, s: 'K+', l: 'Sản phẩm đã bán' },
    { ic: 'box', to: 50, s: 'K+', l: 'Đơn hàng mỗi ngày' },
    { ic: 'eye', to: 2, s: 'M+', l: 'Lượt ghé thăm' },
  ]
  return (
    <section className="stats" ref={ref}>
      <div className="container stats__row">
        {items.map((it) => (
          <div className="stat" key={it.l}>
            <Icon name={it.ic} size={34} sw={1.5} />
            <div>
              <b><Counter to={it.to} suffix={it.s} decimals={it.d} run={run} /></b>
              <span>{it.l}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- Trích dẫn ---------- */
export function Quote() {
  return (
    <section className="quote">
      <div className="container quote__grid">
        <div className="quote__art">
          <div className="quote__circle"><img src={logoUrl} alt="Logo Canimé" /></div>
          <PetArt kind="dog" size={120} className="quote__pet quote__pet--dog" />
          <PetArt kind="cat" size={110} className="quote__pet quote__pet--cat" />
        </div>
        <blockquote>
          <span className="quote__mark">“</span>
          <p>Từ trái tim đến chiếc bát nhỏ,<br />dinh dưỡng trọn vẹn cho thân và tâm.<br />Khoẻ hơn, vui hơn mỗi ngày —<br />trong từng miếng ăn là yêu thương.</p>
          <footer><span className="leaf-line" /> Đội ngũ Canimé <span className="leaf-line" /></footer>
        </blockquote>
      </div>
    </section>
  )
}

/* ---------- Giới thiệu ---------- */
export function About() {
  return (
    <section className="about" id="about">
      <div className="container about__grid">
        <div className="about__text">
          <h2 className="h2">VỀ <span>CHÚNG TÔI</span></h2>
          <p>
            Canimé bắt đầu từ một căn bếp nhỏ ở Sài Gòn, nơi tụi mình tự nấu cơm cho mấy bé chó mèo nhặt về. Giờ đây, mỗi công thức
            đều được bác sĩ thú y góp ý, nguyên liệu truy xuất rõ nguồn gốc và đóng gói trong ngày.
          </p>
          <p>Tụi mình tin: thú cưng ăn đúng thì ít bệnh, vui hơn — và sống lâu hơn bên bạn.</p>
          <button className="btn btn--primary">Tìm hiểu thêm <Icon name="arrowRight" size={18} /></button>
        </div>
        <div className="about__cards">
          <div className="about__card about__card--yellow"><PetArt kind="dog" size={170} /></div>
          <div className="about__card about__card--red">
            <div className="about__feat">
              <Icon name="sprout" size={30} />
              <b>Dinh dưỡng cao cấp</b>
              <span>Nguyên liệu chất lượng cho sức khoẻ toàn diện.</span>
            </div>
            <hr />
            <div className="about__feat">
              <Icon name="bone" size={30} />
              <b>Phát triển khoẻ mạnh</b>
              <span>Hỗ trợ xương chắc, cơ săn và tiêu hoá tốt.</span>
            </div>
          </div>
          <div className="about__card about__card--cyan"><PetArt kind="cat" size={170} /></div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Danh mục ---------- */
export function Categories({ active, onPick }) {
  return (
    <section className="cats">
      <div className="container">
        <div className="section-head">
          <h2 className="h2">Bé nhà bạn <span>là bé nào?</span></h2>
        </div>
        <div className="cats__row">
          {CATEGORIES.map((c) => (
            <button key={c.id} className={'cat cat--' + c.id + (active === c.id ? ' is-active' : '')} style={{ '--bg': c.bg }}
              onClick={() => onPick(active === c.id ? 'all' : c.id)}>
              <span className="cat__text">
                <small className="cat__count">{c.count}</small>
                <b>Thức ăn cho {c.name.toLowerCase()}</b>
                <span className="cat__tagline">{c.tagline}</span>
                <span className="cat__subs">{c.subs.map((s) => <em key={s}>{s}</em>)}</span>
                <span className="cat__cta">{active === c.id ? 'Đang xem' : 'Xem sản phẩm'} <Icon name="arrowRight" size={16} /></span>
              </span>
              <span className="cat__art"><PetArt kind={c.id} size={190} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- Khuyến mãi ---------- */
export function Offer({ onShop }) {
  const [left, setLeft] = useState(() => 2 * 86400 + 7 * 3600 + 25 * 60)
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  const parts = [Math.floor(left / 86400), Math.floor((left % 86400) / 3600), Math.floor((left % 3600) / 60), left % 60]
  return (
    <section className="container" id="offer">
      <div className="offer">
        <div className="offer__paws" aria-hidden />
        <div className="offer__art">
          <PetArt kind="dog" size={220} />
        </div>
        <div className="offer__copy">
          <span className="offer__kicker">Ưu đãi đặc biệt</span>
          <h2>GIẢM 30%</h2>
          <p>cho dòng hạt cao cấp — nhập mã <code>CANIME30</code></p>
          <div className="countdown">
            {parts.map((p, i) => (
              <div key={i}><b>{String(p).padStart(2, '0')}</b><small>{['Ngày', 'Giờ', 'Phút', 'Giây'][i]}</small></div>
            ))}
          </div>
          <button className="btn btn--yellow" onClick={onShop}>Mua ngay <Icon name="arrowRight" size={18} /></button>
        </div>
      </div>
    </section>
  )
}

/* ---------- Cam kết ---------- */
export function Features() {
  const f = [
    ['truck', 'Giao nhanh', 'Miễn phí đơn từ 499k'],
    ['shield', 'Thanh toán', 'An toàn, bảo mật'],
    ['refresh', 'Đổi trả dễ', 'Trong vòng 30 ngày'],
    ['headset', 'Hỗ trợ 24/7', 'Người thật, không bot'],
  ]
  return (
    <section className="container features">
      {f.map(([ic, a, b]) => (
        <div className="feature" key={a}>
          <span className="feature__ic"><Icon name={ic} size={24} /></span>
          <div><b>{a}</b><small>{b}</small></div>
        </div>
      ))}
    </section>
  )
}
