import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/portfolioData'
import Magnetic from './Magnetic'
import ThemeToggle from './ThemeToggle'
import { useActiveSection } from '../hooks/useActiveSection'

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const sectionIds = useMemo(
    () => navLinks.map((l) => l.href.replace('#', '')),
    []
  )
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', href)
    }
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-bg/80 border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="container-px flex items-center justify-between h-16">
        <div className="wrap !mx-0 flex items-center justify-between w-full">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            data-cursor="Top"
            className="font-display font-extrabold text-xl text-accent tracking-tight"
            aria-label="Back to top"
          >
            {profile.initials}<span className="text-text">.</span>
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = `#${activeId}` === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    aria-current={isActive ? 'page' : undefined}
                    className={`relative text-[12px] uppercase tracking-[0.15em] transition-colors after:absolute after:left-0 after:-bottom-1 after:h-px after:bg-accent after:transition-all ${
                      isActive
                        ? 'text-text after:w-full'
                        : 'text-muted hover:text-text after:w-0 hover:after:w-full'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <ThemeToggle />

            <Magnetic>
              <a
                href={`mailto:${profile.email}?subject=Let%27s%20work%20together`}
                data-cursor="Hire"
                className="hidden md:inline-flex items-center bg-accent text-accent-fg px-4 py-2 rounded font-bold text-[12px] tracking-wide hover:opacity-90 transition-opacity"
              >
                Hire Me
              </a>
            </Magnetic>

            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2 rounded-md hover:bg-fg/5 transition-colors"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-line bg-bg/95 backdrop-blur"
          >
            <ul className="container-px py-4 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = `#${activeId}` === link.href
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center justify-between py-3 text-sm uppercase tracking-[0.15em] border-b border-line transition-colors ${
                        isActive ? 'text-accent' : 'text-muted hover:text-text'
                      }`}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
                      )}
                    </a>
                  </li>
                )
              })}
              <li className="pt-3">
                <a
                  href={`mailto:${profile.email}?subject=Let%27s%20work%20together`}
                  className="btn-primary w-full justify-center"
                  onClick={() => setOpen(false)}
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar
