import { motion } from 'framer-motion';
import { Bug, ShieldCheck, Terminal, ExternalLink } from 'lucide-react';
import { ChromeSweep } from './Cinematic.jsx';

/**
 * PukuQASpotlight
 *
 * A dedicated highlight panel for the QA testing work done on Puku Editor
 * at Poridhi.io. The Puku mark is the real logo, served from
 * `public/brands/puku-logo.svg`.
 *
 * It sits directly beneath the Sales Tech Engineer timeline card so the
 * contribution reads as part of that role rather than a separate project.
 */
const checks = [
  { icon: Bug, label: 'Bug identification' },
  { icon: ShieldCheck, label: 'Functionality verification' },
  { icon: Terminal, label: 'Regression checks' },
];

export default function PukuQASpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-90px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      id="puku-qa"
      className="chrome-border group relative mt-8 scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-white/15 bg-ink-900/60 backdrop-blur-sm"
      style={{
        borderColor: 'rgba(255,138,61,0.32)',
        background:
          'linear-gradient(150deg, rgba(255,138,61,0.07), rgba(10,10,15,0.92) 62%)',
      }}
    >
      {/* Puku brand glow bleeding in from the left edge */}
      <div
        className="pointer-events-none absolute -left-16 top-1/2 h-72 w-72 -translate-y-1/2 opacity-70 blur-3xl"
        style={{
          background:
            'radial-gradient(circle, rgba(208,139,255,0.45) 0%, rgba(7,24,210,0.28) 42%, rgba(7,24,210,0) 72%)',
        }}
        aria-hidden="true"
      />

      {/* Top accent rail in the Puku gradient */}
      <span
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, #0718D2 0%, #D08BFF 48%, #A4ABFF 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative flex flex-col gap-7 p-7 sm:flex-row sm:items-start sm:p-8">
        {/* ---- Puku logo plate ---- */}
        <div className="flex shrink-0 items-center gap-5 sm:flex-col sm:items-start sm:gap-4 lg:items-center">
          <span className="chrome-border relative grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/20 bg-ink-950/70 transition-transform duration-500 group-hover:scale-105">
            {/* Soft brand halo behind the mark */}
            <span
              className="absolute inset-0 opacity-70"
              style={{
                background:
                  'radial-gradient(circle at 50% 55%, rgba(208,139,255,0.35) 0%, rgba(7,24,210,0.22) 55%, rgba(7,24,210,0) 78%)',
              }}
              aria-hidden="true"
            />
            <img
              src="/brands/puku-logo.svg"
              alt="Puku Editor logo"
              width="38"
              height="48"
              loading="lazy"
              decoding="async"
              className="relative h-12 w-9 object-contain drop-shadow-[0_0_12px_rgba(208,139,255,0.6)]"
            />
          </span>

          <div className="sm:w-20 lg:w-auto">
            <p className="font-display text-sm uppercase tracking-[0.16em] text-paper">
              Puku
            </p>
            <p className="mt-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] text-white/40">
              Editor
            </p>
            <a
              href="https://puku.sh/puku-editor"
              target="_blank"
              rel="noreferrer noopener"
              className="group/link mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45 transition-colors hover:text-ember"
            >
              View product
              <ExternalLink className="h-3 w-3 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* ---- Copy ---- */}
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ember">
            QA Testing · Puku Editor
          </p>

          <h4 className="mt-3 font-display text-xl uppercase leading-tight tracking-tight text-paper sm:text-2xl">
            Quality assurance for an AI-native editor
          </h4>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/70">
            I performed QA testing for{' '}
            <span className="text-silver-100">Puku Editor</span> at Poridhi.io —
            an AI-native development environment built on top of VS Code.
            My work covered identifying bugs, verifying functionality across
            core editing flows, and confirming that the agent-driven
            features behaved as expected.
          </p>

          {/* QA checklist */}
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {checks.map((c) => (
              <li
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-[11.5px] uppercase tracking-[0.1em] text-white/75 transition-all duration-300 hover:-translate-y-0.5 hover:border-ember/50 hover:text-ember"
              >
                <c.icon className="h-3.5 w-3.5 opacity-70" />
                {c.label}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ChromeSweep />
    </motion.div>
  );
}
