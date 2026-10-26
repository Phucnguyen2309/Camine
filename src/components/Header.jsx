import { useEffect, useState } from 'react'
import Logo from './Logo.jsx'
import { Icon } from './Icons.jsx'
import { CATEGORIES } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function Header({ onNav, onCategory, onSearchClick }) {
  const { totals, setOpen, bump } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [drop, setDrop] = useState(false)

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20)
    f(); window.addEventListener('scroll', f)
    return () => window.removeEventListener('scroll', f)
  }, [])

  const go = (id) => { setMenu(false); onNav(id) }

  return (
    <header className={'header' + (scrolled ? ' is-scrolled' : '')}>
      <div className="header__bar container">
        <Logo onClick={() => go('top')} />

        <nav className={'nav' + (menu ? ' is-open' : '')} aria-label="Điều hướng chính">
          <a href="#top" onClick={(e) => { e.preventDefault(); go('top') }} className="nav__link is-active">Trang chủ</a>
          <a href="#about" onClick={(e) => { e.preventDefault(); go('about') }} className="nav__link">Giới thiệu</a>
          <div className="nav__drop" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button className="nav__link" onClick={() => setDrop((d) => !d)} aria-expanded={drop}>
              Thức ăn <Icon name="chevDown" size={16} />
            </button>
            <div className={'drop' + (drop ? ' is-open' : '')}>
              {CATEGORIES.map((c) => (
                <button key={c.id} className="drop__item" onClick={() => { setDrop(false); setMenu(false); onCategory(c.id) }}>
                  <span className="drop__dot" style={{ background: c.bg }} />
                  Cho {c.name.toLowerCase()}
                  <small>{c.count}</small>
                </button>
              ))}
            </div>
          </div>
          <a href="#offer" onClick={(e) => { e.preventDefault(); go('offer') }} className="nav__link">Khuyến mãi</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); go('contact') }} className="nav__link">Liên hệ</a>
        </nav>

        <div className="header__actions">
          <button className="icon-btn" aria-label="Tìm kiếm" onClick={onSearchClick}><Icon name="search" /></button>
          <button className="icon-btn hide-sm" aria-label="Yêu thích"><Icon name="heart" /></button>
          <button className="icon-btn cart-btn" aria-label="Giỏ hàng" onClick={() => setOpen(true)}>
            <Icon name="bag" />
            {totals.count > 0 && <span key={bump} className="cart-btn__badge">{totals.count}</span>}
          </button>
          <button className="btn btn--primary btn--sm hide-sm">Đăng ký</button>
          <button className="icon-btn show-sm" aria-label="Menu" onClick={() => setMenu((m) => !m)}>
            <Icon name={menu ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
    </header>
  )
}
