import { PetShapes } from './PetArt.jsx'
import logoUrl from '../assets/canime-logo.svg'

// Bao bì sản phẩm vẽ bằng SVG (không dùng ảnh thương hiệu khác)
const isLight = (hex) => {
  const n = parseInt(hex.slice(1), 16)
  const r = n >> 16, g = (n >> 8) & 255, b = n & 255
  return 0.299 * r + 0.587 * g + 0.114 * b > 170
}

const SHAPES = {
  bag: 'M44 36 L156 36 L166 212 Q167 222 157 222 L43 222 Q33 222 34 212 Z',
  pouch: 'M50 34 L150 34 Q154 34 154 40 L162 206 Q100 228 38 206 L46 40 Q46 34 50 34 Z',
  jar: 'M58 60 L142 60 Q160 60 160 80 L160 204 Q160 222 142 222 L58 222 Q40 222 40 204 L40 80 Q40 60 58 60 Z',
  can: 'M48 62 L152 62 L152 208 Q100 226 48 208 Z',
}

export default function PackShot({ product, view = 'front', size = 180, weight }) {
  const { id, color, accent, pack, short, line, pet } = product
  const light = isLight(color)
  const ink = light ? '#4A2618' : '#FFF8E7'
  const gid = `g-${id}-${view}`
  const wlabel = weight || product.weights[0].label

  if (view === 'kibble') {
    return (
      <svg viewBox="0 0 200 240" width={size} height={size * 1.2} aria-hidden>
        <ellipse cx="100" cy="200" rx="80" ry="14" fill="#000" opacity=".08" />
        <path d="M30 170 Q100 110 170 170 Q170 200 100 205 Q30 200 30 170Z" fill="#FFF8E7" stroke={color} strokeWidth="5" />
        {Array.from({ length: 34 }).map((_, i) => {
          const a = (i * 137.5 * Math.PI) / 180, r = Math.sqrt(i) * 9
          const x = 100 + Math.cos(a) * r * 1.5, y = 150 + Math.sin(a) * r * 0.55
          return <ellipse key={i} cx={x} cy={y} rx="9" ry="7" transform={`rotate(${i * 23} ${x} ${y})`} fill={i % 3 ? '#9A5A2E' : '#7A3E1C'} stroke="#5A2A10" strokeWidth="1" />
        })}
        <text x="100" y="60" textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="18" fill="#4A2618">Hạt giòn, dễ nhai</text>
        <text x="100" y="82" textAnchor="middle" fontFamily="Be Vietnam Pro, sans-serif" fontSize="11" fill="#8C482D">Kích thước hạt ~ 9mm</text>
      </svg>
    )
  }

  if (view === 'facts') {
    const rows = [['Đạm thô', '≥ 28%'], ['Béo thô', '≥ 15%'], ['Xơ thô', '≤ 4%'], ['Độ ẩm', '≤ 10%'], ['Canxi', '≥ 1.1%']]
    return (
      <svg viewBox="0 0 200 240" width={size} height={size * 1.2} aria-hidden>
        <rect x="26" y="28" width="148" height="190" rx="14" fill="#FFF8E7" stroke="#4A2618" strokeWidth="2" />
        <text x="100" y="58" textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="17" fill="#4A2618">Thành phần dinh dưỡng</text>
        <rect x="40" y="66" width="120" height="4" fill={color} />
        {rows.map(([k, v], i) => (
          <g key={k}>
            <text x="44" y={98 + i * 24} fontFamily="Be Vietnam Pro, sans-serif" fontSize="12" fill="#4A2618">{k}</text>
            <text x="156" y={98 + i * 24} textAnchor="end" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="700" fontSize="12" fill="#4A2618">{v}</text>
            <path d={`M44 ${105 + i * 24}H156`} stroke="#E6D7BC" />
          </g>
        ))}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 200 240" width={size} height={size * 1.2} className="packshot" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".28" />
          <stop offset=".22" stopColor="#fff" stopOpacity=".06" />
          <stop offset=".7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".18" />
        </linearGradient>
      </defs>
      <ellipse cx="100" cy="226" rx="70" ry="9" fill="#000" opacity=".12" />

      {pack === 'jar' && <rect x="54" y="34" width="92" height="30" rx="8" fill={accent === '#FFF8E7' ? '#4A2618' : accent} />}
      {pack === 'jar' && <path d="M60 44h80M60 52h80" stroke="#000" strokeOpacity=".15" strokeWidth="2" />}

      <path d={SHAPES[pack]} fill={color} stroke={light ? '#E7D3B0' : 'none'} strokeWidth="1.5" />
      <path d={SHAPES[pack]} fill={`url(#${gid})`} />

      {pack === 'bag' && (
        <g>
          <rect x="40" y="20" width="120" height="20" rx="3" fill={color} />
          <rect x="40" y="20" width="120" height="20" rx="3" fill="#000" opacity=".16" />
          <path d={'M40 20' + Array.from({ length: 20 }).map((_, i) => ` l3 -4 l3 4`).join('')} fill="none" stroke={color} strokeWidth="2" />
          <path d="M48 30h104" stroke="#fff" strokeOpacity=".35" strokeDasharray="3 3" />
        </g>
      )}
      {pack === 'pouch' && (
        <g>
          <path d="M50 52h100" stroke="#000" strokeOpacity=".18" strokeWidth="3" />
          <circle cx="56" cy="42" r="3" fill="#000" opacity=".2" />
        </g>
      )}
      {pack === 'can' && (
        <g>
          <ellipse cx="100" cy="62" rx="52" ry="13" fill="#D9D2C5" />
          <ellipse cx="100" cy="62" rx="44" ry="9" fill="#C3BAA9" />
          <path d="M84 60 q16 -10 32 0" stroke="#9E9483" strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="48" y="96" width="104" height="92" fill="#FFF8E7" opacity=".95" />
        </g>
      )}

      {/* thương hiệu */}
      {(() => {
        const top = pack === 'can' ? 74 : pack === 'jar' ? 72 : 46
        return (
          <g>
            <circle cx="100" cy={top + 11} r="12" fill="#FFF8E7" />
            <image href={logoUrl} x="91" y={top + 2} width="18" height="18" />
            <text x="100" y={top + 38} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="15" letterSpacing="3" fill={pack === 'can' ? '#9B111E' : ink}>CANIMÉ</text>
          </g>
        )
      })()}

      {(() => {
        const y0 = pack === 'can' ? 100 : pack === 'jar' ? 118 : 92
        const textInk = pack === 'can' ? '#4A2618' : ink
        return (
          <g>
            <rect x="56" y={y0} width="88" height="18" rx="9" fill={pack === 'can' ? color : accent} />
            <text x="100" y={y0 + 12.5} textAnchor="middle" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="1.2"
              fill={isLight(pack === 'can' ? color : accent) ? '#4A2618' : '#FFF8E7'}>{line}</text>
            <text x="100" y={y0 + 40} textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="15.5" fill={textInk}>{short}</text>
            <circle cx="100" cy={y0 + 80} r="28" fill="#FFF8E7" stroke={pack === 'can' ? color : accent} strokeWidth="3" />
            <svg x="74" y={y0 + 54} width="52" height="52" viewBox="0 0 120 120"><PetShapes kind={pet} /></svg>
          </g>
        )
      })()}

      <g>
        <rect x="118" y="194" width="40" height="16" rx="8" fill="#FFF8E7" stroke="#4A2618" strokeOpacity=".2" />
        <text x="138" y="205.5" textAnchor="middle" fontFamily="Be Vietnam Pro, sans-serif" fontWeight="700" fontSize="7.5" fill="#4A2618">{wlabel.length > 8 ? wlabel.split(' ').pop() : wlabel}</text>
      </g>
      <g opacity=".9">
        <ellipse cx="58" cy="204" rx="5" ry="4" fill="#9A5A2E" />
        <ellipse cx="68" cy="207" rx="4.5" ry="3.5" fill="#7A3E1C" />
        <ellipse cx="63" cy="198" rx="4" ry="3.2" fill="#B06A36" />
      </g>
    </svg>
  )
}
