import { useCallback, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import { Stats, Quote, About, Categories, Offer, Features } from './components/HomeSections.jsx'
import { BestSeller, PetFood } from './components/Products.jsx'
import Footer from './components/Footer.jsx'
import ProductModal from './components/ProductModal.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Toast from './components/Toast.jsx'
import Checkout from './pages/Checkout.jsx'
import { useCart } from './context/CartContext.jsx'

export default function App() {
  const [page, setPage] = useState('home') // 'home' | 'checkout'
  const [product, setProduct] = useState(null)
  const [query, setQuery] = useState('')
  const [pet, setPet] = useState('all')
  const searchRef = useRef(null)
  const { setToast } = useCart()

  const scrollTo = (id) => {
    const go = () => {
      if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' })
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' })
    }
    if (page !== 'home') { setPage('home'); setTimeout(go, 60) } else go()
  }

  const closeModal = useCallback(() => setProduct(null), [])
  const toCheckout = () => { setProduct(null); setToast(null); setPage('checkout'); window.scrollTo(0, 0) }
  const toHome = () => { setPage('home'); window.scrollTo(0, 0) }

  if (page === 'checkout') {
    return (
      <>
        <Checkout onBack={toHome} />
        <Toast />
      </>
    )
  }

  return (
    <>
      <Header
        onNav={scrollTo}
        onCategory={(c) => { setPet(c); scrollTo('food') }}
        onSearchClick={() => { scrollTo('top'); setTimeout(() => searchRef.current?.focus(), 400) }}
      />
      <main>
        <Hero ref={searchRef} query={query} setQuery={setQuery} onSearch={() => scrollTo('food')} />
        <Stats />
        <Quote />
        <About />
        <Categories active={pet} onPick={(c) => { setPet(c); scrollTo('food') }} />
        <BestSeller onOpen={setProduct} onViewAll={() => { setPet('all'); setQuery(''); scrollTo('food') }} />
        <PetFood onOpen={setProduct} query={query} setQuery={setQuery} pet={pet} setPet={setPet} />
        <Offer onShop={() => scrollTo('food')} />
        <Features />
      </main>
      <Footer />

      <ProductModal product={product} onClose={closeModal} onOpen={setProduct} onBuyNow={toCheckout} />
      <CartDrawer onCheckout={toCheckout} onShop={() => scrollTo('food')} />
      <Toast />
    </>
  )
}
