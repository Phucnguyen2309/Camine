import AnimatedDog from './AnimatedDog.jsx'
import { Icon } from './Icons.jsx'
import { Butterfly, Flower, Sparkle } from './Decor.jsx'

export default function Hero({ onShop, onOffer }) {
  return (
    <section className="hero" id="top">
      {/* bầu trời + mặt trời + mây */}
      <div className="hero__sky" aria-hidden>
        <div className="hero__sun" />
        <div className="cloud cloud--1" />
        <div className="cloud cloud--2" />
        <div className="cloud cloud--3" />
        <Sparkle className="twinkle" style={{ top: '22%', left: '46%' }} />
        <Sparkle className="twinkle" style={{ top: '14%', left: '8%', animationDelay: '-1.2s' }} />
        <Sparkle className="twinkle" style={{ top: '58%', left: '52%', animationDelay: '-2.1s', width: 14 }} />
      </div>

      <div className="container hero__grid">
        <div className="hero__copy">
          <span className="eyebrow eyebrow--mark">Nguồn dinh dưỡng mới</span>
          <h1 className="hero__title display">
            <span className="hero__line">Bữa ngon</span>
            <span className="hero__line">
              cho <em>Boss</em>
              <CatSilhouette />
            </span>
          </h1>
          <p className="hero__lead">
            Nơi từng viên bánh thưởng được sấy tỉ mỉ từ ức gà, cá hồi, phô mai và bí đỏ thật, mang theo chút yêu thương nhỏ xinh cho bé mỗi ngày.
          </p>
          <div className="hero__cta">
            <button className="btn btn--cream" onClick={onShop}>Dạo chơi ngay <Icon name="arrowRight" size={18} /></button>
            <button className="hero__link" onClick={onOffer}>Ưu đãi tháng này <Icon name="chevRight" size={16} /></button>
          </div>
          <ul className="hero__chips">
            <li><Icon name="sprout" size={16} /> 100% tự nhiên</li>
            <li><Icon name="vet" size={16} /> Thú y khuyên dùng</li>
            <li><Icon name="truck" size={16} /> Giao 2h nội thành</li>
          </ul>
        </div>

        <div className="hero__art">
          <AnimatedDog />
          <span className="hero__hint">Bấm vào bé thử xem!</span>
        </div>
      </div>

      {/* đồi cỏ + hoa */}
      <svg className="hero__hills" viewBox="0 0 1440 220" preserveAspectRatio="none" aria-hidden>
        <path d="M0 120 C220 40 420 60 640 110 C860 160 1100 40 1440 90 V220 H0Z" fill="#FFE9A8" />
        <path d="M0 170 C260 110 520 150 760 140 C1000 130 1200 100 1440 140 V220 H0Z" fill="#FCFBF3" />
      </svg>
      <div className="hero__flowers" aria-hidden>
        {[[6, 0], [14, 1], [30, 2], [41, 0], [57, 1], [73, 2], [88, 0], [95, 1]].map(([l, k], i) => (
          <Flower key={i} className="hflower" color={['#FFC000', '#FFFFFF', '#00B7CD'][k]} center={k === 0 ? '#9B111E' : '#FFC000'}
            style={{ left: l + '%', animationDelay: `${-i * 0.7}s` }} />
        ))}
      </div>
      <Butterfly color="#FFC000" className="bfly bfly--1" />
      <Butterfly color="#9B111E" className="bfly bfly--2" />
      <Butterfly color="#FFF8E7" className="bfly bfly--3" />
    </section>
  )
}

function CatSilhouette() {
  return (
    <svg className="hero__cat" viewBox="0 0 64 84" aria-hidden>
      <path
        fill="currentColor"
        d="M20 82c-11 0-14-11-10-22 3-8 5-15 3-25l-3-21 9 9c5-2 11-2 16 0l8-11 1 21c3 9 1 16-3 21 8 6 12 15 10 24 6-2 10-8 8-16 5 4 5 14-2 20-4 3-13 3-37 0Z"
      />
      <circle cx="21" cy="27" r="1.6" fill="#00B7CD" />
      <circle cx="31" cy="27" r="1.6" fill="#00B7CD" />
    </svg>
  )
}
