import { useEffect, useState } from 'react'
import PackShot from './PackShot.jsx'
import PetArt from './PetArt.jsx'
import { Icon } from './Icons.jsx'
import { formatVND } from '../data/products.js'
import { useCart, FREE_SHIP_FROM, VOUCHERS } from '../context/CartContext.jsx'

export function VoucherBox() {
  const { voucher, setVoucher } = useCart()
  const [code, setCode] = useState('')
  const [err, setErr] = useState('')
  const apply = (e) => {
    e.preventDefault()
    const c = code.trim().toUpperCase()
    if (VOUCHERS[c]) { setVoucher(c); setErr(''); setCode('') }
    else setErr('Mã không hợp lệ. Thử CANIME30 hoặc BOSS50K')
  }
  if (voucher) {
    return (
      <div className="voucher voucher--on">
        <Icon name="tag" size={16} /> <b>{voucher}</b> <span>{VOUCHERS[voucher].label}</span>
        <button onClick={() => setVoucher(null)} aria-label="Bỏ mã"><Icon name="close" size={14} /></button>
      </div>
    )
  }
  return (
    <form className="voucher" onSubmit={apply}>
      <Icon name="tag" size={16} />
      <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Nhập mã giảm giá" aria-label="Mã giảm giá" />
      <button type="submit">Áp dụng</button>
      {err && <small className="voucher__err">{err}</small>}
    </form>
  )
}

export function Summary() {
  const { totals } = useCart()
  return (
    <dl className="summary">
      <div><dt>Tạm tính</dt><dd>{formatVND(totals.subtotal)}</dd></div>
      {totals.discount > 0 && <div className="is-discount"><dt>Giảm giá</dt><dd>-{formatVND(totals.discount)}</dd></div>}
      <div><dt>Phí giao hàng</dt><dd>{totals.shipping ? formatVND(totals.shipping) : 'Miễn phí'}</dd></div>
    </dl>
  )
}

export function CartLine({ item, compact }) {
  const { inc, dec, remove } = useCart()
  return (
    <li className="line">
      <span className="line__img" style={{ background: item.product.color === '#FFF8E7' ? '#F3E6CC' : item.product.color + '22' }}>
        <PackShot product={item.product} size={compact ? 46 : 58} />
      </span>
      <div className="line__info">
        <b>{item.name}</b>
        <small>{item.weight} · {formatVND(item.price)}</small>
        {!compact ? (
          <div className="line__ctrl">
            <div className="qty qty--sm">
              <button onClick={() => dec(item.key)} aria-label="Giảm"><Icon name="minus" size={14} /></button>
              <span>{item.qty}</span>
              <button onClick={() => inc(item.key)} aria-label="Tăng"><Icon name="plus" size={14} /></button>
            </div>
            <button className="line__rm" onClick={() => remove(item.key)} aria-label="Xoá"><Icon name="trash" size={16} /></button>
          </div>
        ) : <small>SL: {item.qty}</small>}
      </div>
      <b className="line__total">{formatVND(item.price * item.qty)}</b>
    </li>
  )
}

export default function CartDrawer({ onCheckout, onShop }) {
  const { items, totals, open, setOpen } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  const remain = Math.max(0, FREE_SHIP_FROM - totals.subtotal)
  const pct = Math.min(100, (totals.subtotal / FREE_SHIP_FROM) * 100)

  return (
    <>
      <div className={'scrim' + (open ? ' is-open' : '')} onClick={() => setOpen(false)} />
      <aside className={'drawer' + (open ? ' is-open' : '')} aria-label="Giỏ hàng" aria-hidden={!open}>
        <div className="drawer__head">
          <h3>Giỏ hàng <span>({totals.count})</span></h3>
          <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Đóng"><Icon name="close" /></button>
        </div>

        {items.length === 0 ? (
          <div className="drawer__empty">
            <PetArt kind="dog" size={130} />
            <h4>Giỏ hàng đang trống</h4>
            <p>Boss đang đói rồi kìa, chọn vài món ngon nhé!</p>
            <button className="btn btn--primary" onClick={() => { setOpen(false); onShop() }}>Mua sắm ngay</button>
          </div>
        ) : (
          <>
            <div className="ship">
              <p>{remain > 0 ? <>Mua thêm <b>{formatVND(remain)}</b> để được <b>miễn phí giao hàng</b></> : <><Icon name="truck" size={16} /> Đơn của bạn được <b>miễn phí giao hàng</b>!</>}</p>
              <div className="ship__bar"><span style={{ width: pct + '%' }} /></div>
            </div>
            <ul className="drawer__list">
              {items.map((i) => <CartLine key={i.key} item={i} />)}
            </ul>
            <div className="drawer__foot">
              <VoucherBox />
              <Summary />
              <div className="total"><span>Tổng cộng</span><b>{formatVND(totals.total)}</b></div>
              <button className="btn btn--primary btn--block" onClick={() => { setOpen(false); onCheckout() }}>
                Tiến hành thanh toán <Icon name="arrowRight" size={18} />
              </button>
              <button className="btn btn--link" onClick={() => setOpen(false)}>Tiếp tục mua sắm</button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}
