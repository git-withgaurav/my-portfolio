import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const RevealText = ({ children, delay = 0 }) => {
  const textRef = useRef(null)

  useEffect(() => {
    const el = textRef.current
    
    gsap.fromTo(el, 
      {
        y: 50,
        opacity: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
      },
      {
        y: 0,
        opacity: 1,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.5,
        delay: delay,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    )
  }, [delay])

  return (
    <div ref={textRef} style={{ overflow: 'hidden' }}>
      {children}
    </div>
  )
}

export default RevealText
