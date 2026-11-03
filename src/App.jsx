import { useCallback, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import { Promos, DreamBanner, Categories, Story, Process, Blog, ChatBubble } from './components/HomeSections.jsx'
import { Collection, Shop } from './components/Products.jsx'
import { Marquee, useReveal } from './components/Decor.jsx'
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
  const { setToast } = useCart()

  useReveal(page)

  const scrollTo = (id) => {
    const go = () => {
      if (id === 'top') return window.scrollTo({ top: 0, behavior: 'smooth' })
      const el = document.getElementById(id)
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
    }
    if (page !== 'home') { setPage('home'); setTimeout(go, 80) } else go()
  }

  const closeModal = useCallback(() => setProduct(null), [])
  const toCheckout = () => { setProduct(null); setToast(null); setPage('checkout'); window.scrollTo(0, 0) }
  const toHome = () => { setPage('home'); window.scrollTo(0, 0) }
  const pickPet = (c) => { setPet(c); scrollTo('shop') }

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
      <Header onNav={scrollTo} onCategory={pickPet} query={query} setQuery={setQuery} onSearch={() => scrollTo('shop')} />
      <main>
        <Hero onShop={() => scrollTo('shop')} onOffer={() => scrollTo('offer')} />
        <Marquee items={['Canimé']} bg="#9B111E" fg="#FFF8E7" star="#FFC000" />
        <Promos onShop={() => scrollTo('shop')} />
        <Marquee items={['Bữa ngon mới']} bg="#FFC000" fg="#3B1F14" star="#9B111E" reverse speed="38s" />
        <Collection onOpen={setProduct} onViewAll={() => { setPet('all'); setQuery(''); scrollTo('shop') }} />
        <DreamBanner />
        <Categories active={pet} onPick={pickPet} />
        <Shop onOpen={setProduct} query={query} setQuery={setQuery} pet={pet} setPet={setPet} />
        <Story />
        <Process />
        <Blog />
      </main>
      <Footer onNav={scrollTo} />

      <ChatBubble />
      <ProductModal product={product} onClose={closeModal} onOpen={setProduct} onBuyNow={toCheckout} />
      <CartDrawer onCheckout={toCheckout} onShop={() => scrollTo('shop')} />
      <Toast />
    </>
  )
}
