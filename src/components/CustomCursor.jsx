import { useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const dotScaleRef = useRef(1)

  const ringX = useSpring(-100, { stiffness: 180, damping: 22 })
  const ringY = useSpring(-100, { stiffness: 180, damping: 22 })
  const ringScale = useSpring(1, { stiffness: 300, damping: 22 })
  const ringOpacity = useSpring(0, { stiffness: 300, damping: 22 })

  useEffect(() => {
    // Don't render on touch-only devices
    if (navigator.maxTouchPoints > 0 && !window.matchMedia('(pointer: fine)').matches) return

    const applyDotTransform = (x, y) => {
      if (!dotRef.current) return
      dotRef.current.style.transform =
        `translate(${x - 4}px, ${y - 4}px) scale(${dotScaleRef.current})`
    }

    const handleMouseMove = (e) => {
      applyDotTransform(e.clientX, e.clientY)
      ringX.set(e.clientX - 20)
      ringY.set(e.clientY - 20)
      ringOpacity.set(1)
    }

    const handleHoverStart = () => {
      dotScaleRef.current = 0
      if (dotRef.current) dotRef.current.style.transform = dotRef.current.style.transform.replace(/scale\([^)]*\)/, 'scale(0)')
      ringScale.set(2.2)
    }

    const handleHoverEnd = () => {
      dotScaleRef.current = 1
      if (dotRef.current) dotRef.current.style.transform = dotRef.current.style.transform.replace(/scale\([^)]*\)/, 'scale(1)')
      ringScale.set(1)
    }

    const handleMouseDown = () => {
      ringScale.set(0.75)
    }

    const handleMouseUp = () => {
      ringScale.set(dotScaleRef.current === 0 ? 2.2 : 1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const interactives = document.querySelectorAll('.interactive')
    interactives.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [])

  return (
    <>
      {/* Precise dot — position via direct DOM, zero animation-frame lag */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#fff',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          willChange: 'transform',
          mixBlendMode: 'difference',
          transition: 'transform 0.12s ease',
        }}
      />

      {/* Lagging ring with spring physics */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: ringX,
          y: ringY,
          width: '40px',
          height: '40px',
          border: '1.5px solid rgba(255,255,255,0.7)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          scale: ringScale,
          opacity: ringOpacity,
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}

export default CustomCursor
