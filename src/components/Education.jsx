import { motion } from 'framer-motion';
import { GraduationCap, Award, Star } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { DashedRing, Squiggle, Burst } from './decorative/Decorative.jsx';

const education = [
  {
    degree: 'Bachelor of Science in Data Science',
    abbr: 'BSDS',
    school: 'United International University (UIU)',
    status: 'Currently Ongoing',
    statusColor: '#C4E77B',
    accent: '#C4E77B',
    tint: 'rgba(196,231,123,0.10)',
    border: 'rgba(196,231,123,0.30)',
    icon: GraduationCap,
  },
  {
    degree: 'Higher Secondary Certificate',
    abbr: 'HSC',
    school: 'Adamjee Cantonment College',
    status: 'Passed: 2021',
    statusColor: '#A99BEF',
    accent: '#A99BEF',
    tint: 'rgba(169,155,239,0.10)',
    border: 'rgba(169,155,239,0.30)',
    icon: Award,
  },
];

export default function Education() {
  return (
    <section id="education" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="shell">
        <SectionHeading
          eyebrow="05 — Education"
          title="WHERE THE"
          accent="CURRICULUM"
          description="The formal track — and everything I picked up alongside it."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {education.map((item, i) => (
            <motion.article
              key={item.abbr}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              className="group relative min-w-0 overflow-hidden rounded-[1.75rem] border p-8 transition-colors duration-300 hover:border-white/30 lg:col-span-6"
              style={{
                borderColor: item.border,
                background: `linear-gradient(155deg, ${item.tint}, rgba(10,10,15,0.9) 60%)`,
              }}
            >
              {/* Oversized abbreviation */}
              <span
                className="pointer-events-none absolute -right-2 -top-6 font-display text-[6.5rem] leading-none opacity-[0.07]"
                style={{ color: item.accent }}
              >
                {item.abbr}
              </span>

              <div className="relative flex items-start gap-4">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border"
                  style={{
                    borderColor: item.border,
                    background: item.tint,
                    color: item.accent,
                  }}
                >
                  <item.icon className="h-5 w-5" />
                </span>

                <div className="min-w-0">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em]"
                    style={{
                      borderColor: item.border,
                      color: item.statusColor,
                    }}
                  >
                    <span
                      className="h-1.5 w-1.5 animate-blink rounded-full"
                      style={{ background: item.statusColor }}
                    />
                    {item.status}
                  </span>

                  <h3 className="mt-4 font-display text-xl uppercase leading-tight tracking-tight text-paper sm:text-2xl">
                    {item.degree}
                  </h3>

                  <p className="mt-2 text-sm text-white/60">{item.school}</p>
                </div>
              </div>

              <div className="relative mt-7 flex items-center gap-3 border-t border-white/10 pt-5">
                <Squiggle className="h-2.5 w-24" color={item.accent} />
                <Star className="h-3 w-3" style={{ color: item.accent }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  {item.abbr}
                </span>
              </div>
            </motion.article>
          ))}

          {/* Side note panel */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="relative overflow-hidden rounded-[1.75rem] border border-dashed border-white/18 p-8 lg:col-span-12"
          >
            <DashedRing className="absolute -right-8 -top-8 h-32 w-32 animate-spinSlow text-lime/25" />
            <Burst className="absolute -bottom-4 left-6 h-8 w-8 animate-wiggle text-blush/60" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="font-display text-[10px] uppercase tracking-[0.28em] text-lime">
                  Beyond the syllabus
                </p>
                <p className="mt-4 font-serif text-2xl italic leading-snug text-white/85 sm:text-3xl">
                  Two years of marketing taught me how to explain a technical
                  idea to a room that didn&apos;t speak code.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {['Self-taught dev', 'Open-source collabs', 'Client-facing demos'].map(
                  (t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/20 px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white/60"
                    >
                      {t}
                    </span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
