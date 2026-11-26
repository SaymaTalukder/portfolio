import { motion } from 'framer-motion';
import { Briefcase, Megaphone, Star, ArrowUpRight } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { ChromeSweep, Reveal, LightPool } from './Cinematic.jsx';
import PukuQASpotlight from './PukuQASpotlight.jsx';

/**
 * Professional experience — preserved exactly as it appeared in the CV,
 * re-presented as a cinematic timeline in the hero's material language.
 */
const experiences = [
  {
    role: 'Sales Tech Engineer',
    org: 'Poridhi.io',
    period: 'Present',
    meta: 'Full-time · Technology Sales & QA',
    icon: Briefcase,
    accent: '#FF8A3D',
    tint: 'rgba(255,138,61,0.07)',
    border: 'rgba(255,138,61,0.24)',
    // Renders the dedicated Puku Editor QA spotlight beneath this card.
    showPukuQA: true,
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
    accent: '#FFB37A',
    tint: 'rgba(255,179,122,0.07)',
    border: 'rgba(255,179,122,0.24)',
    points: [
      'Led marketing campaigns and promotional activities.',
      'Managed collaborations and stakeholder communication.',
      'Mentored junior executive team members.',
      'Analyzed campaign feedback to improve marketing strategies.',
    ],
    tags: ['Campaigns', 'Leadership', 'Stakeholders', 'Analytics'],
  },
];

/** Research interests — the "where the curiosity points" panel. */
const researchInterests = [
  {
    title: 'Explainable Machine Learning',
    body: 'Models that can justify their own predictions — SHAP-based interpretation, drift monitoring, and interpretable risk scoring.',
    accent: '#FF8A3D',
  },
  {
    title: 'Climate & Public Health Data',
    body: 'Connecting weather, air quality, and socioeconomic signals to forecast disease risk at a regional level.',
    accent: '#FFB37A',
  },
  {
    title: 'Applied AI Engineering',
    body: 'Retrieval pipelines, evaluation harnesses, and enterprise agents grounded in verifiable, cited sources.',
    accent: '#FFA25C',
  },
];

function TimelineCard({ exp, index }) {
  const flipped = index % 2 === 1;

  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-0">
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
          <Star className="h-2.5 w-2.5" style={{ color: exp.accent }} />
          <span className="sr-only">Timeline marker</span>
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
          className={`chrome-border group relative overflow-hidden rounded-[1.75rem] border p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 sm:p-8 ${
            flipped ? 'md:ml-10' : 'md:mr-10'
          }`}
          style={{
            borderColor: exp.border,
            background: `linear-gradient(155deg, ${exp.tint}, rgba(10,10,15,0.9) 62%)`,
          }}
        >
          {/* Big faded role number */}
          <span
            className="pointer-events-none absolute -right-3 -top-6 font-display text-[6rem] leading-none opacity-[0.06]"
            style={{ color: exp.accent }}
          >
            0{index + 1}
          </span>

          <div className="relative flex items-start gap-4">
            {/* Brushed metal icon plate */}
            <span
              className="chrome-border grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-transform duration-500 group-hover:scale-105"
              style={{
                borderColor: exp.border,
                background: `linear-gradient(140deg, rgba(255,255,255,0.10), ${exp.tint})`,
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
              <p
                className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em]"
                style={{ color: exp.accent }}
              >
                {exp.period} · {exp.meta}
              </p>
            </div>
          </div>

          <ul className="relative mt-7 space-y-3">
            {exp.points.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 text-sm leading-relaxed text-white/75"
              >
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
                className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-white/55 transition-colors duration-300 hover:border-white/35"
              >
                {t}
              </span>
            ))}
          </div>

          <span
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: exp.accent }}
          />

          <ChromeSweep />
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <LightPool position="top" intensity={0.07} className="top-0" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="04 — Experience"
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
                'linear-gradient(180deg, rgba(232,234,237,0.7) 0%, rgba(255,138,61,0.55) 35%, rgba(255,179,122,0.5) 70%, rgba(232,234,237,0.2) 100%)',
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-14 md:gap-20">
            {experiences.map((exp, i) => (
              <TimelineCard key={exp.role} exp={exp} index={i} />
            ))}
          </div>
        </div>

        {/* ---------- Puku Editor QA spotlight ---------- */}
        <div className="mt-16">
          <PukuQASpotlight />
        </div>

        {/* ---------- Research interests ---------- */}
        <div className="mt-24">
          <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-silver-300/30 to-transparent" />
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-silver-400">
              Research interests
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-transparent via-silver-300/30 to-transparent" />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {researchInterests.map((r, i) => (
              <motion.article
                key={r.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                whileHover={{ y: -5 }}
                className="chrome-border group relative overflow-hidden rounded-[1.6rem] border border-white/12 bg-ink-900/60 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-white/28"
              >
                <span
                  className="absolute -right-2 -top-3 font-display text-[5rem] leading-none opacity-[0.06]"
                  style={{ color: r.accent }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span
                  className="mb-4 block h-1 w-10 rounded-full transition-all duration-500 group-hover:w-16"
                  style={{ background: r.accent }}
                />

                <h3 className="font-display text-lg uppercase leading-tight tracking-tight text-paper">
                  {r.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {r.body}
                </p>

                <ChromeSweep />
              </motion.article>
            ))}
          </div>
        </div>

        {/* Closing note */}
        <Reveal>
          <div className="chrome-border mt-20 flex flex-col items-start gap-5 overflow-hidden rounded-[1.75rem] border border-white/12 bg-ink-900/50 p-8 backdrop-blur-sm sm:flex-row sm:items-center">
            <span className="h-12 w-[3px] shrink-0 rounded-full bg-ember" />
            <p className="font-serif text-xl italic leading-snug text-white/75 sm:text-2xl">
              Every client call and every bug report has taught me the same
              lesson: clarity is a feature, not a nicety.
            </p>
            <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-ember-deep sm:block" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
