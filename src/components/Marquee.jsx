import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Marquee = ({ items = [], speed = 1 }) => {
  const containerRef = useRef(null)
  const marqueeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current
      
      // Velocity control
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 500)
          gsap.to(marquee, {
            timeScale: 1 + velocity,
            duration: 0.5,
            ease: 'power2.out'
          })
        }
      })

      gsap.to(marquee, {
        xPercent: -50, // Move half (since we doubled items)
        repeat: -1,
        duration: 20 / speed,
        ease: 'none'
      })
    }, containerRef)

    return () => ctx.revert()
  }, [speed])

  // Double the items for infinite seamless loop
  const displayItems = [...items, ...items]

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        overflow: 'hidden', 
        padding: '4rem 0',
        borderTop: '1px solid var(--glass-border)',
        borderBottom: '1px solid var(--glass-border)',
        background: 'rgba(255,255,255,0.02)',
        whiteSpace: 'nowrap'
      }}
    >
      <div 
        ref={marqueeRef} 
        style={{ 
          display: 'inline-block',
          fontSize: 'clamp(2rem, 5vw, 6rem)',
          fontWeight: 900,
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}
      >
        {displayItems.map((item, i) => (
          <span key={i} style={{ margin: '0 2rem', opacity: 0.8 }}>
            {item} <span style={{ color: 'var(--accent-color)' }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee
