import { motion } from 'framer-motion';
import { Squiggle } from './decorative/Decorative.jsx';

/**
 * SectionHeading — the shared section header.
 *
 * Uses the same ingredients as the hero: a monospaced eyebrow with a
 * leading rule, a brushed-metal display title with an accent word, and a
 * hairline metallic rule that opens into the body copy.
 *
 * The extruded "depth" edge behind the title is drawn with pseudo-elements
 * (`data-depth-text`), so the heading's accessible name stays exactly the
 * visible text instead of repeating three times.
 */
export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'left',
  ruleColor = '#FF8A3D',
}) {
  const centered = align === 'center';
  const depthText = accent ? `${title} ${accent}` : title;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}
    >
      {eyebrow && (
        <div className="flex items-center gap-3">
          {!centered && (
            <span
              className="h-px w-8"
              style={{ background: ruleColor }}
              aria-hidden="true"
            />
          )}
          <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/45 sm:text-[11px]">
            {eyebrow}
          </span>
          {centered && (
            <span
              className="h-px w-8"
              style={{ background: ruleColor }}
              aria-hidden="true"
            />
          )}
        </div>
      )}

      <h2
        className="display metal-depth relative mt-5 text-[clamp(2.2rem,6.5vw,5rem)] leading-[0.92] tracking-tight"
        data-depth-text={depthText}
      >
        <span className="metal metal-sheen relative block">
          {title}
          {accent && (
            <span className="ml-3 inline-block align-baseline">
              <span className="metal-accent">{accent}</span>
            </span>
          )}
        </span>
      </h2>

      {/* Hairline metallic rule */}
      <motion.span
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="metal-rule mt-7 block h-px w-40 origin-left"
        aria-hidden="true"
      />

      {/* Hand-drawn flourish under the accent word */}
      {accent && (
        <Squiggle
          className="mt-3 h-2.5 w-28 sm:w-36"
          color={ruleColor}
          width={200}
        />
      )}

      {description && (
        <p
          className={`mt-6 text-base leading-relaxed text-white/60 sm:text-lg ${
            centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
