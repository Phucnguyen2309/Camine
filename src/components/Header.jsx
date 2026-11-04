import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { Icon } from './Icons.jsx'
import { CATEGORIES } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function Header({ onNav, onCategory, query, setQuery, onSearch }) {
  const { totals, setOpen, bump } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [menu, setMenu] = useState(false)
  const [drop, setDrop] = useState(false)
  const [search, setSearch] = useState(false)
  const inputRef = useRef(null)

  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  useEffect(() => { if (search) setTimeout(() => inputRef.current?.focus(), 60) }, [search])

  const go = (id) => { setMenu(false); setDrop(false); onNav(id) }
  const links = [['top', 'Trang chủ'], ['story', 'Câu chuyện'], ['shop', 'Cửa hàng'], ['blog', 'Góc chăm Boss'], ['contact', 'Liên hệ']]

  return (
    <header className={'header' + (scrolled || menu ? ' is-scrolled' : '')}>
      <div className="header__bar container">
        <Logo light={!scrolled && !menu} onClick={() => go('top')} />

        <nav className={'nav' + (menu ? ' is-open' : '')} aria-label="Điều hướng chính">
          {links.slice(0, 2).map(([id, label], i) => (
            <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); go(id) }} className={'nav__link' + (i === 0 ? ' is-active' : '')}>{label}</a>
          ))}
          <div className="nav__drop" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
            <button className="nav__link" onClick={() => setDrop((d) => !d)} aria-expanded={drop}>
              Thức ăn <Icon name="chevDown" size={15} />
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
          {links.slice(2).map(([id, label]) => (
            <a key={id} href={'#' + id} onClick={(e) => { e.preventDefault(); go(id) }} className="nav__link">{label}</a>
          ))}
        </nav>

        <div className="header__actions">
          <button className="hicon" aria-label="Tìm kiếm" onClick={() => setSearch((s) => !s)}><Icon name={search ? 'close' : 'search'} size={21} /></button>
          <button className="hicon hide-sm" aria-label="Tài khoản"><Icon name="user" size={21} /></button>
          <button className="hicon cart-btn" aria-label="Giỏ hàng" onClick={() => setOpen(true)}>
            <Icon name="bag" size={21} />
            <span key={bump} className={'cart-btn__badge' + (bump ? ' is-bump' : '')}>{totals.count}</span>
          </button>
          <button className="hicon show-sm" aria-label="Menu" onClick={() => setMenu((m) => !m)}>
            <Icon name={menu ? 'close' : 'menu'} size={21} />
          </button>
        </div>
      </div>

      <form
        className={'hsearch container' + (search ? ' is-open' : '')}
        role="search"
        onSubmit={(e) => { e.preventDefault(); setSearch(false); onSearch() }}
      >
        <Icon name="search" size={18} />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm vị bánh thưởng: Chicko, Cá Hồi, Phô Mai Sữa…"
          aria-label="Tìm sản phẩm"
          tabIndex={search ? 0 : -1}
        />
        <button className="btn btn--primary btn--sm" type="submit" tabIndex={search ? 0 : -1}>Tìm</button>
      </form>
    </header>
  )
}
