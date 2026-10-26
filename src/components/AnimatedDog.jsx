import { useEffect, useRef, useState } from 'react'

/**
 * Chú chó Border Collie chuyển động:
 * - vẫy đuôi, nghiêng đầu, chớp mắt, thè lưỡi thở, thẻ tên đung đưa, khúc xương lơ lửng
 * - mắt nhìn theo con trỏ chuột
 * - bấm vào bé để nghe "Gâu!" và nhảy lên
 */
export default function AnimatedDog({ className = '' }) {
  const svgRef = useRef(null)
  const [look, setLook] = useState({ x: 0, y: 0 })
  const [bark, setBark] = useState(0)

  // Theo dõi con trỏ: target = hướng con trỏ so với mặt chó (-1..1), cur = giá trị làm mượt
  useEffect(() => {
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let raf
    let idle

    const onMove = (e) => {
      const el = svgRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * 0.33 // vị trí mắt
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const reach = Math.max(260, r.width * 1.1)
      target.x = Math.max(-1, Math.min(1, dx / reach))
      target.y = Math.max(-1, Math.min(1, dy / reach))
      clearTimeout(idle)
      idle = setTimeout(() => { target.x = 0; target.y = 0 }, 4000) // đứng yên lâu thì nhìn thẳng lại
    }
    const onLeave = () => { target.x = 0; target.y = 0 }

    const tick = () => {
      cur.x += (target.x - cur.x) * 0.12
      cur.y += (target.y - cur.y) * 0.12
      setLook((prev) =>
        Math.abs(prev.x - cur.x) < 0.001 && Math.abs(prev.y - cur.y) < 0.001 ? prev : { x: cur.x, y: cur.y }
      )
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(idle)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const { x, y } = look
  const headTurn = `translate(${x * 9} ${y * 6}) rotate(${x * 8} 200 250)` // cả đầu quay theo
  const faceShift = `translate(${x * 7} ${y * 5})`                      // mặt lệch thêm tạo chiều sâu
  const pupil = { transform: `translate(${x * 6}px, ${y * 5}px)` }      // con ngươi
  const brow = `translate(0 ${Math.min(0, y) * 5})`                     // nhướng mày khi nhìn lên

  const doBark = () => setBark((b) => b + 1)

  return (
    <div className={'dog ' + className}>
      {bark > 0 && (
        <span key={bark} className="dog__bubble">Gâu gâu!</span>
      )}
      <svg
        ref={svgRef}
        viewBox="0 0 400 460"
        className={'dog__svg' + (bark ? ' is-jump' : '')}
        key={'j' + bark}
        onClick={doBark}
        role="img"
        aria-label="Chú chó Border Collie đang vẫy đuôi"
      >
        <defs>
          <radialGradient id="fur" cx=".4" cy=".3" r=".8">
            <stop offset="0" stopColor="#3A302B" />
            <stop offset="1" stopColor="#17120F" />
          </radialGradient>
          <radialGradient id="furWhite" cx=".4" cy=".3" r=".9">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#EFE6D6" />
          </radialGradient>
          <linearGradient id="gold" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFE07A" />
            <stop offset="1" stopColor="#E0A400" />
          </linearGradient>
        </defs>

        <ellipse className="dog__shadow" cx="200" cy="445" rx="150" ry="14" fill="#8C482D" opacity=".22" />

        {/* đuôi */}
        <g className="dog__tail">
          <path d="M282 410 C338 404 372 362 362 312 C358 292 376 284 384 300 C400 352 364 428 286 430 Z" fill="url(#fur)" />
          <path d="M362 312 C358 292 376 284 384 300 C388 312 386 322 380 330 C374 318 366 316 362 312Z" fill="#fff" />
        </g>

        {/* thân */}
        <path d="M142 236 C110 300 94 368 100 426 Q200 446 300 426 C306 368 290 300 258 236 Z" fill="url(#fur)" />
        <ellipse cx="112" cy="408" rx="46" ry="34" fill="#221B17" />
        <ellipse cx="288" cy="408" rx="46" ry="34" fill="#221B17" />
        <ellipse cx="86" cy="436" rx="26" ry="11" fill="url(#furWhite)" />
        <ellipse cx="314" cy="436" rx="26" ry="11" fill="url(#furWhite)" />
        {/* yếm trắng */}
        <path d="M156 240 C146 300 158 362 200 386 C242 362 254 300 244 240 Z" fill="url(#furWhite)" />
        {/* chân trước */}
        <rect x="157" y="320" width="36" height="112" rx="18" fill="url(#furWhite)" />
        <rect x="207" y="320" width="36" height="112" rx="18" fill="url(#furWhite)" />
        <path d="M193 340 L193 420 M207 340 L207 420" stroke="#E2D6C2" strokeWidth="2" />
        <ellipse cx="173" cy="432" rx="26" ry="12" fill="#fff" stroke="#E2D6C2" strokeWidth="2" />
        <ellipse cx="227" cy="432" rx="26" ry="12" fill="#fff" stroke="#E2D6C2" strokeWidth="2" />
        <path d="M165 430v6M174 429v8M183 430v6M219 430v6M228 429v8M237 430v6" stroke="#CDBFA8" strokeWidth="2" strokeLinecap="round" />

        {/* vòng cổ + thẻ tên */}
        <path d="M136 236 C170 262 230 262 264 236 L268 254 C232 282 168 282 132 254 Z" fill="#00B7CD" />
        <path d="M138 246 C172 270 228 270 262 246" stroke="#008FA1" strokeWidth="2" fill="none" strokeDasharray="5 6" />
        <g className="dog__tag">
          <circle cx="200" cy="270" r="5" fill="none" stroke="#C99400" strokeWidth="3" />
          <path d="M172 284 a8 8 0 1 1 8-10 h40 a8 8 0 1 1 8 10 a8 8 0 1 1 -8 10 h-40 a8 8 0 1 1 -8 -10Z" fill="url(#gold)" stroke="#B88700" strokeWidth="1.5" />
          <text x="200" y="288" textAnchor="middle" fontFamily="Baloo 2, sans-serif" fontWeight="800" fontSize="10" fill="#7A4E00" letterSpacing="1">CAMINE</text>
        </g>

        {/* đầu */}
        <g className="dog__head">
          <g transform={headTurn}>
          <g className="dog__ear dog__ear--l">
            <path d="M138 128 C112 92 114 52 130 42 C150 54 168 86 174 112 Z" fill="url(#fur)" />
            <path d="M140 116 C126 92 126 66 134 58 C146 72 156 92 160 108 Z" fill="#5A3A2E" />
            <path d="M130 42 C120 50 112 64 118 74 C124 64 128 56 136 50 Z" fill="#17120F" />
          </g>
          <g className="dog__ear dog__ear--r">
            <path d="M262 128 C288 92 286 52 270 42 C250 54 232 86 226 112 Z" fill="url(#fur)" />
            <path d="M260 116 C274 92 274 66 266 58 C254 72 244 92 240 108 Z" fill="#5A3A2E" />
            <path d="M270 42 C280 50 288 64 282 74 C276 64 272 56 264 50 Z" fill="#17120F" />
          </g>

          <path d="M200 84 C256 84 286 124 283 170 C280 216 246 248 200 248 C154 248 120 216 117 170 C114 124 144 84 200 84 Z" fill="url(#fur)" />
          <g transform={faceShift}>
          {/* sọc trắng giữa trán + mõm */}
          <path d="M192 92 C196 88 204 88 208 92 L215 148 C242 162 254 198 240 226 C226 250 174 250 160 226 C146 198 158 162 185 148 Z" fill="url(#furWhite)" />
          {/* má hồng */}
          <ellipse cx="165" cy="200" rx="10" ry="6" fill="#F4A3A0" opacity=".55" />
          <ellipse cx="235" cy="200" rx="10" ry="6" fill="#F4A3A0" opacity=".55" />
          {/* lông mày */}
          <g transform={brow}>
            <path d="M150 128 q14 -8 26 0" stroke="#8C6A55" strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M224 128 q14 -8 26 0" stroke="#8C6A55" strokeWidth="4" strokeLinecap="round" fill="none" />
          </g>

          {/* mắt */}
          <g className="dog__eyes">
            <ellipse cx="163" cy="152" rx="16" ry="17" fill="#fff" />
            <ellipse cx="237" cy="152" rx="16" ry="17" fill="#fff" />
            <g style={pupil}>
              <circle cx="164" cy="153" r="10" fill="#6B3A20" />
              <circle cx="236" cy="153" r="10" fill="#6B3A20" />
              <circle cx="164" cy="153" r="6.5" fill="#120D0A" />
              <circle cx="236" cy="153" r="6.5" fill="#120D0A" />
              <circle cx="168" cy="148" r="3.5" fill="#fff" />
              <circle cx="240" cy="148" r="3.5" fill="#fff" />
              <circle cx="160" cy="157" r="1.5" fill="#fff" opacity=".8" />
              <circle cx="232" cy="157" r="1.5" fill="#fff" opacity=".8" />
            </g>
          </g>

          {/* mũi */}
          <path d="M183 178 C183 167 217 167 217 178 C217 190 206 197 200 197 C194 197 183 190 183 178 Z" fill="#1A1412" />
          <ellipse cx="194" cy="174" rx="6" ry="3" fill="#fff" opacity=".35" />

          {/* miệng + lưỡi */}
          <path d="M175 208 C184 236 216 236 225 208 C214 216 186 216 175 208Z" fill="#5A1A1A" />
          <g className="dog__tongue">
            <path d="M186 214 C184 244 192 260 200 260 C208 260 216 244 214 214 Z" fill="#F06A7A" />
            <path d="M200 220 V250" stroke="#D14B5C" strokeWidth="2.5" strokeLinecap="round" />
            <ellipse cx="193" cy="232" rx="3" ry="6" fill="#fff" opacity=".25" />
          </g>
          <path d="M200 197 V206 M200 206 C192 216 178 216 171 206 M200 206 C208 216 222 216 229 206" stroke="#1A1412" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          </g>
          </g>
        </g>

        {/* khúc xương lơ lửng */}
        <g className="dog__bone">
          <path d="M262 64 l38 -14 a9 9 0 1 1 12 -6 a9 9 0 1 1 -2 14 l-38 14 a9 9 0 1 1 -12 6 a9 9 0 1 1 2 -14 Z" fill="#FFF8E7" stroke="#D9C7A5" strokeWidth="2" />
        </g>
      </svg>
    </div>
  )
}
