import { motion } from 'framer-motion';
import { Briefcase, Megaphone, Sparkles, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { Star, Burst, Squiggle } from './decorative/Decorative.jsx';

const experiences = [
  {
    role: 'Sales Tech Engineer',
    org: 'Poridhi.io',
    period: 'Present',
    meta: 'Full-time · Technology Sales & QA',
    icon: Briefcase,
    accent: '#C4E77B',
    tint: 'rgba(196,231,123,0.10)',
    border: 'rgba(196,231,123,0.30)',
    points: [
      'Conduct technical sales calls and product demonstrations.',
      'Understand client requirements and communicate technical product value.',
      'Contribute to content strategy and brand visibility.',
      'Perform QA testing for Puku Editor, identifying bugs and verifying functionality.',
    ],
    tags: ['Technical Sales', 'Product Demos', 'QA Testing', 'Content Strategy'],
  },
  {
    role: 'Senior Marketing Executive',
    org: 'Times UIU',
    period: '2024 — 2026',
    meta: 'United International University',
    icon: Megaphone,
    accent: '#F04A9B',
    tint: 'rgba(240,74,155,0.10)',
    border: 'rgba(240,74,155,0.30)',
    points: [
      'Led marketing campaigns and promotional activities.',
      'Managed collaborations and stakeholder communication.',
      'Mentored junior executive team members.',
      'Analyzed campaign feedback to improve marketing strategies.',
    ],
    tags: ['Campaigns', 'Leadership', 'Stakeholders', 'Analytics'],
  },
];

function TimelineCard({ exp, index }) {
  const flipped = index % 2 === 1;

  return (
    <div className="relative grid gap-6 md:grid-cols-2 md:gap-0">
      {/* Spine node */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-120px' }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="absolute left-[-0.3125rem] top-8 z-20 md:left-1/2 md:-translate-x-1/2"
      >
        <span
          className="relative grid h-6 w-6 place-items-center rounded-full border-2 md:h-7 md:w-7"
          style={{ borderColor: exp.accent, background: '#050505' }}
        >
          <span
            className="absolute inset-0 animate-ping rounded-full opacity-40"
            style={{ background: exp.accent }}
          />
          <Star className="h-2.5 w-2.5" />
          <span className="sr-only" style={{ color: exp.accent }}>
            Timeline marker
          </span>
        </span>
      </motion.div>

      {/* Empty column for symmetry on desktop */}
      <div className={flipped ? 'hidden md:block' : 'hidden md:col-start-2 md:block'} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={flipped ? 'md:col-start-1 md:row-start-1' : 'md:col-start-2'}
      >
        <div
          className={`group relative overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${
            flipped ? 'md:ml-10' : 'md:mr-10'
          }`}
          style={{
            borderColor: exp.border,
            background: `linear-gradient(155deg, ${exp.tint}, rgba(10,10,15,0.9) 60%)`,
          }}
        >
          {/* Big faded role number */}
          <span
            className="pointer-events-none absolute -right-3 -top-6 font-display text-[6rem] leading-none opacity-[0.07]"
            style={{ color: exp.accent }}
          >
            0{index + 1}
          </span>

          <div className="relative flex items-start gap-4">
            <span
              className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border"
              style={{
                borderColor: exp.border,
                background: exp.tint,
                color: exp.accent,
              }}
            >
              <exp.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="font-display text-xl uppercase leading-tight tracking-tight text-paper sm:text-2xl">
                {exp.role}
              </h3>
              <p className="mt-1.5 text-sm text-white/60">{exp.org}</p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: exp.accent }}>
                {exp.period} · {exp.meta}
              </p>
            </div>
          </div>

          <ul className="relative mt-7 space-y-3">
            {exp.points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-sm leading-relaxed text-white/75">
                <span
                  className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rotate-45"
                  style={{ background: exp.accent }}
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <div className="relative mt-7 flex flex-wrap gap-2">
            {exp.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/55"
              >
                {t}
              </span>
            ))}
          </div>

          <span
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: exp.accent }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="shell">
        <SectionHeading
          eyebrow="03 — Experience"
          title="THE PATH SO"
          accent="FAR"
          description="Two roles, two very different rooms — and a lot of transferable muscle between them."
        />

        <div className="relative mt-20">
          {/* Vertical spine */}
          <span
            className="absolute left-[-0.3125rem] top-0 h-full w-[3px] -translate-x-1/2 rounded-full md:left-1/2"
            style={{
              background:
                'linear-gradient(180deg, #C4E77B 0%, #F04A9B 45%, #54D6E8 100%)',
              opacity: 0.55,
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-14 md:gap-20">
            {experiences.map((exp, i) => (
              <TimelineCard key={exp.role} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 flex flex-col items-start gap-4 rounded-[1.75rem] border border-dashed border-white/15 p-8 sm:flex-row sm:items-center"
        >
          <Burst className="h-9 w-9 shrink-0 animate-wiggle text-lime" />
          <p className="font-serif text-xl italic leading-snug text-white/70 sm:text-2xl">
            Every client call and every bug report has taught me the same
            lesson: clarity is a feature, not a nicety.
          </p>
          <Squiggle className="hidden h-3 w-40 shrink-0 sm:block" color="#F04A9B" />
          <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-blush sm:block" />
        </motion.div>
      </div>
    </section>
  );
}
