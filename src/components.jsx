import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, ChevronDown, Phone, Instagram, Globe, Mail } from 'lucide-react'
import logo from './assets/logo.png'
import { NAV, BRAND } from './data.js'

export const Logo = ({ className = '' }) => <img src={logo} alt="Fine Brewss Tea logo" className={className} />

export function Header() {
  const [open, setOpen] = useState(false)
  const [sub, setSub] = useState(null)
  const close = () => { setOpen(false); setSub(null) }
  return (
    <header className="header">
      <div className="container header__in">
        <Link to="/" className="header__logo" onClick={close}><Logo /><span>Fine Brewss Tea</span></Link>
        <button className="header__burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        <nav className={`nav ${open ? 'is-open' : ''}`}>
          {NAV.map((n) => (
            <div key={n.label} className={`nav__item ${sub === n.label ? 'is-sub' : ''}`}>
              <div className="nav__row">
                <NavLink to={n.to} end onClick={close}>{n.label}</NavLink>
                <button aria-label={`${n.label} submenu`} onClick={() => setSub(sub === n.label ? null : n.label)}><ChevronDown size={16} /></button>
              </div>
              <ul className="nav__sub">
                {n.subs.map(([t, id]) => <li key={id}><Link to={`${n.to}#${id}`} onClick={close}>{t}</Link></li>)}
              </ul>
            </div>
          ))}
          <Link to="/franchise#why" className="btn btn--gold nav__cta" onClick={close}>Become a Partner</Link>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div><Logo className="footer__logo" /><p>A sip of delightfulness. Natural, authentic-tasting tea since 2023.</p></div>
        <div><h4>Explore</h4>{NAV.map((n) => <Link key={n.label} to={n.to}>{n.label}</Link>)}</div>
        <div><h4>Reach us</h4>
          <a href={`tel:${BRAND.phone}`}><Phone size={16} /> {BRAND.phone}</a>
          <a href={BRAND.instaUrl} target="_blank" rel="noreferrer"><Instagram size={16} /> {BRAND.insta}</a>
          <a href={`https://${BRAND.site}`} target="_blank" rel="noreferrer"><Globe size={16} /> {BRAND.site}</a>
          <a href={`mailto:${BRAND.email}`}><Mail size={16} /> {BRAND.email}</a>
        </div>
      </div>
      <div className="footer__bar">© {new Date().getFullYear()} Fine Brewss Tea. All rights reserved.</div>
    </footer>
  )
}

export const Section = ({ id, title, lead, tone = '', children }) => (
  <section id={id} className={`section ${tone}`}><div className="container">
    <header className="section__head"><h2>{title}</h2>{lead && <p>{lead}</p>}</header>{children}
  </div></section>
)

export const PageHero = ({ title, text }) => (
  <div className="phero"><div className="container"><h1>{title}</h1><p>{text}</p></div></div>
)

export const Faq = ({ items }) => {
  const [i, setI] = useState(0)
  return <div className="faq">{items.map(([q, a], k) => (
    <div key={q} className={`faq__item ${i === k ? 'is-open' : ''}`}>
      <button onClick={() => setI(i === k ? -1 : k)} aria-expanded={i === k}>{q}<ChevronDown size={18} /></button>
      {i === k && <p>{a}</p>}
    </div>))}</div>
}
