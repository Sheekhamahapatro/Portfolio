import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Mail, Linkedin, FileText } from 'lucide-react'
import { profile } from '../data/portfolioData'

/**
 * Persistent invitation-to-act in the bottom-right corner.
 * Tap → expands into a small panel with quick actions: email, schedule call, LinkedIn.
 * The pulse and slight pop on first paint draw the eye without being noisy.
 */
const FloatingChat = () => {
  const [open, setOpen] = useState(false)

  const actions = [
    {
      label: 'Send an email',
      sub: profile.email,
      Icon: Mail,
      href: `mailto:${profile.email}?subject=Project%20inquiry`,
    },
    {
      label: 'Chat on WhatsApp',
      sub: profile.phone,
      Icon: MessageCircle,
      href: profile.socials.whatsapp,
      external: true,
    },
    {
      label: 'Connect on LinkedIn',
      sub: 'View my profile',
      Icon: Linkedin,
      href: profile.socials.linkedin,
      external: true,
    },
    {
      label: 'Download résumé',
      sub: 'PDF · Latest version',
      Icon: FileText,
      href: profile.resumeUrl,
      download: profile.resumeFileName,
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="w-[290px] sm:w-[320px] bg-bg2/95 backdrop-blur-md border border-line rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-line">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-accent/20 grid place-items-center font-bold text-accent text-sm">
                  {profile.initials}
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent2 border-2 border-bg2" />
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold leading-tight">
                  {profile.name}
                </div>
                <div className="text-[11px] text-muted mt-0.5">
                  Usually replies within an hour
                </div>
              </div>
            </div>

            <div className="p-2">
              {actions.map(({ label, sub, Icon, href, external, download }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  download={download}
                  onClick={() => setOpen(false)}
                  className="group flex items-center gap-3 p-3 rounded-lg hover:bg-fg/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-bg3 border border-line grid place-items-center flex-shrink-0 group-hover:border-accent/40 transition-colors">
                    <Icon className="w-4 h-4 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium">{label}</div>
                    <div className="text-[11px] text-muted truncate">{sub}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="px-4 py-3 border-t border-line flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent2 animate-pulse" />
                Online
              </span>
              <span>Noida · IST</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close quick actions' : 'Open quick actions'}
        data-cursor={open ? 'Close' : 'Let’s talk'}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative inline-flex items-center gap-2 bg-accent text-accent-fg font-bold text-[13px] px-4 py-3 rounded-full shadow-glow-accent"
      >
        {!open && (
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30"
          />
        )}
        <span className="relative grid place-items-center w-5 h-5">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span
                key="m"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MessageCircle className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="relative">{open ? 'Close' : 'Let’s talk'}</span>
      </motion.button>
    </div>
  )
}

export default FloatingChat
