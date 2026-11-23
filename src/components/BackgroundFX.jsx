import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Star, Blob } from './decorative/Decorative.jsx';

/**
 * BackgroundFX
 *  Layered black → plum atmospheric backdrop with drifting ornaments.
 *  Fixed and non-interactive so it never intercepts pointer events.
 */
export default function BackgroundFX() {
  // Deterministic pseudo-random so the layout is stable between renders.
  const specks = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const r = seed / 233280;
        const seed2 = (i * 4523 + 1301) % 233280;
        const r2 = seed2 / 233280;
        return {
          id: i,
          left: r * 100,
          top: r2 * 100,
          size: 2 + r * 5,
          color: ['#C4E77B', '#F04A9B', '#54D6E8', '#A99BEF'][i % 4],
          delay: r2 * 8,
          duration: 9 + r * 12,
        };
      }),
    []
  );

  // Slow parallax driven by scroll position.
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        root.style.setProperty('--scroll-y', `${window.scrollY}px`);
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden grain">
      {/* Base black wash */}
      <div className="absolute inset-0 bg-ink-950" />

      {/* Deep plum vignette rising from the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[85vh] bg-[radial-gradient(ellipse_70%_60%_at_50%_110%,#24134B_0%,#17102B_35%,#050505_72%)] opacity-90" />

      {/* Large drifting plum blobs */}
      <motion.div
        className="absolute -left-40 top-[-10rem] h-[42rem] w-[42rem] opacity-45 blur-3xl"
        animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Blob className="h-full w-full" fill="#24134B" />
      </motion.div>

      <motion.div
        className="absolute -right-52 top-[45vh] h-[38rem] w-[38rem] opacity-35 blur-3xl"
        animate={{ y: [0, -70, 0], x: [0, -50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Blob className="h-full w-full" fill="#39226B" />
      </motion.div>

      {/* Faint lime aura at the very top */}
      <div className="absolute inset-x-0 top-0 h-[40vh] bg-[radial-gradient(ellipse_60%_80%_at_50%_0%,rgba(196,231,123,0.09),transparent_65%)]" />

      {/* Floating specks */}
      {specks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 5}px ${s.color}`,
          }}
          animate={{
            y: [0, -34, 0],
            opacity: [0.25, 0.85, 0.25],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Sparse star ornaments */}
      <Star className="absolute left-[8%] top-[62%] h-5 w-5 animate-floaty text-lime/25" />
      <Star className="absolute right-[12%] top-[22%] h-7 w-7 animate-floaty text-blush/25 [animation-delay:1.4s]" />
      <Star className="absolute right-[28%] bottom-[18%] h-4 w-4 animate-floaty text-aqua/30 [animation-delay:2.6s]" />

      {/* Subtle horizontal rules for an editorial grid feel */}
      <div className="absolute inset-x-0 top-1/3 h-px bg-white/[0.035]" />
      <div className="absolute inset-x-0 top-2/3 h-px bg-white/[0.035]" />
    </div>
  );
}
