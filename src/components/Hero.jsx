import { motion } from 'framer-motion'
import { ArrowDown, Download, Sparkles } from 'lucide-react'
import { profile, stats, marqueeWords } from '../data/portfolioData'
import Magnetic from './Magnetic'
import AnimatedNumber from './AnimatedNumber'
import ScrollCue from './ScrollCue'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const Hero = () => {
  const handleViewWork = (e) => {
    e.preventDefault()
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="top"
      className="relative pt-28 md:pt-32 lg:pt-40 xl:pt-44 pb-20 md:pb-24 lg:pb-28 container-px overflow-hidden flex flex-col min-h-[88vh] lg:min-h-[92vh]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.06] animate-grid-shift"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 w-[420px] h-[420px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent) / 0.18), transparent)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 w-[480px] h-[480px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(closest-side, rgb(var(--accent2) / 0.12), transparent)' }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative wrap flex-1 flex flex-col justify-center"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center gap-2 bg-accent/10 border border-accent/25 text-accent rounded-full px-3 py-[5px] text-[11px] tracking-wide mb-6 w-fit"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          {profile.status}
        </motion.span>

        <motion.h1
          variants={item}
          className="font-display font-extrabold leading-[0.95] tracking-tightest text-balance"
          style={{ fontSize: 'clamp(44px, 7.6vw, 124px)' }}
        >
          <span className="text-accent">{profile.name}</span>
          <span className="block mt-2 text-text/30 tracking-tight" style={{ fontSize: '0.5em' }}>
            {profile.role}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-xl lg:max-w-2xl text-muted text-base md:text-[17px] lg:text-[19px] leading-[1.7]"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href="#work"
              onClick={handleViewWork}
              data-cursor="Explore"
              className="btn-primary"
            >
              View My Work
              <ArrowDown className="w-4 h-4" />
            </a>
          </Magnetic>
          <Magnetic strength={0.25}>
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Download"
              className="btn-ghost"
            >
              <Download className="w-4 h-4" />
              Download CV
            </a>
          </Magnetic>
          <a
            href={`mailto:${profile.email}`}
            className="hidden sm:inline-flex items-center gap-2 text-muted hover:text-text text-[13px] ml-1 transition-colors"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            {profile.email}
          </a>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-14 lg:mt-20 pt-8 border-t border-line grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10 lg:gap-14 max-w-3xl lg:max-w-5xl"
        >
          {stats.map((s) => (
            <div key={s.label} className="group">
              <div
                className={`font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl 2xl:text-[56px] tracking-tight leading-none transition-colors ${
                  s.accent ? 'text-accent2' : 'text-accent'
                } group-hover:opacity-90`}
              >
                <AnimatedNumber value={s.num} />
              </div>
              <div className="mt-2 text-[10px] sm:text-[11px] uppercase tracking-[0.15em] text-muted">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <ScrollCue targetId="about" />

      {/* Marquee strip — full-bleed across breakpoints by inverting container-px */}
      <div
        aria-hidden
        className="relative mt-16 lg:mt-20 -mx-5 sm:-mx-8 md:-mx-10 lg:-mx-14 xl:-mx-20 2xl:-mx-24 border-y border-line py-4 lg:py-5 overflow-hidden"
      >
        <div className="flex w-max animate-marquee gap-12 px-6 text-muted/70 text-sm lg:text-base uppercase tracking-[0.25em]">
          {[...marqueeWords, ...marqueeWords].map((w, i) => (
            <span key={i} className="flex items-center gap-12 whitespace-nowrap">
              {w}
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
