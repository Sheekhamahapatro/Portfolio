import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Counts up from 0 to the numeric prefix of `value` once visible.
 * Preserves any non-numeric suffix (e.g. "5+", "40+", "∞").
 */
const AnimatedNumber = ({ value, duration = 1500 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const str = String(value)
  const match = str.match(/^(\d+(?:\.\d+)?)/)
  const target = match ? parseFloat(match[1]) : null
  const suffix = match ? str.slice(match[0].length) : ''

  const [display, setDisplay] = useState(target === null ? str : '0')

  useEffect(() => {
    if (target === null || !inView) return
    const start = performance.now()
    let raf
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const next = target * eased
      setDisplay(
        Number.isInteger(target)
          ? String(Math.round(next))
          : next.toFixed(1)
      )
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])

  return (
    <span ref={ref}>
      {target === null ? str : display + suffix}
    </span>
  )
}

export default AnimatedNumber
