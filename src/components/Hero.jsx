import { profile } from '../data/portfolioData'

const statCards = [
  { value: '2', suffix: '+', label: 'Years of industry experience' },
  { value: '10', suffix: '+', label: 'Projects shipped end-to-end' },
  { value: '9', suffix: '', label: 'Client collaborations' },
  { value: '6', suffix: '★', label: 'Client testimonials received' },
]

const coreStack = [
  'Figma',
  'React.js',
  'Next.js',
  'TypeScript',
  'Angular',
  'Tailwind CSS',
  'Accessibility',
]

const Hero = () => {
  const handleViewWork = (e) => {
    e.preventDefault()
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <section
        id="top"
        className="relative min-h-screen overflow-hidden mb-0 px-[20px] pt-[96px] pb-[100px] md:px-[52px] md:pt-[120px]"
        style={{ backgroundColor: '#0a0a0a', marginBottom: 0 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-220px] right-[-120px] h-[500px] w-[500px] rounded-full"
          style={{
            background:
              'radial-gradient(circle at center, rgba(200,240,74,0.055) 0%, rgba(200,240,74,0) 72%)',
          }}
        />

        <div className="grid min-h-[calc(100vh-220px)] grid-cols-1 md:grid-cols-[0.9fr_1.1fr] lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="order-2 lg:order-1 hero-fade-up">
            <div
              className="mb-[30px] inline-flex items-center gap-2 rounded-full border px-4 py-2"
              style={{
                backgroundColor: '#141414',
                borderColor: 'rgba(255,255,255,0.09)',
                borderWidth: '0.5px',
              }}
            >
              <span className="hero-dot-pulse h-[8px] w-[8px] rounded-full bg-[#c8f04a]" />
              <span className="text-[12px] text-[rgba(245,242,238,0.55)]">Open to opportunities</span>
            </div>

            <h1
              className="mb-4 leading-none tracking-[-0.03em] text-[#f5f2ee]"
              style={{ fontFamily: 'Fraunces, serif', fontSize: 'clamp(54px, 6.2vw, 80px)' }}
            >
              <span className="block">Sheekha</span>
              <span className="block italic text-[#c8f04a]">Mahapatro</span>
            </h1>

            <p className="mb-8 text-[14px] uppercase tracking-[0.13em] text-[rgba(245,242,238,0.55)]">
              UX / UI Designer · Frontend Developer
            </p>

            <span className="mb-7 block h-[1.5px] w-9 bg-[#c8f04a] opacity-55" />

            <p className="mb-11 max-w-[460px] text-[17px] leading-[1.8] font-light text-[rgba(245,242,238,0.65)]">
              I bridge the gap between <strong className="font-medium text-[#f5f2ee]">design and engineering</strong>{' '}
              - turning research into pixel-precise interfaces and accessible, production-ready
              code. Currently designing at{' '}
              <strong className="font-medium text-[#f5f2ee]">Software Infotech, Noida</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#work"
                onClick={handleViewWork}
                className="inline-flex items-center rounded-full bg-[#c8f04a] px-[30px] py-[14px] text-[14px] font-medium text-[#0a0a0a]"
              >
                View my work →
              </a>
              <a
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border px-[30px] py-[14px] text-[14px] font-medium text-[rgba(245,242,238,0.55)] transition-colors hover:text-[#f5f2ee]"
                style={{ borderWidth: '0.5px', borderColor: 'rgba(255,255,255,0.09)' }}
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 hero-fade-up hero-fade-delay">
            <div className="grid grid-cols-2 gap-[10px]">
              {statCards.map((card) => (
                <div
                  key={card.label}
                  className="rounded-[14px] border bg-[#141414] p-[22px_20px] transition-colors hover:border-[rgba(200,240,74,0.28)]"
                  style={{ borderWidth: '0.5px', borderColor: 'rgba(255,255,255,0.09)' }}
                >
                  <p className="mb-2 leading-none text-[#f5f2ee]" style={{ fontFamily: 'Fraunces, serif' }}>
                    <span className="text-[38px] font-normal">{card.value}</span>
                    <span className="ml-0.5 text-[22px] text-[#c8f04a]">{card.suffix}</span>
                  </p>
                  <p className="text-[12.5px] leading-[1.5] text-[rgba(245,242,238,0.3)]">{card.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-fade-up hero-scroll-cue absolute bottom-[38px] left-[52px] flex flex-col items-center gap-[10px]">
          <span className="text-[11px] uppercase tracking-[0.1em] text-[rgba(245,242,238,0.3)]">SCROLL</span>
          <span
            className="relative inline-flex h-[44px] w-[28px] items-start justify-center rounded-[14px] border pt-[7px]"
            style={{ borderWidth: '1.5px', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            <span className="hero-scroll-dot h-[5px] w-[5px] rounded-full bg-[#c8f04a]" />
          </span>
        </div>
      </section>

      <section
        aria-label="Current role and core stack"
        className="hero-strip hero-fade-up"
        style={{
          backgroundColor: '#141414',
          borderTop: '0.5px solid rgba(255,255,255,0.09)',
          marginTop: 0,
        }}
      >
        <div className="flex flex-wrap items-center gap-12 px-[20px] py-[24px] md:px-[52px] md:py-[28px]">
          <div className="flex items-center gap-3">
            <div
              aria-hidden
              className="h-[42px] w-[42px] rounded-[12px] border"
              style={{
                borderWidth: '0.5px',
                borderColor: '#c8f04a',
                backgroundColor: 'rgba(200,240,74,0.1)',
              }}
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.1em] text-[rgba(245,242,238,0.3)]">CURRENTLY AT</p>
              <p className="text-[14px] font-medium text-[#f5f2ee]">Software Infotech, Noida</p>
              <p className="text-[12.5px] font-light text-[rgba(245,242,238,0.55)]">
                UX/UI Designer &amp; Junior Frontend Developer
              </p>
            </div>
          </div>

          <span
            aria-hidden
            className="hero-strip-divider block h-[40px] w-px"
            style={{ backgroundColor: 'rgba(255,255,255,0.09)' }}
          />

          <div>
            <p className="mb-[10px] text-[11px] uppercase tracking-[0.1em] text-[rgba(245,242,238,0.3)]">
              CORE STACK
            </p>
            <div className="flex flex-wrap gap-[7px]">
              {coreStack.map((item) => (
                <span
                  key={item}
                  className="rounded-[20px] border px-[13px] py-[5px] text-[12.5px] text-[rgba(245,242,238,0.55)] transition-colors hover:border-[rgba(200,240,74,0.38)] hover:text-[#c8f04a]"
                  style={{ borderWidth: '0.5px', borderColor: 'rgba(255,255,255,0.09)' }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Hero
