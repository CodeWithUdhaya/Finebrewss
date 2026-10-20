import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Header, Footer } from './components.jsx'
import { Home, MenuPage, Stores, Franchise, Contact } from './pages.jsx'

export default function App() {
 const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (hash) {
      // smooth scroll to the section (re-runs on every click via `key`)
      const t = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0, behavior: 'auto' }) // new page starts at the top
  }, [pathname, hash, key])

  return (
  <>
  <Header />
  <main>
    <Routes>
      <Route path="/" element={<Home />} /><Route path="/menu" element={<MenuPage />} />
      <Route path="/stores" element={<Stores />} /><Route path="/franchise" element={<Franchise />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </main>
    <Footer />
    </>)
}
