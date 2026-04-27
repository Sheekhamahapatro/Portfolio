import { motion } from 'framer-motion'
import { skillGroups } from '../data/portfolioData'

const colorMap = {
  accent: 'bg-accent',
  accent2: 'bg-accent2',
  accent3: 'bg-accent3',
}

const SkillBar = ({ name, pct, color }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between mb-2">
      <span className="text-[13px] font-medium">{name}</span>
      <span className="text-[11px] text-muted">{pct}%</span>
    </div>
    <div className="h-[4px] bg-fg/[0.08] rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className={`h-full rounded-full ${colorMap[color] || 'bg-accent'}`}
      />
    </div>
  </div>
)

const Skills = () => {
  return (
    <section
      id="skills"
      className="section-pad bg-bg2 border-y border-line container-px"
    >
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 lg:mb-14"
        >
          <div>
            <div className="section-label">Expertise</div>
            <h2 className="section-title">Skills</h2>
          </div>
          <p className="text-muted text-sm lg:text-[15px] max-w-md">
            A blend of craft and process — the tools and methods I use to take
            ideas from messy whiteboard scribbles to shippable product.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 xl:gap-7"
        >
        {skillGroups.map((group) => (
          <motion.div
            key={group.label}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="bg-card border border-line rounded-xl p-6 hover:border-fg/15 transition-colors"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-muted font-semibold">
                {group.label}
              </span>
              <span className={`w-2 h-2 rounded-full ${colorMap[group.color]}`} />
            </div>
            {group.items.map((s) => (
              <SkillBar key={s.name} {...s} color={group.color} />
            ))}
          </motion.div>
        ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
