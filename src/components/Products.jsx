import { useMemo, useRef, useState } from 'react'
import PackShot from './PackShot.jsx'
import { Icon, Stars } from './Icons.jsx'
import { PRODUCTS, TYPES, CATEGORIES, formatVND } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

const tint = (hex) => hex + '22'

export function ProductCard({ p, onOpen, variant = 'tile' }) {
  const { add } = useCart()
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    add(p)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className={'pcard pcard--' + variant} onClick={() => onOpen(p)} tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(p)}>
      <div className="pcard__media" style={{ '--tint': p.color === '#FFF8E7' ? '#F3E6CC' : tint(p.color) }}>
        {p.badge && <span className={'pcard__badge' + (p.badge.startsWith('-') ? ' is-sale' : '')}>{p.badge}</span>}
        <button className={'pcard__like' + (liked ? ' is-on' : '')} aria-label="Yêu thích"
          onClick={(e) => { e.stopPropagation(); setLiked((l) => !l) }}>
          <Icon name="heart" size={18} />
        </button>
        <div className="pcard__shot"><PackShot product={p} size={variant === 'round' ? 104 : 140} /></div>
        <span className="pcard__quick"><Icon name="eye" size={16} /> Xem nhanh</span>
      </div>
      <div className="pcard__body">
        <h3 className="pcard__name">{p.name}</h3>
        <div className="pcard__meta"><Stars value={p.rating} size={13} /> <small>({p.reviews})</small><small className="dotsep">Đã bán {p.sold}</small></div>
        <div className="pcard__foot">
          <div className="pcard__price">
            <b>{formatVND(p.price)}</b>
            {p.oldPrice ? <s>{formatVND(p.oldPrice)}</s> : <s className="is-empty">&nbsp;</s>}
          </div>
          <button className={'pcard__add' + (added ? ' is-added' : '')} onClick={handleAdd} aria-label="Thêm vào giỏ">
            <Icon name={added ? 'check' : 'cart'} size={18} />
          </button>
        </div>
      </div>
    </article>
  )
}

export function BestSeller({ onOpen, onViewAll }) {
  const track = useRef(null)
  const list = PRODUCTS.filter((p) => p.best)
  const scroll = (dir) => {
    const el = track.current
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: 'smooth' })
  }
  return (
    <section className="section" id="best">
      <div className="container">
        <div className="section-head">
          <h2 className="h2">BÁN <span>CHẠY NHẤT</span></h2>
          <button className="btn btn--ghost btn--sm" onClick={onViewAll}>Xem tất cả <Icon name="chevRight" size={16} /></button>
        </div>
        <div className="carousel">
          <button className="carousel__btn carousel__btn--l" onClick={() => scroll(-1)} aria-label="Trước"><Icon name="chevLeft" /></button>
          <div className="carousel__track" ref={track}>
            {list.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
          </div>
          <button className="carousel__btn carousel__btn--r" onClick={() => scroll(1)} aria-label="Sau"><Icon name="chevRight" /></button>
        </div>
      </div>
    </section>
  )
}

export function PetFood({ onOpen, query, setQuery, pet, setPet }) {
  const [type, setType] = useState('all')
  const [sort, setSort] = useState('pop')
  const [limit, setLimit] = useState(8)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let l = PRODUCTS.filter((p) =>
      (pet === 'all' || p.pet === pet) &&
      (type === 'all' || p.type === type) &&
      (!q || (p.name + ' ' + p.short).toLowerCase().includes(q))
    )
    if (sort === 'asc') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'desc') l = [...l].sort((a, b) => b.price - a.price)
    if (sort === 'rate') l = [...l].sort((a, b) => b.rating - a.rating)
    return l
  }, [query, pet, type, sort])

  const petName = CATEGORIES.find((c) => c.id === pet)?.name

  return (
    <section className="section section--alt" id="food">
      <div className="container">
        <div className="section-head">
          <h2 className="h2">THỨC ĂN <span>CHO BÉ</span></h2>
          <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sắp xếp">
            <option value="pop">Phổ biến</option>
            <option value="rate">Đánh giá cao</option>
            <option value="asc">Giá thấp → cao</option>
            <option value="desc">Giá cao → thấp</option>
          </select>
        </div>

        <div className="filters">
          <div className="tabs">
            {TYPES.map((t) => (
              <button key={t.id} className={'tab' + (type === t.id ? ' is-active' : '')} onClick={() => setType(t.id)}>{t.name}</button>
            ))}
          </div>
          <div className="chips">
            {pet !== 'all' && <button className="chip" onClick={() => setPet('all')}>Cho {petName?.toLowerCase()} <Icon name="close" size={14} /></button>}
            {query && <button className="chip" onClick={() => setQuery('')}>“{query}” <Icon name="close" size={14} /></button>}
            <span className="filters__count">{list.length} sản phẩm</span>
          </div>
        </div>

        {list.length ? (
          <div className="grid">
            {list.slice(0, limit).map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} variant="round" />)}
          </div>
        ) : null}
        {list.length > limit && (
          <div className="more">
            <button className="btn btn--ghost" onClick={() => setLimit((l) => l + 8)}>Xem thêm {list.length - limit} sản phẩm <Icon name="chevDown" size={16} /></button>
          </div>
        )}
        {list.length ? null : (
          <div className="empty">
            <Icon name="search" size={36} />
            <p>Chưa có sản phẩm phù hợp. Thử từ khoá khác nhé!</p>
            <button className="btn btn--ghost btn--sm" onClick={() => { setQuery(''); setPet('all'); setType('all') }}>Xoá bộ lọc</button>
          </div>
        )}
      </div>
    </section>
  )
}
