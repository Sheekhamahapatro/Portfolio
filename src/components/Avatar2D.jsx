import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * 2D avatar — uses the anime-girl illustration shipped in /public/girl.svg.
 *
 * Personality is layered on the wrapper rather than inside the artwork so
 * the SVG itself stays untouched:
 *   - Entrance: scale + fade + rise
 *   - Idle: gentle vertical float on a 4s loop
 *   - Hover/parallax: the figure subtly tilts toward the cursor
 *   - Decorative floating dots and a sparkle drift in the background
 *   - "Hi there!" speech bubble slides in after entrance settles
 */
const Avatar2D = () => {
  const wrapRef = useRef(null)

  // Cursor parallax — translate global pointer position into a small
  // rotation/translation budget so the figure leans toward the cursor.
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 120, damping: 14, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 120, damping: 14, mass: 0.6 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const rotateX = useTransform(sy, [-0.5, 0.5], [4, -4])
  const tx = useTransform(sx, [-0.5, 0.5], [-6, 6])
  const ty = useTransform(sy, [-0.5, 0.5], [-4, 4])

  useEffect(() => {
    const onMove = (e) => {
      const node = wrapRef.current
      if (!node) return
      const r = node.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) / r.width
      const y = (e.clientY - (r.top + r.height / 2)) / r.height
      px.set(Math.max(-0.5, Math.min(0.5, x)))
      py.set(Math.max(-0.5, Math.min(0.5, y)))
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [px, py])

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full grid place-items-center"
      style={{ perspective: 800 }}
    >
      {/* Decorative floating accents behind the character */}
      <motion.span
        aria-hidden
        className="absolute top-[12%] left-[10%] w-2 h-2 rounded-full bg-accent"
        animate={{ y: [0, -10, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.span
        aria-hidden
        className="absolute top-[22%] right-[12%] w-1.5 h-1.5 rounded-full bg-accent2"
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
      />
      <motion.span
        aria-hidden
        className="absolute bottom-[30%] left-[8%] w-1.5 h-1.5 rounded-full bg-accent3"
        animate={{ y: [0, -8, 0], opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.4 }}
      />
      {/* Sparkle */}
      <motion.svg
        aria-hidden
        viewBox="0 0 24 24"
        className="absolute top-[16%] right-[22%] w-4 h-4 text-accent2"
        animate={{ rotate: [0, 90, 0], scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
          fill="currentColor"
        />
      </motion.svg>

      {/* Idle float */}
      <motion.div
        className="relative w-full h-full grid place-items-end justify-center pointer-events-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Cursor parallax + entrance */}
        <motion.div
          className="relative w-full h-full grid place-items-end justify-center"
          style={{ rotateX, rotateY, x: tx, y: ty, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <img
            src="/girl.svg"
            alt="Illustrated anime avatar of Sheekha"
            draggable={false}
            className="block h-[96%] w-auto max-w-none object-contain select-none drop-shadow-[0_18px_30px_rgb(var(--accent)/0.25)]"
          />
        </motion.div>
      </motion.div>

      {/* Speech bubble */}
      <motion.div
        initial={{ opacity: 0, y: 8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-3 right-3 sm:top-5 sm:right-5 select-none z-10"
      >
        <div className="relative bg-card border border-line shadow-lg shadow-black/10 dark:shadow-black/40 rounded-2xl px-3 py-1.5">
          <span className="font-display font-bold text-[13px] tracking-tight text-text">
            Hi there! 👋
          </span>
          <span
            aria-hidden
            className="absolute -bottom-1.5 left-6 w-3 h-3 bg-card border-r border-b border-line rotate-45"
          />
        </div>
      </motion.div>
    </div>
  )
}

export default Avatar2D
