import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight, ArrowRight } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { ChromeSweep } from './Cinematic.jsx';
import {
  AtlasPreview,
  ClimaGuardPreview,
  GridMatePreview,
  SafetyAppPreview,
} from './decorative/ProjectPreviews.jsx';

/**
 * Featured projects — presented as a numbered filmography.
 *
 * Each entry is a wide horizontal plate: index and title on the left, the
 * project preview on the right. The surface stays monochrome chrome so the
 * previews carry the colour, and the type treatment matches the hero's
 * metal rather than competing with it.
 *
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
    accent: '#FF8A3D',
    Preview: AtlasPreview,
    role: 'Creator & Developer',
    links: [
      {
        label: 'Live Demo',
        href: 'https://ai-atlas-navy.vercel.app',
        icon: ExternalLink,
      },
    ],
  },
  {
    id: 'ClimaGuard',
    title: 'ClimaGuard',
    tagline: 'Weather-Based Personalized Disease Risk Nowcast',
    description:
      'An end-to-end machine learning project estimating regional disease risks using climate, air-quality, and socioeconomic data.',
    stack: ['Python', 'DVC', 'XGBoost', 'Random Forest', 'SHAP', 'Flask'],
    features: [
      'Machine Learning prediction pipelines',
      'SHAP explainability',
      'Drift monitoring',
      'Real-time weather integration',
      'Interactive Bangladesh regional risk maps',
    ],
    accent: '#FFB37A',
    Preview: ClimaGuardPreview,
    role: 'Project Contributor',
    links: [],
  },
  {
    id: 'GridMate',
    title: 'GridMate',
    tagline: 'Enterprise AI Teammate & Knowledge Conflict Engine',
    description:
      'An enterprise AI workspace that processes organizational documents, extracts source-grounded information, and detects contradictions across knowledge bases.',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'PostgreSQL'],
    features: [
      'Multi-channel AI agents',
      'Verifiable citation pipelines',
      'Role-based workspace governance',
    ],
    accent: '#FFA25C',
    Preview: GridMatePreview,
    role: 'Project Contributor',
    links: [],
  },
  {
    id: 'My Safety App',
    title: 'MySafety',
    tagline: 'Personal Safety Application',
    description:
      'A collaborative project focused on developing a user-friendly personal safety platform with intuitive navigation, accessibility, and structured milestone delivery.',
    stack: ['UI/UX Design', 'Frontend Development'],
    features: [
      'Intuitive navigation',
      'Accessibility focus',
      'Structured milestone delivery',
    ],
    accent: '#FFA25C',
    Preview: SafetyAppPreview,
    role: 'Team Contributor (UI/UX & Development)',
    links: [],
  },
];

/** The tech stack as a single elegant inline list rather than busy chips. */
function StackLine({ stack }) {
  return (
    <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
      {stack.map((s, i) => (
        <li
          key={s}
          className="flex items-center gap-2.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-white/45 transition-colors duration-300 hover:text-silver-200"
        >
          {i > 0 && (
            <span className="text-white/15" aria-hidden="true">
              ·
            </span>
          )}
          {s}
        </li>
      ))}
    </ul>
  );
}

function LinkButtons({ links }) {
  if (!links.length) return null;
  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {links.map(({ label, href, icon: Icon }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-silver-100 px-5 py-2.5 font-display text-[11px] uppercase tracking-[0.16em] text-ink-950 transition-shadow duration-300 hover:shadow-metal-glow"
        >
          <span
            className="pointer-events-none absolute inset-0 -translate-x-full bg-white/60 transition-transform duration-[900ms] group-hover:translate-x-full"
            aria-hidden="true"
          />
          <Icon className="relative h-3.5 w-3.5" />
          <span className="relative">{label}</span>
          <ArrowUpRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      ))}
    </div>
  );
}

/**
 * ProjectPlate — one project as a wide cinematic plate.
 * Index and title lead on the left; the preview film strip sits right.
 */
function ProjectPlate({ project, index }) {
  const { accent, Preview } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="chrome-border group relative overflow-hidden rounded-[2rem] border border-white/12 bg-ink-900/55 backdrop-blur-sm transition-colors duration-500 hover:border-white/28"
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]">
        {/* ---------- Content ---------- */}
        <div className="relative order-2 flex flex-col p-7 sm:p-9 lg:order-1 lg:p-10">
          {/* Index + role */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.24em] text-white/30">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span
              className="h-px flex-1"
              style={{
                background: `linear-gradient(90deg, ${accent}, transparent)`,
                opacity: 0.5,
              }}
              aria-hidden="true"
            />
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
              {project.role}
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] uppercase leading-[0.92] tracking-tight text-paper">
            {project.title}
          </h3>

          <p
            className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.16em]"
            style={{ color: accent }}
          >
            {project.tagline}
          </p>

          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/65 sm:text-[15px]">
            {project.description}
          </p>

          {/* Feature list */}
          <ul className="mt-6 space-y-2">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 text-[13.5px] leading-relaxed text-white/70"
              >
                <span
                  className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rotate-45"
                  style={{ background: accent }}
                  aria-hidden="true"
                />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          {/* Stack */}
          <div className="mt-7 border-t border-white/10 pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
              Built with
            </p>
            <div className="mt-2.5">
              <StackLine stack={project.stack} />
            </div>
          </div>

          <LinkButtons links={project.links} />
        </div>

        {/* ---------- Preview ---------- */}
        <div className="relative order-1 overflow-hidden border-b border-white/10 lg:order-2 lg:border-b-0 lg:border-l">
          <div className="aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[24rem]">
            <Preview />
          </div>

          {/* Vignette so the preview sits into the plate */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_30%,rgba(5,5,5,0.72)_100%)]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.6)_0%,transparent_28%)] lg:bg-[linear-gradient(270deg,rgba(5,5,5,0.55)_0%,transparent_30%)]"
            aria-hidden="true"
          />

          <ChromeSweep />

          {/* Hover arrow */}
          <span
            className="pointer-events-none absolute bottom-5 right-5 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-ink-950/60 text-silver-200 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
            aria-hidden="true"
          >
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_45%_at_22%_18%,rgba(232,234,237,0.05)_0%,rgba(5,5,5,0)_72%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <SectionHeading
          eyebrow="03 — Featured projects"
          title="THINGS I"
          accent="BUILT"
          description="Four builds that each taught me a different way of thinking — from decision trees to risk maps to contradiction engines."
        />

        <div className="mt-16 flex flex-col gap-6">
          {projects.map((p, i) => (
            <ProjectPlate key={p.id} project={p} index={i} />
          ))}
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
          className="chrome-border group mt-10 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-[2rem] border border-white/12 bg-ink-900/60 p-8 backdrop-blur-sm transition-colors duration-300 hover:border-silver-300/40 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-5">
            <span className="chrome-border grid h-14 w-14 shrink-0 place-items-center rounded-full border border-white/20 bg-white/[0.06] text-silver-100 transition-transform duration-500 group-hover:scale-105">
              <Github className="h-6 w-6" />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/35">
                More on GitHub
              </p>
              <p className="mt-1 font-display text-xl uppercase tracking-tight text-paper">
                @SaymaTalukder
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors group-hover:text-silver-100">
              Visit profile
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </span>
          </div>

          <ChromeSweep />
        </motion.a>
      </div>
    </section>
  );
}
