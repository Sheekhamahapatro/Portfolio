import { motion } from 'framer-motion'
import { profile, aboutTags } from '../data/portfolioData'
import Avatar2D from './Avatar2D'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const About = () => {
  return (
    <section
      id="about"
      className="section-pad bg-bg2 border-y border-line container-px"
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="wrap grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-12 lg:gap-20 xl:gap-24 items-center"
      >
        <motion.div variants={fadeUp} className="relative">
          <div className="relative w-full max-w-[280px] lg:max-w-[360px] xl:max-w-[400px] aspect-square mx-auto lg:mx-0">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-accent/30 via-accent2/10 to-transparent blur-xl opacity-60" />
            <div
              id="glow-exclude-avatar"
              className="relative w-full h-full bg-bg3 rounded-2xl border border-line overflow-hidden"
            >
              <div className="absolute inset-0 grid-overlay opacity-[0.05]" />
              <Avatar2D />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] z-10">
                <span className="text-muted">{profile.initials}.&nbsp;v2026</span>
                <span className="text-accent flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Online
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="section-label">About Me</div>
          <h2 className="section-title mb-6">
            Crafting experiences <br className="hidden sm:block" />
            that matter.
          </h2>

          <p className="text-text/75 text-base md:text-[17px] lg:text-[18px] xl:text-[19px] leading-[1.8] mb-5">
            I'm a UX/UI designer{' '}
            <span className="text-accent border-b border-accent/40">who codes</span> —
            pairing Figma craft with pixel-accurate frontend work in React, Next.js,
            and Angular. I love turning research into product decisions and building
            accessible, device-agnostic interfaces around them.
          </p>

          <p className="text-text/75 text-base md:text-[17px] lg:text-[18px] xl:text-[19px] leading-[1.8] mb-8">
            Right now I'm designing &amp; shipping at{' '}
            <span className="text-accent border-b border-accent/40">Softlabs Infotech</span>{' '}
            in Noida. I care about clean design systems, ARIA-grade accessibility,
            and the tiny details that make interfaces feel effortless.
          </p>

          <div className="flex flex-wrap gap-2">
            {aboutTags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default About
