import { useEffect, useState } from 'react'
import Logo from '../components/Logo.jsx'
import AnimatedDog from '../components/AnimatedDog.jsx'
import { Icon } from '../components/Icons.jsx'
import { CartLine, Summary, VoucherBox } from '../components/CartDrawer.jsx'
import { formatVND } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

const SHIP = [
  { id: 'std', name: 'Giao tiêu chuẩn', note: '2–3 ngày', fee: 0, ic: 'truck' },
  { id: 'fast', name: 'Hoả tốc 2 giờ', note: 'Nội thành TP.HCM', fee: 25000, ic: 'bolt' },
]
const PAY = [
  { id: 'cod', name: 'Thanh toán khi nhận hàng', note: 'COD', ic: 'cash' },
  { id: 'card', name: 'Thẻ ATM / Visa / Master', note: 'Bảo mật 3D Secure', ic: 'card' },
  { id: 'wallet', name: 'Ví điện tử', note: 'MoMo · ZaloPay · ShopeePay', ic: 'wallet' },
  { id: 'bank', name: 'Chuyển khoản QR', note: 'Quét mã mọi ngân hàng', ic: 'qr' },
]
const CITIES = ['TP. Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Cần Thơ', 'Bình Dương', 'Đồng Nai', 'Khánh Hoà']

export default function Checkout({ onBack }) {
  const { items, totals, clear } = useCart()
  const [ship, setShip] = useState('std')
  const [pay, setPay] = useState('cod')
  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', city: CITIES[0], district: '', note: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(null)

  useEffect(() => { window.scrollTo(0, 0) }, [done])

  const fee = SHIP.find((s) => s.id === ship).fee
  const grand = totals.total + fee
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = (e) => {
    e.preventDefault()
    const er = {}
    if (!form.name.trim()) er.name = 'Vui lòng nhập họ tên'
    if (!/^0\d{9}$/.test(form.phone.replace(/\s/g, ''))) er.phone = 'Số điện thoại gồm 10 số, bắt đầu bằng 0'
    if (!form.address.trim()) er.address = 'Vui lòng nhập địa chỉ'
    setErrors(er)
    if (Object.keys(er).length) return
    setLoading(true)
    setTimeout(() => {
      setDone({
        code: 'CMN-' + Math.floor(100000 + Math.random() * 900000),
        total: grand, count: totals.count, name: form.name, phone: form.phone,
        address: `${form.address}, ${form.district ? form.district + ', ' : ''}${form.city}`,
        ship: SHIP.find((s) => s.id === ship).name, pay: PAY.find((p) => p.id === pay).name,
      })
      setLoading(false)
      clear()
    }, 1300)
  }

  return (
    <div className="checkout">
      <header className="co-head">
        <div className="container co-head__bar">
          <Logo onClick={onBack} />
          <ol className="steps">
            <li className="is-done"><span><Icon name="check" size={14} /></span> Giỏ hàng</li>
            <li className={done ? 'is-done' : 'is-active'}><span>{done ? <Icon name="check" size={14} /> : 2}</span> Thanh toán</li>
            <li className={done ? 'is-active' : ''}><span>3</span> Hoàn tất</li>
          </ol>
          <span className="co-head__secure"><Icon name="shield" size={18} /> Bảo mật SSL</span>
        </div>
      </header>

      {done ? (
        <div className="container success">
          <div className="success__card">
            <div className="success__dog"><AnimatedDog /></div>
            <div className="success__body">
              <span className="success__check"><Icon name="check" size={30} sw={2.6} /></span>
              <h1>Đặt hàng thành công!</h1>
              <p>Cảm ơn <b>{done.name}</b>, boss nhà bạn sắp có bữa ngon rồi. Tụi mình sẽ gọi xác nhận qua số <b>{done.phone}</b>.</p>
              <dl className="success__info">
                <div><dt>Mã đơn hàng</dt><dd>{done.code}</dd></div>
                <div><dt>Số sản phẩm</dt><dd>{done.count}</dd></div>
                <div><dt>Giao hàng</dt><dd>{done.ship}</dd></div>
                <div><dt>Thanh toán</dt><dd>{done.pay}</dd></div>
                <div className="wide"><dt>Địa chỉ</dt><dd>{done.address}</dd></div>
                <div className="wide total-row"><dt>Tổng thanh toán</dt><dd>{formatVND(done.total)}</dd></div>
              </dl>
              <div className="success__actions">
                <button className="btn btn--primary" onClick={onBack}>Tiếp tục mua sắm</button>
                <button className="btn btn--ghost">Theo dõi đơn hàng</button>
              </div>
            </div>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="container co-empty">
          <h2>Giỏ hàng trống</h2>
          <p>Thêm vài món ngon cho boss trước khi thanh toán nhé.</p>
          <button className="btn btn--primary" onClick={onBack}><Icon name="arrowLeft" size={18} /> Quay lại cửa hàng</button>
        </div>
      ) : (
        <form className="container co-grid" onSubmit={submit} noValidate>
          <div className="co-main">
            <button type="button" className="btn btn--link co-back" onClick={onBack}><Icon name="arrowLeft" size={16} /> Tiếp tục mua sắm</button>

            <section className="panel">
              <h2><span className="num">1</span> Thông tin nhận hàng</h2>
              <div className="fields">
                <Field label="Họ và tên *" error={errors.name}><input value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A" /></Field>
                <Field label="Số điện thoại *" error={errors.phone}><input value={form.phone} onChange={set('phone')} placeholder="0901 234 567" inputMode="tel" /></Field>
                <Field label="Email" wide><input value={form.email} onChange={set('email')} placeholder="ban@email.com" type="email" /></Field>
                <Field label="Tỉnh / Thành phố">
                  <select value={form.city} onChange={set('city')}>{CITIES.map((c) => <option key={c}>{c}</option>)}</select>
                </Field>
                <Field label="Quận / Huyện"><input value={form.district} onChange={set('district')} placeholder="Quận 1" /></Field>
                <Field label="Địa chỉ cụ thể *" wide error={errors.address}><input value={form.address} onChange={set('address')} placeholder="Số nhà, tên đường, phường" /></Field>
                <Field label="Ghi chú cho shipper" wide><textarea rows={2} value={form.note} onChange={set('note')} placeholder="VD: Gọi trước khi giao, nhà có chó dữ 🐶" /></Field>
              </div>
            </section>

            <section className="panel">
              <h2><span className="num">2</span> Phương thức giao hàng</h2>
              <div className="radios radios--2">
                {SHIP.map((s) => (
                  <label key={s.id} className={'radio' + (ship === s.id ? ' is-active' : '')}>
                    <input type="radio" name="ship" checked={ship === s.id} onChange={() => setShip(s.id)} />
                    <span className="radio__ic"><Icon name={s.ic} size={20} /></span>
                    <span className="radio__txt"><b>{s.name}</b><small>{s.note}</small></span>
                    <span className="radio__fee">{s.fee ? '+' + formatVND(s.fee) : totals.shipping ? formatVND(totals.shipping) : 'Miễn phí'}</span>
                  </label>
                ))}
              </div>
            </section>

            <section className="panel">
              <h2><span className="num">3</span> Phương thức thanh toán</h2>
              <div className="radios">
                {PAY.map((p) => (
                  <label key={p.id} className={'radio' + (pay === p.id ? ' is-active' : '')}>
                    <input type="radio" name="pay" checked={pay === p.id} onChange={() => setPay(p.id)} />
                    <span className="radio__ic"><Icon name={p.ic} size={20} /></span>
                    <span className="radio__txt"><b>{p.name}</b><small>{p.note}</small></span>
                    <span className="radio__dot" />
                  </label>
                ))}
              </div>

              {pay === 'card' && (
                <div className="fields pay-extra">
                  <Field label="Số thẻ" wide><input placeholder="1234 5678 9012 3456" inputMode="numeric" /></Field>
                  <Field label="Ngày hết hạn"><input placeholder="MM/YY" /></Field>
                  <Field label="CVV"><input placeholder="•••" /></Field>
                </div>
              )}
              {(pay === 'bank' || pay === 'wallet') && (
                <div className="qrbox pay-extra">
                  <FakeQR />
                  <div>
                    <b>{pay === 'bank' ? 'Quét mã bằng app ngân hàng' : 'Mở ví và quét mã'}</b>
                    <p>Số tiền: <b>{formatVND(grand)}</b><br />Nội dung: <code>CAMINE {form.phone || 'SĐT'}</code></p>
                    <small>Mã QR sẽ được tạo chính thức sau khi bấm Đặt hàng.</small>
                  </div>
                </div>
              )}
            </section>
          </div>

          <aside className="co-side">
            <div className="panel panel--sticky">
              <h2>Đơn hàng <span className="muted">({totals.count} sản phẩm)</span></h2>
              <ul className="co-lines">{items.map((i) => <CartLine key={i.key} item={i} compact />)}</ul>
              <VoucherBox />
              <Summary />
              {fee > 0 && <dl className="summary"><div><dt>Phụ phí hoả tốc</dt><dd>{formatVND(fee)}</dd></div></dl>}
              <div className="total"><span>Tổng thanh toán</span><b>{formatVND(grand)}</b></div>
              <button className="btn btn--primary btn--block" type="submit" disabled={loading}>
                {loading ? <span className="spinner" /> : <>Đặt hàng <Icon name="arrowRight" size={18} /></>}
              </button>
              <p className="fine">Bằng việc đặt hàng, bạn đồng ý với Điều khoản dịch vụ của Camine.</p>
            </div>
          </aside>
        </form>
      )}
    </div>
  )
}

function Field({ label, error, wide, children }) {
  return (
    <label className={'field' + (wide ? ' field--wide' : '') + (error ? ' has-error' : '')}>
      <span>{label}</span>
      {children}
      {error && <small>{error}</small>}
    </label>
  )
}

function FakeQR() {
  // mã QR minh hoạ (không quét được)
  const cells = []
  let seed = 7
  for (let y = 0; y < 21; y++) for (let x = 0; x < 21; x++) {
    seed = (seed * 9301 + 49297) % 233280
    const finder = (x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)
    if (!finder && seed / 233280 > 0.52) cells.push(<rect key={x + '-' + y} x={x} y={y} width="1" height="1" />)
  }
  const F = ({ x, y }) => <g><rect x={x} y={y} width="7" height="7" /><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" /><rect x={x + 2} y={y + 2} width="3" height="3" /></g>
  return (
    <svg viewBox="-1 -1 23 23" className="qr" aria-hidden>
      <rect x="-1" y="-1" width="23" height="23" fill="#fff" />
      <g fill="#4A2618">{cells}<F x={0} y={0} /><F x={14} y={0} /><F x={0} y={14} /></g>
    </svg>
  )
}
