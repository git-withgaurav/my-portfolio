import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9000,
        backgroundColor: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 1rem',
      }}
    >
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        onClick={e => e.stopPropagation()}
        data-lenis-prevent
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          maxHeight: '88vh',
          overflowY: 'auto',
          backgroundColor: '#0f0f0f',
          borderRadius: '28px 28px 0 0',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: 'clamp(2.5rem, 6vw, 5rem)',
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="interactive"
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fff',
            fontSize: '1rem',
            cursor: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          ✕
        </button>

        {/* Hero image */}
        <div style={{
          width: '100%',
          height: 'clamp(180px, 38vh, 380px)',
          borderRadius: '18px',
          overflow: 'hidden',
          marginBottom: '3rem',
        }}>
          <img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem',
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', letterSpacing: '0.3em', opacity: 0.4, textTransform: 'uppercase' }}>
              {project.year} — {project.category}
            </span>
            <h2 style={{
              fontSize: 'clamp(2.2rem, 6vw, 4.5rem)',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              marginTop: '0.5rem',
              lineHeight: 1,
            }}>
              {project.title}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', paddingTop: '0.5rem' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '0.35rem 1rem',
                borderRadius: '100px',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                opacity: 0.65,
                whiteSpace: 'nowrap',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          lineHeight: 1.75,
          opacity: 0.65,
          maxWidth: '680px',
          marginBottom: '3rem',
        }}>
          {project.description}
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1.25rem',
        }}>
          {project.highlights.map(h => (
            <div key={h.label} style={{
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.025)',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-0.03em', color: project.color }}>
                {h.value}
              </div>
              <div style={{ fontSize: '0.7rem', letterSpacing: '0.12em', opacity: 0.45, marginTop: '0.4rem', textTransform: 'uppercase' }}>
                {h.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal
