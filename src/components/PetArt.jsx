// Minh hoạ thú cưng dạng phẳng — viewBox 0 0 120 120
export function PetShapes({ kind = 'dog' }) {
  switch (kind) {
    case 'cat':
      return (
        <g>
          <path d="M28 120 Q30 90 60 86 Q90 90 92 120 Z" fill="#F0A04B" />
          <path d="M48 120 Q50 98 60 96 Q70 98 72 120 Z" fill="#FFF1DD" />
          <path d="M30 48 L34 14 L58 34 Z" fill="#F0A04B" />
          <path d="M90 48 L86 14 L62 34 Z" fill="#F0A04B" />
          <path d="M36 40 L38 22 L50 34 Z" fill="#F7B9B4" />
          <path d="M84 40 L82 22 L70 34 Z" fill="#F7B9B4" />
          <ellipse cx="60" cy="60" rx="33" ry="29" fill="#F0A04B" />
          <path d="M60 32v10M51 34l2.5 8M69 34l-2.5 8" stroke="#C8702A" strokeWidth="3.2" strokeLinecap="round" />
          <path d="M28 62h8M84 62h8" stroke="#C8702A" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="60" cy="72" rx="15" ry="11" fill="#FFF1DD" />
          <ellipse cx="47" cy="57" rx="5" ry="6" fill="#9BC53D" />
          <ellipse cx="73" cy="57" rx="5" ry="6" fill="#9BC53D" />
          <ellipse cx="47" cy="57" rx="1.8" ry="5" fill="#1E1A16" />
          <ellipse cx="73" cy="57" rx="1.8" ry="5" fill="#1E1A16" />
          <circle cx="48.6" cy="54.4" r="1.3" fill="#fff" />
          <circle cx="74.6" cy="54.4" r="1.3" fill="#fff" />
          <path d="M56 67h8l-4 4.5Z" fill="#E8738A" />
          <path d="M60 71.5v2.5M55 75q2.5 2.6 5 0q2.5 2.6 5 0" stroke="#7A3E22" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M44 70l-14-2M44 74l-13 3M76 70l14-2M76 74l13 3" stroke="#7A3E22" strokeWidth="1.3" strokeLinecap="round" />
        </g>
      )
    case 'bird':
      return (
        <g>
          <path d="M18 100h84" stroke="#8C482D" strokeWidth="6" strokeLinecap="round" />
          <path d="M54 88 L46 116 L58 112 L62 88Z" fill="#2E8F5B" />
          <ellipse cx="60" cy="70" rx="24" ry="28" fill="#6CC24A" />
          <path d="M44 62 Q38 84 52 96 Q62 80 56 60Z" fill="#3E9A3A" />
          <path d="M46 70q6 3 10 0M46 78q6 3 10 0" stroke="#2C6E2A" strokeWidth="2" fill="none" />
          <circle cx="62" cy="40" r="20" fill="#FFE15A" />
          <path d="M48 46q4 3 8 0M52 52q4 3 8 0" stroke="#3A3A3A" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <circle cx="68" cy="37" r="3.6" fill="#1E1A16" />
          <circle cx="69.2" cy="35.8" r="1.1" fill="#fff" />
          <path d="M77 41q9 2 3 10q-3-3-6-5Z" fill="#F2A23A" />
          <circle cx="72" cy="50" r="3" fill="#4AA3E0" />
          <path d="M56 98v6M66 98v6" stroke="#F2A23A" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      )
    case 'small':
      return (
        <g>
          <circle cx="34" cy="42" r="11" fill="#D89A62" />
          <circle cx="86" cy="42" r="11" fill="#D89A62" />
          <circle cx="34" cy="42" r="6" fill="#F7B9B4" />
          <circle cx="86" cy="42" r="6" fill="#F7B9B4" />
          <ellipse cx="60" cy="74" rx="38" ry="34" fill="#E8B07A" />
          <ellipse cx="60" cy="86" rx="23" ry="19" fill="#FFF1DD" />
          <ellipse cx="38" cy="74" rx="7" ry="4.5" fill="#F4A3A0" opacity=".8" />
          <ellipse cx="82" cy="74" rx="7" ry="4.5" fill="#F4A3A0" opacity=".8" />
          <circle cx="47" cy="63" r="4" fill="#1E1A16" />
          <circle cx="73" cy="63" r="4" fill="#1E1A16" />
          <circle cx="48.3" cy="61.7" r="1.3" fill="#fff" />
          <circle cx="74.3" cy="61.7" r="1.3" fill="#fff" />
          <ellipse cx="60" cy="70" rx="3.5" ry="2.5" fill="#D8667A" />
          <path d="M60 72.5v2.5M56 76q2 2 4 0q2 2 4 0" stroke="#7A3E22" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <ellipse cx="50" cy="96" rx="6" ry="4" fill="#F4C9A0" />
          <ellipse cx="70" cy="96" rx="6" ry="4" fill="#F4C9A0" />
        </g>
      )
    case 'fish':
      return (
        <g>
          <circle cx="92" cy="28" r="5" fill="none" stroke="#00B7CD" strokeWidth="2.5" />
          <circle cx="100" cy="14" r="3" fill="none" stroke="#00B7CD" strokeWidth="2" />
          <path d="M80 60 L110 38 Q100 60 110 84 Z" fill="#FFB15C" />
          <path d="M44 44 Q58 22 72 42Z" fill="#FFB15C" />
          <ellipse cx="54" cy="62" rx="32" ry="23" fill="#FF8A2A" />
          <path d="M62 44q-6 18 0 36M72 46q-5 16 0 32" stroke="#E86B12" strokeWidth="2.5" fill="none" />
          <path d="M48 82q8 10 16 4Z" fill="#FFB15C" />
          <circle cx="38" cy="57" r="6" fill="#fff" />
          <circle cx="37" cy="57" r="3.5" fill="#1E1A16" />
          <path d="M24 68q4 3 8 0" stroke="#9B3A0A" strokeWidth="2" fill="none" strokeLinecap="round" />
        </g>
      )
    default:
      return (
        <g>
          <path d="M28 120 Q30 88 60 86 Q90 88 92 120 Z" fill="#E9A04F" />
          <path d="M48 120 Q50 96 60 94 Q70 96 72 120 Z" fill="#FBE3C0" />
          <ellipse cx="30" cy="58" rx="13" ry="25" transform="rotate(18 30 58)" fill="#B86A2E" />
          <ellipse cx="90" cy="58" rx="13" ry="25" transform="rotate(-18 90 58)" fill="#B86A2E" />
          <ellipse cx="60" cy="56" rx="31" ry="30" fill="#E9A04F" />
          <path d="M60 28c-5 6-5 14 0 18c5-4 5-12 0-18Z" fill="#FBE3C0" opacity=".7" />
          <ellipse cx="60" cy="73" rx="18" ry="13" fill="#FBE3C0" />
          <circle cx="47" cy="55" r="4.4" fill="#1E1A16" />
          <circle cx="73" cy="55" r="4.4" fill="#1E1A16" />
          <circle cx="48.4" cy="53.6" r="1.4" fill="#fff" />
          <circle cx="74.4" cy="53.6" r="1.4" fill="#fff" />
          <ellipse cx="60" cy="67" rx="6.5" ry="4.6" fill="#1E1A16" />
          <path d="M60 71.5v4M53 76q7 5.5 14 0" stroke="#5A2E16" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M56 78.5q4 11 8 0Z" fill="#F06A7A" />
        </g>
      )
  }
}

export default function PetArt({ kind = 'dog', size = 80, className }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className={className} aria-hidden>
      <PetShapes kind={kind} />
    </svg>
  )
}
