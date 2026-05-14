import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Magnetic from './Magnetic'

const ContactForm = () => {
  const [formStatus, setFormStatus] = useState('idle') // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')

    const formData = new FormData(e.target)
    
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY || '')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()

      if (data.success) {
        setFormStatus('success')
        e.target.reset()
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      setFormStatus('error')
    }
  }

  return (
    <div style={{ maxWidth: '600px', width: '100%' }}>
      <AnimatePresence mode="wait">
        {formStatus === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ 
              padding: '4rem 2rem', 
              textAlign: 'center', 
              backgroundColor: 'rgba(255,255,255,0.03)',
              borderRadius: '2rem',
              border: '1px solid var(--glass-border)'
            }}
          >
            <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>MESSAGE SENT.</h3>
            <p style={{ opacity: 0.6 }}>I'll get back to you as soon as possible.</p>
            <button 
              onClick={() => setFormStatus('idle')}
              style={{ 
                marginTop: '2rem', 
                background: 'none', 
                border: 'none', 
                color: '#fff', 
                textDecoration: 'underline',
                fontSize: '0.9rem',
                opacity: 0.4
              }}
            >
              SEND ANOTHER?
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '1rem', opacity: 0.4 }}>NAME</label>
              <input 
                type="text" 
                name="name" 
                required 
                placeholder="YOUR NAME"
                className="interactive"
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--glass-border)',
                  padding: '1rem 0',
                  fontSize: '1.2rem',
                  color: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '1rem', opacity: 0.4 }}>EMAIL</label>
              <input 
                type="email" 
                name="email" 
                required 
                placeholder="YOUR EMAIL"
                className="interactive"
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--glass-border)',
                  padding: '1rem 0',
                  fontSize: '1.2rem',
                  color: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            <div className="form-group">
              <label style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '1rem', opacity: 0.4 }}>MESSAGE</label>
              <textarea 
                name="message" 
                required 
                rows="4"
                placeholder="HOW CAN I HELP?"
                className="interactive"
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid var(--glass-border)',
                  padding: '1rem 0',
                  fontSize: '1.2rem',
                  color: '#fff',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.3s ease'
                }}
              />
            </div>

            <div style={{ marginTop: '2rem' }}>
              <Magnetic strength={0.2}>
                <button 
                  type="submit" 
                  disabled={formStatus === 'sending'}
                  className="interactive"
                  style={{
                    padding: '1.5rem 4rem',
                    borderRadius: '3rem',
                    border: '1px solid #fff',
                    background: 'none',
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    opacity: formStatus === 'sending' ? 0.5 : 1,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {formStatus === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </Magnetic>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ContactForm
