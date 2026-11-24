import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Sparkles, Camera } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { Star, Burst, DashedRing, MarkerRing } from './decorative/Decorative.jsx';

const infoCards = [
  {
    icon: Briefcase,
    label: 'Currently',
    value: 'Sales Tech Engineer at Poridhi.io',
    accent: 'text-lime',
    border: 'border-lime/30',
    bg: 'bg-lime/[0.07]',
  },
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'BSc in Data Science at United International University',
    accent: 'text-aqua',
    border: 'border-aqua/30',
    bg: 'bg-aqua/[0.07]',
  },
  {
    icon: Sparkles,
    label: 'Experience',
    value: '2 years of hands-on marketing experience',
    accent: 'text-blush',
    border: 'border-blush/30',
    bg: 'bg-blush/[0.07]',
  },
  {
    icon: MapPin,
    label: 'Interests',
    value: 'AI, ML, Data Analytics, Technology, Product Development',
    accent: 'text-lilac',
    border: 'border-lilac/30',
    bg: 'bg-lilac/[0.07]',
  },
];

/**
 * ProfilePhoto
 * Shows the photograph at `public/portrait.jpg` inside the sticker frame.
 * If the image fails to load, a styled fallback keeps the layout intact.
 */
function ProfilePhoto() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <div className="relative">
      {/* Sticker frame */}
      <div className="relative rotate-[-3deg] rounded-[2rem] border-2 border-lime bg-ink-900 p-3 shadow-sticker transition-transform duration-500 hover:rotate-[-1deg]">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.4rem] bg-plum-gradient">
          {/* The photograph */}
          {!photoFailed && (
            <img
              src="/portrait.jpg"
              alt="Portrait of Sayma Talukder Rupa"
              loading="lazy"
              decoding="async"
              width="1013"
              height="1350"
              className="h-full w-full object-cover object-[center_22%]"
              onError={() => setPhotoFailed(true)}
            />
          )}

          {/* Fallback shown only if the photograph cannot be loaded */}
          {photoFailed && (
            <div className="absolute inset-0 grid place-items-center px-6 text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-lime/50 bg-ink-950/40">
                  <Camera className="h-6 w-6 text-lime" />
                </div>
                <p className="mt-4 font-display text-sm uppercase tracking-[0.2em] text-lime">
                  Your Photo
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/55">
                  Add <span className="font-mono text-white/80">public/portrait.jpg</span>{' '}
                  to replace this placeholder
                </p>
              </div>
            </div>
          )}

          {/* Corner tape */}
          <span className="absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-lime/70" />
          <span className="absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-lime/70" />
        </div>
      </div>

      {/* Floating name plate */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute -bottom-5 -left-4 z-10 rounded-xl border border-ink-950 bg-lime px-4 py-2 shadow-[5px_5px_0_0_#F04A9B] sm:-left-8"
      >
        <p className="font-display text-sm uppercase tracking-wider text-ink-950">
          Sayma Talukder Rupa
        </p>
        <p className="font-mono text-[10px] uppercase tracking-widest text-ink-950/65">
          Dhaka, Bangladesh
        </p>
      </motion.div>

      <DashedRing className="absolute -left-8 -top-8 -z-10 h-28 w-28 animate-spinSlow text-lime/40" />
      <Star className="absolute -right-3 -top-5 h-6 w-6 animate-floaty text-blush" />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-5 py-24 sm:px-8 sm:py-32 lg:px-12">
      <div className="shell">
        <SectionHeading
          eyebrow="01 — About me"
          title="THE PERSON"
          accent="BEHIND THE DATA"
          description="Half analyst, half communicator — and entirely driven by problems that need both."
        />

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------- Left: name + photo ---------- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 lg:col-span-4"
          >
            <p className="font-serif text-3xl leading-tight text-paper sm:text-4xl">
              Sayma
              <span className="relative mx-1 inline-block">
                <span className="serif-accent text-lime">Talukder</span>
                <MarkerRing className="absolute -inset-x-2 -inset-y-1 h-full w-full" />
              </span>
              <br />
              <span className="serif-accent text-lilac">Rupa</span>
            </p>

            <p className="mt-5 font-display text-[11px] uppercase tracking-[0.24em] text-aqua">
              Data Science Student · Sales Tech Engineer
            </p>

            <div className="mt-10">
              <ProfilePhoto />
            </div>
          </motion.div>

          {/* ---------- Center: the summary ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="min-w-0 lg:col-span-5"
          >
            <div className="relative rounded-[1.75rem] border border-white/10 bg-ink-900/60 p-7 sm:p-9">
              <span className="absolute -left-px top-8 h-16 w-[3px] rounded-full bg-lime" />
              <span className="absolute -left-px top-8 h-16 w-[3px] translate-x-6 rounded-full bg-blush/60" />

              <p className="font-display text-[11px] uppercase tracking-[0.28em] text-lime/80">
                Professional summary
              </p>

              <p className="mt-5 text-base leading-[1.75] text-white/75 sm:text-lg">
                I&apos;m a confident, data-driven professional with a background in
                marketing and a strong foundation in{' '}
                <span className="text-lime">Data Science</span>. Currently working
                as a{' '}
                <span className="text-aqua">Sales Tech Engineer at Poridhi.io</span>,
                I combine technical knowledge, analytical thinking, communication,
                and leadership to solve problems and create meaningful impact.
              </p>

              <p className="mt-5 text-base leading-[1.75] text-white/75 sm:text-lg">
                My interests include{' '}
                <span className="text-blush">Artificial Intelligence</span>,{' '}
                <span className="text-blush">Machine Learning</span>, data
                analytics, web technologies, and building useful
                technology-driven products.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-7">
                <Burst className="h-6 w-6 animate-wiggle text-lime" />
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                  Dhaka · United International University
                </p>
              </div>
            </div>
          </motion.div>

          {/* ---------- Right: information cards ---------- */}
          <div className="min-w-0 lg:col-span-3">
            <div className="flex flex-col gap-4">
              {infoCards.map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, x: 26 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: 0.08 * i }}
                  whileHover={{ x: -5 }}
                  className={`group rounded-2xl border ${card.border} ${card.bg} p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/30`}
                >
                  <div className="flex items-center gap-2.5">
                    <card.icon className={`h-4 w-4 ${card.accent}`} />
                    <span
                      className={`font-display text-[10px] uppercase tracking-[0.24em] ${card.accent}`}
                    >
                      {card.label}
                    </span>
                  </div>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/80">
                    {card.value}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-6 rounded-2xl border border-dashed border-white/20 p-5"
            >
              <p className="font-serif text-lg italic leading-snug text-white/70">
                “Data tells you what happened. Technology decides what happens
                next.”
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
