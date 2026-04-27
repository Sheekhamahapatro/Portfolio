import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  ArrowUpRight,
  Linkedin,
  Github,
  FileText,
  MessageCircle,
} from 'lucide-react'
import { profile } from '../data/portfolioData'
import Magnetic from './Magnetic'

const socialLinks = [
  {
    label: 'LinkedIn',
    sub: 'Connect with me',
    url: profile.socials.linkedin,
    Icon: Linkedin,
    external: true,
  },
  {
    label: 'GitHub',
    sub: '@sheekhamahapatro',
    url: profile.socials.github,
    Icon: Github,
    external: true,
  },
  {
    label: 'Download CV',
    sub: 'PDF · Latest version',
    url: profile.resumeUrl,
    Icon: FileText,
    download: profile.resumeFileName,
  },
  {
    label: 'WhatsApp',
    sub: profile.phone,
    url: profile.socials.whatsapp,
    Icon: MessageCircle,
    external: true,
  },
]

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`New project inquiry from ${form.name || 'a friend'}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    )
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section
      id="contact"
      className="section-pad bg-bg2 border-y border-line container-px relative overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgb(var(--accent) / 0.12), transparent 70%)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-5xl xl:max-w-6xl mx-auto"
      >
        <div className="text-center mb-12 lg:mb-16">
          <div className="section-label inline-block">Get In Touch</div>
          <h2 className="font-display font-extrabold tracking-tightest leading-[1.05] text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-[88px]">
            Let's make <br />
            something <span className="text-accent">great.</span>
          </h2>
          <p className="text-muted mt-5 max-w-xl mx-auto leading-relaxed lg:text-[17px]">
            Open to full-time roles, freelance projects, and design consultations. I
            respond within 24 hours.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 lg:gap-10">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-line rounded-2xl p-6 sm:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  Name
                </span>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="mt-2 w-full bg-bg3 border border-line rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent/50 focus:bg-bg2 transition-colors placeholder:text-muted/60"
                />
              </label>
              <label className="block">
                <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                  Email
                </span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  className="mt-2 w-full bg-bg3 border border-line rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent/50 focus:bg-bg2 transition-colors placeholder:text-muted/60"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
                Tell me about your project
              </span>
              <textarea
                required
                rows={5}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="A few words about goals, timeline, scope…"
                className="mt-2 w-full bg-bg3 border border-line rounded-md px-4 py-3 text-sm focus:outline-none focus:border-accent/50 focus:bg-bg2 transition-colors placeholder:text-muted/60 resize-none"
              />
            </label>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <Magnetic>
                <button type="submit" data-cursor="Send" className="btn-primary">
                  <Mail className="w-4 h-4" />
                  {sent ? 'Opening your email…' : 'Send Message'}
                </button>
              </Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="text-muted text-[13px] hover:text-text transition-colors"
              >
                or email <span className="text-accent">{profile.email}</span>
              </a>
            </div>
          </form>

          {/* Info / socials */}
          <div className="flex flex-col gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="group bg-card border border-line rounded-2xl p-6 flex items-start justify-between gap-4 hover:border-accent/30 transition-colors"
            >
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-muted mb-2">
                  Email
                </div>
                <div className="font-display font-bold text-lg text-accent break-all">
                  {profile.email}
                </div>
                <p className="text-muted text-[13px] mt-2">{profile.location}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-muted group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
            </a>

            <div className="grid grid-cols-2 gap-3">
              {socialLinks.map(({ label, sub, url, Icon, external, download }) => (
                <a
                  key={label}
                  href={url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  download={download}
                  data-cursor={download ? 'Download' : 'Open'}
                  className="group bg-card border border-line rounded-xl p-4 flex items-start justify-between gap-3 hover:border-accent/30 hover:bg-bg3 transition-all"
                >
                  <div className="min-w-0">
                    <span className="flex items-center gap-2 text-[13px] font-medium">
                      <Icon className="w-4 h-4 text-accent flex-shrink-0" />
                      {label}
                    </span>
                    <span className="block text-[11px] text-muted mt-1 truncate">
                      {sub}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent transition-colors flex-shrink-0 mt-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact
