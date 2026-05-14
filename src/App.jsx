import { useState, useEffect } from 'react'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import Hero from './components/Hero'
import Projects from './components/Projects'
import BackgroundMesh from './components/BackgroundMesh'
import Magnetic from './components/Magnetic'
import RevealText from './components/RevealText'
import Marquee from './components/Marquee'
import HorizontalScroll from './components/HorizontalScroll'
import VariableText from './components/VariableText'
import ContactForm from './components/ContactForm'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = ['WORK', 'ABOUT', 'CONTACT']

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 2000,
          mixBlendMode: 'difference',
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Magnetic strength={0.4}>
            <a href="/" className="logo interactive" style={{ fontWeight: 900, letterSpacing: '-0.05em' }}>
              ANTIGRAVITY
            </a>
          </Magnetic>

          {/* Desktop links */}
          <div className="nav-links desktop-nav" style={{ display: 'flex' }}>
            {NAV_ITEMS.map(item => (
              <Magnetic key={item} strength={0.5}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="nav-link interactive"
                  style={{ fontWeight: 600, letterSpacing: '0.1em' }}
                >
                  {item}
                </a>
              </Magnetic>
            ))}
          </div>

          {/* Hamburger — visible on mobile only */}
          <button
            className="hamburger-btn interactive"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'none',
              padding: '0.4rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              width: '28px',
            }}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'block', height: '1.5px', background: 'currentColor', transformOrigin: 'center' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', height: '1.5px', background: 'currentColor' }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'block', height: '1.5px', background: 'currentColor', transformOrigin: 'center' }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu — outside nav to escape blend mode */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1900,
              background: '#050505',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2.5rem',
            }}
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="interactive"
                onClick={closeMenu}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 + 0.15, duration: 0.5, ease: 'easeOut' }}
                style={{
                  fontSize: 'clamp(3rem, 14vw, 7rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.03em',
                  color: '#fff',
                  textDecoration: 'none',
                }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const Footer = () => {
  return (
    <footer id="contact" className="section-padding" style={{ borderTop: '1px solid var(--glass-border)', position: 'relative' }}>
      <div className="container" style={{ marginLeft: 0 }}>
        <div style={{ marginBottom: '8rem' }}>
          <RevealText>
            <h2 style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', fontWeight: 900, marginBottom: '4rem', letterSpacing: '-0.03em' }}>GET IN TOUCH.</h2>
          </RevealText>
          <ContactForm />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '4rem' }}>
          <div>
            <Magnetic strength={0.5}>
              <a href="mailto:hello@antigravity.dev" className="interactive" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.5rem)', opacity: 0.4 }}>
                hello@antigravity.dev
              </a>
            </Magnetic>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ opacity: 0.4, marginBottom: '2rem', fontSize: '0.9rem' }}>&copy; 2024 ANTIGRAVITY STUDIO — ALL RIGHTS RESERVED</p>
            <div style={{ display: 'flex', gap: '2.5rem', justifyContent: 'flex-end' }}>
              {['TWITTER', 'LINKEDIN', 'DRIBBBLE'].map(social => (
                <Magnetic key={social} strength={0.4}>
                  <a href="#" className="interactive" style={{ fontSize: '0.8rem', fontWeight: 600 }}>{social}</a>
                </Magnetic>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

const Loader = () => {
  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: '0.75rem', letterSpacing: '0.8em', fontWeight: 400, opacity: 0.6 }}
      >
        GAURAV SINGH
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000)
  }, [])

  const marqueeItems = ["REACT", "GSAP", "FRAMER MOTION", "VITE", "LENIS", "THREE.JS", "TYPESCRIPT"]
  const galleryItems = [
    { title: "INNOVATION", subtitle: "OUR PHILOSOPHY" },
    { title: "AESTHETICS", subtitle: "OUR OBSESSION" },
    { title: "PERFORMANCE", subtitle: "OUR STANDARD" },
  ]

  return (
    <SmoothScroll>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <div className="app">
        <BackgroundMesh />
        <CustomCursor />
        <Navbar />

        <main>
          <Hero />

          <Marquee items={marqueeItems} speed={0.3} />

          <Projects />

          <HorizontalScroll items={galleryItems} />

          <section id="about" className="section-padding">
            <div className="container" style={{ marginLeft: 0 }}>
              <div style={{ maxWidth: '1000px' }}>
                <div style={{ marginBottom: '4rem' }}>
                  <VariableText>
                    <h2 style={{ fontSize: 'clamp(1.8rem, 7vw, 6rem)', textTransform: 'uppercase' }}>
                      CRAFTING ELEGANCE
                    </h2>
                  </VariableText>
                </div>
                <RevealText delay={0.2}>
                  <p style={{ fontSize: 'clamp(1.2rem, 3.5vw, 2.8rem)', lineHeight: 1.2, fontWeight: 400, letterSpacing: '-0.02em' }}>
                    We blend technical precision with artistic motion to create digital experiences that don't just work—they resonate. Our focus is on the intersection of performance and aesthetics.
                  </p>
                </RevealText>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  )
}

export default App
