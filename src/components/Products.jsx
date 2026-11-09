import { useEffect, useMemo, useRef, useState } from 'react'
import ProductImage from './ProductImage.jsx'
import { Icon, Stars } from './Icons.jsx'
import { PRODUCTS, CATEGORIES, formatVND } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export const petLabel = (p) => {
  const pets = p.pets || [p.pet]
  return pets.length > 1 ? 'Chó & mèo' : pets[0] === 'dog' ? 'Cho chó' : 'Cho mèo'
}

const tintOf = (hex) => (hex === '#FFF8E7' ? '#F3E6CC' : hex + '24')

export function ProductCard({ p, onOpen }) {
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
    <article className="pcard" onClick={() => onOpen(p)} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onOpen(p)}>
      <div className="pcard__media" style={{ '--tint': tintOf(p.color) }}>
        {p.badge && <span className={'pcard__badge' + (p.badge.startsWith('-') ? ' is-sale' : '')}>{p.badge}</span>}
        <button className={'pcard__like' + (liked ? ' is-on' : '')} aria-label="Yêu thích"
          onClick={(e) => { e.stopPropagation(); setLiked((l) => !l) }}>
          <Icon name="heart" size={17} />
        </button>
        <div className={'pcard__shot' + (p.image ? ' is-photo' : '')}><ProductImage product={p} size={150} /></div>
        <span className="pcard__quick"><Icon name="eye" size={15} /> Xem nhanh</span>
      </div>
      <div className="pcard__body">
        <span className="pcard__pet">{petLabel(p)} · {p.weights[0].label}</span>
        <h3 className="pcard__name">{p.name}</h3>
        {p.image && <span className="pcard__line">{p.line.charAt(0) + p.line.slice(1).toLowerCase()}</span>}
        <div className="pcard__meta"><Stars value={p.rating} size={12} /> <small>{p.rating} ({p.reviews})</small></div>
        <div className="pcard__foot">
          <div className="pcard__price">
            <b>{formatVND(p.price)}</b>
            {p.oldPrice && <s>{formatVND(p.oldPrice)}</s>}
          </div>
          <button className={'pcard__add' + (added ? ' is-added' : '')} onClick={handleAdd} aria-label="Thêm vào giỏ">
            <Icon name={added ? 'check' : 'plus'} size={18} sw={2.4} />
          </button>
        </div>
      </div>
    </article>
  )
}

/* ================= NEW COLLECTION + trình chiếu sản phẩm bán chạy ================= */
export function Collection({ onOpen, onViewAll }) {
  const track = useRef(null)
  const list = PRODUCTS.filter((p) => p.best)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const el = track.current
    if (!el) return
    const f = () => {
      const card = el.firstElementChild
      if (!card) return
      setIdx(Math.round(el.scrollLeft / (card.offsetWidth + 22)))
    }
    el.addEventListener('scroll', f, { passive: true })
    return () => el.removeEventListener('scroll', f)
  }, [])

  const go = (dir) => {
    const el = track.current
    const card = el.firstElementChild
    el.scrollBy({ left: dir * (card.offsetWidth + 22), behavior: 'smooth' })
  }

  return (
    <section className="section collection" id="best">
      <div className="container">
        <div className="collection__intro">
          <div className="reveal">
            <span className="eyebrow">New</span>
            <h2 className="collection__title display">Bộ sưu tập</h2>
          </div>
          <p className="reveal">
            Ghé vào căn bếp nhỏ của Canimé, nơi ức gà, cá hồi, phô mai và bí đỏ được sấy thành những viên bánh thưởng nhỏ xinh,
            đựng trong hũ thuỷ tinh có thẻ tên viết tay.
          </p>
          <div className="reveal">
            <p>Năm vị Chicko, Salmie, Chezz, Mixie và Pumpi — 100% nguyên liệu thật, không phẩm màu, không chất bảo quản nhân tạo.</p>
            <button className="btn btn--cyan btn--sm" onClick={onViewAll}>Tìm hiểu thêm</button>
          </div>
        </div>

        <div className="slides reveal">
          <div className="slides__track" ref={track}>
            {list.map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
          </div>
          <div className="slides__ctrl">
            <button className="slides__btn" onClick={() => go(-1)} aria-label="Trước"><Icon name="arrowLeft" size={18} /></button>
            <span className="slides__count display">{String(Math.min(idx + 1, list.length)).padStart(2, '0')} <i>/</i> {String(list.length).padStart(2, '0')}</span>
            <button className="slides__btn" onClick={() => go(1)} aria-label="Sau"><Icon name="arrowRight" size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ================= Cửa hàng ================= */
export function Shop({ onOpen, query, setQuery, pet, setPet }) {
  const [sort, setSort] = useState('pop')
  const [limit, setLimit] = useState(8)

  const list = useMemo(() => {
    const q = query.trim().toLowerCase()
    let l = PRODUCTS.filter((p) =>
      (pet === 'all' || (p.pets || [p.pet]).includes(pet)) &&
      (!q || (p.name + ' ' + p.short).toLowerCase().includes(q))
    )
    if (sort === 'asc') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'desc') l = [...l].sort((a, b) => b.price - a.price)
    if (sort === 'rate') l = [...l].sort((a, b) => b.rating - a.rating)
    return l
  }, [query, pet, sort])

  const petName = CATEGORIES.find((c) => c.id === pet)?.name

  return (
    <section className="section shop" id="shop">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <span className="eyebrow">Cửa hàng</span>
            <h2 className="h2 display">Có sẵn tại tiệm</h2>
          </div>
          <select className="select" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sắp xếp">
            <option value="pop">Phổ biến</option>
            <option value="rate">Đánh giá cao</option>
            <option value="asc">Giá thấp → cao</option>
            <option value="desc">Giá cao → thấp</option>
          </select>
        </div>

        <div className="filters">
          <div className="tabs">
            {[{ id: 'all', name: 'Tất cả' }, ...CATEGORIES.map((c) => ({ id: c.id, name: 'Cho ' + c.name.toLowerCase() }))].map((t) => (
              <button key={t.id} className={'tab' + (pet === t.id ? ' is-active' : '')} onClick={() => setPet(t.id)}>{t.name}</button>
            ))}
          </div>
          <div className="chips">
            {query && <button className="chip" onClick={() => setQuery('')}>“{query}” <Icon name="close" size={14} /></button>}
            <span className="filters__count">{list.length} sản phẩm{petName ? ' cho ' + petName.toLowerCase() : ''}</span>
          </div>
        </div>

        {list.length ? (
          <div className="grid">
            {list.slice(0, limit).map((p) => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
          </div>
        ) : (
          <div className="empty">
            <Icon name="search" size={36} />
            <p>Chưa có món nào hợp. Thử từ khoá khác nhé!</p>
            <button className="btn btn--ghost btn--sm" onClick={() => { setQuery(''); setPet('all') }}>Xoá bộ lọc</button>
          </div>
        )}
        {list.length > limit && (
          <div className="more">
            <button className="btn btn--ghost" onClick={() => setLimit((l) => l + 8)}>Xem thêm {list.length - limit} sản phẩm <Icon name="chevDown" size={16} /></button>
          </div>
        )}
      </div>
    </section>
  )
}
