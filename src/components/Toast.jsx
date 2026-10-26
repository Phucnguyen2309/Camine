import PackShot from './PackShot.jsx'
import { Icon } from './Icons.jsx'
import { useCart } from '../context/CartContext.jsx'

export default function Toast() {
  const { toast, setToast, open, setOpen } = useCart()
  if (!toast || open) return null
  return (
    <div className="toast" role="status">
      <span className="toast__img"><PackShot product={toast.product} size={40} /></span>
      <div>
        <b><Icon name="check" size={14} /> Đã thêm vào giỏ</b>
        <small>{toast.name} · {toast.weight}</small>
      </div>
      <button onClick={() => { setToast(null); setOpen(true) }}>Xem giỏ</button>
    </div>
  )
}
