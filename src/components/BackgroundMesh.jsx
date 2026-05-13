import { useEffect, useRef } from 'react'

const BackgroundMesh = () => {
  const meshRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!meshRef.current) return
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth) * 100
      const y = (clientY / window.innerHeight) * 100
      
      meshRef.current.style.setProperty('--mouse-x', `${x}%`)
      meshRef.current.style.setProperty('--mouse-y', `${y}%`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={meshRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'var(--bg-color)',
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
    >
      {/* Background radial glow */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(59, 130, 246, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 20% 80%, rgba(16, 185, 129, 0.08) 0%, transparent 40%)
          `,
          filter: 'blur(80px)',
          opacity: 0.8
        }}
      />
    </div>

  )
}

export default BackgroundMesh
