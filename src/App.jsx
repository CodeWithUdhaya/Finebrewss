import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer } from './components.jsx'
import { Home, MenuPage, Stores, Franchise, Contact } from './pages.jsx'

export default function App() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 60)
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return (<><Header /><main>
    <Routes>
      <Route path="/" element={<Home />} /><Route path="/menu" element={<MenuPage />} />
      <Route path="/stores" element={<Stores />} /><Route path="/franchise" element={<Franchise />} />
      <Route path="/contact" element={<Contact />} />
    </Routes></main><Footer /></>)
}
