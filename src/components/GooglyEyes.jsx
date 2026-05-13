import { useState, useEffect, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'

const GooglyEyes = () => {
  const [isHovering, setIsHovering] = useState(false)
  
  // Main position tracking
  const mouseX = useSpring(0, { stiffness: 400, damping: 30 })
  const mouseY = useSpring(0, { stiffness: 400, damping: 30 })

  // Pupil offset tracking
  const pupilX = useSpring(0, { stiffness: 300, damping: 20 })
  const pupilY = useSpring(0, { stiffness: 300, damping: 20 })
  
  // Scale for "excitement" on hover
  const eyeScale = useSpring(1, { stiffness: 300, damping: 20 })

  useEffect(() => {
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      
      // Move the whole eye assembly
      mouseX.set(clientX - 55) // Offset to center the pair
      mouseY.set(clientY - 25)
      
      // Pupils react to the direction of motion
      const deltaX = clientX - lastX
      const deltaY = clientY - lastY
      
      pupilX.set(Math.max(-10, Math.min(10, deltaX * 0.5)))
      pupilY.set(Math.max(-10, Math.min(10, deltaY * 0.5)))
      
      lastX = clientX
      lastY = clientY
    }

    const handleHoverStart = () => {
      setIsHovering(true)
      eyeScale.set(1.4)
    }
    
    const handleHoverEnd = () => {
      setIsHovering(false)
      eyeScale.set(1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    
    const interactiveElements = document.querySelectorAll('.interactive')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleHoverStart)
      el.addEventListener('mouseleave', handleHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverStart)
        el.removeEventListener('mouseleave', handleHoverEnd)
      })
    }
  }, [])

  return (
    <motion.div 
      style={{ 
        position: 'fixed', 
        top: 0,
        left: 0,
        x: mouseX,
        y: mouseY,
        zIndex: 9999, 
        pointerEvents: 'none',
        display: 'flex',
        gap: '6px'
      }}
    >
      {[1, 2].map((i) => (
        <motion.div
          key={i}
          style={{
            width: '45px',
            height: '45px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            scale: eyeScale
          }}
        >
          {/* Pupil */}
          <motion.div
            style={{
              width: '18px',
              height: '18px',
              backgroundColor: '#000',
              borderRadius: '50%',
              x: pupilX,
              y: pupilY
            }}
          />
          
          {/* Shine */}
          <div style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: '5px',
            height: '5px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            borderRadius: '50%'
          }} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default GooglyEyes

