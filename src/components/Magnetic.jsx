import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Magnetic wrapper — translates its child slightly toward the cursor while
 * the pointer is inside its bounding box. Subtle but very tactile on CTAs.
 *
 * Disabled automatically on touch devices and when reduced-motion is preferred.
 */
const Magnetic = ({
  children,
  strength = 0.3,
  className = '',
}) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(fine && !reduce)
  }, [])

  const handleMove = (e) => {
    if (!enabled) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const cx = r.left + r.width / 2
    const cy = r.top + r.height / 2
    x.set((e.clientX - cx) * strength)
    y.set((e.clientY - cy) * strength)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: enabled ? sx : 0, y: enabled ? sy : 0, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  )
}

export default Magnetic
