import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '../hooks/useActiveSection'
import { profile } from '../data/portfolioData'

// Sections in scroll order. `id` matches the DOM element's id, `label` is the
// short nav label, `narrator` is the contextual one-liner from Sheekha that
// guides visitors through the page.
const SECTIONS = [
  {
    id: 'top',
    label: 'Hello',
    narrator: "Hey, I'm Sheekha 👋",
    sub: "UX/UI designer who codes — welcome in.",
  },
  {
    id: 'about',
    label: 'About',
    narrator: 'A bit about me',
    sub: "Designer, developer, and curious problem-solver.",
  },
  {
    id: 'work',
    label: 'Work',
    narrator: 'My selected work',
    sub: 'Click any card to dive into the case study.',
  },
  {
    id: 'skills',
    label: 'Skills',
    narrator: 'My toolkit',
    sub: 'Design + frontend + the workflow glue.',
  },
  {
    id: 'career',
    label: 'Career',
    narrator: 'My journey so far',
    sub: 'Two years across startups, agencies, and freelance.',
  },
  {
    id: 'contact',
    label: "Let's talk",
    narrator: 'Ready to build something?',
    sub: "I'm a message away — say hi.",
  },
]

const SECTION_IDS = SECTIONS.map((s) => s.id)

const handleJump = (id) => {
  const target = document.getElementById(id)
  if (!target) return
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  window.history.replaceState(null, '', `#${id}`)
}

const SectionGuide = () => {
  const activeId = useActiveSection(SECTION_IDS)
  const active = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0]

  return (
    <motion.aside
      aria-label="Section guide"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="hidden lg:flex fixed right-5 xl:right-7 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5 pointer-events-none"
    >
      {/* Vertical dots — each acts as a clickable section link with a hover label. */}
      <ul className="flex flex-col items-end gap-3 pointer-events-auto">
        {SECTIONS.map((s) => {
          const isActive = s.id === activeId
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => handleJump(s.id)}
                aria-label={`Jump to ${s.label} section`}
                aria-current={isActive ? 'true' : undefined}
                data-cursor={s.label}
                className="group relative flex items-center justify-end gap-3 cursor-pointer"
              >
                <span
                  className={`text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 ${
                    isActive
                      ? 'text-accent opacity-100 translate-x-0'
                      : 'text-muted opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                  }`}
                >
                  {s.label}
                </span>
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-3 h-3 bg-accent shadow-glow-accent'
                      : 'w-2 h-2 bg-muted/50 group-hover:bg-fg/60'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>

      {/* Narrator card — Sheekha's avatar + a contextual message that crossfades
          when the active section changes. Acts as a guided-tour voice. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-auto max-w-[240px] flex items-start gap-3 bg-card/90 backdrop-blur-md border border-line rounded-2xl px-3.5 py-3 shadow-lg shadow-black/10 dark:shadow-black/40"
        >
          <div
            aria-hidden
            className="relative flex-shrink-0 w-9 h-9 rounded-full bg-accent text-accent-fg grid place-items-center font-display font-extrabold text-[13px] tracking-tight"
          >
            {profile.initials}
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-accent2 ring-2 ring-card" />
          </div>
          <div className="min-w-0">
            <div className="font-display font-bold text-[13px] tracking-tight text-text leading-snug">
              {active.narrator}
            </div>
            <div className="text-[11px] text-muted leading-snug mt-0.5">
              {active.sub}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.aside>
  )
}

export default SectionGuide
