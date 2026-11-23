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
            'linear-gradient(90deg, transparent, #C4E77B, #F04A9B, transparent)',
        }}
        aria-hidden="true"
      />

      <div className="shell flex flex-col items-center justify-between gap-8 lg:flex-row">
        {/* Wordmark */}
        <div className="text-center lg:text-left">
          <p className="font-display text-lg uppercase tracking-[0.18em] text-paper">
            Sayma Talukder Rupa
          </p>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
            Data Science · AI &amp; ML · Sales Tech
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
              className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-lime hover:bg-lime hover:text-ink-950"
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
            className="group flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors hover:text-lime"
          >
            Top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-lime">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
