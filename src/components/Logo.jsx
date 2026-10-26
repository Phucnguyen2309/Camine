import logoUrl from '../assets/canime-logo.svg'

export default function Logo({ light = false, size = 44, onClick }) {
  return (
    <a
      href="#top"
      className={'logo' + (light ? ' logo--light' : '')}
      onClick={(e) => { e.preventDefault(); onClick && onClick() }}
      aria-label="Canimé — trang chủ"
    >
      <span className="logo__mark" style={{ width: size, height: size }}>
        <img src={logoUrl} alt="" width={size} height={size} />
      </span>
      <span className="logo__word">
        Cani<em>mé</em>
      </span>
    </a>
  )
}
