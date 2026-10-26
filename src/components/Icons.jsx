// Bộ icon nét vẽ tay, stroke = currentColor
const base = (size, sw = 1.8) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true,
})

const paths = {
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></>,
  cart: <><path d="M3 4h2l2.2 10.5a2 2 0 0 0 2 1.5h7.6a2 2 0 0 0 2-1.6L20.5 8H6.2" /><circle cx="10" cy="20" r="1.4" /><circle cx="17" cy="20" r="1.4" /></>,
  bag: <><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></>,
  heart: <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
  chevDown: <path d="m6 9 6 6 6-6" />,
  chevLeft: <path d="m15 6-6 6 6 6" />,
  chevRight: <path d="m9 6 6 6-6 6" />,
  arrowRight: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft: <><path d="M19 12H5" /><path d="m11 6-6 6 6 6" /></>,
  leaf: <><path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" /><path d="M5 19c3-4 6-6.5 9-8" /></>,
  sprout: <><path d="M12 21v-9" /><path d="M12 12C12 8 9 6 5 6c0 4 3 6 7 6Z" /><path d="M12 10c0-3.5 2.5-5.5 7-5.5 0 3.5-2.5 5.5-7 5.5Z" /></>,
  shield: <><path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z" /><path d="m8.5 12 2.4 2.4 4.6-4.8" /></>,
  vet: <><path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6L12 3Z" /><path d="M12 9v6M9 12h6" /></>,
  noChem: <><circle cx="12" cy="12" r="8.5" /><path d="m6 6 12 12" /><path d="M10 8h4M11 8v3l-2 4h6l-2-4V8" /></>,
  paw: <><circle cx="7" cy="9" r="1.8" /><circle cx="10.5" cy="5.5" r="1.8" /><circle cx="14.5" cy="5.5" r="1.8" /><circle cx="18" cy="9" r="1.8" /><path d="M12 11c-3 0-5.5 3.5-5.5 6 0 1.6 1.2 2.5 2.7 2.5 1.2 0 1.8-.6 2.8-.6s1.6.6 2.8.6c1.5 0 2.7-.9 2.7-2.5 0-2.5-2.5-6-5.5-6Z" /></>,
  truck: <><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3.5V16h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></>,
  card: <><rect x="3" y="5.5" width="18" height="13" rx="2" /><path d="M3 10h18M7 15h3" /></>,
  refresh: <><path d="M20 11a8 8 0 0 0-14.5-4.5L4 8" /><path d="M4 4v4h4" /><path d="M4 13a8 8 0 0 0 14.5 4.5L20 16" /><path d="M20 20v-4h-4" /></>,
  headset: <><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" /><path d="M19 19c0 1.5-2 2.5-5 2.5" /></>,
  users: <><circle cx="9" cy="8" r="3.2" /><path d="M3 19c.8-3.4 3-5 6-5s5.2 1.6 6 5" /><circle cx="17" cy="9" r="2.5" /><path d="M16.5 14c2.4.2 3.8 1.6 4.5 4" /></>,
  box: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5M12 12v9" /></>,
  eye: <><path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  trash: <><path d="M4 7h16M10 11v6M14 11v6" /><path d="M6 7l1 13h10l1-13M9 7V4h6v3" /></>,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  tag: <><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8" r="1.4" /></>,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></>,
  pin: <><path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></>,
  menu: <path d="M4 7h16M4 12h16M4 17h10" />,
  gift: <><rect x="3.5" y="8" width="17" height="4" rx="1" /><path d="M5 12v8h14v-8M12 8v12" /><path d="M12 8C9 8 7.5 4 10 4c1.6 0 2 2.5 2 4Zm0 0c3 0 4.5-4 2-4-1.6 0-2 2.5-2 4Z" /></>,
  wallet: <><path d="M4 7h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a1 1 0 0 1-1-1V7Z" /><path d="M4 7l11-3v3" /><circle cx="16" cy="13.5" r="1.3" /></>,
  qr: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2M18 14h2" /></>,
  cash: <><rect x="2.5" y="6" width="19" height="12" rx="2" /><circle cx="12" cy="12" r="2.8" /><path d="M6 9v.01M18 15v.01" /></>,
  bolt: <path d="M13 3 5 14h6l-1 7 8-11h-6l1-7Z" />,
  bone: <path d="M8 10.5 13.5 16a2.5 2.5 0 1 0 3.5 3.5 2.5 2.5 0 1 0 3.5-3.5 2.5 2.5 0 0 0-3.5-3.5L11.5 7A2.5 2.5 0 1 0 8 3.5 2.5 2.5 0 1 0 4.5 7 2.5 2.5 0 0 0 8 10.5Z" />,
}

export function Icon({ name, size = 20, sw, className, style }) {
  return (
    <svg {...base(size, sw)} className={className} style={style}>
      {paths[name]}
    </svg>
  )
}

export function Star({ filled = true, size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2.8l2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3L2.9 9.5l6.3-.9L12 2.8Z"
        fill={filled ? '#FFC000' : '#EADFCB'}
      />
    </svg>
  )
}

export function Stars({ value = 5, size = 14 }) {
  return (
    <span className="stars" aria-label={`${value} sao`}>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} filled={i <= Math.round(value)} size={size} />)}
    </span>
  )
}

// Logo mạng xã hội (dạng khối, fill currentColor)
export const Social = {
  facebook: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.6V21h3Z" />
    </svg>
  ),
  instagram: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" />
    </svg>
  ),
  tiktok: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M16.6 3c.4 2.1 1.7 3.6 3.9 3.9v3c-1.5 0-2.8-.4-3.9-1.1v6.4a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 1 0 1.7 2.4V3h3Z" />
    </svg>
  ),
  youtube: (s = 18) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
    </svg>
  ),
}
