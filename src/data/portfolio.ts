/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

export interface Project {
  id: string
  number: string // "001" – shown as PROJECT 001 / MISSION 001
  title: string
  summary: string
  stack: string[]
  role: string
  /** "What I built" bullets. Leave empty to hide that block in the modal. */
  built: string[]
  inProgress?: boolean
  links: {
    live?: string
    source?: string
  }
}

export interface Skill {
  name: string
  /** Personal confidence, 0–5. Omit to show the skill as an unrated chip. */
  confidence?: number
}

export interface SkillGroup {
  id: string
  label: string
  skills: Skill[]
}

export interface Certificate {
  id: string
  title: string
  /** Leave out if unsure: the site then shows no issuer line. */
  issuer?: string
  /** Preview picture (jpg/png). Optional. */
  image?: string
  /** A PDF or other file to open. Used when there is no image. */
  file?: string
  alt: string
}

export interface JourneyEntry {
  id: string
  kind: 'work' | 'project' | 'education'
  title: string
  org: string
  period: string
  points: string[]
}

export interface NavItem {
  id: string // matches the section element id
  label: string
  key: string // keyboard shortcut
}

/* ------------------------------------------------------------------ */
/* Profile                                                            */
/* ------------------------------------------------------------------ */

export const profile = {
  name: 'Rain Heart Opinion',
  title: 'Aspiring Fullstack Developer',
  systemName: 'RAIN_OS',
  systemVersion: 'v1.0',
  tagline:
    'I build web experiences with motion, responsive UX, and clean architecture.',
  intro:
    'I turn ideas into production products using React, Next.js, TypeScript, and mobile-first implementation. I care about visual rhythm, interaction quality, and code that scales.',
  availability:
    "I'm open to internships, freelance work, and interesting collaborations. Tell me what you're building.",
  about: [
    'I care about visual polish and engineering discipline equally. My process blends product thinking, experimentation, and careful implementation to turn ideas into reliable, user-friendly experiences.',
    "I'm a fourth-year BSIT student at Quezon City University. I've built web and mobile apps with React, TypeScript and React Native, integrated with Firebase and Supabase, in team projects, including leading one as project manager. My QA testing and IT support work has sharpened how I approach problems.",
  ],
  /** Player profile panel (About) */
  profilePanel: {
    name: 'Rain Heart Opinion',
    class: 'Aspiring Fullstack Developer',
    status: '4th Year BSIT Student',
    location: 'Quezon City, Philippines',
    mission: 'Building web experiences',
  },
  /** Hero HUD. LEVEL = year level, not a skill rating. */
  hud: {
    player: 'RAIN',
    level: '04',
    status: 'OJT ONGOING',
    location: 'QUEZON CITY, PH',
    mode: 'DEVELOPER',
  },
  portrait: '/portrait.jpg',
  portraitAlt: 'Portrait of Rain Heart Opinion',
} as const

export const links = {
  email: 'rainopinion55@gmail.com',
  github: 'https://github.com/Soleuss2',
  linkedin: 'https://www.linkedin.com/in/rain-heart-opinion-0ba725414',
  site: 'https://rain-heart-portfolio.vercel.app/',
  resume: '/Opinion.pdf',
  web3formsKey: '1fb7ddc3-2349-4346-91bc-7b390f6962b1',
} as const

export const navItems: NavItem[] = [
  { id: 'home', label: 'HOME', key: '1' },
  { id: 'about', label: 'ABOUT', key: '2' },
  { id: 'projects', label: 'PROJECTS', key: '3' },
  { id: 'skills', label: 'SKILLS', key: '4' },
  { id: 'achievements', label: 'ACHIEVEMENTS', key: '5' },
  { id: 'contact', label: 'CONTACT', key: '6' },
]

/* ------------------------------------------------------------------ */
/* Projects (reorder this array to change PROJECT numbering order)    */
/* ------------------------------------------------------------------ */

export const projects: Project[] = [
  {
    id: 'chronoflow',
    number: '001',
    title: 'ChronoFlow',
    summary:
      'A high-end scheduling SaaS with a premium dashboard, slot selector, and interactive calendar system.',
    stack: ['Next.js 15', 'React 19', 'Tailwind', 'Framer Motion'],
    role: 'Developer (personal project)',
    built: [],
    inProgress: true,
    links: { live: 'https://chrono-flow-seven.vercel.app/' },
  },
  {
    id: 'qcu-parking',
    number: '002',
    title: 'QCU Parking Monitoring System',
    summary:
      'A mobile vehicle time-in/time-out system for Quezon City University that stores vehicle entry and exit records.',
    stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'QR Code'],
    role: 'Project Manager / Backend Developer',
    built: [
      'Built the mobile app with React Native and Firebase, storing vehicle entry and exit records.',
      'Implemented QR-code connectivity to retrieve and record registered student information, with role-based features for Guards, Students, Faculty, and Administrators.',
      'Led the team as project manager, setting development direction while contributing to backend and data integration.',
    ],
    links: {
      source: 'https://github.com/Soleuss2/QCUParkingMonitoringSystem',
    },
  },
  {
    id: 'schatzies',
    number: '003',
    title: 'Schatzies Events',
    summary:
      'The front end of a company-specific CMS/web application, built as part of a development team for real business use.',
    stack: ['React', 'TypeScript', 'shadcn/ui'],
    role: 'Front-End Developer',
    built: [
      'Developed the front end of the CMS/web application, delivering the user interface for real business use.',
      'Built reusable web templates with React, TypeScript, and shadcn/ui components.',
      'Collaborated with another front-end developer on the user interface and website integration.',
    ],
    links: { live: 'https://www.schatziesevents.com/' },
  },
  {
    id: 'kds',
    number: '004',
    title: 'Kitchen Display System',
    summary:
      'A digital kitchen order display for improving order tracking and reducing communication gaps during service.',
    stack: ['HTML', 'CSS', 'Operations UX'],
    role: 'Project Manager (group project)',
    built: [],
    links: { source: 'https://github.com/Soleuss2/KitchenDisplaySystem' },
  },
  {
    id: 'medicare',
    number: '005',
    title: 'Medicare Supersystem',
    summary:
      'A dental clinic management system with a Supabase backend and React front end, deployed to production.',
    stack: ['React', 'Supabase', 'Supabase Auth', 'PostgreSQL', 'RLS', 'Vercel'],
    role: 'Backend Developer',
    built: [
      'Developed backend functionality using Supabase and React.',
      'Implemented Supabase authentication and Row Level Security (RLS) to control access to application data.',
      'Integrated backend data with the React application, including database connectivity and user-side data operations.',
    ],
    links: { live: 'https://medicare-supersystem.vercel.app/' },
  },
]

/* ------------------------------------------------------------------ */
/* Skills                                                             */
/* confidence = personal confidence while learning, 0–5, not a metric */
/* Skills without a number are shown as plain chips.                  */
/* ------------------------------------------------------------------ */

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: 'FRONTEND',
    skills: [
      { name: 'TypeScript', confidence: 4.5 },
      { name: 'Next.js', confidence: 3.5 },
      { name: 'Tailwind CSS', confidence: 3.5 },
      { name: 'React Native', confidence: 3.5 },
      { name: 'React' },
      { name: 'JavaScript' },
      { name: 'HTML' },
      { name: 'CSS' },
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND / DATA',
    skills: [
      { name: 'Firebase', confidence: 3.5 },
      { name: 'Supabase', confidence: 3.0 },
      { name: 'PostgreSQL' },
      { name: 'SQL' },
      { name: 'Row Level Security' },
      { name: 'PHP' },
      { name: 'Python' },
    ],
  },
  {
    id: 'tools',
    label: 'TOOLS',
    skills: [
      { name: 'Git / GitHub' },
      { name: 'Visual Studio Code' },
      { name: 'Antigravity' },
    ],
  },
  {
    id: 'support',
    label: 'IT SUPPORT & QA',
    skills: [
      { name: 'QA Testing' },
      { name: 'PC & Hardware Troubleshooting' },
      { name: 'Windows Installation & PC Setup' },
      { name: 'Data Encoding' },
    ],
  },
]

/* ------------------------------------------------------------------ */
/* Certificates                                                       */
/* ------------------------------------------------------------------ */

export const certificates: Certificate[] = [
  {
    id: 'aws-lambda',
    title: 'AWS Lambda Foundations',
    issuer: 'AWS Training & Certification',
    image: '/certificates/aws-lambda-foundations.jpg',
    alt: 'AWS Lambda Foundations completion certificate',
  },
  {
    id: 'aws-amplify',
    title: 'AWS Amplify Getting Started',
    issuer: 'AWS Training & Certification',
    image: '/certificates/aws-amplify-getting-started.jpg',
    alt: 'AWS Amplify Getting Started completion certificate',
  },
    {
    id: 'spot-the-scam',
    title: 'Spot the Scam',
    issuer: 'DICT (Cyber Hygiene Fridays)',
    image: '/certificates/Spot_The_Scam.jpg',
    alt: 'Spot the Scam certificate of attendance',
  },
]

/* ------------------------------------------------------------------ */
/* Player journey (quest log inside About)                            */
/* ------------------------------------------------------------------ */

export const journey: JourneyEntry[] = [
  {
    id: 'ojt',
    kind: 'work',
    title: 'IT Intern / OJT Trainee',
    org: 'Five Star Pangasinan Bus Co., Quezon City',
    period: 'Sep 2026 – Present',
    points: [
      'Conduct QA testing on company systems, identifying and reporting issues to support software quality.',
      'Diagnose and resolve PC, printer, and hardware faults, and keep workstations running.',
      'Provide day-to-day IT support and accurate data encoding for office operations.',
    ],
  },
  {
    id: 'j-schatzies',
    kind: 'project',
    title: 'Front-End Developer',
    org: 'Schatzies Events',
    period: '2025 – 2026',
    points: ['React, TypeScript and shadcn/ui, built within a development team.'],
  },
  {
    id: 'j-qcu',
    kind: 'project',
    title: 'Project Manager / Backend Developer',
    org: 'QCU Parking Monitoring System',
    period: '2025 – 2026',
    points: ['React Native and Firebase, leading the team and the data integration.'],
  },
  {
    id: 'j-medicare',
    kind: 'project',
    title: 'Backend Developer',
    org: 'Medicare Supersystem',
    period: '2025 – 2026',
    points: ['Supabase Auth, Row Level Security and React data integration.'],
  },
  {
    id: 'education',
    kind: 'education',
    title: 'BS Information Technology',
    org: 'Quezon City University',
    period: 'Expected 2027',
    points: [],
  },
]