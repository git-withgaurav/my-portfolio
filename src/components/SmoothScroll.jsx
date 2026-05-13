import { useEffect } from 'react'
import Lenis from 'lenis'

const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothHorizontal: false,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    let rafId;
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      cancelAnimationFrame(rafId)
    }

  }, [])

  return <>{children}</>
}

export default SmoothScroll
