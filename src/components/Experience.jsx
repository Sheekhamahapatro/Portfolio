import { motion } from 'framer-motion'
import { Briefcase, GraduationCap, Award, MapPin, Calendar } from 'lucide-react'
import { experience, education, certifications } from '../data/portfolioData'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const TimelineItem = ({ item, index }) => (
  <motion.div
    variants={fadeUp}
    className="relative pl-8 sm:pl-10 pb-8 last:pb-0"
  >
    {/* Dot */}
    <span
      className={`absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 ${
        item.current
          ? 'bg-accent border-accent shadow-[0_0_0_4px_rgb(var(--accent)_/_0.15)]'
          : 'bg-bg2 border-accent/50'
      }`}
    />
    {/* Card */}
    <div className="bg-card border border-line rounded-xl p-5 hover:border-accent/30 transition-colors">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <div>
          <h3 className="font-display font-bold text-[17px] tracking-tight">
            {item.role}
          </h3>
          <div className="text-accent text-[13px] font-medium mt-0.5">
            {item.company}
          </div>
        </div>
        {item.current && (
          <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-accent2 bg-accent2/10 border border-accent2/30 rounded-full px-2.5 py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent2 animate-pulse" />
            Current
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.16em] text-muted mb-3">
        <span className="flex items-center gap-1.5">
          <Calendar className="w-3 h-3" /> {item.period}
        </span>
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3 h-3" /> {item.location}
        </span>
      </div>
      <ul className="space-y-2">
        {item.bullets.map((b) => (
          <li
            key={b}
            className="text-[13px] text-text/75 leading-relaxed flex gap-2"
          >
            <span className="text-accent mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
)

const Experience = () => {
  return (
    <section id="career" className="section-pad container-px">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14"
        >
          <div>
            <div className="section-label">Career & Background</div>
            <h2 className="section-title">Experience</h2>
          </div>
          <p className="text-muted text-sm lg:text-[15px] max-w-md">
            Two years building and designing products across early-stage startups,
            agencies, and freelance — from internship to full-stack ownership.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-10">
          {/* Timeline */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="relative"
          >
            <div className="flex items-center gap-2 mb-5 text-[11px] uppercase tracking-[0.2em] text-muted">
              <Briefcase className="w-3.5 h-3.5 text-accent" />
              Roles
            </div>
            <div className="relative">
              {/* Spine */}
              <div
                aria-hidden
                className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-accent/60 via-line to-transparent"
              />
              {experience.map((item, i) => (
                <TimelineItem key={item.company + item.period} item={item} index={i} />
              ))}
            </div>
          </motion.div>

          {/* Education + Certifications */}
          <motion.aside
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
            className="flex flex-col gap-5"
          >
            <motion.div
              variants={fadeUp}
              className="bg-card border border-line rounded-xl p-5 hover:border-fg/15 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.2em] text-muted">
                <GraduationCap className="w-3.5 h-3.5 text-accent" />
                Education
              </div>
              <div className="space-y-4">
                {education.map((e) => (
                  <div
                    key={e.degree}
                    className="border-l-2 border-accent/40 pl-4"
                  >
                    <div className="font-display font-bold text-[15px] tracking-tight">
                      {e.degree}
                    </div>
                    <div className="text-[13px] text-muted mt-1">{e.school}</div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-[11px] uppercase tracking-[0.18em] text-muted">
                      <span>{e.period}</span>
                      <span className="text-accent">{e.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="bg-card border border-line rounded-xl p-5 hover:border-fg/15 transition-colors"
            >
              <div className="flex items-center gap-2 mb-4 text-[11px] uppercase tracking-[0.2em] text-muted">
                <Award className="w-3.5 h-3.5 text-accent" />
                Certifications
              </div>
              <div className="space-y-4">
                {certifications.map((c) => (
                  <div key={c.issuer}>
                    <div className="text-[12px] font-bold uppercase tracking-[0.2em] text-accent2 mb-2">
                      {c.issuer}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.items.map((cert) => (
                        <span
                          key={cert}
                          className="text-[11px] px-2.5 py-1 rounded-md bg-bg3 border border-line text-text/80 hover:border-accent/30 hover:text-text transition-colors"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.aside>
        </div>
      </div>
    </section>
  )
}

export default Experience
