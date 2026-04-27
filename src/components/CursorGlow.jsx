import { useEffect, useLayoutEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/** Punches a full-viewport mask: white = glow visible, black = cut out. */
const buildViewMask = (ww, wh, l, t, w, h, r) => {
  const inner = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ww} ${wh}">
  <rect width="100%" height="100%" fill="white"/>
  <rect x="${l}" y="${t}" width="${w}" height="${h}" rx="${r}" fill="black"/>
</svg>`.replace(/\n/g, '')
  return `url("data:image/svg+xml,${encodeURIComponent(inner)}")`
}

/**
 * Interactive ambient gradient that follows the cursor.
 *
 * The effect is a pair of large, soft radial-gradient blobs that translate
 * with the pointer through spring-damped motion values:
 *   - The lead blob uses `--accent` and tracks the cursor closely.
 *   - The trailing blob uses `--accent2` and lags slightly, giving the
 *     pair a layered "two-light" feel rather than a single hard puck.
 *
 * Blend mode is theme-aware:
 *   - Dark theme: `mix-blend-screen` — lime reads as a luminous halo.
 *   - Light theme: `mix-blend-overlay` — tints general UI; the About avatar
 *     (`#glow-exclude-avatar`) is cut out via a dynamic mask so the glow
 *     never tints `girl.svg`.
 *
 * The component opts out entirely on touch devices, reduced-motion users,
 * and viewports below `md` — those audiences shouldn't pay the runtime
 * cost for an effect they can't experience or have asked us to skip.
 */
const CursorGlow = () => {
  const [enabled, setEnabled] = useState(false)
  const [glowMask, setGlowMask] = useState(null)

  // Spawn the blobs far off-screen so they don't appear at (0,0) before
  // the user has moved the mouse. The first mousemove brings them in.
  const x = useMotionValue(-1000)
  const y = useMotionValue(-1000)

  // Two springs at different stiffness/mass so the second blob trails the
  // first by a beat — gives the gradient a sense of depth and direction.
  const sx1 = useSpring(x, { stiffness: 60, damping: 20, mass: 0.8 })
  const sy1 = useSpring(y, { stiffness: 60, damping: 20, mass: 0.8 })
  const sx2 = useSpring(x, { stiffness: 32, damping: 18, mass: 1.4 })
  const sy2 = useSpring(y, { stiffness: 32, damping: 18, mass: 1.4 })

  // Each blob's box is anchored top-left, so we need to subtract half its
  // size to center it on the cursor. Boxes are a bit large so a heavy
  // `filter: blur()` can bloom without hard clipping.
  const tx1 = useTransform(sx1, (v) => v - 400) // 800 / 2
  const ty1 = useTransform(sy1, (v) => v - 400)
  const tx2 = useTransform(sx2, (v) => v - 300) // 600 / 2
  const ty2 = useTransform(sy2, (v) => v - 300)

  useEffect(() => {
    if (typeof window === 'undefined') return
    // Skip on touch (no pointer hovering), reduced motion, and small screens.
    const noHover = window.matchMedia('(hover: none)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 767px)').matches
    if (noHover || reduced || small) return

    setEnabled(true)

    const onMove = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [x, y])

  // Cut a viewport-aligned hole over the About avatar so the cursor gradient
  // does not cover `girl.svg` (or its frame), while the rest of the page
  // still tints. Mask updates on scroll, resize, and when the target resizes.
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || !enabled) return

    const update = () => {
      const el = document.getElementById('glow-exclude-avatar')
      if (!el) {
        setGlowMask(null)
        return
      }
      const r = el.getBoundingClientRect()
      const pad = 4
      const ww = window.innerWidth
      const wh = window.innerHeight
      const l = r.left - pad
      const t = r.top - pad
      const w = r.width + pad * 2
      const h = r.height + pad * 2
      const rRad = 16
      if (r.width < 1 || r.height < 1) {
        setGlowMask(null)
        return
      }
      const m = buildViewMask(ww, wh, l, t, w, h, rRad)
      setGlowMask(m)
    }

    update()
    const ro = new ResizeObserver(() => requestAnimationFrame(update))
    const node = document.getElementById('glow-exclude-avatar')
    if (node) ro.observe(node)
    window.addEventListener('scroll', update, { passive: true, capture: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      ro.disconnect()
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [enabled])

  if (!enabled) return null

  // Stacking: must sit *above* in-flow page content (photos, cards) so the
  // blend actually hits the image pixels. z-25 clears in-page `z-20` layers
  // (e.g. Hero scroll cue) and remains below nav / chrome at z-40+.
  // Light: `overlay` reads on both light and mid skin tones; dark: `screen`
  // keeps the lime read as a glow on near-black.
  // Mask is built in viewport space, so it must sit on a full-viewport
  // layer — not on the small blob divs, or the hole would map incorrectly.
  const maskStyle = glowMask
    ? {
        WebkitMaskImage: glowMask,
        WebkitMaskSize: '100% 100%',
        WebkitMaskPosition: '0 0',
        WebkitMaskRepeat: 'no-repeat',
        maskImage: glowMask,
        maskSize: '100% 100%',
        maskPosition: '0 0',
        maskRepeat: 'no-repeat',
      }
    : {}

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[25] mix-blend-overlay dark:mix-blend-screen"
      style={maskStyle}
    >
      {/* Lead blob — light, very soft, blurred; follows cursor closely */}
      <motion.div
        className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full will-change-[transform,filter]"
        style={{
          x: tx1,
          y: ty1,
          filter: 'blur(64px)',
          background:
            'radial-gradient(circle closest-side, rgb(var(--accent) / 0.22) 0%, rgb(var(--accent) / 0.09) 48%, transparent 78%)',
        }}
      />
      {/* Trailing blob — accent2, smaller core, more blur for a misty trail */}
      <motion.div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full will-change-[transform,filter]"
        style={{
          x: tx2,
          y: ty2,
          filter: 'blur(80px)',
          background:
            'radial-gradient(circle closest-side, rgb(var(--accent2) / 0.16) 0%, rgb(var(--accent2) / 0.06) 50%, transparent 80%)',
        }}
      />
    </div>
  )
}

export default CursorGlow
