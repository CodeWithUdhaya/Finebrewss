
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Leaf,
  Wallet,
  Coffee,
  Users,
  MapPin,
  Phone,
  Instagram,
  Search,
  Check,
} from 'lucide-react'

import { Logo, Section, PageHero, Faq } from './components.jsx'
import { BENEFITS, MENU, STORES, WHY, STEPS, FAQ, BRAND } from './data.js'

// Icon names used in data.js -> actual icon components
const ICONS = { Leaf, Wallet, Coffee, Users }


/* ==========================================================================
   HELPERS
   ========================================================================== */

/* ---------- Menu categories (cards with tick lists) ---------- */
const MenuList = () => (
  <div className="grid grid--4">
    {MENU.map(([category, items]) => (
      <div key={category} className="card">
        <h3>{category}</h3>
        <ul className="ticks">
          {items.map((item) => (
            <li key={item}>
              <Check size={14} />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
)

/* ---------- Store cards (optional search text `q`) ---------- */
const StoreList = ({ q = '' }) => {
  const list = STORES.filter(([name, city]) =>
    (name + city).toLowerCase().includes(q.toLowerCase())
  )

  if (!list.length) {
    return <p className="empty">No store found yet. Try another city or contact us.</p>
  }

  return (
    <div className="grid grid--3">
      {list.map(([name]) => (
        <div key={name} className="card store">
          <MapPin />
          <div>
            <h3>{name}</h3>
            <a href={`tel:${BRAND.phone}`}>Call {BRAND.phone}</a>
          </div>
        </div>
      ))}
    </div>
  )
}

/* ---------- Enquiry form (used on Home, Franchise, Contact) ---------- */
const EnquiryForm = () => {
  const [sent, setSent] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    setSent(true)
    // TODO: connect API / EmailJS here
  }

  if (sent) {
    return (
      <div className="card sent">
        <h3>Thank you!</h3>
        <p>We received your details and will call you soon.</p>
      </div>
    )
  }

  return (
    <form className="card form" onSubmit={submit}>
      <input required placeholder="Full name" />
      <input required type="tel" placeholder="Phone number" />
      <input type="email" placeholder="Email" />
      <input placeholder="City for your store" />
      <textarea rows="3" placeholder="Tell us about your plan" />
      <button className="btn btn--green">Send enquiry</button>
    </form>
  )
}


/* ==========================================================================
   PAGES
   ========================================================================== */

/* ---------- Home ---------- */
export function Home() {
  return (
    <>
      {/* Feel Every Sip */}
      <section id="feel" className="hero">
        <div className="container hero__in">
          <div className="hero__txt">
            <span className="tag">A sip of delightfulness</span>
            <h1>Feel every sip of real Indian tea.</h1>
            <p>
              Natural, authentic-tasting tea at a price that fits every day.
              Brewed fresh since 2023, and now growing through franchise partners.
            </p>
            <div className="hero__btns">
              <Link to="/menu" className="btn btn--green">Explore menu</Link>
              <Link to="/franchise" className="btn btn--line">Start a franchise</Link>
            </div>
          </div>

          <div className="hero__art">
            <Logo />
          </div>
        </div>
        <div className="wave" />
      </section>

      {/* A Taste of Togetherness */}
      <Section
        id="together"
        title="A taste of togetherness"
        lead="Fine Brewss Tea began in 2023 with one idea: good tea should taste natural, cost little and bring people to the same table."
      >
        <div className="split">
          <Logo className="split__img" />
          <div>
            <p>
              From office breaks to family evenings, a cup of chai is how India
              says hello. We brew ours with honest ingredients and serve it with a smile.
            </p>
            <p>
              Today we offer a wide range of teas and snacks, and we help
              entrepreneurs open their own Fine Brewss Tea store.
            </p>
            <Link to="/contact" className="btn btn--green">Talk to us</Link>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section id="benefits" title="Why people love our tea" tone="alt">
        <div className="grid grid--4">
          {BENEFITS.map(([icon, title, text]) => {
            const Icon = ICONS[icon]
            return (
              <div key={title} className="card">
                <Icon className="card__ic" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            )
          })}
        </div>
      </Section>

      {/* What We Serve */}
      <Section
        id="serve"
        title="What we serve"
        lead="Classic chai, signature blends, cool refreshers and snacks."
      >
        <MenuList />
        <p className="center">
          <Link to="/menu" className="btn btn--line">See full menu</Link>
        </p>
      </Section>

      {/* Build With Us */}
      <Section id="build" title="Build with us" tone="dark">
        <div className="split">
          <div>
            <p>
              Start your own tea business with a brand customers already enjoy.
              Low investment, simple operations, full training.
            </p>
            <Link to="/franchise" className="btn btn--gold">View franchise benefits</Link>
          </div>

          <ol className="steps">
            {STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq" title="Frequently asked questions">
        <Faq items={FAQ} />
      </Section>

      {/* Join Our Network */}
      <Section
        id="network"
        title="Join our network"
        tone="alt"
        lead="Tell us where you want to open. We will call you back."
      >
        <div className="narrow">
          <EnquiryForm />
        </div>
      </Section>

      {/* Find Us Near You */}
      <Section id="near" title="Find us near you">
        <StoreList />
        <p className="center">
          <Link to="/stores" className="btn btn--line">All stores</Link>
        </p>
      </Section>
    </>
  )
}


/* ---------- Menu ---------- */
export const MenuPage = () => (
  <>
    <PageHero title="Our menu" text="Fresh tea, cool drinks and warm snacks." />
    <Section id="serve" title="What we serve">
      <MenuList />
    </Section>
  </>
)


/* ---------- Stores ---------- */
export function Stores() {
  const [q, setQ] = useState('')

  return (
    <>
      <PageHero title="Our stores" text="Find a Fine Brewss Tea near you." />

      <Section id="find" title="Find your nearest store">
        <label className="search">
          <Search size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by city or area"
          />
        </label>

        <StoreList q={q} />
      </Section>
    </>
  )
}


/* ---------- Franchise ---------- */
export const Franchise = () => (
  <>
    <PageHero title="Franchise" text="Own a tea store with a brand people trust." />

    {/* Benefit */}
    <Section id="benefit" title="Franchise benefits">
      <div className="grid grid--4">
        {BENEFITS.map(([icon, title, text]) => {
          const Icon = ICONS[icon]
          return (
            <div key={title} className="card">
              <Icon className="card__ic" />
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          )
        })}
      </div>
    </Section>

    {/* Why Choose Our Franchise */}
    <Section id="why" title="Why choose our franchise" tone="alt">
      <div className="grid grid--2">
        {WHY.map(([title, text]) => (
          <div key={title} className="card">
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </div>

      <div className="narrow">
        <h3 className="center">Request franchise details</h3>
        <EnquiryForm />
      </div>
    </Section>
  </>
)


/* ---------- Contact ---------- */
export const Contact = () => (
  <>
    <PageHero title="Contact us" text="We would love to hear from you." />

    {/* Common */}
    <Section id="common" title="Get in touch">
      <div className="split">
        <div className="card contact">
          <a href={`tel:${BRAND.phone}`}>
            <Phone /> {BRAND.phone}
          </a>
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <p>For franchise details, call or send a message. Our team replies quickly.</p>
        </div>

        <EnquiryForm />
      </div>
    </Section>

    {/* Follow On */}
    <Section id="follow" title="Follow on" tone="alt">
      <p className="center">
        <a
          className="btn btn--green"
          href={BRAND.instaUrl}
          target="_blank"
          rel="noreferrer"
        >
          <Instagram size={18} /> @{BRAND.insta}
        </a>
      </p>
    </Section>
  </>
)