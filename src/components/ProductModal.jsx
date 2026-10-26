import { useEffect, useState } from 'react'
import PackShot from './PackShot.jsx'
import { Icon, Stars } from './Icons.jsx'
import { PRODUCTS, REVIEWS, CATEGORIES, formatVND } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductModal({ product, onClose, onOpen, onBuyNow }) {
  const { add } = useCart()
  const [view, setView] = useState('front')
  const [wi, setWi] = useState(0)
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState('desc')

  useEffect(() => { setView('front'); setWi(0); setQty(1); setTab('desc') }, [product?.id])

  useEffect(() => {
    if (!product) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey) }
  }, [product, onClose])

  if (!product) return null
  const p = product
  const weight = p.weights[wi]
  const ratio = weight.price / p.price
  const related = PRODUCTS.filter((x) => x.pet === p.pet && x.id !== p.id).slice(0, 4)
  const cat = CATEGORIES.find((c) => c.id === p.pet)

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" aria-label={p.name} onClick={(e) => e.stopPropagation()}>
        <button className="modal__close icon-btn" onClick={onClose} aria-label="Đóng"><Icon name="close" /></button>

        <div className="modal__grid">
          <div className="gallery">
            <div className="gallery__main" style={{ '--tint': p.color === '#FFF8E7' ? '#F3E6CC' : p.color + '26' }}>
              {p.badge && <span className="pcard__badge">{p.badge}</span>}
              <div key={view} className="gallery__img"><PackShot product={p} view={view} size={260} weight={weight.label} /></div>
            </div>
            <div className="gallery__thumbs">
              {['front', 'kibble', 'facts'].map((v) => (
                <button key={v} className={'thumb' + (view === v ? ' is-active' : '')} onClick={() => setView(v)} aria-label={v}>
                  <PackShot product={p} view={v} size={62} />
                </button>
              ))}
            </div>
          </div>

          <div className="detail">
            <span className="detail__cat">Cho {cat?.name.toLowerCase()} · {p.line}</span>
            <h2 className="detail__name">{p.name}</h2>
            <div className="detail__meta">
              <Stars value={p.rating} /> <b>{p.rating}</b>
              <span className="dotsep">{p.reviews} đánh giá</span>
              <span className="dotsep">Đã bán {p.sold}</span>
            </div>

            <div className="detail__price">
              <b>{formatVND(weight.price)}</b>
              {p.oldPrice && <s>{formatVND(Math.round((p.oldPrice * ratio) / 1000) * 1000)}</s>}
              {p.oldPrice && <span className="save">-{Math.round((1 - p.price / p.oldPrice) * 100)}%</span>}
            </div>

            <div className="detail__block">
              <span className="label">Quy cách</span>
              <div className="opts">
                {p.weights.map((wt, i) => (
                  <button key={wt.label} className={'opt' + (i === wi ? ' is-active' : '')} onClick={() => setWi(i)}>
                    {wt.label}<small>{formatVND(wt.price)}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="detail__block detail__buy">
              <div className="qty">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Giảm"><Icon name="minus" size={16} /></button>
                <span>{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Tăng"><Icon name="plus" size={16} /></button>
              </div>
              <button className="btn btn--primary btn--grow" onClick={() => add(p, weight, qty)}>
                <Icon name="cart" size={18} /> Thêm vào giỏ · {formatVND(weight.price * qty)}
              </button>
              <button className="btn btn--yellow" onClick={() => { add(p, weight, qty); onBuyNow() }}>Mua ngay</button>
            </div>

            <ul className="perks">
              <li><Icon name="truck" size={18} /> Giao 2h nội thành · Miễn phí đơn từ 499.000đ</li>
              <li><Icon name="refresh" size={18} /> Bé không hợp? Đổi miễn phí trong 30 ngày</li>
              <li><Icon name="shield" size={18} /> Hàng chính hãng, có tem truy xuất nguồn gốc</li>
            </ul>

            <div className="dtabs">
              {[['desc', 'Mô tả'], ['ing', 'Thành phần'], ['rev', `Đánh giá (${p.reviews})`]].map(([k, l]) => (
                <button key={k} className={'dtab' + (tab === k ? ' is-active' : '')} onClick={() => setTab(k)}>{l}</button>
              ))}
            </div>
            <div className="dtab__panel">
              {tab === 'desc' && <p>{p.desc}</p>}
              {tab === 'ing' && (
                <ul className="ings">{p.ingredients.map((i) => <li key={i}><Icon name="leaf" size={14} /> {i}</li>)}</ul>
              )}
              {tab === 'rev' && (
                <div className="reviews">
                  {REVIEWS.map((r) => (
                    <div className="review" key={r.name}>
                      <span className="review__av">{r.name[0]}</span>
                      <div>
                        <b>{r.name}</b> <small>{r.pet}</small>
                        <Stars value={r.stars} size={12} />
                        <p>{r.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="related">
            <h3>Có thể bé cũng thích</h3>
            <div className="related__row">
              {related.map((r) => (
                <button key={r.id} className="mini" onClick={() => onOpen(r)}>
                  <span className="mini__img" style={{ background: r.color === '#FFF8E7' ? '#F3E6CC' : r.color + '22' }}><PackShot product={r} size={58} /></span>
                  <span className="mini__txt"><b>{r.short}</b><small>{formatVND(r.price)}</small></span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
