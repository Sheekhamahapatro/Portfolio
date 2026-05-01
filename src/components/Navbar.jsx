import { profile } from '../data/portfolioData'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.history.replaceState(null, '', href)
    }
  }

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 border-b"
      style={{
        background: 'rgba(10,10,10,0.9)',
        borderColor: 'rgba(255,255,255,0.09)',
        borderBottomWidth: '0.5px',
        backdropFilter: 'blur(16px)',
      }}
    >
      <nav className="px-[20px] md:px-[52px] py-[20px]">
        <div className="flex items-center justify-between gap-5">
          <a
            href="#top"
            onClick={(e) => handleNavClick(e, '#top')}
            className="font-display text-[20px] font-normal text-[#f5f2ee] tracking-[-0.02em]"
            aria-label="Back to top"
          >
            SM.
          </a>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[13.5px] font-normal text-[rgba(245,242,238,0.55)] transition-colors hover:text-[#f5f2ee]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={`mailto:${profile.email}?subject=Let%27s%20talk`}
            className="inline-flex items-center rounded-full border px-5 py-2.5 text-[13.5px] font-medium transition-colors hover:bg-[#c8f04a] hover:text-[#0a0a0a]"
            style={{
              borderWidth: '0.5px',
              borderColor: '#c8f04a',
              color: '#c8f04a',
            }}
          >
            Let's talk →
          </a>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
