export const profile = {
  name: 'Sheekha Mahapatro',
  initials: 'SM',
  role: 'UX / UI Designer & Frontend Developer',
  tagline:
    "I'm a UX/UI designer who codes — bridging Figma craft with pixel-accurate React, Next.js, and Angular code. Research-led, accessibility-first, shipped end-to-end.",
  email: 'sheekhamahapatro.sm@gmail.com',
  phone: '+91 8700650140',
  phoneRaw: '918700650140',
  resumeUrl: '/Sheekha_Mahapatro_UXUI_Resume.pdf',
  resumeFileName: 'Sheekha_Mahapatro_UXUI_Resume.pdf',
  location: 'Noida, IN — open to remote',
  status: 'Open to opportunities',
  socials: {
    linkedin: 'https://www.linkedin.com/in/sheekha-mahapatro',
    github: 'https://github.com/sheekhamahapatro',
    whatsapp: 'https://wa.me/918700650140',
  },
}

export const stats = [
  { num: '2+', label: 'Years Experience' },
  { num: '10+', label: 'Projects Shipped' },
  { num: '9', label: 'Certifications' },
  { num: '∞', label: 'Coffee Consumed', accent: true },
]

export const aboutTags = [
  'Figma',
  'React.js',
  'Next.js',
  'Angular',
  'TypeScript',
  'Tailwind CSS',
  'UX Research',
  'Design Systems',
  'Accessibility (ARIA)',
  'Prototyping',
  'REST APIs',
]

export const projects = [
  {
    id: 'her-shield',
    code: 'HSH',
    title: 'Her-Shield — Women’s Safety & SOS App',
    description:
      'Streamlined SOS activation from 3 steps to 1 with a fast-access emergency interface and secure backend for profile and alert handling.',
    tags: ['UX Flows', 'HTML/CSS/JS', 'PHP/MySQL', 'Safety'],
    palette: 'coral',
    role: 'UX Designer & Developer',
    year: 'Sep – Dec 2024',
    impact: [
      '3 → 1-tap SOS activation',
      'Custom JS state utilities (zero deps)',
      'Secure PHP/MySQL backend',
    ],
    href: 'https://github.com/sheekhamahapatro',
    featured: true,
  },
  {
    id: 'hunger-zero',
    code: 'HGZ',
    title: 'Hunger Zero — Food Sharing Platform',
    description:
      'Peer-to-peer food sharing platform connecting donors with recipients, with location-based filtering and end-to-end REST data flow.',
    tags: ['PHP', 'MySQL', 'REST', 'Community'],
    palette: 'amber',
    role: 'Full-stack Designer',
    year: 'Feb – Apr 2025',
    impact: [
      'Location-based filtering',
      'Donor ↔ recipient matching',
      'End-to-end REST data flow',
    ],
    href: 'https://github.com/sheekhamahapatro',
  },
  {
    id: 'kdd-platform',
    code: 'KDD',
    title: 'KDD Educations Platform',
    description:
      'Expanded scalable Angular + TypeScript features with cleaner UX flows. Improved form validation cut user friction and support tickets.',
    tags: ['Angular', 'TypeScript', 'PostgreSQL', 'UX Flows'],
    palette: 'blue',
    role: 'Freelance UX/UI Developer',
    year: 'Jan – Dec 2025',
    impact: [
      'Reduced form-error friction',
      'Faster API + DB responses',
      'Scalable for high traffic',
    ],
    href: 'https://github.com/sheekhamahapatro',
  },
  {
    id: 'git-fetch',
    code: 'GFA',
    title: 'Git-Fetch — GitHub User Search',
    description:
      'A React tool that searches the GitHub API and presents user profiles with full keyboard, ARIA, and semantic-HTML accessibility.',
    tags: ['React', 'GitHub API', 'A11y', 'Performance'],
    palette: 'purple',
    role: 'Solo Build',
    year: 'May 2023',
    impact: [
      'React.memo + lazy loading',
      'Full ARIA + keyboard support',
      'Reduced load time',
    ],
    href: 'https://github.com/sheekhamahapatro',
  },
  {
    id: 'freelance-ui',
    code: 'FRL',
    title: 'Freelance Figma → React Builds',
    description:
      'Converted Figma mockups into pixel-perfect React + Tailwind components for multiple clients, with Maps & auth integrations.',
    tags: ['React', 'Tailwind', 'Netlify', 'Multi-client'],
    palette: 'teal',
    role: 'Freelance UI Developer',
    year: 'Aug 2024 – Dec 2025',
    impact: [
      'Pixel-perfect handoffs',
      'Google Maps + auth integrations',
      'Netlify / cPanel deployments',
    ],
    href: 'https://github.com/sheekhamahapatro',
  },
]

export const skillGroups = [
  {
    label: 'Design',
    color: 'accent',
    items: [
      { name: 'Figma', pct: 95 },
      { name: 'Wireframing & Prototyping', pct: 92 },
      { name: 'Design Systems', pct: 85 },
      { name: 'Accessibility (ARIA)', pct: 88 },
      { name: 'Adobe XD / Illustrator / Photoshop', pct: 80 },
    ],
  },
  {
    label: 'Frontend',
    color: 'accent2',
    items: [
      { name: 'React.js', pct: 92 },
      { name: 'Next.js', pct: 85 },
      { name: 'Angular', pct: 80 },
      { name: 'TypeScript / JavaScript', pct: 88 },
      { name: 'Tailwind CSS / HTML / CSS', pct: 95 },
    ],
  },
  {
    label: 'Tools & Workflow',
    color: 'accent3',
    items: [
      { name: 'Git / GitHub', pct: 92 },
      { name: 'REST APIs / Postman', pct: 88 },
      { name: 'Netlify / cPanel', pct: 82 },
      { name: 'VS Code', pct: 95 },
      { name: 'Agile Collaboration', pct: 90 },
    ],
  },
]

export const experience = [
  {
    company: 'Softlabs Infotech Pvt. Ltd.',
    role: 'UX/UI Designer & Junior Developer',
    period: 'Dec 2025 – Present',
    location: 'Noida',
    bullets: [
      'Building accessible, device-agnostic UI features in React.js and Next.js with pixel-accurate design implementation.',
      'Connecting frontend interfaces to REST APIs while keeping visual consistency across loading, data, and error states.',
      'Running UI/UX reviews to surface usability issues and lift visual consistency across browsers.',
    ],
    current: true,
  },
  {
    company: 'KDD Educations',
    role: 'Freelance UX/UI Developer',
    period: 'Jan 2025 – Dec 2025',
    location: 'Remote',
    bullets: [
      'Expanded scalable Angular + TypeScript features with PostgreSQL, focused on clean UX flows.',
      'Reworked form validation and error handling, cutting user friction and support tickets.',
      'Tuned API + database interactions to support high traffic and improve responsiveness.',
    ],
  },
  {
    company: 'Self-Employed',
    role: 'Freelance UI Developer',
    period: 'Aug 2024 – Dec 2025',
    location: 'Remote',
    bullets: [
      'Converted Figma mockups into pixel-perfect React + Tailwind components for multiple clients.',
      'Integrated third-party services like Google Maps and authentication tooling.',
      'Owned deployments via Netlify, GitHub Pages, and cPanel for stable production releases.',
    ],
  },
  {
    company: 'Orionix Systems Pvt. Ltd.',
    role: 'UX/UI & Web Development Intern',
    period: 'Jan 2024 – Jul 2024',
    location: 'Noida',
    bullets: [
      'Authored UX wireframes and interactive prototypes alongside designers and engineers.',
      'Implemented cross-browser pages in HTML, CSS, JavaScript, and jQuery.',
      'Supported backend tasks in Python and improved UI/UX in line with user-centered design principles.',
    ],
  },
]

export const education = [
  {
    degree: 'MCA (Hons.) — Computer Science',
    school: 'Lovely Professional University',
    period: '2022 – 2024',
    score: 'GPA 8.24 / 10',
  },
  {
    degree: 'BCA (Hons.) — Web Development',
    school: 'Lovely Professional University',
    period: '2019 – 2022',
    score: 'GPA 8.25 / 10',
  },
]

export const certifications = [
  {
    issuer: 'Meta',
    items: [
      'Front-End Developer Professional Certificate',
      'Advanced React',
      'React Basics',
      'HTML & CSS in Depth',
      'Programming with JavaScript',
      'Version Control',
    ],
  },
  {
    issuer: 'Google',
    items: [
      'Build Dynamic UI for Websites',
      'Foundations of UX Design',
      'Start the UX Design Process: Empathize, Define & Ideate',
    ],
  },
]

export const testimonials = [
  {
    text: "Sheekha pairs a designer's eye with an engineer's discipline. Her React handoffs ship with the same care as her Figma frames — accessible, pixel-perfect, and easy to maintain.",
    name: 'Aditya Sharma',
    role: 'Lead Engineer, Softlabs Infotech',
    initials: 'AS',
    color: 'accent',
  },
  {
    text: "From day one of her internship she asked the questions a senior would. The prototypes she handed off were clear, accessible, and shippable without rework.",
    name: 'Priya Iyer',
    role: 'Senior Designer, Orionix Systems',
    initials: 'PI',
    color: 'accent2',
  },
  {
    text: "Sheekha rebuilt our Angular flows with a complete rethink of validation and error states. Support tickets dropped overnight — and the UI looks better than ever.",
    name: 'Rohan Mehta',
    role: 'Founder, KDD Educations',
    initials: 'RM',
    color: 'accent3',
  },
]

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Career', href: '#career' },
  { label: 'Contact', href: '#contact' },
]

export const marqueeWords = [
  'React.js',
  'Next.js',
  'Angular',
  'TypeScript',
  'Figma',
  'Tailwind CSS',
  'Accessibility',
  'Design Systems',
  'UX Research',
  'REST APIs',
  'Prototyping',
]
