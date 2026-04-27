import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/**
 * Subtle scroll invitation that lives at the bottom of the hero. It bounces gently
 * to attract attention, then fades out the moment the user starts scrolling so it
 * never gets in the way of content. Pressing it scrolls to the next section.
 */
const ScrollCue = ({ targetId = 'about' }) => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 80) setHidden(true)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = () => {
    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <AnimatePresence>
      {!hidden && (
        <motion.button
          type="button"
          onClick={handleClick}
          aria-label="Scroll to next section"
          data-cursor="Scroll"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="group absolute left-1/2 -translate-x-1/2 bottom-24 sm:bottom-28 lg:bottom-32 z-20 hidden sm:flex flex-col items-center gap-2 cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted group-hover:text-text transition-colors">
            Scroll
          </span>
          <motion.span
            aria-hidden
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="grid place-items-center w-8 h-8 rounded-full border border-line group-hover:border-accent/50 transition-colors"
          >
            <ChevronDown className="w-4 h-4 text-muted group-hover:text-accent transition-colors" />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default ScrollCue
