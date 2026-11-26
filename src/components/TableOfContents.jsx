import { motion } from 'framer-motion';
import { Star, PlusMark } from './decorative/Decorative.jsx';
import { ChromeSweep } from './Cinematic.jsx';

/**
 * Table of Contents — a chapter list styled as glass rails, matching the
 * hero's material language. Each row carries its own accent colour for
 * wayfinding while the surface treatment stays consistent.
 */
const ribbons = [
  { id: 'about', label: 'About Me', accent: '#E8EAED', symbol: '★' },
  { id: 'skills', label: 'Skills & Expertise', accent: '#FF8A3D', symbol: '✳' },
  { id: 'experience', label: 'Experience', accent: '#FFB37A', symbol: '◉' },
  { id: 'projects', label: 'Featured Projects', accent: '#FFA25C', symbol: '✦' },
  { id: 'education', label: 'Education', accent: '#FFA25C', symbol: '✚' },
  { id: 'contact', label: 'Contact', accent: '#FFD3A8', symbol: '◆' },
];

function Ribbon({ ribbon, index }) {
  const { id, label, accent, symbol } = ribbon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <a
        href={`#${id}`}
        className="chrome-border group relative block w-full overflow-hidden rounded-xl border border-white/12 bg-ink-900/60 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-ink-900/85"
        aria-label={`Jump to ${label}`}
      >
        {/* Accent rail on the leading edge */}
        <span
          className="absolute inset-y-0 left-0 w-[3px] origin-top transition-transform duration-500 group-hover:scale-y-100"
          style={{ background: accent, transform: 'scaleY(100%)' }}
          aria-hidden="true"
        />

        {/* Numbered leading block */}
        <span className="absolute left-0 top-0 flex h-full w-11 items-center justify-center border-r border-white/10 bg-ink-950/60 font-display text-sm font-black text-white/40">
          {index + 1}.
        </span>

        <span className="flex h-12 min-w-0 items-center gap-6 pl-16 pr-4">
          <span className="whitespace-nowrap font-display text-sm uppercase tracking-[0.2em] text-silver-200 transition-colors duration-300 group-hover:text-white sm:text-base">
            {label}
          </span>

          <span className="hidden items-center gap-6 overflow-hidden sm:flex">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-6 whitespace-nowrap font-display text-sm uppercase tracking-[0.2em] text-white/20"
              >
                {label}
                <span style={{ color: accent, opacity: 0.5 }}>{symbol}</span>
              </span>
            ))}
          </span>

          <span className="ml-auto flex h-full w-11 shrink-0 items-center justify-center text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/70">
            ▸
          </span>
        </span>

        <ChromeSweep />
      </a>
    </motion.div>
  );
}

export default function TableOfContents() {
  return (
    <section
      id="toc"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      {/* Scene light behind the chapter list */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 40%, rgba(232,234,237,0.06) 0%, rgba(5,5,5,0) 72%)',
        }}
        aria-hidden="true"
      />

      <div className="shell relative">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-ember" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/45 sm:text-[11px]">
              Table of contents
            </span>
            <span className="h-px w-8 bg-ember" aria-hidden="true" />
          </div>

          <h2
            className="display metal-depth relative mt-5 text-[clamp(2.2rem,6.5vw,4.6rem)] leading-[0.95] tracking-tight"
            data-depth-text="PICK A THREAD"
          >
            <span className="metal metal-sheen relative block">
              PICK A <span className="metal-accent">THREAD</span>
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Six stops, one story. Tap any rail to jump straight there.
          </p>
        </motion.div>

        {/* Chapter list */}
        <nav
          aria-label="Table of contents"
          className="mt-14 flex flex-col gap-3 sm:gap-4"
        >
          {ribbons.map((ribbon, i) => (
            <Ribbon key={ribbon.id} ribbon={ribbon} index={i} />
          ))}
        </nav>

        <div className="mt-12 flex items-center justify-center gap-3">
          <Star className="h-3.5 w-3.5 animate-floaty text-ember/60" />
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
            End of the thread · scroll back up any time
          </p>
          <PlusMark className="h-3 w-3 text-ember-glow/60" />
        </div>
      </div>
    </section>
  );
}
