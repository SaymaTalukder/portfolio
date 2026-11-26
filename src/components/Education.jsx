import { motion } from 'framer-motion';
import { GraduationCap, Award, Star } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { ChromeSweep, Reveal, LightPool } from './Cinematic.jsx';

const education = [
  {
    degree: 'Bachelor of Science in Data Science',
    abbr: 'BSDS',
    school: 'United International University (UIU)',
    status: 'Currently Ongoing',
    statusColor: '#FF8A3D',
    accent: '#FF8A3D',
    tint: 'rgba(255,138,61,0.07)',
    border: 'rgba(255,138,61,0.24)',
    icon: GraduationCap,
  },
  {
    degree: 'Higher Secondary Certificate',
    abbr: 'HSC',
    school: 'Adamjee Cantonment College',
    status: 'Passed: 2021',
    statusColor: '#FFA25C',
    accent: '#FFA25C',
    tint: 'rgba(255,162,92,0.07)',
    border: 'rgba(255,162,92,0.24)',
    icon: Award,
  },
];

export default function Education() {
  return (
    <section
      id="education"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <LightPool position="top" intensity={0.06} className="top-0" />

      <div className="shell relative">
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
              className="chrome-border group relative min-w-0 overflow-hidden rounded-[1.75rem] border p-8 transition-colors duration-300 hover:border-white/28 lg:col-span-6"
              style={{
                borderColor: item.border,
                background: `linear-gradient(155deg, ${item.tint}, rgba(10,10,15,0.9) 62%)`,
              }}
            >
              {/* Oversized abbreviation */}
              <span
                className="pointer-events-none absolute bottom-3 right-4 select-none font-display text-[3.4rem] leading-none tracking-tight opacity-[0.07]"
                style={{ color: item.accent }}
              >
                {item.abbr}
              </span>

              <div className="relative flex items-start gap-4">
                {/* Brushed metal icon plate */}
                <span
                  className="chrome-border grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-transform duration-500 group-hover:scale-105"
                  style={{
                    borderColor: item.border,
                    background: `linear-gradient(140deg, rgba(255,255,255,0.10), ${item.tint})`,
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
                <Star className="h-3 w-3" style={{ color: item.accent }} />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                  {item.abbr}
                </span>
                <span
                  className="h-px flex-1"
                  style={{ background: item.accent, opacity: 0.35 }}
                  aria-hidden="true"
                />
              </div>

              <ChromeSweep />
            </motion.article>
          ))}

          {/* Side note panel */}
          {/* The Reveal wrapper is the grid child, so it carries the column
              span — putting it on the inner div left this panel squeezed
              into a single narrow track. */}
          <Reveal delay={0.2} className="lg:col-span-12">
            <div className="chrome-border relative overflow-hidden rounded-[1.75rem] border border-white/12 bg-ink-900/50 p-8 backdrop-blur-sm">
              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
                    Beyond the syllabus
                  </p>
                  <p className="mt-4 font-serif text-2xl italic leading-snug text-white/85 sm:text-3xl">
                    Two years of marketing taught me how to explain a technical
                    idea to a room that didn&apos;t speak code.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {[
                    'Self-taught dev',
                    'Open-source collabs',
                    'Client-facing demos',
                  ].map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.14em] text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <ChromeSweep />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
