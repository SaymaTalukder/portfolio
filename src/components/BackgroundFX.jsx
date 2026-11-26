import { useEffect, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * BackgroundFX
 * Layered cinematic backdrop:
 *   1. Deep black base with plum gradient washes
 *   2. Two drifting aurora blobs for depth
 *   3. Mouse-following spotlight (fine-pointer devices only)
 *   4. Floating particle field
 *   5. Animated film grain + scanlines on top
 *
 * Everything is fixed, pointer-events-none and transform/opacity-only so it
 * never intercepts input or triggers layout thrash.
 */
export default function BackgroundFX() {
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Deterministic pseudo-random so the particle layout is stable between
  // renders (and identical between server and client).
  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const s1 = (i * 9301 + 49297) % 233280;
        const s2 = (i * 4523 + 1301) % 233280;
        const s3 = (i * 7919 + 104729) % 233280;
        const r1 = s1 / 233280;
        const r2 = s2 / 233280;
        const r3 = s3 / 233280;
        return {
          id: i,
          left: r1 * 100,
          top: r2 * 100,
          size: 1.5 + r3 * 3.5,
          depth: 0.35 + r1 * 0.65,
          delay: r2 * 9,
          duration: 11 + r3 * 14,
        };
      }),
    []
  );

  // ---- Mouse-following spotlight -----------------------------------------
  const rawX = useMotionValue(50);
  const rawY = useMotionValue(35);
  const spotX = useSpring(rawX, { stiffness: 55, damping: 22, mass: 0.6 });
  const spotY = useSpring(rawY, { stiffness: 55, damping: 22, mass: 0.6 });
  const spotLeft = useTransform(spotX, (v) => `${v}%`);
  const spotTop = useTransform(spotY, (v) => `${v}%`);

  useEffect(() => {
    if (reduceMotion) return;
    // Only run the spotlight where a precise pointer exists — on touch
    // devices the position is meaningless and the effect just adds jank.
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e) => {
      rawX.set((e.clientX / window.innerWidth) * 100);
      rawY.set((e.clientY / window.innerHeight) * 100);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [rawX, rawY, reduceMotion]);

  // ---- Scroll parallax ---------------------------------------------------
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
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* 1 — Base black + cinematic gradient washes */}
      <div className="absolute inset-0 bg-ink-950" />
      <div className="absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(ellipse_70%_60%_at_50%_-10%,rgba(36,19,75,0.85)_0%,rgba(23,16,43,0.5)_45%,rgba(5,5,5,0)_80%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[80vh] bg-[radial-gradient(ellipse_65%_55%_at_50%_115%,rgba(36,19,75,0.7)_0%,rgba(23,16,43,0.4)_40%,rgba(5,5,5,0)_78%)]" />

      {/* 2 — Drifting aurora blobs */}
      <motion.div
        className="absolute -left-48 top-[-12rem] h-[44rem] w-[44rem] opacity-40 blur-3xl"
        animate={{ y: [0, 70, 0], x: [0, 45, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#24134B_0%,rgba(36,19,75,0)_68%)]" />
      </motion.div>

      <motion.div
        className="absolute -right-56 top-[42vh] h-[40rem] w-[40rem] opacity-30 blur-3xl"
        animate={{ y: [0, -80, 0], x: [0, -55, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="h-full w-full rounded-full bg-[radial-gradient(circle,#39226B_0%,rgba(57,34,107,0)_68%)]" />
      </motion.div>

      {/* 3 — Mouse-following spotlight */}
      {!reduceMotion && (
        <motion.div
          className="absolute h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 opacity-70"
          style={{
            left: spotLeft,
            top: spotTop,
            background:
              'radial-gradient(circle, rgba(232,234,237,0.09) 0%, rgba(232,234,237,0.035) 32%, rgba(232,234,237,0) 66%)',
          }}
        />
      )}

      {/* 4 — Floating particle field */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-silver-100"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: `0 0 ${p.size * 6}px rgba(232,234,237,0.7)`,
          }}
          animate={{
            y: [0, -38, 0],
            opacity: [0.08 * p.depth, 0.42 * p.depth, 0.08 * p.depth],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* 5 — Scanlines + film grain + vignette */}
      <div className="absolute inset-0 scanlines opacity-[0.35] mix-blend-overlay" />
      <div className="film-grain animate-grain-shift" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_85%_at_50%_50%,transparent_45%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}
