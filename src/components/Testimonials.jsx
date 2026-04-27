import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import { testimonials } from '../data/portfolioData'

const avatarColors = {
  accent: 'bg-accent/15 text-accent',
  accent2: 'bg-accent2/15 text-accent2',
  accent3: 'bg-accent3/20 text-accent3',
}

const Testimonials = () => {
  return (
    <section id="praise" className="section-pad container-px">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mb-10 lg:mb-14"
        >
          <div className="section-label">Kind Words</div>
          <h2 className="section-title">Testimonials</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 xl:gap-7"
        >
        {testimonials.map((t) => (
          <motion.figure
            key={t.name}
            variants={{
              hidden: { opacity: 0, y: 24 },
              show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
            }}
            whileHover={{ y: -4 }}
            className="relative bg-card border border-line rounded-xl p-6 transition-colors hover:border-fg/15"
          >
            <Quote className="absolute top-5 right-5 w-7 h-7 text-accent/15" />

            <blockquote className="text-[14px] leading-[1.75] text-text/75 italic mb-6 relative z-[1]">
              &ldquo;{t.text}&rdquo;
            </blockquote>

            <figcaption className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full grid place-items-center font-bold text-[12px] ${avatarColors[t.color]}`}
              >
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-[13px] leading-tight">{t.name}</div>
                <div className="text-[11px] text-muted mt-0.5">{t.role}</div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials
