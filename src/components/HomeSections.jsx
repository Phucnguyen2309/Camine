import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icons.jsx'
import PetArt from './PetArt.jsx'
import { Butterfly, Sparkle } from './Decor.jsx'
import logoUrl from '../assets/canime-logo.svg'
import vidUrl from '../assets/vid-web.mp4'
import posterUrl from '../assets/vid-poster.jpg'
import blogDog from '../assets/blog/blog-cho-an.jpg'
import blogCat from '../assets/blog/blog-meo-an.jpg'
import blogBowls from '../assets/blog/blog-doi-hat.jpg'
import { CATEGORIES } from '../data/products.js'

/* ================= Bộ ba ưu đãi (khối màu) ================= */
export function Promos({ onShop }) {
  const [left, setLeft] = useState(() => 2 * 86400 + 7 * 3600 + 25 * 60)
  const [notify, setNotify] = useState(false)
  useEffect(() => {
    const t = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000)
    return () => clearInterval(t)
  }, [])
  const parts = [Math.floor(left / 86400), Math.floor((left % 86400) / 3600), Math.floor((left % 3600) / 60), left % 60]

  return (
    <section className="promos container" id="offer">
      <article className="promo promo--brown reveal">
        <span className="promo__date">03 · 11 · 2026</span>
        <span className="promo__kicker">Ra mắt bộ sưu tập</span>
        <h2 className="display">Bữa ngon<br />mùa thu</h2>
        <span className="promo__deal">GIẢM 10% – 30%</span>
        <p>Ưu đãi độc quyền cho khách hàng mới. Nhập mã <b>CANIME30</b> khi thanh toán.</p>
        <div className="countdown">
          {parts.map((p, i) => (
            <div key={i}><b>{String(p).padStart(2, '0')}</b><small>{['Ngày', 'Giờ', 'Phút', 'Giây'][i]}</small></div>
          ))}
        </div>
        <button className="btn btn--yellow btn--sm" onClick={onShop}>Mua ngay <Icon name="arrowRight" size={16} /></button>
        <PetArt kind="dog" size={190} className="promo__pet" />
      </article>

      <article className="promo promo--red reveal" style={{ transitionDelay: '.08s' }}>
        <h2 className="display promo__soon">Sắp ra<br />mắt...</h2>
        <p className="promo__sub">Pate gourmet cá hồi & bí đỏ cho hoàng thượng mèo</p>
        <button className={'btn btn--cream btn--sm' + (notify ? ' is-done' : '')} onClick={() => setNotify(true)}>
          {notify ? <><Icon name="check" size={16} /> Sẽ báo bạn ngay</> : <>Nhận thông báo <Icon name="bell" size={16} /></>}
        </button>
        <Sparkle className="promo__spark" />
        <Sparkle className="promo__spark promo__spark--2" />
        <PetArt kind="cat" size={170} className="promo__pet" />
      </article>

      <article className="promo promo--cyan reveal" style={{ transitionDelay: '.16s' }}>
        <h2 className="display">Combo<br />cả nhà</h2>
        <p>Một chó + một mèo? Gom đơn tiết kiệm đến 15%.</p>
        <button className="link-arrow link-arrow--light" onClick={onShop}>Xem combo <Icon name="arrowRight" size={16} /></button>
        <div className="promo__duo">
          <PetArt kind="dog" size={96} />
          <PetArt kind="cat" size={96} />
        </div>
      </article>
    </section>
  )
}

/* ================= Banner chữ khổng lồ (parallax) ================= */
export function DreamBanner() {
  const ref = useRef(null)
  const [p, setP] = useState(0)
  const k = typeof window !== 'undefined' && window.innerWidth < 640 ? 0.25 : 1
  useEffect(() => {
    let raf
    const f = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const vh = window.innerHeight
        setP(Math.max(-1, Math.min(1, (vh / 2 - (r.top + r.height / 2)) / vh)))
      })
    }
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => { window.removeEventListener('scroll', f); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="dream" ref={ref} aria-label="Ăn ngon ngủ kĩ">
      <div className="dream__glow" />
      <h2 className="dream__big display" style={{ transform: `translateX(${p * -80 * k}px)` }}>Ăn ngon</h2>
      <p className="dream__small display" style={{ transform: `translateX(${p * 60 * k}px)` }}>ngủ thật kĩ</p>
      <div className="dream__pet" style={{ transform: `translateY(${p * 30}px)` }}>
        <PetArt kind="cat" size={360} />
      </div>
      <Butterfly color="#00B7CD" className="bfly bfly--a" />
      <Butterfly color="#00B7CD" className="bfly bfly--b" />
      <Butterfly color="#9B111E" className="bfly bfly--c" />
      <Butterfly color="#00B7CD" className="bfly bfly--d" />
    </section>
  )
}

/* ================= Danh mục: khối màu vuông ================= */
export function Categories({ active, onPick }) {
  const tiles = [
    ...CATEGORIES.map((c) => ({ id: c.id, label: 'Cho ' + c.name.toLowerCase(), sub: c.count, tone: c.id === 'dog' ? 'yellow' : 'cyan', art: <PetArt kind={c.id} size={210} /> })),
    { id: 'all', label: 'Cả nhà', sub: 'Tất cả sản phẩm', tone: 'red', art: <img src={logoUrl} alt="" className="tile__logo" /> },
  ]
  return (
    <section className="section cats" id="cats">
      <div className="container">
        <div className="cats__head reveal">
          <span className="eyebrow">Phòng ăn của Boss</span>
          <h2 className="h2 display">Bé nhà bạn<br />là bé nào?</h2>
          <p>Mỗi bé một khẩu vị. Chọn đúng phòng ăn để tụi mình gợi ý món hợp nhất cho bé nhé.</p>
        </div>
        <div className="tiles">
          {tiles.map((t, i) => (
            <button key={t.id} className={'tile tile--' + t.tone + (active === t.id ? ' is-active' : '') + ' reveal'}
              style={{ transitionDelay: i * 0.08 + 's' }} onClick={() => onPick(t.id)}>
              <span className="tile__art">{t.art}</span>
              <span className="tile__label">
                <b>{t.label}</b>
                <small>{t.sub}</small>
              </span>
              <span className="tile__go"><Icon name="arrowRight" size={18} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= Câu chuyện ================= */
export function Story() {
  return (
    <section className="section story" id="story">
      <div className="container story__grid">
        <div className="story__text reveal">
          <span className="eyebrow">Our story</span>
          <h2 className="h2 display">Câu chuyện<br />của Canimé</h2>
          <p>
            Canimé bắt đầu từ một căn bếp nhỏ ở Sài Gòn, nơi tụi mình tự nấu cơm cho mấy bé chó mèo nhặt về. Giờ đây, mỗi công
            thức đều được bác sĩ thú y góp ý, nguyên liệu rõ nguồn gốc và đóng gói ngay trong ngày.
          </p>
          <a href="#story" className="link-arrow" onClick={(e) => e.preventDefault()}>Chuyện của Canimé <Icon name="arrowRight" size={16} /></a>
        </div>
        <div className="story__card reveal">
          <StoryVideo />
          <PetArt kind="dog" size={130} className="story__pet story__pet--dog" />
          <PetArt kind="cat" size={120} className="story__pet story__pet--cat" />
          <Sparkle className="story__spark" />
        </div>
      </div>
      <ul className="container promises">
        {[['truck', 'Giao nhanh', 'Miễn phí đơn từ 499k'], ['shield', 'Thanh toán an toàn', 'Bảo mật nhiều lớp'], ['refresh', 'Đổi trả dễ', 'Trong vòng 30 ngày'], ['headset', 'Hỗ trợ 24/7', 'Người thật, không bot']].map(([ic, a, b]) => (
          <li key={a} className="reveal"><span><Icon name={ic} size={22} /></span><div><b>{a}</b><small>{b}</small></div></li>
        ))}
      </ul>
    </section>
  )
}

/* Video dọc trong khung Câu chuyện: tự phát (tắt tiếng) khi cuộn tới, dừng khi cuộn qua */
function StoryVideo() {
  const ref = useRef(null)
  const [muted, setMuted] = useState(true)
  const [paused, setPaused] = useState(false)
  const userPaused = useRef(false)

  useEffect(() => {
    const v = ref.current
    if (!v || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !userPaused.current) v.play().catch(() => {})
      else if (!e.isIntersecting) v.pause()
    }, { threshold: 0.35 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  const togglePlay = () => {
    const v = ref.current
    if (v.paused) { userPaused.current = false; v.play().catch(() => {}) }
    else { userPaused.current = true; v.pause() }
  }
  const toggleSound = () => {
    const v = ref.current
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted && v.paused) { userPaused.current = false; v.play().catch(() => {}) }
  }

  return (
    <div className="svideo">
      <video
        ref={ref}
        src={vidUrl}
        poster={posterUrl}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPaused(false)}
        onPause={() => setPaused(true)}
        onClick={togglePlay}
        aria-label="Video một ngày ở tiệm Canimé"
      />
      <span className="svideo__tag">Một ngày ở tiệm Canimé</span>
      <div className="svideo__ctrl">
        <button onClick={togglePlay} aria-label={paused ? 'Phát video' : 'Tạm dừng video'}>
          <Icon name={paused ? 'play' : 'pause'} size={18} />
        </button>
        <button onClick={toggleSound} aria-label={muted ? 'Bật tiếng' : 'Tắt tiếng'}>
          <Icon name={muted ? 'mute' : 'volume'} size={18} />
        </button>
      </div>
    </div>
  )
}

/* ================= Quy trình ================= */
export function Process() {
  const steps = [
    { n: '01', t: 'Chọn nguyên liệu', d: 'Thịt, cá tươi từ trang trại đạt chuẩn; rau củ mua mỗi sáng ở chợ đầu mối.', ic: 'sprout', tone: 'yellow' },
    { n: '02', t: 'Nấu chậm & sấy lạnh', d: 'Giữ trọn dưỡng chất và mùi thơm tự nhiên, không phẩm màu, không chất bảo quản.', ic: 'clock', tone: 'cyan' },
    { n: '03', t: 'Đóng gói & giao ngay', d: 'Túi zip hút ẩm, ghi rõ ngày sản xuất. Giao hoả tốc trong 2 giờ nội thành.', ic: 'box', tone: 'red' },
  ]
  return (
    <section className="section process">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Từ bếp đến bát</span>
            <h2 className="h2 display">Cách tụi mình nấu</h2>
          </div>
        </div>
        <ol className="steps3">
          {steps.map((s, i) => (
            <li key={s.n} className={'step3 step3--' + s.tone + ' reveal'} style={{ transitionDelay: i * 0.1 + 's' }}>
              <span className="step3__num display">{s.n}</span>
              <span className="step3__art"><Icon name={s.ic} size={64} sw={1.4} /></span>
              <b>{s.t}</b>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ================= Blog ================= */
export function Blog() {
  const posts = [
    { tag: 'Dinh dưỡng', title: 'Bao nhiêu hạt là đủ cho một bé chó 10kg?', who: 'BS. Thú y Minh An', min: 5, pet: 'dog', tone: 'yellow', img: blogDog, pos: '62% 50%', ex: 'Cách tính khẩu phần theo cân nặng, độ tuổi và mức vận động — kèm bảng tra nhanh.' },
    { tag: 'Mèo', title: 'Hoàng thượng kén ăn: 7 mẹo khiến bé ăn sạch bát', who: 'Thảo Vy', min: 4, pet: 'cat', tone: 'cyan', img: blogCat, pos: '50% 62%', ex: 'Từ nhiệt độ thức ăn đến vị trí đặt bát, những điều nhỏ mà mèo rất để ý.' },
    { tag: 'Chuyển đổi', title: 'Đổi thức ăn mới trong 7 ngày mà không rối bụng', who: 'Đội ngũ Canimé', min: 3, pet: 'dog', tone: 'red', img: blogBowls, pos: '50% 55%', ex: 'Lịch trộn tỉ lệ từng ngày giúp hệ tiêu hoá của bé làm quen nhẹ nhàng.' },
  ]
  return (
    <section className="section blog" id="blog">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Blog</span>
            <h2 className="h2 display">Góc chăm Boss</h2>
          </div>
          <a href="#blog" className="link-arrow" onClick={(e) => e.preventDefault()}>Tất cả bài viết <Icon name="arrowRight" size={16} /></a>
        </div>
        <div className="posts">
          {posts.map((p, i) => (
            <article key={p.title} className="post reveal" style={{ transitionDelay: i * 0.08 + 's' }}>
              <div className={'post__thumb post__thumb--' + p.tone}>
                <span className="post__tag">{p.tag}</span>
                {p.img ? <img src={p.img} alt="" className="post__img" style={{ objectPosition: p.pos }} loading="lazy" /> : <PetArt kind={p.pet} size={170} />}
              </div>
              <h3>{p.title}</h3>
              <div className="post__meta">
                <span className="post__av">{p.who.split(' ').pop()[0]}</span>
                <span>{p.who}</span><span className="dotsep">{p.min} phút đọc</span>
              </div>
              <p>{p.ex}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ================= Bong bóng trò chuyện ================= */
export function ChatBubble() {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ me: false, t: 'Chào bạn! Mình là Mé của Canimé. Boss nhà bạn là bé chó hay bé mèo nè?' }])
  const [text, setText] = useState('')
  const listRef = useRef(null)
  const replies = {
    'Bé chó': 'Tuyệt! Bé bao nhiêu kg và mấy tuổi rồi? Mình gợi ý dòng hạt phù hợp liền.',
    'Bé mèo': 'Hoàng thượng đến rồi! Bé thích vị cá hay vị gà hơn?',
    'Tư vấn khẩu phần': 'Bạn gửi mình cân nặng của bé nhé, mình tính khẩu phần mỗi ngày cho.',
  }
  const send = (t) => {
    if (!t.trim()) return
    setMsgs((m) => [...m, { me: true, t }])
    setText('')
    setTimeout(() => setMsgs((m) => [...m, { me: false, t: replies[t] || 'Mình đã nhận tin nhắn, nhân viên Canimé sẽ trả lời bạn trong ít phút nữa nha!' }]), 700)
  }
  useEffect(() => { listRef.current?.scrollTo({ top: 1e6, behavior: 'smooth' }) }, [msgs])

  return (
    <div className={'chat' + (open ? ' is-open' : '')}>
      {open && (
        <div className="chat__panel" role="dialog" aria-label="Trò chuyện với Canimé">
          <div className="chat__head">
            <span className="chat__av"><img src={logoUrl} alt="" /></span>
            <div><b>Mé · Canimé</b><small><i className="chat__dot" /> Đang trực tuyến</small></div>
            <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Đóng"><Icon name="close" size={18} /></button>
          </div>
          <div className="chat__list" ref={listRef}>
            {msgs.map((m, i) => <p key={i} className={'chat__msg' + (m.me ? ' is-me' : '')}>{m.t}</p>)}
          </div>
          <div className="chat__quick">
            {Object.keys(replies).map((q) => <button key={q} onClick={() => send(q)}>{q}</button>)}
          </div>
          <form className="chat__form" onSubmit={(e) => { e.preventDefault(); send(text) }}>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Nhắn cho Canimé…" aria-label="Tin nhắn" />
            <button type="submit" aria-label="Gửi"><Icon name="arrowRight" size={18} /></button>
          </form>
        </div>
      )}
      <button className="chat__pill" onClick={() => setOpen((o) => !o)}>
        <Sparkle className="chat__spark" /> <span className="chat__label">{open ? 'Thu gọn' : 'Trò chuyện với chúng tôi'}</span>
      </button>
    </div>
  )
}
