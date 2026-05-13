import { motion, useScroll, useTransform } from 'framer-motion'
import React, { useRef, useState, memo } from 'react'

const projects = [
  {
    id: "01",
    title: "NEBULA",
    category: "Web Design / Development",
    year: "2024",
    color: "#3b82f6",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: "02",
    title: "QUANTUM",
    category: "Interface Design",
    year: "2023",
    color: "#a855f7",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2564&auto=format&fit=crop"
  },
  {
    id: "03",
    title: "SYNTH",
    category: "Motion Graphics",
    year: "2024",
    color: "#10b981",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2670&auto=format&fit=crop"
  }
]

const ProjectCard = memo(({ project, onHover }) => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div 
      ref={container}
      style={{ y, opacity }}
      className="project-card interactive"
      onMouseEnter={() => onHover(project.color)}
      onMouseLeave={() => onHover(null)}
    >
      <div style={{
        position: 'relative',
        height: '700px',
        width: '100%',
        marginBottom: '8rem',
        borderRadius: '32px',
        overflow: 'hidden',
        background: '#111',
        border: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 'clamp(2rem, 5vw, 4rem)'
      }}>
        <motion.div style={{ position: 'absolute', inset: 0, scale, zIndex: 0 }}>
          <img 
            src={project.image} 
            alt={`Project ${project.title}`} 
            loading="lazy"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} 
          />
          <div style={{ 
            position: 'absolute', 
            inset: 0, 
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 60%)' 
          }} />
        </motion.div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ 
            fontSize: '0.9rem', 
            letterSpacing: '0.2em', 
            opacity: 0.6,
            fontFamily: 'var(--font-secondary)',
            textTransform: 'uppercase'
          }}>
            {project.year} — {project.category}
          </span>
          <h3 style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: 800, 
            margin: '1rem 0',
            letterSpacing: '-0.02em'
          }}>
            {project.title}
          </h3>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              aria-label={`View ${project.title} details`}
              className="interactive"
              style={{ 
                padding: '1rem 2.5rem', 
                borderRadius: '100px', 
                background: '#fff', 
                color: '#000',
                border: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'none'
              }}
            >
              VIEW PROJECT
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
})

const Projects = () => {
  const [activeColor, setActiveColor] = useState(null)

  return (
    <section id="work" className="projects section-padding" style={{ position: 'relative' }}>
      <motion.div 
        animate={{ 
          backgroundColor: activeColor ? `${activeColor}11` : 'transparent',
        }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ marginLeft: 0 }}>
        <div style={{ marginBottom: '10rem' }}>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 800 }}
          >
            SELECTED WORKS
          </motion.h2>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onHover={setActiveColor} 
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
