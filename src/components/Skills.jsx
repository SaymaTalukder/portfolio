import { motion } from 'framer-motion';
import {
  Code2,
  Database,
  BarChart3,
  Brain,
  Boxes,
  Network,
  Layout,
  Server,
  GitBranch,
  MessagesSquare,
  Crown,
  Users,
  Presentation,
  FileText,
  Bug,
} from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { LightPool, ChromeSweep, Reveal } from './Cinematic.jsx';
import { Star } from './decorative/Decorative.jsx';

/**
 * Skills — the existing toolkit, re-presented as a chrome-and-metal
 * capability matrix that matches the hero's material language.
 *
 * Each group keeps its own accent colour for wayfinding, but the surface
 * treatment is shared: dark glass, chrome hairline edge, brushed-metal
 * icon plate and a travelling highlight on hover.
 */
const skillGroups = [
  {
    id: '01',
    title: 'Data Science & Analytics',
    icon: BarChart3,
    accent: '#FF8A3D',
    tint: 'rgba(255,138,61,0.07)',
    border: 'rgba(255,138,61,0.24)',
    blurb: 'From raw tables to decisions someone actually acts on.',
    items: [
      { icon: Code2, name: 'Python' },
      { icon: Database, name: 'SQL' },
      { icon: BarChart3, name: 'Power BI' },
      { icon: Boxes, name: 'Pandas' },
      { icon: BarChart3, name: 'Matplotlib' },
      { icon: Code2, name: 'Data Analysis' },
    ],
  },
  {
    id: '02',
    title: 'AI & Machine Learning',
    icon: Brain,
    accent: '#FFA25C',
    tint: 'rgba(255,162,92,0.07)',
    border: 'rgba(255,162,92,0.24)',
    blurb: 'Models, pipelines and explainability — no black boxes.',
    items: [
      { icon: Brain, name: 'Scikit-learn' },
      { icon: Network, name: 'XGBoost' },
      { icon: Network, name: 'Random Forest' },
      { icon: BarChart3, name: 'SHAP Explainability' },
      { icon: GitBranch, name: 'DVC Pipelines' },
      { icon: Database, name: 'API-based Data Collection' },
    ],
  },
  {
    id: '03',
    title: 'Web Development & Technology',
    icon: Layout,
    accent: '#FFB37A',
    tint: 'rgba(255,179,122,0.07)',
    border: 'rgba(255,179,122,0.24)',
    blurb: 'Interfaces that ship fast and behave themselves.',
    items: [
      { icon: Layout, name: 'Next.js' },
      { icon: Code2, name: 'React' },
      { icon: Server, name: 'Flask' },
      { icon: Layout, name: 'Tailwind CSS' },
      { icon: Code2, name: 'Frontend Development' },
      { icon: GitBranch, name: 'Git & GitHub' },
    ],
  },
  {
    id: '04',
    title: 'Professional Skills',
    icon: Crown,
    accent: '#FFA25C',
    tint: 'rgba(255,162,92,0.07)',
    border: 'rgba(255,162,92,0.24)',
    blurb: 'The part of the job that lives in a meeting room.',
    items: [
      { icon: MessagesSquare, name: 'Technical Sales' },
      { icon: MessagesSquare, name: 'Communication' },
      { icon: Crown, name: 'Leadership' },
      { icon: Users, name: 'Team Management' },
      { icon: Presentation, name: 'Presentation & Pitching' },
      { icon: FileText, name: 'Content Strategy' },
      { icon: Bug, name: 'QA Testing', href: '#puku-qa' },
    ],
  },
];

function SkillCard({ group, index }) {
  const { accent, tint, border } = group;

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="chrome-border group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-6 backdrop-blur-sm sm:p-7"
      style={{
        borderColor: border,
        background: `linear-gradient(155deg, ${tint}, rgba(10,10,15,0.9) 62%)`,
      }}
    >
      {/* Corner index marker */}
      <span
        className="absolute right-5 top-5 font-mono text-[10px] tracking-[0.2em]"
        style={{ color: accent, opacity: 0.6 }}
      >
        {group.id}
      </span>

      {/* Header */}
      <div className="flex items-start gap-4">
        {/* Brushed metal icon plate */}
        <span
          className="chrome-border grid h-12 w-12 shrink-0 place-items-center rounded-2xl border transition-transform duration-500 group-hover:scale-105"
          style={{
            borderColor: border,
            background: `linear-gradient(140deg, rgba(255,255,255,0.10), ${tint})`,
            color: accent,
          }}
        >
          <group.icon className="h-5 w-5" />
        </span>

        <div className="min-w-0 pr-6">
          <h3 className="font-display text-lg uppercase leading-tight tracking-tight text-paper">
            {group.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-white/45">
            {group.blurb}
          </p>
        </div>
      </div>

      {/* Chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {group.items.map((item, i) =>
          item.href ? (
            /* The QA Testing chip jumps to the Puku Editor spotlight so the
               specific work behind the skill is one click away. */
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.06 * i }}
              className="skill-chip inline-flex items-center gap-1.5 rounded-full border border-ember/40 bg-ember/[0.07] px-3 py-1.5 text-[11.5px] font-medium text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember hover:text-ember"
              style={{ '--chip-accent': '#FF8A3D' }}
            >
              <item.icon className="h-3.5 w-3.5 opacity-70" />
              {item.name}
            </motion.a>
          ) : (
            <motion.span
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.06 * i }}
              className="skill-chip inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[11.5px] font-medium text-white/85 transition-all duration-300 hover:-translate-y-0.5"
              style={{ '--chip-accent': accent }}
            >
              <item.icon className="h-3.5 w-3.5 opacity-70" />
              {item.name}
            </motion.span>
          )
        )}
      </div>

      {/* Bottom accent line */}
      <span
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: accent }}
      />

      <ChromeSweep />
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      {/* Light pool, offset to the right so it differs from the About set. */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_78%_12%,rgba(232,234,237,0.055)_0%,rgba(5,5,5,0)_72%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="02 — Skills & expertise"
          title="THE TOOLKIT"
          accent="I REACH FOR"
          description="Four shelves of tools, each one earned on a real project, a real dataset, or a real client call."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.id} group={group} index={i} />
          ))}
        </div>

        {/* Marquee strip of capabilities */}
        <div className="mt-16 overflow-hidden border-y border-white/10 py-4">
          <div className="mask-fade-x flex w-max animate-marquee items-center gap-8 whitespace-nowrap">
            {Array.from({ length: 2 }).map((_, dup) => (
              <div key={dup} className="flex items-center gap-8">
                {[
                  'Data Analysis',
                  'Model Explainability',
                  'Pipeline Engineering',
                  'Technical Demos',
                  'API Integration',
                  'Quality Assurance',
                  'Stakeholder Storytelling',
                  'Frontend Craft',
                ].map((t) => (
                  <span
                    key={`${dup}-${t}`}
                    className="flex items-center gap-8 font-display text-sm uppercase tracking-[0.24em] text-white/40"
                  >
                    {t}
                    <Star className="h-3 w-3 text-ember/50" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex items-center gap-3">
            <span className="h-px w-8 bg-silver-500/60" aria-hidden="true" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
              Always learning · currently deepening MLOps &amp; LLM tooling
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
