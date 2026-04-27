import { useRef, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, X, Calendar, User } from 'lucide-react'
import { projects } from '../data/portfolioData'

// Each palette is a single saturated brand colour. The cover background is derived
// at render time as a low-alpha tint of `fg` so the panel adapts on both light and
// dark themes (subtle dark tint in dark mode, soft pastel in light mode).
const palettes = {
  blue:   { fg: '#3A8BD9' },
  green:  { fg: '#3DB23D' },
  purple: { fg: '#8C5BFF' },
  coral:  { fg: '#FF6B6B' },
  teal:   { fg: '#3DD9B5' },
  amber:  { fg: '#FFB347' },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const ProjectCard = ({ project, onOpen, large }) => {
  const palette = palettes[project.palette] || palettes.blue
  const cardRef = useRef(null)

  // 3D tilt — track cursor position relative to card centre and map to rotateX/Y.
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const sx = useSpring(mouseX, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(mouseY, { stiffness: 200, damping: 18, mass: 0.4 })
  const rotateX = useTransform(sy, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8])
  const spotlightX = useTransform(sx, [-0.5, 0.5], ['0%', '100%'])
  const spotlightY = useTransform(sy, [-0.5, 0.5], ['0%', '100%'])
  // Spotlight uses the project's brand colour so it harmonises with the cover panel
  // in both light and dark themes.
  const spotlight = useTransform(
    [spotlightX, spotlightY],
    ([x, y]) => `radial-gradient(280px circle at ${x} ${y}, ${palette.fg}33, transparent 65%)`
  )

  const handleMove = (e) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    mouseX.set(px)
    mouseY.set(py)
  }
  const handleLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.button
      ref={cardRef}
      type="button"
      onClick={() => onOpen(project)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
      data-cursor="View case"
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative text-left bg-card border border-line rounded-xl overflow-hidden hover:border-accent/30 transition-colors flex flex-col ${
        large ? 'sm:col-span-2' : ''
      }`}
    >
      <div
        className={`relative w-full flex items-center justify-center overflow-hidden ${
          large
            ? 'h-[220px] sm:h-[260px] lg:h-[320px] xl:h-[360px]'
            : 'h-[200px] lg:h-[240px] xl:h-[260px]'
        }`}
        // 22% alpha tint of the brand colour — shows as a deep dark wash in dark mode
        // and a soft pastel in light mode while the saturated `fg` text reads on both.
        style={{ backgroundColor: `${palette.fg}38`, color: palette.fg }}
      >
        <div className="absolute inset-0 grid-overlay opacity-[0.04]" />
        {/* Cursor-following spotlight */}
        <motion.div
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ background: spotlight }}
        />
        <motion.span
          className={`relative font-display font-extrabold tracking-tighter ${
            large
              ? 'text-[64px] sm:text-[80px] lg:text-[104px] xl:text-[120px]'
              : 'text-[48px] lg:text-[64px] xl:text-[72px]'
          }`}
          style={{ translateZ: 30 }}
        >
          {project.code}
        </motion.span>
        <span
          className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.2em] font-semibold"
          style={{ color: palette.fg, opacity: 0.75 }}
        >
          {project.year}
        </span>
        <span
          className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.2em] font-semibold"
          style={{ color: palette.fg, opacity: 0.75 }}
        >
          Case Study
        </span>
      </div>

      <div
        className="p-5 lg:p-6 xl:p-7 flex-1 flex flex-col"
        style={{ transform: 'translateZ(20px)' }}
      >
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display font-bold text-[17px] lg:text-[19px] xl:text-[20px] tracking-tight">
            {project.title}
          </h3>
          <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
        </div>
        <p className="mt-2 text-muted text-[13px] lg:text-[14px] leading-relaxed">{project.description}</p>
        {/* mt-auto pushes tags to the bottom so cards look balanced when the featured
            card forces a taller row height. */}
        <div className="mt-auto pt-4 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[10px] px-2.5 py-1 rounded-full bg-accent/[0.06] text-accent border border-accent/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.button>
  )
}

const ProjectModal = ({ project, onClose }) => {
  const palette = palettes[project.palette] || palettes.blue
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-bg2 border border-line rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
      >
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 grid place-items-center rounded-full bg-bg/80 border border-line hover:bg-fg/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className="relative h-44 sm:h-56 flex items-center justify-center"
          style={{ backgroundColor: `${palette.fg}38`, color: palette.fg }}
        >
          <div className="absolute inset-0 grid-overlay opacity-[0.06]" />
          <span className="font-display font-extrabold text-7xl tracking-tighter">
            {project.code}
          </span>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {project.year}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> {project.role}
            </span>
          </div>

          <h3 className="font-display font-extrabold text-3xl tracking-tight mb-3">
            {project.title}
          </h3>
          <p className="text-text/75 leading-relaxed mb-6">{project.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {project.impact.map((i) => (
              <div
                key={i}
                className="bg-bg3 border border-line rounded-lg p-3 text-[13px] text-text/85"
              >
                <span className="text-accent mr-1.5">▸</span>
                {i}
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] px-3 py-1 rounded-full bg-accent/[0.06] text-accent border border-accent/20"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={project.href} className="btn-primary">
              View Live Case Study <ArrowUpRight className="w-4 h-4" />
            </a>
            <button onClick={onClose} className="btn-ghost">
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Projects = () => {
  const [active, setActive] = useState(null)

  return (
    <section id="work" className="section-pad container-px">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14"
        >
          <div>
            <div className="section-label">Selected Work</div>
            <h2 className="section-title">Projects</h2>
          </div>
          <p className="text-muted text-sm lg:text-[15px] max-w-md">
            A curated set of recent case studies — covering research, system design,
            and end-to-end product work for ambitious teams.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-7"
        >
          {projects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpen={setActive}
              large={p.featured}
            />
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {active && (
          <ProjectModal project={active} onClose={() => setActive(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default Projects
