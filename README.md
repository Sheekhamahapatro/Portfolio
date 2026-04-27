# Sheekha Mahapatro — UX / UI Designer & Frontend Developer Portfolio

A modern, dark-mode portfolio for **Sheekha Mahapatro** (UX/UI Designer & Frontend Developer), built with **React 18**, **Tailwind CSS 3**, and **Framer Motion**. The design follows a bold, minimal aesthetic with a single high-contrast accent color, large display typography (Bricolage Grotesque) paired with a clean body sans-serif (Inter), and tasteful micro-interactions.

## ✦ Stack

- [React 18](https://react.dev/) (Vite)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

## ✦ Features

- Fully responsive (mobile / tablet / desktop)
- Dark-mode design system with a single accent color
- Sticky, blurred navigation with mobile hamburger menu
- Animated hero with stats and a marquee strip
- About section with avatar card and tag list
- Projects grid with case-study modal (Framer Motion `AnimatePresence`)
- Skills with animated progress bars (in-view triggered)
- Testimonials, contact form, and rich social links
- Scroll-to-top floating button
- All buttons & links are wired (smooth scroll, mailto, social, downloadable CV)

## ✦ Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
npm run preview
```

## ✦ Project Structure

```
src/
├── App.jsx              # App shell, section composition
├── main.jsx             # React entry
├── index.css            # Tailwind layers + base styles
├── data/
│   └── portfolioData.js # Single source of truth (profile, projects, skills…)
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── About.jsx
    ├── Projects.jsx
    ├── Skills.jsx
    ├── Testimonials.jsx
    ├── Contact.jsx
    ├── Footer.jsx
    └── ScrollToTop.jsx
```

## ✦ Customization

All copy lives in `src/data/portfolioData.js`. Update:

- `profile` — name, role, email, phone, socials, resume URL
- `stats` — hero stat counters
- `projects` — featured work (mark one with `featured: true` to make it span 2 columns)
- `skillGroups` — skill categories and percentages
- `experience` — career timeline (with `current: true` highlighting the current role)
- `education` + `certifications` — sidebar of the Career section
- `testimonials` — endorsements

Theme tokens (colors, fonts, animations) live in `tailwind.config.js`.

The downloadable résumé is at `public/Sheekha_Mahapatro_UXUI_Resume.pdf` (referenced by `profile.resumeUrl`). Replace this file to update the CV everywhere — Hero "Download CV", floating chat panel, and the Contact "Download CV" card.

## ✦ License

MIT — feel free to fork and rebrand for your own portfolio.
"# Portfolio" 
