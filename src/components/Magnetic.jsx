import { useRef, useState, useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'

const Magnetic = ({ children, strength = 0.5 }) => {
  const ref = useRef(null)
  
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    
    const centerX = left + width / 2
    const centerY = top + height / 2
    
    const distanceX = clientX - centerX
    const distanceY = clientY - centerY
    
    x.set(distanceX * strength)
    y.set(distanceY * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        position: 'relative', 
        display: 'inline-block',
        padding: '20px', // Larger hit area
        margin: '-20px'  // Offset padding to maintain layout
      }}
      animate={{ x: 0, y: 0 }} // This is just to satisfy the motion div if needed
      style={{ x, y, display: 'inline-block', position: 'relative', padding: '20px', margin: '-20px' }}
    >
      {children}
    </motion.div>
  )
}

export default Magnetic

