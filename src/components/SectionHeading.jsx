/**
 * SectionHeading.jsx
 * Shared editorial section header: a big serif/display title, an accent
 * underline and an optional eyebrow label with a leading rule.
 */
import { motion } from 'framer-motion';
import { Squiggle } from './decorative/Decorative.jsx';

export default function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  align = 'left',
  ruleColor = '#C4E77B',
}) {
  const centered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={centered ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'}
    >
      {eyebrow && (
        <div
          className={`eyebrow text-lime/90 ${centered ? 'justify-center' : ''}`}
        >
          <span
            className="h-px w-8"
            style={{ background: ruleColor }}
            aria-hidden="true"
          />
          {eyebrow}
        </div>
      )}

      <h2 className="display mt-5 text-[clamp(2.4rem,7vw,5.2rem)] text-paper">
        {title}
        {accent && (
          <span className="relative ml-3 inline-block">
            <span className="text-lime">{accent}</span>
            <Squiggle
              className="absolute -bottom-2 left-0 h-2 w-full"
              color={ruleColor}
              width={200}
            />
          </span>
        )}
      </h2>

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
