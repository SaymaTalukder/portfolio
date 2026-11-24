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
import { Star, Burst, PlusMark } from './decorative/Decorative.jsx';

const skillGroups = [
  {
    id: '01',
    title: 'Data Science & Analytics',
    icon: BarChart3,
    accent: '#C4E77B',
    tint: 'rgba(196,231,123,0.10)',
    border: 'rgba(196,231,123,0.28)',
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
    accent: '#F04A9B',
    tint: 'rgba(240,74,155,0.10)',
    border: 'rgba(240,74,155,0.28)',
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
    accent: '#54D6E8',
    tint: 'rgba(84,214,232,0.10)',
    border: 'rgba(84,214,232,0.28)',
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
    accent: '#A99BEF',
    tint: 'rgba(169,155,239,0.10)',
    border: 'rgba(169,155,239,0.28)',
    blurb: 'The part of the job that lives in a meeting room.',
    items: [
      { icon: MessagesSquare, name: 'Technical Sales' },
      { icon: MessagesSquare, name: 'Communication' },
      { icon: Crown, name: 'Leadership' },
      { icon: Users, name: 'Team Management' },
      { icon: Presentation, name: 'Presentation & Pitching' },
      { icon: FileText, name: 'Content Strategy' },
      { icon: Bug, name: 'QA Testing' },
    ],
  },
];

function SkillCard({ group, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border p-6 backdrop-blur-sm transition-colors duration-300 sm:p-7"
      style={{
        borderColor: group.border,
        background: `linear-gradient(160deg, ${group.tint}, rgba(10,10,15,0.85) 55%)`,
      }}
    >
      {/* Corner index marker */}
      <span
        className="absolute right-5 top-5 font-display text-[10px] tracking-[0.2em]"
        style={{ color: group.accent, opacity: 0.65 }}
      >
        {group.id}
      </span>

      {/* Header */}
      <div className="flex items-start gap-4">
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border"
          style={{
            borderColor: group.border,
            background: group.tint,
            color: group.accent,
          }}
        >
          <group.icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 pr-6">
          <h3 className="font-display text-lg uppercase leading-tight tracking-tight text-paper">
            {group.title}
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-white/50">
            {group.blurb}
          </p>
        </div>
      </div>

      {/* Chips */}
      <div className="mt-6 flex flex-wrap gap-2">
        {group.items.map((item, i) => (
          <motion.span
            key={item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.06 * i }}
            className="skill-chip inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/[0.04] px-3 py-1.5 text-[11.5px] font-medium text-white/85 transition-all duration-300 hover:-translate-y-0.5"
            style={{ '--chip-accent': group.accent }}
          >
            <item.icon className="h-3.5 w-3.5 opacity-70" />
            {item.name}
          </motion.span>
        ))}
      </div>

      {/* Bottom accent line */}
      <span
        className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
        style={{ background: group.accent }}
      />
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="shell">
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
                    <Star className="h-3 w-3 text-lime/50" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3">
          <PlusMark className="h-3 w-3 text-lime" />
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/35">
            Always learning · currently deepening MLOps &amp; LLM tooling
          </p>
          <Burst className="h-4 w-4 animate-wiggle text-blush" />
        </div>
      </div>
    </section>
  );
}
