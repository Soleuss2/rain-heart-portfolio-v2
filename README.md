# RAIN_OS: Rain Heart Opinion's Arcade Portfolio

An interactive, arcade-themed developer portfolio. The site is styled as a personal arcade machine, with a boot sequence, a HUD, mission files for projects and a terminal-style contact form. It stays readable, accessible and fast, and every effect can be turned down or off.

<!-- Add after deploying: **Live site:** https://your-url.vercel.app -->

<!-- Add screenshots after deploying, for example:
![Hero](docs/hero.png)
-->

## Features

- **Boot sequence:** a short startup screen that can be skipped (click, Enter or Esc) and is remembered after the first visit.
- **Arcade HUD navigation:** a top bar on desktop and a bottom tab bar on mobile, with active-section tracking and smooth scrolling.
- **Keyboard shortcuts:** press `1` to `6` to jump between sections. They are disabled while typing in a form or when a modal is open.
- **Reusable glitch components:** `GlitchText` and `GlitchButton` (RGB split, slicing and brief character corruption), triggered on hover, focus or entry instead of running constantly.
- **CRT effect with an FX control:** scanlines, vignette and grain with an `FX: ON / LOW / OFF` toggle. Defaults to OFF for `prefers-reduced-motion` and LOW on phones, and the choice is saved.
- **Projects as mission files:** a game-select grid with a discovery counter and a mission-file modal (focus trap, Esc to close, focus restored).
- **Skills:** grouped skill panels. Bars show personal confidence while learning, not a measured score.
- **Achievements:** certificates with a full-size viewer.
- **Quest log:** work, project and education history in About.
- **Contact terminal:** a working contact form (sent through [Web3Forms](https://web3forms.com)) with a spam trap and a fallback to email if sending fails.

## Tech stack

| Area | Tools |
|---|---|
| Framework | React 19, TypeScript, Vite |
| Styling | Tailwind CSS v4, plain CSS for effects and animation |
| Motion | Framer Motion (modals and scroll reveals), CSS keyframes (glitch, CRT) |
| Icons | lucide-react |
| Fonts | Silkscreen, Inter, JetBrains Mono, self-hosted with Fontsource |
| Contact form | Web3Forms |
| Hosting | Vercel |

No game engine, no 3D library and no background video. Heavy effects are CSS-only and idle effects stop when FX is off.

## Getting started

Requires Node.js 20.19 or newer.

```bash
git clone https://github.com/Soleuss2/rain-heart-portfolio-v2.git
cd rain-heart-portfolio-v2
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
src/
  components/
    arcade/        GlitchText, GlitchButton, CRTOverlay, FxProvider, FxToggle,
                   BootSequence, ArcadeHUD, Footer
    ui/            Panel, Section, Reveal, SkillBar
    projects/      ProjectCard, ProjectModal
    achievements/  CertificateCard, CertificateModal
    contact/       ContactForm, CopyEmail
  sections/        Hero, About, Projects, Skills, Achievements, Contact
  hooks/           useFx, useGlitch, useBoot, useActiveSection,
                   useKeyboardNavigation, useDialog, useInViewOnce
  data/            portfolio.ts   (all site content)
  styles/          arcade.css, components.css, boot.css, hud.css,
                   projects.css, form.css
public/            portrait, certificates, resume
```

## Updating the content

All content lives in one typed file, `src/data/portfolio.ts`. Components only read from it, so no UI code needs to change to update:

- profile text, HUD stats and links
- projects (title, summary, stack, role, "what I built", links)
- skills and their confidence values
- certificates (picture or file, issuer)
- quest log entries

Optional fields (such as a project's `built` list or a certificate's `issuer`) are hidden automatically when left empty.

## Contact form setup

The form posts to Web3Forms with a public access key stored in `links.web3formsKey` in `src/data/portfolio.ts`. If you fork this project, create your own free key at [web3forms.com](https://web3forms.com) and replace it, otherwise messages go to the original owner. The key is public by design. Restrict it to your domain in the Web3Forms dashboard after deploying.

## Accessibility and performance

- All effects respect `prefers-reduced-motion`, and the FX toggle can turn them off completely.
- Keyboard navigation works throughout. Modals trap focus and return it on close, and focus outlines are always visible.
- Body text stays plain and readable. Glitch effects are limited to labels, headings and buttons, and screen readers receive the real text.
- Touch targets are at least 44px, form fields use 16px text and the layout adapts to phones, tablets and desktops.
- Animation uses CSS transforms and opacity, and there is only one scroll listener for the HUD.

## Deployment

The project is deployed on [Vercel](https://vercel.com). Vercel detects Vite automatically (build command `npm run build`, output directory `dist`).

## Author

**Rain Heart Opinion**, fourth-year BSIT student at Quezon City University.

- GitHub: [@Soleuss2](https://github.com/Soleuss2)
- LinkedIn: [rain-heart-opinion](https://www.linkedin.com/in/rain-heart-opinion-0ba725414)
- Email: rainopinion55@gmail.com

---

The code is here for reference and learning. My photo, certificates, resume and personal text are mine and are not for reuse.
