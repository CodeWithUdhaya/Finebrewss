/* ==========================================================================
   components.jsx
   Contains: Logo · Header · Footer · Section · PageHero · Faq
   ========================================================================== */
import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Instagram,
  Globe,
  Mail,
} from 'lucide-react'

import logo from './assets/logo.png'
import { NAV, BRAND } from './data.js'


/* ---------- Logo ---------- */
export const Logo = ({ className = '' }) => (
  <img src={logo} alt="Fine Brewss Tea logo" className={className} />
)


/* ---------- Header ---------- */
export function Header() {
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef(null)

  const close = () => {
    setOpen(false)
    setSub(null)
    document.activeElement?.blur() // stops the dropdown staying open via :focus-within
  }

  // shrink header on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // mobile menu: lock scroll, Esc, outside click, resize to desktop
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return

    const onKey = (e) => e.key === 'Escape' && close()
    const onClick = (e) => headerRef.current && !headerRef.current.contains(e.target) && close()
    const onResize = () => window.innerWidth >= 992 && close()

    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onClick)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onClick)
      window.removeEventListener('resize', onResize)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header ref={headerRef} className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="header__in">

        <Link to="/" className="header__logo" onClick={close}>
          <Logo />
          <span>Fine Brewss Tea</span>
        </Link>

        <button
          className="header__burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {NAV.map((n) => (
            <div key={n.label} className={`nav__item ${sub === n.label ? 'is-sub' : ''}`}>
              <div className="nav__row">
                <NavLink to={n.to} end onClick={close}>{n.label}</NavLink>
                <button
                  aria-label={`${n.label} submenu`}
                  aria-expanded={sub === n.label}
                  onClick={() => setSub(sub === n.label ? null : n.label)}
                >
                  <ChevronDown size={16} />
                </button>
              </div>

              <ul className="nav__sub">
                {n.subs.map(([title, id]) => (
                  <li key={id}>
                    <Link to={`${n.to}#${id}`} onClick={close}>{title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <Link to="/franchise#why" className="btn btn--gold nav__cta" onClick={close}>
            Become a Partner
          </Link>
        </nav>
      </div>
    </header>
  )
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">

        {/* Brand */}
        <div>
          <Logo className="footer__logo" />
          <p>A sip of delightfulness. Natural, authentic-tasting tea since 2023.</p>
        </div>

        {/* Page links */}
        <div>
          <h4>Explore</h4>
          {NAV.map((n) => (
            <Link key={n.label} to={n.to}>
              {n.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div>
          <h4>Reach us</h4>

          <a href={`tel:${BRAND.phone}`}>
            <Phone size={16} /> {BRAND.phone}
          </a>

          <a href={BRAND.instaUrl} target="_blank" rel="noreferrer">
            <Instagram size={16} /> {BRAND.insta}
          </a>

          <a href={`https://${BRAND.site}`} target="_blank" rel="noreferrer">
            <Globe size={16} /> {BRAND.site}
          </a>

          <a href={`mailto:${BRAND.email}`}>
            <Mail size={16} /> {BRAND.email}
          </a>
        </div>
      </div>

      <div className="footer__bar">
        © {new Date().getFullYear()} Fine Brewss Tea. All rights reserved.
      </div>
    </footer>
  )
}


/* ---------- Section wrapper (title + optional lead text) ---------- */
export const Section = ({ id, title, lead, tone = '', children }) => (
  <section id={id} className={`section ${tone}`}>
    <div className="container">
      <header className="section__head">
        <h2>{title}</h2>
        {lead && <p>{lead}</p>}
      </header>

      {children}
    </div>
  </section>
)


/* ---------- Inner page banner ---------- */
export const PageHero = ({ title, text }) => (
  <div className="phero">
    <div className="container">
      <h1>{title}</h1>
      <p>{text}</p>
    </div>
  </div>
)


/* ---------- FAQ accordion ---------- */
export const Faq = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(0) // first item open by default

  return (
    <div className="faq">
      {items.map(([question, answer], index) => (
        <div
          key={question}
          className={`faq__item ${openIndex === index ? 'is-open' : ''}`}
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            aria-expanded={openIndex === index}
          >
            {question}
            <ChevronDown size={18} />
          </button>

          {openIndex === index && <p>{answer}</p>}
        </div>
      ))}
    </div>
  )
}