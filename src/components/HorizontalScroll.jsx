import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HorizontalScroll = ({ items = [] }) => {
  const sectionRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        {
          translateX: 0,
        },
        {
          translateX: "-150vw",
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        }
      )
    }, triggerRef)

    return () => ctx.revert()
  }, [])


  return (
    <section style={{ overflow: 'hidden' }}>
      <div ref={triggerRef}>
        <div 
          ref={sectionRef} 
          style={{ 
            height: '100vh', 
            width: '300vw', // Container width for 3 cards
            display: 'flex', 
            alignItems: 'center', 
            gap: '4rem', 
            padding: '0 10vw',
            background: 'rgba(255,255,255,0.01)' 
          }}
        >
          {items.map((item, index) => (
            <div 
              key={index} 
              style={{ 
                width: '70vw', 
                height: '60vh', 
                flexShrink: 0, 
                borderRadius: '40px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4rem'
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '1rem', opacity: 0.5, letterSpacing: '0.3em' }}>{item.subtitle}</span>
                <h3 style={{ fontSize: 'clamp(2rem, 8vw, 6rem)', fontWeight: 900, marginTop: '1rem' }}>{item.title}</h3>
              </div>
              
              <span style={{ 
                position: 'absolute', 
                bottom: '-2rem', 
                right: '2rem', 
                fontSize: '15rem', 
                fontWeight: 900, 
                opacity: 0.03,
                pointerEvents: 'none'
              }}>
                0{index + 1}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HorizontalScroll
