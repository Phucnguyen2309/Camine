import { useEffect } from 'react'

/* Ngôi sao lấp lánh 4 cánh */
export function Sparkle({ className = '', style }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} aria-hidden>
      <path fill="currentColor" d="M12 0C13 8 16 11 24 12C16 13 13 16 12 24C11 16 8 13 0 12C8 11 11 8 12 0Z" />
    </svg>
  )
}

/* Dải chữ chạy vô tận */
export function Marquee({ items = ['Canimé'], bg, fg, star, speed, reverse = false, repeat = 8 }) {
  const row = Array.from({ length: repeat }).flatMap((_, r) => items.map((t, i) => ({ t, k: r + '-' + i })))
  return (
    <div className={'marquee' + (reverse ? ' marquee--rev' : '')} style={{ '--bg': bg, '--fg': fg, '--star': star, '--speed': speed }} aria-hidden>
      <div className="marquee__track">
        {[0, 1].map((half) => (
          <div key={half} style={{ display: 'flex' }}>
            {row.map(({ t, k }) => (
              <span className="marquee__item" key={half + k}>
                {t} <Sparkle className="marquee__star" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* Bươm bướm vỗ cánh */
export function Butterfly({ color = '#00B7CD', className = '', style }) {
  return (
    <svg viewBox="0 0 60 50" className={'butterfly ' + className} style={style} aria-hidden>
      <g className="butterfly__wing butterfly__wing--l">
        <path d="M29 24C20 6 4 2 3 12c-1 9 10 13 26 12Z" fill={color} />
        <path d="M29 26C18 28 8 36 13 44c4 6 13-4 16-18Z" fill={color} opacity=".8" />
        <circle cx="12" cy="13" r="3" fill="#fff" opacity=".7" />
      </g>
      <g className="butterfly__wing butterfly__wing--r">
        <path d="M31 24C40 6 56 2 57 12c1 9-10 13-26 12Z" fill={color} />
        <path d="M31 26c11 2 21 10 16 18-4 6-13-4-16-18Z" fill={color} opacity=".8" />
        <circle cx="48" cy="13" r="3" fill="#fff" opacity=".7" />
      </g>
      <rect x="28.5" y="14" width="3" height="22" rx="1.5" fill="#3B1F14" />
      <path d="M30 15c-2-6-5-9-8-10M30 15c2-6 5-9 8-10" stroke="#3B1F14" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* Bông hoa nhỏ */
export function Flower({ color = '#FFC000', center = '#9B111E', className = '', style }) {
  return (
    <svg viewBox="0 0 40 40" className={className} style={style} aria-hidden>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="20" cy="9" rx="7" ry="9" fill={color} transform={`rotate(${r} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="6" fill={center} />
    </svg>
  )
}

/* Hiện dần các phần tử .reveal khi cuộn tới */
export function useReveal(dep) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.is-in)')
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target) } })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [dep])
}
