import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Elegant dual-element cursor:
 *  - small accent dot follows pointer 1:1 (motion blur trail effect)
 *  - larger ring lags behind via spring physics
 *  - ring grows + label appears when hovering over interactive elements
 *
 * Disabled on touch devices and when the user prefers reduced motion.
 */
const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const [pressed, setPressed] = useState(false)
  const cursorXY = useRef({ x: 0, y: 0 })

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const ringX = useSpring(dotX, { stiffness: 320, damping: 26, mass: 0.5 })
  const ringY = useSpring(dotY, { stiffness: 320, damping: 26, mass: 0.5 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    const onMove = (e) => {
      cursorXY.current = { x: e.clientX, y: e.clientY }
      dotX.set(e.clientX)
      dotY.set(e.clientY)

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) {
        setHovering(false)
        setLabel('')
        return
      }
      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor]'
      )
      if (interactive) {
        setHovering(true)
        const cursorLabel =
          interactive.getAttribute('data-cursor') ||
          (interactive.tagName === 'A' ? '' : '')
        setLabel(cursorLabel)
      } else {
        setHovering(false)
        setLabel('')
      }
    }
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    const onLeave = () => {
      dotX.set(-100)
      dotY.set(-100)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [dotX, dotY])

  if (!enabled) return null

  return (
    <>
      {/* Inner dot (1:1 with pointer) */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[100] w-[6px] h-[6px] rounded-full bg-accent mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[99] rounded-full border border-accent/70 flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? (label ? 88 : 44) : 28,
          height: hovering ? (label ? 88 : 44) : 28,
          backgroundColor: hovering
            ? 'rgb(var(--accent) / 0.12)'
            : 'rgb(var(--accent) / 0)',
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22, mass: 0.4 }}
      >
        {label && (
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-accent whitespace-nowrap">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}

export default CustomCursor
