import { createContext, useContext, useMemo, useReducer, useState, useCallback, useRef } from 'react'

const CartContext = createContext(null)

export const FREE_SHIP_FROM = 499000
export const SHIP_FEE = 30000
export const VOUCHERS = {
  CANIME30: { label: 'Giảm 30% (tối đa 200.000đ)', calc: (sub) => Math.min(sub * 0.3, 200000) },
  BOSS50K: { label: 'Giảm 50.000đ cho đơn từ 300.000đ', calc: (sub) => (sub >= 300000 ? 50000 : 0) },
}

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = action.item.id + '|' + action.item.weight
      const found = state.find((i) => i.key === key)
      if (found) return state.map((i) => (i.key === key ? { ...i, qty: i.qty + action.item.qty } : i))
      return [...state, { ...action.item, key }]
    }
    case 'INC':
      return state.map((i) => (i.key === action.key ? { ...i, qty: i.qty + 1 } : i))
    case 'DEC':
      return state.map((i) => (i.key === action.key ? { ...i, qty: Math.max(1, i.qty - 1) } : i))
    case 'REMOVE':
      return state.filter((i) => i.key !== action.key)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [])
  const [open, setOpen] = useState(false)
  const [voucher, setVoucher] = useState(null)
  const [toast, setToast] = useState(null)
  const [bump, setBump] = useState(0)
  const timer = useRef()

  const add = useCallback((product, weight, qty = 1) => {
    const wt = weight || product.weights[0]
    dispatch({
      type: 'ADD',
      item: { id: product.id, name: product.name, product, weight: wt.label, price: wt.price, qty },
    })
    setBump((b) => b + 1)
    clearTimeout(timer.current)
    setToast({ name: product.short, weight: wt.label, product })
    timer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  const totals = useMemo(() => {
    const count = items.reduce((s, i) => s + i.qty, 0)
    const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0)
    const discount = voucher && VOUCHERS[voucher] ? Math.round(VOUCHERS[voucher].calc(subtotal)) : 0
    const shipping = subtotal === 0 || subtotal >= FREE_SHIP_FROM ? 0 : SHIP_FEE
    return { count, subtotal, discount, shipping, total: Math.max(0, subtotal - discount + shipping) }
  }, [items, voucher])

  const value = {
    items, totals, open, setOpen, voucher, setVoucher, toast, setToast, bump,
    add,
    inc: (key) => dispatch({ type: 'INC', key }),
    dec: (key) => dispatch({ type: 'DEC', key }),
    remove: (key) => dispatch({ type: 'REMOVE', key }),
    clear: () => { dispatch({ type: 'CLEAR' }); setVoucher(null) },
  }
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
