import { forwardRef } from 'react'
import AnimatedDog from './AnimatedDog.jsx'
import { Icon } from './Icons.jsx'

const Hero = forwardRef(function Hero({ query, setQuery, onSearch }, inputRef) {
  return (
    <section className="hero" id="top">
      <PawTrail />
      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow"><Icon name="paw" size={16} /> Giao nhanh 2h nội thành TP.HCM</span>
          <h1 className="hero__title">
            Bữa ngon cho
            <br />
            <span className="hero__accent">
              boss
              <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden>
                <path d="M4 14 C50 4 120 2 196 10" stroke="#FFC000" strokeWidth="7" strokeLinecap="round" fill="none" />
              </svg>
            </span>{' '}
            nhà bạn
          </h1>
          <p className="hero__lead">
            Hạt, pate và bánh thưởng làm từ thịt thật, rau củ tươi. Bé ăn ngon, lông mượt, khoẻ re — bạn yên tâm.
          </p>

          <form className="search" onSubmit={(e) => { e.preventDefault(); onSearch() }} role="search">
            <Icon name="search" size={18} className="search__icon" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm hạt cho chó, pate mèo, bánh thưởng…"
              aria-label="Tìm sản phẩm"
            />
            <button className="btn btn--primary" type="submit">Tìm kiếm</button>
          </form>

          <ul className="trust">
            <li><span className="trust__ic"><Icon name="sprout" size={18} /></span>100% nguyên liệu<br />tự nhiên</li>
            <li><span className="trust__ic"><Icon name="vet" size={18} /></span>Bác sĩ thú y<br />khuyên dùng</li>
            <li><span className="trust__ic"><Icon name="noChem" size={18} /></span>Không chất<br />bảo quản</li>
          </ul>

          <div className="hero__rating">
            <div className="avatars">
              {['#FFC000', '#00B7CD', '#E9A04F', '#9B111E'].map((c, i) => <span key={i} style={{ background: c }} />)}
            </div>
            <div><b>4.9</b> <span className="star-inline">★</span><small>từ 12.000+ đánh giá</small></div>
          </div>
        </div>

        <div className="hero__art">
          <div className="hero__blob" />
          <AnimatedDog />
          <Bowl />
          <span className="hero__chip hero__chip--a"><Icon name="leaf" size={16} /> Thịt thật là số 1</span>
          <span className="hero__chip hero__chip--b">Bấm vào bé thử xem!</span>
        </div>
      </div>
    </section>
  )
})

function Bowl() {
  return (
    <svg className="bowl" viewBox="0 0 160 90" aria-hidden>
      <ellipse cx="80" cy="84" rx="70" ry="6" fill="#8C482D" opacity=".2" />
      {Array.from({ length: 22 }).map((_, i) => {
        const x = 30 + ((i * 37) % 100), y = 30 - Math.sin((x - 30) / 100 * Math.PI) * 22 + (i % 3) * 4
        return <ellipse key={i} cx={x} cy={y} rx="7" ry="5.5" transform={`rotate(${i * 31} ${x} ${y})`} fill={i % 2 ? '#9A5A2E' : '#7A3E1C'} />
      })}
      <path d="M10 34 H150 L136 78 Q80 88 24 78 Z" fill="#9B111E" />
      <path d="M10 34 H150 L148 42 H12 Z" fill="#B8202F" />
      <g transform="translate(70 52)" fill="#FFF8E7">
        <circle cx="0" cy="0" r="2.6" /><circle cx="6" cy="-2" r="2.6" /><circle cx="12" cy="0" r="2.6" />
        <circle cx="16" cy="6" r="2.6" /><ellipse cx="7" cy="10" rx="6" ry="5" />
      </g>
    </svg>
  )
}

function PawTrail() {
  return (
    <div className="pawtrail" aria-hidden>
      {[...Array(6)].map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" style={{ '--i': i }}>
          <circle cx="7" cy="9" r="2" /><circle cx="10.5" cy="5.5" r="2" /><circle cx="14.5" cy="5.5" r="2" /><circle cx="18" cy="9" r="2" />
          <path d="M12 11c-3 0-5.5 3.5-5.5 6 0 1.6 1.2 2.5 2.7 2.5 1.2 0 1.8-.6 2.8-.6s1.6.6 2.8.6c1.5 0 2.7-.9 2.7-2.5 0-2.5-2.5-6-5.5-6Z" />
        </svg>
      ))}
    </div>
  )
}

export default Hero
