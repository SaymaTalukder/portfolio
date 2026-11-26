import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Camera,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { HudCorners, LightPool, ChromeSweep, Reveal } from './Cinematic.jsx';

/**
 * About — presented as a lit set in the same cinematic language as the hero:
 * a metallic headline, a soft light pool, HUD corner brackets and dark
 * glass panels with chrome edges.
 *
 * All copy is the existing profile information, unchanged in substance.
 */

const infoCards = [
  {
    icon: Briefcase,
    label: 'Currently',
    value: 'Sales Tech Engineer at Poridhi.io',
    accent: '#FF8A3D',
    border: 'rgba(255,138,61,0.28)',
    tint: 'rgba(255,138,61,0.07)',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'BSc in Data Science at United International University',
    accent: '#FFB37A',
    border: 'rgba(255,179,122,0.28)',
    tint: 'rgba(255,179,122,0.07)',
  },
  {
    icon: Sparkles,
    label: 'Experience',
    value: '2 years of hands-on marketing experience',
    accent: '#FFA25C',
    border: 'rgba(255,162,92,0.28)',
    tint: 'rgba(255,162,92,0.07)',
  },
  {
    icon: MapPin,
    label: 'Interests',
    value: 'AI, ML, Data Analytics, Technology, Product Development',
    accent: '#FFA25C',
    border: 'rgba(255,162,92,0.28)',
    tint: 'rgba(255,162,92,0.07)',
  },
];

/** The six areas the portfolio identity is built around. */
const focusAreas = [
  'Machine Learning',
  'Data Analytics',
  'Artificial Intelligence',
  'Statistical Modeling',
  'Data Visualization',
  'Research & Experimentation',
];

/**
 * ProfilePhoto
 * Shows the photograph at `public/portrait.jpg` inside a cinematic frame.
 * The studio backdrop is masked into the dark scene so the portrait reads as
 * part of the set rather than a bright rectangle pasted onto it.
 */
function ProfilePhoto() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="group relative">
      <div className="chrome-border relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-ink-900 p-2.5 transition-transform duration-500 group-hover:scale-[1.015]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.15rem] bg-ink-800">
          {!photoFailed && (
            <img
              src="/portrait.jpg"
              alt="Portrait of Sayma Talukder"
              loading="lazy"
              decoding="async"
              width="1013"
              height="1350"
              className="h-full w-full object-cover object-[center_20%] grayscale-[0.2] contrast-[1.05] transition-all duration-700 hover:grayscale-0"
              onError={() => setPhotoFailed(true)}
            />
          )}

          {photoFailed && (
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-ember/40 bg-ink-950/40">
                  <Camera className="h-6 w-6 text-ember" />
                </div>
                <p className="mt-4 font-display text-sm uppercase tracking-[0.2em] text-ember">
                  Your Photo
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  Add{' '}
                  <span className="font-mono text-white/80">public/portrait.jpg</span>{' '}
                  to replace this placeholder
                </p>
              </div>
            </div>
          )}

          {/* Mask the pale studio backdrop into the dark frame. */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 58% 52% at 50% 46%, transparent 0%, rgba(10,10,15,0.35) 45%, rgba(10,10,15,0.85) 78%, rgba(10,10,15,0.98) 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[42%]"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,15,0.97) 0%, rgba(10,10,15,0.88) 45%, rgba(10,10,15,0) 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0)_40%,rgba(5,5,5,0.85)_100%)]"
            aria-hidden="true"
          />

          {/* Specular highlight from the scene light */}
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
            style={{
              background:
                'radial-gradient(circle at 78% 18%, rgba(232,234,237,0.5) 0%, rgba(232,234,237,0) 45%)',
            }}
            aria-hidden="true"
          />

          {/* Frame corners */}
          <span className="absolute left-3 top-3 h-5 w-5 border-l border-t border-silver-200/60" />
          <span className="absolute bottom-3 right-3 h-5 w-5 border-b border-r border-silver-200/60" />

          <ChromeSweep />
        </div>
      </div>

      {/* Floating name plate */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -bottom-5 -left-3 z-10 rounded-xl border border-ink-950 bg-silver-100 px-4 py-2 shadow-glass sm:-left-6"
      >
        <p className="font-display text-sm uppercase tracking-wider text-ink-950">
          Sayma Talukder
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-950/60">
          Dhaka, Bangladesh
        </p>
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      {/* The same light pool that sits behind the hero headline. */}
      <LightPool position="top" intensity={0.085} className="top-0" />
      <HudCorners />

      <div className="shell relative">
        <SectionHeading
          eyebrow="01 — About me"
          title="THE PERSON"
          accent="BEHIND THE DATA"
          description="Half analyst, half communicator — and entirely driven by problems that need both."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------- Left: portrait + identity ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 lg:col-span-4"
          >
            <p className="font-display text-[clamp(1.6rem,4vw,2.6rem)] uppercase leading-[1.05] tracking-tight text-paper">
              Sayma
              <br />
              <span className="metal metal-sheen">Talukder</span>
            </p>

            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/45 sm:text-[11px]">
              Data Science Student · Sales Tech Engineer
            </p>

            <div className="mt-10 max-w-xs">
              <ProfilePhoto />
            </div>
          </motion.div>

          {/* ---------- Center: the summary ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 lg:col-span-5"
          >
            <div className="chrome-border group relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-ink-900/60 p-7 backdrop-blur-sm sm:p-9">
              {/* Accent rails */}
              <span className="absolute -left-px top-8 h-16 w-[3px] rounded-full bg-ember" />
              <span className="absolute -left-px top-8 h-16 w-[3px] translate-x-6 rounded-full bg-ember-deep/60" />

              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/45">
                  Professional summary
                </p>

                <p className="mt-5 text-base leading-[1.75] text-white/75 sm:text-lg">
                  I&apos;m a confident, data-driven professional with a
                  background in marketing and a strong foundation in{' '}
                  <span className="text-ember">Data Science</span>. Currently
                  working as a{' '}
                  <span className="text-ember-soft">Sales Tech Engineer at Poridhi.io</span>,
                  I combine technical knowledge, analytical thinking,
                  communication, and leadership to solve problems and create
                  meaningful impact.
                </p>

                <p className="mt-5 text-base leading-[1.75] text-white/75 sm:text-lg">
                  My interests include{' '}
                  <span className="text-ember-deep">Artificial Intelligence</span>,{' '}
                  <span className="text-ember-deep">Machine Learning</span>, data
                  analytics, web technologies, and building useful
                  technology-driven products.
                </p>
              </div>

              {/* Focus areas */}
              <div className="relative mt-8 border-t border-white/10 pt-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                  Focus areas
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {focusAreas.map((area, i) => (
                    <motion.li
                      key={area}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                      className="rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.1em] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/50 hover:text-ember"
                    >
                      {area}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="relative mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                  Dhaka · United International University
                </p>
              </div>

              <ChromeSweep />
            </div>
          </motion.div>

          {/* ---------- Right: information cards ---------- */}
          <div className="min-w-0 lg:col-span-3">
            <div className="flex flex-col gap-4">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 26 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: 0.08 * i }}
                  whileHover={{ x: -5 }}
                  className="group relative overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/30"
                  style={{
                    borderColor: card.border,
                    background: `linear-gradient(150deg, ${card.tint}, rgba(10,10,15,0.75) 65%)`,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <card.icon className="h-4 w-4" style={{ color: card.accent }} />
                    <span
                      className="font-display text-[10px] uppercase tracking-[0.24em]"
                      style={{ color: card.accent }}
                    >
                      {card.label}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/80">
                    {card.value}
                  </p>
                  <ChromeSweep />
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.35}>
              <blockquote className="mt-6 rounded-2xl border border-white/12 bg-ink-900/50 p-5">
                <p className="font-serif text-lg italic leading-snug text-white/70">
                  “Data tells you what happened. Technology decides what
                  happens next.”
                </p>
              </blockquote>
            </Reveal>

            <Reveal delay={0.45}>
              <a
                href="#projects"
                className="group mt-6 inline-flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.2em] text-silver-400 transition-colors hover:text-ember"
              >
                See the work
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
