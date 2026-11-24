import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Star, Burst, Squiggle, HandArrow, PlusMark } from './decorative/Decorative.jsx';

const skillTags = [
  'Data Science',
  'Machine Learning',
  'AI',
  'Technical Sales',
  'Web Development',
  'QA Testing',
];

/**
 * Rotating circular badge text.
 * The SVG path draws a circle; the text is placed on that path so it
 * travels around the ring.
 */
function CircularBadge() {
  const text = 'DATA • AI • TECHNOLOGY • ';
  return (
    <div
      className="pointer-events-none absolute -right-2 top-6 h-28 w-28 sm:-right-6 sm:top-10 sm:h-36 sm:w-36"
      aria-hidden="true"
    >
      <div className="badge-spin h-full w-full">
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs>
            <path
              id="badge-circle"
              d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0"
            />
          </defs>
          <circle
            cx="60"
            cy="60"
            r="55"
            fill="rgba(23,16,43,0.85)"
            stroke="#C4E77B"
            strokeWidth="1"
            strokeDasharray="4 7"
            opacity="0.7"
          />
          <text
            fill="#C4E77B"
            fontSize="10.5"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="600"
            letterSpacing="2.6"
          >
            <textPath href="#badge-circle" startOffset="0">
              {text.repeat(2)}
            </textPath>
          </text>
        </svg>
      </div>
      <Star className="absolute inset-0 m-auto h-6 w-6 text-lime" />
    </div>
  );
}

/** Small stacked text block used as a floating editorial label. */
function FloatingLabel({ className = '', children, color = 'text-lime' }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-xl border border-white/15 bg-ink-950/70 px-3 py-2 font-display text-[10px] uppercase leading-tight tracking-[0.18em] backdrop-blur-md ${color} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36 lg:px-12"
    >
      {/* Plum gradient wash behind the headline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[70vh]"
        style={{
          background:
            'radial-gradient(ellipse 65% 70% at 50% 10%, #24134B 0%, #17102B 45%, rgba(5,5,5,0) 78%)',
        }}
        aria-hidden="true"
      />

      <div className="shell relative">
        {/* ---------- Top strip: intro + rotating badge ---------- */}
        <div className="relative flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-lime sm:w-16" aria-hidden="true" />
            <p className="font-display text-[11px] uppercase tracking-[0.32em] text-paper sm:text-xs">
              Hello, I&apos;m Sayma
            </p>
          </motion.div>

          <CircularBadge />
        </div>

        {/* ---------- Oversized headline ---------- */}
        <h1 className="display relative mt-8 sm:mt-10">
          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="block whitespace-nowrap text-lime text-[clamp(2.35rem,11.2vw,9.5rem)]"
          >
            SAYMA&apos;S
          </motion.span>

          <motion.span
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative block whitespace-nowrap text-paper text-[clamp(2.35rem,11.2vw,9.5rem)]"
          >
            PORT
            <span className="relative inline-block text-lime">
              F
              {/* Star sitting inside the F counter */}
              <Star className="absolute left-1/2 top-1/2 h-[0.26em] w-[0.26em] -translate-x-1/2 -translate-y-1/2 text-blush" />
            </span>
            OLIO
            {/* Hand-drawn underline sweeping the word */}
            <Squiggle
              className="absolute -bottom-1 left-[8%] h-3 w-[84%] sm:-bottom-3"
              color="#F04A9B"
              width={400}
            />
          </motion.span>
        </h1>

        {/* ---------- Subtitle + intro ---------- */}
        <div className="relative mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="min-w-0 lg:col-span-7"
          >
            <p className="font-display text-base uppercase leading-[1.35] tracking-[0.06em] text-aqua sm:text-xl lg:text-2xl">
              <span className="whitespace-normal lg:whitespace-nowrap">
                Data Science Student
              </span>
              <span className="mx-2 text-blush">|</span>
              <span className="whitespace-normal lg:whitespace-nowrap">
                Sales Tech Engineer
              </span>
              <span className="mx-2 text-blush">|</span>
              <span className="whitespace-normal text-lime lg:whitespace-nowrap">
                AI &amp; ML Enthusiast
              </span>
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">
              Exploring the intersection of data, artificial intelligence,
              technology, and creative problem-solving.
            </p>

            {/* Skill tags */}
            <div className="mt-8 flex flex-wrap gap-2.5">
              {skillTags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.4 + i * 0.06 }}
                  className="tag-outline hover:border-lime hover:bg-lime hover:text-ink-950"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <motion.a
                href="#projects"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="btn-lime"
              >
                Explore My Work
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.78 }}
                className="btn-outline"
              >
                Let&apos;s Connect
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Floating editorial labels + ornaments */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hidden lg:col-span-5 lg:block"
          >
            <div className="relative mx-auto h-64 w-full max-w-sm">
              <FloatingLabel className="left-0 top-4 animate-floaty">
                <span className="block text-white/50">Currently</span>
                <span className="block text-lime">Sales Tech Engineer</span>
              </FloatingLabel>

              <FloatingLabel
                className="right-0 top-24 animate-floaty text-aqua [animation-delay:1.2s]"
              >
                <span className="block text-white/50">Studying</span>
                <span className="block">BSc Data Science</span>
              </FloatingLabel>

              <FloatingLabel
                className="bottom-2 left-10 animate-floaty text-blush [animation-delay:2.2s]"
              >
                <span className="block text-white/50">Based in</span>
                <span className="block">Dhaka, Bangladesh</span>
              </FloatingLabel>

              <HandArrow className="absolute right-4 top-6 w-24 rotate-[24deg]" />
              <Burst className="absolute bottom-10 right-6 h-8 w-8 animate-wiggle text-lilac" />
              <PlusMark className="absolute left-2 top-28 h-3 w-3 text-aqua/60" />
            </div>
          </motion.div>
        </div>

        {/* ---------- Scroll cue ---------- */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="group mt-14 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-white/40 transition-colors hover:text-lime"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-lime">
            <ArrowDownRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}
