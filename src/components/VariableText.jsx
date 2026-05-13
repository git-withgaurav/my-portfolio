import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const VariableText = ({ children }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  // Morph font weight from 100 to 900 with a more subtle spacing range
  const fontWeight = useTransform(scrollYProgress, [0, 0.5, 1], [300, 900, 300])
  const letterSpacing = useTransform(scrollYProgress, [0, 0.5, 1], ["0.05em", "-0.02em", "0.05em"])


  return (
    <motion.div 
      ref={ref}
      style={{ 
        fontWeight,
        letterSpacing,
        display: 'block',
        width: '100%',
        whiteSpace: 'nowrap' // Prevent jumping to 2 lines
      }}

    >
      {children}
    </motion.div>
  )

}

export default VariableText
