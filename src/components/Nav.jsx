import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track which section is currently in view so the nav can highlight it.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close the mobile sheet when the viewport grows to the desktop breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-6"
    >
      {/* Floating glass pill */}
      <nav
        aria-label="Primary"
        className={`relative mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border py-2.5 pl-3 pr-2.5 transition-all duration-500 sm:pl-4 ${
          scrolled
            ? 'glass border-white/12 shadow-glass'
            : 'border-transparent bg-transparent'
        }`}
      >
        {/* Wordmark */}
        <a
          href="#home"
          className="group flex items-center gap-3"
          aria-label="Sayma Talukder — home"
        >
          <span className="chrome-border relative grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-full border border-silver-300/30 bg-ink-900 font-display text-sm text-silver-100 transition-all duration-500 group-hover:border-silver-100/70">
            <span className="metal metal-sheen absolute inset-0 grid place-items-center text-[13px]">
              S
            </span>
          </span>
          <span className="hidden font-display text-[13px] uppercase leading-tight tracking-[0.2em] text-silver-200 sm:block">
            Sayma
            <span className="block font-mono text-[9px] tracking-[0.3em] text-silver-500">
              Talukder
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => {
            const isActive = active === l.id;
            return (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`group relative block px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                    isActive
                      ? 'text-silver-100'
                      : 'text-silver-400 hover:text-silver-100'
                  }`}
                >
                  {l.label}
                  {/* Active indicator */}
                  <span
                    className={`absolute inset-x-3 bottom-1 h-[1.5px] origin-left bg-gradient-to-r from-silver-100 to-silver-400 transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                  {isActive && (
                    <span className="absolute inset-x-3 bottom-1 h-[1.5px] animate-nav-pulse bg-silver-100/60 blur-[3px]" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          <a
            href="#contact"
            className="group hidden items-center gap-2 rounded-full border border-silver-300/25 px-5 py-2.5 font-display text-[10px] uppercase tracking-[0.18em] text-silver-100 transition-all duration-300 hover:border-silver-100/70 hover:bg-white/5 sm:inline-flex"
          >
            Let&apos;s Connect
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-silver-100 transition-colors hover:border-silver-300/60 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass-solid mt-3 overflow-hidden rounded-3xl border border-white/12 shadow-glass lg:hidden"
          >
            <ul className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-1 py-5">
              {links.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-baseline gap-3 border-b border-white/5 py-3.5 font-display text-xl uppercase tracking-tight transition-colors ${
                      active === l.id
                        ? 'text-silver-100'
                        : 'text-silver-400 hover:text-silver-100'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-silver-600">
                      0{i + 1}
                    </span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
