import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import Magnetic from './Magnetic'
import HeroCanvas from './HeroCanvas'

const Hero = () => {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.fromTo(
        '.char',
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.05, duration: 1.5 }
      )
      .fromTo(
        subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=1'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])


  const line1 = "CREATIVE"
  const line2 = "DEVELOPER"

  return (
    <section ref={containerRef} className="hero section-padding" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', position: 'relative' }}>
      <HeroCanvas />
      <div className="container" style={{ marginLeft: 0, position: 'relative', zIndex: 1 }}>
        <div ref={titleRef} style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
          <h1 style={{ 
            fontSize: 'clamp(3rem, 15vw, 11rem)', 
            fontWeight: 900, 
            lineHeight: 0.85, 
            letterSpacing: '-0.04em',
            textTransform: 'uppercase',
            textAlign: 'left'
          }}>

            <div style={{ overflow: 'hidden' }}>
              {line1.split("").map((char, i) => (
                <span key={i} className="char" style={{ display: 'inline-block' }}>
                  {char}
                </span>
              ))}
            </div>
            <div style={{ overflow: 'hidden' }}>
              {line2.split("").map((char, i) => (
                <span key={i} className="char" style={{ display: 'inline-block' }}>
                  {char}
                </span>
              ))}
            </div>
          </h1>
        </div>

        
        <p ref={subRef} style={{ 
          fontSize: 'clamp(1rem, 2.5vw, 1.8rem)', 
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          fontFamily: 'var(--font-secondary)',
          lineHeight: 1.4,
          letterSpacing: '-0.01em',
          textAlign: 'left'
        }}>

          Designing and developing high-end digital solutions with a focus on motion, aesthetics, and user experience.
        </p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          style={{ marginTop: '5rem' }}
        >
          <Magnetic strength={0.3}>
            <div className="scroll-indicator interactive" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0.6 }}>
              <div style={{ width: '50px', height: '1px', backgroundColor: '#fff' }}></div>
              <span style={{ fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>Scroll Down</span>
            </div>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
