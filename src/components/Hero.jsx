import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

/**
 * Hero — the cinematic opening sequence.
 *
 * Timeline (seconds from mount):
 *   0.00  screen is fully dark, only a faint light pool breathes
 *   0.15  "SAYMA TALUKDER" reveals letter-by-letter with a mask wipe
 *   0.95  name lifts away, PORTFOLIO rises as a metallic 3D-style block
 *   1.70  a glitch/scan sweep passes across PORTFOLIO
 *   2.05  professional title fades up underneath
 *   2.35  the two CTA buttons arrive
 *   2.70  the persistent HUD (scroll cue + meta rail) settles in
 *
 * The whole sequence is skippable — pressing any key or clicking jumps
 * straight to the settled state — and it collapses instantly for visitors
 * who prefer reduced motion.
 */

const NAME = 'SAYMA TALUKDER';
const LETTERS = NAME.split('');

/** Per-letter reveal offsets so the name cascades instead of popping. */
const letterVariants = {
  hidden: { y: '110%', opacity: 0 },
  show: (i) => ({
    y: '0%',
    opacity: 1,
    transition: {
      delay: 0.15 + i * 0.035,
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

/** Metallic PORTFOLIO block — layered copies create the 3D/extrusion feel. */
function MetalHeading({ started }) {
  const word = 'PORTFOLIO';

  return (
    <h1 className="relative select-none" aria-label="Sayma Talukder — Portfolio">
      <span className="sr-only">
        Sayma Talukder — Portfolio. Data Science Student, aspiring Data
        Scientist and AI Researcher.
      </span>

      <span
        className="relative block font-cinema text-[clamp(3.4rem,16.5vw,15rem)] leading-[0.82] tracking-cinema"
        aria-hidden="true"
      >
        {/* Depth layers — offset copies behind the metal face create the
            extruded 3D edge. Drawn as pseudo-elements so the DOM keeps a
            single copy of the word. */}
        <span
          className="metal-depth metal-depth-hero absolute inset-0"
          data-depth-text={word}
        />

        {/* Brushed metal face */}
        <motion.span
          className="metal metal-sheen relative block"
          initial={{ opacity: 0, y: 90, scaleY: 0.82 }}
          animate={
            started
              ? { opacity: 1, y: 0, scaleY: 1 }
              : { opacity: 0, y: 90, scaleY: 0.82 }
          }
          transition={{ duration: 1, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          {word}
        </motion.span>

        {/* Glitch / scan sweep across the heading */}
        <motion.span
          className="pointer-events-none absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ delay: 1.7 }}
        >
          <motion.span
            className="absolute inset-x-0 h-[38%] bg-gradient-to-b from-white/25 via-white/10 to-transparent mix-blend-screen"
            initial={{ top: '-40%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 1.1, delay: 1.7, ease: 'easeInOut' }}
          />
          {/* Chromatic split ghosts */}
          <motion.span
            className="absolute inset-0 font-cinema text-[clamp(3.4rem,16.5vw,15rem)] leading-[0.82] tracking-cinema text-ember-deep/45 mix-blend-screen"
            initial={{ opacity: 0, x: 0 }}
            animate={
              started
                ? { opacity: [0, 0.85, 0], x: [0, -9, 0] }
                : { opacity: 0, x: 0 }
            }
            transition={{ duration: 0.55, delay: 1.72, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
          <motion.span
            className="absolute inset-0 font-cinema text-[clamp(3.4rem,16.5vw,15rem)] leading-[0.82] tracking-cinema text-ember-soft/45 mix-blend-screen"
            initial={{ opacity: 0, x: 0 }}
            animate={
              started
                ? { opacity: [0, 0.85, 0], x: [0, 9, 0] }
                : { opacity: 0, x: 0 }
            }
            transition={{ duration: 0.55, delay: 1.74, ease: 'easeOut' }}
          >
            {word}
          </motion.span>
        </motion.span>

        {/* Soft glow beneath the word */}
        <motion.span
          className="pointer-events-none absolute -bottom-6 left-1/2 h-24 w-[86%] -translate-x-1/2 rounded-[100%] bg-silver-100/10 blur-3xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        />
      </span>
    </h1>
  );
}

/** Minimal cinematic HUD frame around the hero. */
function HudFrame() {
  return (
    <>
      {/* Corner brackets */}
      <span
        className="pointer-events-none absolute left-5 top-[13vh] h-10 w-10 border-l border-t border-white/15 sm:left-8 lg:left-12"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute right-5 top-[13vh] h-10 w-10 border-r border-t border-white/15 sm:right-8 lg:right-12"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-[9vh] left-5 h-10 w-10 border-b border-l border-white/15 sm:left-8 lg:left-12"
        aria-hidden="true"
      />
      <span
        className="pointer-events-none absolute bottom-[9vh] right-5 h-10 w-10 border-b border-r border-white/15 sm:right-8 lg:right-12"
        aria-hidden="true"
      />
    </>
  );
}

export default function Hero() {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const reduce =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      setStarted(true);
      return;
    }

    // Start the sequence on the next frame so the initial dark frame renders.
    const t = requestAnimationFrame(() => setStarted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Let visitors skip the intro with a keypress or a click.
  useEffect(() => {
    if (!started) return;
    const skip = (e) => {
      if (e.type === 'keydown' && e.key !== 'Escape' && e.key !== 'Enter') {
        return;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('keydown', skip);
    return () => window.removeEventListener('keydown', skip);
  }, [started]);

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden px-5 pb-24 pt-28 sm:px-8 sm:pt-32 lg:px-12"
    >
      {/* Cinematic light pool behind the headline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-[70vh] -translate-y-1/2 bg-light-pool"
        aria-hidden="true"
      />

      {/* Travelling light bar */}
      <div className="light-bar" aria-hidden="true" />

      <HudFrame />

      <div className="shell relative">
        {/* ---------- Act 1: the name ---------- */}
        <div className="relative overflow-hidden">
          <p className="mb-3 flex items-center gap-3 sm:mb-4">
            <motion.span
              className="h-px w-8 bg-silver-500 sm:w-14"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: started ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
              aria-hidden="true"
            />
            <motion.span
              className="font-mono text-[10px] uppercase tracking-[0.34em] text-silver-400 sm:text-[11px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: started ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Data Science · AI Research
            </motion.span>
          </p>

          <span className="block overflow-hidden">
            <span className="flex flex-wrap font-display text-[clamp(1.05rem,3.4vw,2.1rem)] uppercase leading-tight tracking-[0.24em] text-silver-200">
              {LETTERS.map((char, i) => (
                <motion.span
                  key={`${char}-${i}`}
                  className="inline-block"
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={started ? 'show' : 'hidden'}
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              ))}
            </span>
          </span>
        </div>

        {/* ---------- Act 2: the metallic heading ---------- */}
        <div className="relative mt-4 sm:mt-6">
          <MetalHeading started={started} />
        </div>

        {/* ---------- Act 3: title + CTAs ---------- */}
        <div className="mt-8 sm:mt-10">
          <motion.p
            className="max-w-2xl font-sans text-[13px] uppercase leading-[1.6] tracking-[0.16em] text-silver-300 sm:text-base lg:text-lg"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 18 }}
            transition={{ duration: 0.8, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
          >
            Data Science Student
            <span className="mx-2 text-ember/70">|</span>
            <span className="text-silver-100">
              Aspiring Data Scientist &amp; AI Researcher
            </span>
          </motion.p>

          <motion.p
            className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 18 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Exploring the intersection of data, artificial intelligence,
            technology and creative problem-solving.
          </motion.p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <motion.a
              href="#projects"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: started ? 1 : 0, y: started ? 0 : 16 }}
              transition={{ duration: 0.7, delay: 2.35, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-silver-100 px-7 py-3.5 font-display text-[11px] uppercase tracking-[0.18em] text-ink-950 transition-shadow duration-300 hover:shadow-metal-glow"
            >
              {/* Light sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform duration-[900ms] group-hover:translate-x-full" />
              <span className="relative">Explore My Work</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: started ? 1 : 0, y: started ? 0 : 16 }}
              transition={{ duration: 0.7, delay: 2.45, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-white/25 px-7 py-3.5 font-display text-[11px] uppercase tracking-[0.18em] text-silver-100 transition-colors duration-300 hover:border-silver-100/60 hover:bg-white/5"
            >
              <span className="relative">Contact Me</span>
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </div>
        </div>

        {/* ---------- Act 4: scroll cue ---------- */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ delay: 2.7, duration: 0.7 }}
          className="group mt-14 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35 transition-colors hover:text-silver-200"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors group-hover:border-silver-300">
            <span className="absolute inset-0 animate-ping rounded-full bg-silver-100/10" />
            <ArrowDownRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
          </span>
          Scroll to explore
        </motion.a>
      </div>
    </section>
  );
}
