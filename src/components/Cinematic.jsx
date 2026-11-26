import { motion } from 'framer-motion';
import { Squiggle } from './decorative/Decorative.jsx';

/**
 * Cinematic.jsx
 * Shared visual primitives extracted from the hero so every section speaks
 * the same language: brushed-metal display type, HUD corner brackets,
 * breathing light pools and travelling light bars.
 */

/**
 * MetalTitle
 * A large metallic heading with optional accent words, matching the
 * treatment used for the hero's PORTFOLIO block.
 *
 * `depth` adds the offset dark copies behind the metal face that give the
 * hero heading its extruded 3D feel.
 */
export function MetalTitle({
  children,
  accent,
  className = '',
  depth = true,
  animate = true,
  size = 'text-[clamp(2.2rem,6.5vw,5rem)]',
  leading = 'leading-[0.92]',
}) {
  const accentWords = accent ? (Array.isArray(accent) ? accent : [accent]) : [];

  return (
    <h2
      className={`display metal-depth relative select-none ${size} ${leading} tracking-tight ${className}`}
      data-depth-text={
        depth
          ? `${children}${accentWords.length ? ' ' + accentWords.join(' ') : ''}`
          : undefined
      }
    >
      <span className="metal metal-sheen relative block">{children}</span>

      {/* Accent words sit above the metallic face in a solid colour. */}
      {accentWords.map((word) => (
        <span key={word} className="metal-accent">
          {word}
        </span>
      ))}
    </h2>
  );
}

/**
 * HudCorners
 * The four corner brackets from the hero. They frame a section the way a
 * camera frame frames a shot.
 */
export function HudCorners({ className = '' }) {
  return (
    <>
      <span
        className={`pointer-events-none absolute left-5 top-10 h-8 w-8 border-l border-t border-white/12 sm:left-8 lg:left-12 ${className}`}
        aria-hidden="true"
      />
      <span
        className={`pointer-events-none absolute right-5 top-10 h-8 w-8 border-r border-t border-white/12 sm:right-8 lg:right-12 ${className}`}
        aria-hidden="true"
      />
    </>
  );
}

/**
 * LightPool
 * The soft elliptical glow that sits behind the hero headline. Each section
 * gets its own pool so the page reads as a sequence of lit sets.
 */
export function LightPool({
  position = 'top',
  intensity = 0.1,
  className = '',
}) {
  const gradient =
    position === 'top'
      ? `radial-gradient(ellipse 60% 48% at 50% 0%, rgba(232,234,237,${intensity}) 0%, rgba(232,234,237,0) 70%)`
      : `radial-gradient(ellipse 60% 48% at 50% 100%, rgba(232,234,237,${intensity}) 0%, rgba(232,234,237,0) 70%)`;

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 -z-10 h-[60vh] ${className}`}
      style={{ background: gradient }}
      aria-hidden="true"
    />
  );
}

/**
 * SectionMeta
 * The monospaced eyebrow label with its leading rule, mirroring the hero's
 * "DATA SCIENCE · AI RESEARCH" line.
 */
export function SectionMeta({ children, color = '#FF8A3D' }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="h-px w-8"
        style={{ background: color }}
        aria-hidden="true"
      />
      <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/45 sm:text-[11px]">
        {children}
      </span>
    </div>
  );
}

/**
 * SectionRule
 * The hairline metallic rule that separates a heading from its body copy.
 */
export function SectionRule({ className = 'w-40' }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`metal-rule block h-px origin-left ${className}`}
      aria-hidden="true"
    />
  );
}

/**
 * Reveal
 * The standard scroll-in reveal used across the site: content rises and
 * fades as it enters the viewport.
 */
export function Reveal({ children, delay = 0, className = '', y = 26 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * MetalCard
 * A card with the chrome hairline border used across the hero-adjacent
 * components. Gives every panel the same brushed-metal edge.
 */
export function MetalCard({
  children,
  className = '',
  accent = 'rgba(232,234,237,0.10)',
  tint = 'rgba(232,234,237,0.04)',
  hover = true,
  style,
}) {
  return (
    <div
      className={`chrome-border relative overflow-hidden rounded-[1.75rem] border ${
        hover ? 'transition-all duration-300 hover:border-white/25' : ''
      } ${className}`}
      style={{
        borderColor: accent,
        background: `linear-gradient(155deg, ${tint}, rgba(10,10,15,0.9) 60%)`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * ChromeSweep
 * The travelling light highlight that crosses a panel on hover — the same
 * effect used on the hero CTA buttons and the project cards.
 */
export function ChromeSweep({ className = '' }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1.1s] group-hover:translate-x-full ${className}`}
      aria-hidden="true"
    />
  );
}

export { Squiggle };
