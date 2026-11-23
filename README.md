# Portfolio — Sayma Talukder Rupa

Personal portfolio built in an editorial, magazine-inspired visual language: black
base, deep purple gradients, oversized lime display type, and pink / cyan /
lavender accents.

**Live site:** https://portfolio-sayma1.vercel.app

## About

Sayma Talukder Rupa is a Data Science student at United International University
and a Sales Tech Engineer at Poridhi.io. The site covers data science and
analytics, AI and machine learning, web development, professional skills, work
history, four featured projects, education, and contact.

## Stack

- **Vite** — build tooling
- **React 18** — UI
- **Tailwind CSS** — styling, with a custom editorial token set
- **Framer Motion** — scroll and hover animation
- **lucide-react** — icons

No additional dependencies were added beyond the original setup.

## Structure

```
src/
  App.jsx                     section composition
  index.css                   design tokens, editorial utilities
  components/
    Hero.jsx                  oversized headline, rotating badge, CTAs
    About.jsx                 asymmetric editorial grid + portrait
    Skills.jsx                four category cards, badge chips
    Experience.jsx            timeline with gradient spine
    Projects.jsx              four showcase cards
    TableOfContents.jsx       ribbon-style navigation
    Education.jsx             degree cards
    Contact.jsx               channels + validated form
    Nav.jsx / Footer.jsx       navigation chrome
    decorative/
      Decorative.jsx          stars, bursts, squiggles, blobs, rings
      ProjectPreviews.jsx     per-project SVG mockups
public/
  portrait.jpg                profile photo
vercel.json                   Vercel build config + cache headers
```

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

## Deployment

The project is connected to Vercel through its GitHub integration. Pushing to
`main` builds and deploys automatically.

- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Framework preset:** Vite

## Notes

- Only links present in the CV are wired up — the AI Atlas live demo, the GitHub
  profile, and email. Projects without a published URL intentionally show no
  link button rather than a placeholder.
- The contact form has no server behind it. It validates input, then opens the
  visitor's mail client with the message pre-filled, and says so in the UI.
- Replace `public/portrait.jpg` to change the photo. It is cropped to a 3:4
  ratio and face-centred; keep the same framing for best results.
