import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 90
const MAX_CONNECTIONS = 300
const CONNECTION_DISTANCE_SQ = 324 // 18 units squared

const HeroCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const w = window.innerWidth
    const h = window.innerHeight

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(w, h)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(70, w / h, 0.1, 1000)
    camera.position.z = 55

    // --- Particles ---
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const velocities = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 110
      positions[i * 3 + 1] = (Math.random() - 0.5) * 110
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      velocities[i * 3]     = (Math.random() - 0.5) * 0.04
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.04
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02
    }

    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const particleMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.55,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(particleGeo, particleMat)
    scene.add(points)

    // --- Lines (pre-allocated buffer, no GC pressure) ---
    const linePositions = new Float32Array(MAX_CONNECTIONS * 2 * 3)
    const lineGeo = new THREE.BufferGeometry()
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    lineGeo.setDrawRange(0, 0)

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.18,
    })

    const lines = new THREE.LineSegments(lineGeo, lineMat)
    scene.add(lines)

    const updateLines = () => {
      const pos = particleGeo.attributes.position.array
      let idx = 0

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          if (idx >= MAX_CONNECTIONS * 2) break
          const dx = pos[i * 3] - pos[j * 3]
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1]
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2]
          if (dx * dx + dy * dy + dz * dz < CONNECTION_DISTANCE_SQ) {
            linePositions[idx * 3]     = pos[i * 3]
            linePositions[idx * 3 + 1] = pos[i * 3 + 1]
            linePositions[idx * 3 + 2] = pos[i * 3 + 2]
            linePositions[(idx + 1) * 3]     = pos[j * 3]
            linePositions[(idx + 1) * 3 + 1] = pos[j * 3 + 1]
            linePositions[(idx + 1) * 3 + 2] = pos[j * 3 + 2]
            idx += 2
          }
        }
      }

      lineGeo.attributes.position.needsUpdate = true
      lineGeo.setDrawRange(0, idx)
    }

    const handleResize = () => {
      const nw = window.innerWidth
      const nh = window.innerHeight
      camera.aspect = nw / nh
      camera.updateProjectionMatrix()
      renderer.setSize(nw, nh)
    }
    window.addEventListener('resize', handleResize)

    let frameId
    let tick = 0

    const animate = () => {
      frameId = requestAnimationFrame(animate)
      tick++

      const pos = particleGeo.attributes.position.array
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3]     += velocities[i * 3]
        pos[i * 3 + 1] += velocities[i * 3 + 1]
        pos[i * 3 + 2] += velocities[i * 3 + 2]
        if (Math.abs(pos[i * 3])     > 55)  velocities[i * 3]     *= -1
        if (Math.abs(pos[i * 3 + 1]) > 55)  velocities[i * 3 + 1] *= -1
        if (Math.abs(pos[i * 3 + 2]) > 25)  velocities[i * 3 + 2] *= -1
      }
      particleGeo.attributes.position.needsUpdate = true

      if (tick % 3 === 0) updateLines()

      points.rotation.y += 0.0004
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      particleGeo.dispose()
      particleMat.dispose()
      lineGeo.dispose()
      lineMat.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  )
}

export default HeroCanvas
