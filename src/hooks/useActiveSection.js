import { useEffect, useState } from 'react'

/**
 * Tracks which section is currently in the viewport using IntersectionObserver.
 *
 * The rootMargin creates a "viewport band" of ~30vh in the middle of the screen —
 * a section is considered active only while the viewport's centre is inside it.
 * That gives a stable, intentional active state instead of flickering between
 * sections on every pixel of scroll.
 */
export const useActiveSection = (sectionIds, options = {}) => {
  const [activeId, setActiveId] = useState(sectionIds[0] || null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the most-visible intersecting entry; fall back gracefully when none.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActiveId(visible[0].target.id)
      },
      {
        rootMargin: options.rootMargin || '-35% 0px -55% 0px',
        threshold: options.threshold || [0, 0.25, 0.5, 0.75, 1],
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, options.rootMargin, options.threshold])

  return activeId
}
