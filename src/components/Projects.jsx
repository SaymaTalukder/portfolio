import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, Star } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import {
  AtlasPreview,
  ClimaGuardPreview,
  GridMatePreview,
  SafetyAppPreview,
} from './decorative/ProjectPreviews.jsx';
import { Burst, Squiggle, PlusMark } from './decorative/Decorative.jsx';

/**
 * Featured projects from the CV.
 * `links` only contains URLs that actually exist — no invented destinations.
 */
const projects = [
  {
    id: 'AI Atlas',
    title: 'AI Atlas',
    tagline: 'Interactive AI Knowledge & Technology Guide',
    description:
      'An interactive educational platform covering 15+ AI categories and 20+ curated topics, including LLMs, RAG, AI Agents, Embeddings, Vector Databases, and MLOps.',
    stack: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    features: [
      'Visual AI Ecosystem Map',
      'Interactive Learning Roadmaps',
      'Technology Comparison Tools',
      'Find the Right Technology decision tree',
    ],
    accent: '#C4E77B',
    tint: 'rgba(196,231,123,0.10)',
    border: 'rgba(196,231,123,0.30)',
    Preview: AtlasPreview,
    role: 'Creator & Developer',
    links: [
      {
        label: 'Live Demo',
        href: 'https://ai-atlas-navy.vercel.app',
        icon: ExternalLink,
      },
    ],
    layout: 'feature',
  },
  {
    id: 'ClimaGuard',
    title: 'ClimaGuard',
    tagline: 'Regional Environmental Disease-Risk Nowcast',
    description:
      'An end-to-end machine learning project estimating regional disease risks using climate, air-quality, and socioeconomic data.',
    stack: ['Python', 'DVC', 'XGBoost', 'Random Forest', 'SHAP', 'Flask', 'Open-Meteo API'],
    features: [
      'Machine Learning prediction pipelines',
      'SHAP explainability',
      'Drift monitoring',
      'Real-time weather integration',
      'Interactive Bangladesh regional risk maps',
    ],
    accent: '#54D6E8',
    tint: 'rgba(84,214,232,0.10)',
    border: 'rgba(84,214,232,0.30)',
    Preview: ClimaGuardPreview,
    role: 'Project Contributor',
    links: [],
    layout: 'half',
  },
  {
    id: 'GridMate',
    title: 'GridMate',
    tagline: 'Enterprise AI Teammate & Knowledge Conflict Engine',
    description:
      'An enterprise AI workspace that processes organizational documents, extracts source-grounded information, and detects contradictions across knowledge bases.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
    features: [
      'Multi-channel AI agents',
      'Verifiable citation pipelines',
      'Role-based workspace governance',
    ],
    accent: '#F04A9B',
    tint: 'rgba(240,74,155,0.10)',
    border: 'rgba(240,74,155,0.30)',
    Preview: GridMatePreview,
    role: 'Project Contributor',
    links: [],
    layout: 'half',
  },
  {
    id: 'My Safety App',
    title: 'My Safety App',
    tagline: 'Personal Safety Application',
    description:
      'A collaborative project focused on developing a user-friendly personal safety platform with intuitive navigation, accessibility, and structured milestone delivery.',
    stack: ['UI/UX Design', 'Frontend Development'],
    features: [
      'Intuitive navigation',
      'Accessibility focus',
      'Structured milestone delivery',
    ],
    accent: '#A99BEF',
    tint: 'rgba(169,155,239,0.10)',
    border: 'rgba(169,155,239,0.30)',
    Preview: SafetyAppPreview,
    role: 'Team Contributor (UI/UX & Development)',
    links: [],
    layout: 'feature',
  },
];

/** Sticky colored label listing the tech stack. */
function StackTags({ stack, accent }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <span
          key={s}
          className="rounded border border-white/12 bg-white/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-white/60"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

function LinkButtons({ links, accent }) {
  if (!links.length) return null;
  return (
    <div className="mt-7 flex flex-wrap gap-3">
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-[11px] uppercase tracking-[0.16em] transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: accent,
            color: '#050505',
          }}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      ))}
    </div>
  );
}

/** Full-width hero card for the lead projects. */
function FeatureCard({ project, index }) {
  const { accent, tint, border, Preview } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-[2rem] border"
      style={{ borderColor: border, background: `linear-gradient(150deg, ${tint}, rgba(10,10,15,0.92) 60%)` }}
    >
      {/* Preview panel */}
      <div className="relative overflow-hidden border-b border-white/10 sm:border-b-0 sm:border-r">
        <div className="aspect-[5/3] w-full sm:h-full sm:aspect-auto sm:min-h-[19rem]">
          <Preview />
        </div>
        {/* Sweep highlight on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1.1s] group-hover:translate-x-full" />
      </div>

      {/* Content */}
      <div className="relative p-7 sm:p-9 lg:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-md px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.18em]"
            style={{ background: accent, color: '#050505' }}
          >
            {project.role}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
            {project.stack.length} technologies
          </span>
        </div>

        <h3 className="mt-5 font-display text-[clamp(1.9rem,4.5vw,3.2rem)] uppercase leading-[0.95] tracking-tight text-paper">
          {project.title}
        </h3>

        <p className="mt-2 font-serif text-lg italic" style={{ color: accent }}>
          {project.tagline}
        </p>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
          {project.description}
        </p>

        {/* Feature list */}
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
              <Star className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7">
          <StackTags stack={project.stack} accent={accent} />
        </div>

        <LinkButtons links={project.links} accent={accent} />
      </div>

      {/* Oversized ghost number */}
      <span
        className="pointer-events-none absolute -right-2 -top-4 font-display text-[7rem] leading-none opacity-[0.06]"
        style={{ color: accent }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.article>
  );
}

/** Half-width card with a compact preview strip. */
function HalfCard({ project, index }) {
  const { accent, tint, border, Preview } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border"
      style={{ borderColor: border, background: `linear-gradient(150deg, ${tint}, rgba(10,10,15,0.92) 60%)` }}
    >
      <div className="relative overflow-hidden border-b border-white/10">
        <div className="aspect-[16/8] w-full">
          <Preview />
        </div>
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-[1.1s] group-hover:translate-x-full" />
      </div>

      <div className="relative flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl uppercase leading-none tracking-tight text-paper sm:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 font-serif text-base italic" style={{ color: accent }}>
              {project.tagline}
            </p>
          </div>
          <Burst className="h-6 w-6 shrink-0 animate-wiggle" style={{ color: accent }} />
        </div>

        <p className="mt-4 text-sm leading-relaxed text-white/65">
          {project.description}
        </p>

        <ul className="mt-5 space-y-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/65">
              <PlusMark className="mt-1 h-2.5 w-2.5 shrink-0" style={{ color: accent }} />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <StackTags stack={project.stack} accent={accent} />
        </div>

        <div className="mt-auto">
          <LinkButtons links={project.links} accent={accent} />
        </div>

        <span className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
          {project.role}
        </span>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const feature = projects.filter((p) => p.layout === 'feature');
  const half = projects.filter((p) => p.layout === 'half');

  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="shell">
        <SectionHeading
          eyebrow="04 — Featured projects"
          title="THINGS I"
          accent="BUILT"
          description="Four builds that each taught me a different way of thinking — from decision trees to risk maps to contradiction engines."
        />

        <div className="mt-16 flex flex-col gap-6">
          {feature.map((p, i) => (
            <FeatureCard key={p.id} project={p} index={i} />
          ))}

          <div className="grid gap-6 lg:grid-cols-2">
            {half.map((p, i) => (
              <HalfCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>

        {/* GitHub callout — real profile link only */}
        <motion.a
          href="https://github.com/SaymaTalukder"
          target="_blank"
          rel="noreferrer noopener"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -4 }}
          className="group mt-10 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-[2rem] border border-white/12 bg-ink-900/60 p-8 transition-colors duration-300 hover:border-lime/50 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-5">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-lime text-ink-950">
              <Github className="h-6 w-6" />
            </span>
            <div>
              <p className="font-display text-[10px] uppercase tracking-[0.24em] text-lime">
                More on GitHub
              </p>
              <p className="mt-1 font-display text-xl uppercase tracking-tight text-paper">
                @SaymaTalukder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Squiggle className="hidden h-3 w-28 sm:block" color="#54D6E8" />
            <span className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-lime">
              Visit profile
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
