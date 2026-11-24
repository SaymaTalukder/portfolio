import { motion } from 'framer-motion';
import { Star, Burst, PlusMark } from './decorative/Decorative.jsx';

/**
 * Table of Contents — horizontal ribbon strips, each with its own accent
 * colour and decorative symbol. Clicking a ribbon scrolls to its section.
 */
const ribbons = [
  {
    id: 'about',
    label: 'About Me',
    repeat: 'About Me',
    color: '#F5F5F5',
    ink: '#050505',
    symbol: '★',
  },
  {
    id: 'skills',
    label: 'Skills & Expertise',
    repeat: 'Skills & Expertise',
    color: '#C4E77B',
    ink: '#050505',
    symbol: '✳',
  },
  {
    id: 'experience',
    label: 'Experience',
    repeat: 'Experience',
    color: '#49318A',
    ink: '#F5F5F5',
    symbol: '◉',
  },
  {
    id: 'projects',
    label: 'Featured Projects',
    repeat: 'Featured Projects',
    color: '#54D6E8',
    ink: '#050505',
    symbol: '✦',
  },
  {
    id: 'education',
    label: 'Education',
    repeat: 'Education',
    color: '#F04A9B',
    ink: '#050505',
    symbol: '✚',
  },
  {
    id: 'contact',
    label: 'Contact',
    repeat: 'Contact',
    color: '#F5E6A8',
    ink: '#050505',
    symbol: '◆',
  },
];

function Ribbon({ ribbon, index }) {
  const { id, label, repeat, color, ink, symbol } = ribbon;

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
        className="ribbon-strip group relative block w-full overflow-hidden border-y-2 border-ink-950/60 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.8)]"
        style={{ background: color }}
        aria-label={`Jump to ${label}`}
      >
        {/* Numbered leading block */}
        <span
          className="absolute left-0 top-0 flex h-full w-11 items-center justify-center font-display text-sm font-black"
          style={{ background: ink, color }}
        >
          {index + 1}.
        </span>

        {/* Repeating marquee of the label */}
        <span className="flex h-11 min-w-0 items-center gap-6 pl-16 pr-4">
          <span
            className="whitespace-nowrap font-display text-sm uppercase tracking-[0.18em] sm:text-base"
            style={{ color: ink }}
          >
            {label}
          </span>

          <span className="hidden items-center gap-6 overflow-hidden sm:flex">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className="flex shrink-0 items-center gap-6 whitespace-nowrap font-display text-sm uppercase tracking-[0.18em]"
                style={{ color: ink, opacity: 0.55 }}
              >
                {repeat}
                <span style={{ color: ink }}>{symbol}</span>
              </span>
            ))}
          </span>

          {/* Arrow at the trailing edge */}
          <span
            className="ml-auto flex h-full w-11 shrink-0 items-center justify-center opacity-70 transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: ink }}
          >
            ▸
          </span>
        </span>
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
      {/* Plum gradient field behind the ribbons */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 70% at 50% 50%, #24134B 0%, #17102B 45%, #050505 85%)',
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
          <p className="eyebrow justify-center text-lime/90">
            <span className="h-px w-8 bg-lime" aria-hidden="true" />
            Table of contents
            <span className="h-px w-8 bg-lime" aria-hidden="true" />
          </p>

          <h2 className="display mt-5 text-[clamp(2.2rem,6.5vw,4.6rem)] text-paper">
            PICK A{' '}
            <span className="relative inline-block text-lime">
              THREAD
              <Burst className="absolute -right-8 -top-6 h-7 w-7 animate-wiggle text-blush" />
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg">
            Six stops, one story. Tap any ribbon to jump straight there.
          </p>
        </motion.div>

        {/* Ribbons */}
        <nav
          aria-label="Table of contents"
          className="mt-14 flex flex-col gap-3 sm:gap-4"
        >
          {ribbons.map((ribbon, i) => (
            <Ribbon key={ribbon.id} ribbon={ribbon} index={i} />
          ))}
        </nav>

        <div className="mt-12 flex items-center justify-center gap-3">
          <Star className="h-3.5 w-3.5 animate-floaty text-lime/60" />
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/35">
            End of the thread · scroll back up any time
          </p>
          <PlusMark className="h-3 w-3 text-lilac/60" />
        </div>
      </div>
    </section>
  );
}
