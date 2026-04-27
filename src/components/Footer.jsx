import { ArrowUp } from 'lucide-react'
import { profile, navLinks } from '../data/portfolioData'

const Footer = () => {
  const year = new Date().getFullYear()

  const handleNav = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="border-t border-line container-px py-10 lg:py-12">
      <div className="wrap flex flex-col gap-8">
        <div className="grid sm:grid-cols-3 gap-8 items-start">
          <div>
            <a
              href="#top"
              onClick={handleTop}
              className="font-display font-extrabold text-2xl text-accent tracking-tight"
            >
              {profile.initials}<span className="text-text">.</span>
            </a>
            <p className="text-muted text-[13px] mt-3 max-w-xs leading-relaxed">
              Designing intuitive, beautiful, human-centered digital products.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-center">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNav(e, l.href)}
                className="text-[12px] uppercase tracking-[0.2em] text-muted hover:text-text transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex sm:justify-end">
            <button
              onClick={handleTop}
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em] text-muted hover:text-accent transition-colors"
            >
              Back to top <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-6 border-t border-line">
          <div className="text-[11px] text-muted">
            © {year} {profile.name}. All rights reserved.
          </div>
          <div className="text-[11px] text-muted">
            Designed &amp; built with <span className="text-accent">care</span> · React + Tailwind + Framer Motion
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
