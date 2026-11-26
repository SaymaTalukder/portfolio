import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const EMAIL = 'mrupa2330001@bsds.uiu.ac.bd';
const GITHUB_URL = 'https://github.com/SaymaTalukder';
const LINKEDIN_URL =
  'https://www.linkedin.com/search/results/all/?keywords=Sayma%20Talukder%20Rupa';

export default function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: GITHUB_URL, icon: Github, label: 'GitHub' },
    { href: LINKEDIN_URL, icon: Linkedin, label: 'LinkedIn' },
    { href: `mailto:${EMAIL}`, icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/10 px-5 py-12 sm:px-8 lg:px-12">
      <div
        className="pointer-events-none absolute inset-x-0 -top-px h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(232,234,237,0.5), #FF8A3D, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="shell flex flex-col items-center justify-between gap-8 lg:flex-row">
        {/* Wordmark */}
        <div className="text-center lg:text-left">
          <p className="metal metal-sheen font-display text-lg uppercase tracking-[0.18em]">
            Sayma Talukder Rupa
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            Data Science · AI &amp; ML · Statistical Modeling
          </p>
        </div>

        {/* Socials */}
        <div className="flex items-center gap-3">
          {socials.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer noopener"
              aria-label={label}
              className="chrome-border grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[0.03] text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-silver-100/60 hover:bg-white/[0.08] hover:text-silver-100"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        {/* Legal + back to top */}
        <div className="flex items-center gap-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
            © {year} · All rights reserved
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="group flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-ember"
          >
            Top
            <span className="chrome-border grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-silver-100/60">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
