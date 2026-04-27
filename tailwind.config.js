/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // All theme colors are RGB-triplet CSS variables defined in index.css.
        // The <alpha-value> token lets Tailwind apply opacity modifiers like `bg-bg/80`.
        bg: 'rgb(var(--bg) / <alpha-value>)',
        bg2: 'rgb(var(--bg2) / <alpha-value>)',
        bg3: 'rgb(var(--bg3) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
        accent2: 'rgb(var(--accent2) / <alpha-value>)',
        accent3: 'rgb(var(--accent3) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        text: 'rgb(var(--text) / <alpha-value>)',
        // `fg` is the dominant foreground (white on dark, near-black on light).
        // Use it for translucent overlays/borders that should adapt automatically.
        fg: 'rgb(var(--fg) / <alpha-value>)',
        line: 'rgb(var(--fg) / 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"Bricolage Grotesque"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter2: '-0.03em',
      },
      keyframes: {
        pulseDot: {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.7)' },
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gridShift: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '40px 40px' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 2s infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        'grid-shift': 'gridShift 20s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
      boxShadow: {
        'glow-accent':
          '0 0 0 1px rgb(var(--accent) / 0.25), 0 18px 60px -12px rgb(var(--accent) / 0.25)',
      },
    },
  },
  plugins: [],
}
