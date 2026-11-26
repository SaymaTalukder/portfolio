import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  Info,
  ArrowUpRight,
} from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import { ChromeSweep } from './Cinematic.jsx';

const EMAIL = 'mrupa2330001@bsds.uiu.ac.bd';
const GITHUB_URL = 'https://github.com/SaymaTalukder';
// The CV lists a LinkedIn profile without a full URL. Rather than linking to a
// generic homepage, the link opens a search for the profile name.
const LINKEDIN_URL =
  'https://www.linkedin.com/search/results/all/?keywords=Sayma%20Talukder%20Rupa';

const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'subject', label: 'Subject', type: 'text', required: false },
];

function TextField({ name, label, type, required, value, onChange, error }) {
  return (
    <div>
      <label
        htmlFor={`contact-${name}`}
        className="mb-2 block font-display text-[10px] uppercase tracking-[0.22em] text-white/45"
      >
        {label}
        {required && <span className="ml-1 text-ember-deep">*</span>}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        placeholder={`Your ${label.toLowerCase()}`}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-xl border bg-ink-950/60 px-4 py-3.5 text-sm text-paper placeholder:text-white/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ember/30 ${
          error
            ? 'border-ember-deep/70 focus:border-ember-deep focus:ring-ember-deep/25'
            : 'border-white/12 focus:border-ember focus:bg-ink-950/90'
        }`}
      />
      {error && (
        <p className="mt-1.5 text-xs text-ember-deep">{error}</p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((prev) => (prev[name] ? { ...prev, [name]: undefined } : prev));
  };

  /**
   * There is no server-side mail endpoint, so the form does NOT claim to send.
   * Instead it validates the fields and opens the visitor's mail client with
   * the message pre-filled — an honest, working delivery path.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    const next = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!form.email.trim()) next.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = 'Please enter a valid email address.';
    if (!form.message.trim()) next.message = 'Please add a message.';

    setErrors(next);
    if (Object.keys(next).length) return;

    const subject =
      form.subject.trim() || `Portfolio enquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n—\n${form.name.trim()}\n${form.email.trim()}`;

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setStatus('opened');
    setTimeout(() => setStatus('idle'), 6000);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32 lg:px-12"
    >
      {/* Plum wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 50% 100%, rgba(36,19,75,0.75) 0%, rgba(23,16,43,0.5) 42%, rgba(5,5,5,0) 82%)',
        }}
        aria-hidden="true"
      />
      {/* Scene light behind the closing headline */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70vh]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 70%, rgba(232,234,237,0.07) 0%, rgba(232,234,237,0) 70%)',
        }}
        aria-hidden="true"
      />

      <div className="shell relative">
        {/* ---------- Heading ---------- */}
        <div className="relative text-center">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-ember" aria-hidden="true" />
              <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/45 sm:text-[11px]">
                06 — Contact
              </span>
              <span className="h-px w-8 bg-ember" aria-hidden="true" />
            </div>

            <h2
              className="display metal-depth relative mt-6 text-[clamp(2.1rem,7.5vw,5.6rem)] leading-[0.92] tracking-tight"
              data-depth-text="LET'S BUILD SOMETHING INTELLIGENT."
            >
              <span className="metal metal-sheen relative block">LET&apos;S BUILD</span>
              <span className="metal metal-sheen relative block">SOMETHING</span>
              <span className="metal metal-sheen relative block">
                <span className="metal-accent">INTELLIGENT.</span>
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
              Have an idea, opportunity, or interesting project? Let&apos;s connect.
            </p>
          </motion.div>
        </div>

        {/* ---------- Grid: channels + form ---------- */}
        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex min-w-0 flex-col gap-4 lg:col-span-5"
          >
            <ChannelCard
              icon={Mail}
              label="Email"
              accent="#FF8A3D"
              href={`mailto:${EMAIL}`}
            >
              <span className="break-all font-mono text-sm text-paper">
                {EMAIL}
              </span>
            </ChannelCard>

            <ChannelCard icon={Github} label="GitHub" accent="#FFB37A" href={GITHUB_URL}>
              <span className="font-mono text-sm text-paper">github.com/SaymaTalukder</span>
            </ChannelCard>

            <ChannelCard icon={Linkedin} label="LinkedIn" accent="#FFA25C" href={LINKEDIN_URL}>
              <span className="text-sm text-paper">My LinkedIn Profile</span>
            </ChannelCard>

            <div className="chrome-border flex items-start gap-4 rounded-2xl border border-white/12 bg-ink-900/60 p-5 backdrop-blur-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-ember-glow" />
              <div>
                <p className="font-display text-[10px] uppercase tracking-[0.24em] text-ember-glow">
                  Based in
                </p>
                <p className="mt-1.5 text-sm text-white/75">
                  Sayednogor, Vatara, Notunbajar, Badda, Dhaka
                </p>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="chrome-border relative min-w-0 overflow-hidden rounded-[2rem] border border-white/12 bg-ink-900/70 p-7 backdrop-blur-sm sm:p-9 lg:col-span-7"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-rule-ember" />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((f) => (
                <TextField
                  key={f.name}
                  {...f}
                  value={form[f.name]}
                  onChange={update}
                  error={errors[f.name]}
                />
              ))}

              <div className="min-w-0 sm:col-span-2">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block font-display text-[10px] uppercase tracking-[0.22em] text-white/45"
                >
                  Message<span className="ml-1 text-ember-deep">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  value={form.message}
                  onChange={update}
                  required
                  placeholder="Tell me about your project…"
                  aria-invalid={Boolean(errors.message)}
                  className={`w-full resize-none rounded-xl border bg-ink-950/60 px-4 py-3.5 text-sm leading-relaxed text-paper placeholder:text-white/25 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ember/30 ${
                    errors.message
                      ? 'border-ember-deep/70 focus:border-ember-deep focus:ring-ember-deep/25'
                      : 'border-white/12 focus:border-ember focus:bg-ink-950/90'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-ember-deep">{errors.message}</p>
                )}
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="flex items-start gap-2 text-xs leading-relaxed text-white/40">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ember-soft" />
                <span>
                  No server is attached to this form — it opens your email
                  client with everything pre-filled so your message actually
                  reaches me.
                </span>
              </p>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ember shrink-0"
              >
                {status === 'opened' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {status === 'opened' ? 'Mail App Opened' : 'Send Message'}
              </motion.button>
            </div>

            <AnimatePresence>
              {status === 'opened' && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  role="status"
                  className="mt-4 overflow-hidden rounded-xl border border-ember/30 bg-ember/10 px-4 py-3 text-sm text-ember"
                >
                  Your mail client should now be open with the message ready.
                  Just press send there — or write to{' '}
                  <a className="underline" href={`mailto:${EMAIL}`}>
                    {EMAIL}
                  </a>{' '}
                  directly.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function ChannelCard({ icon: Icon, label, accent, href, children }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer noopener"
      whileHover={{ x: 5 }}
      className="chrome-border group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-white/12 bg-ink-900/60 p-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/30"
    >
      <span
        className="chrome-border grid h-11 w-11 shrink-0 place-items-center rounded-xl border"
        style={{
          borderColor: `${accent}55`,
          background: `linear-gradient(140deg, rgba(255,255,255,0.10), ${accent}18)`,
          color: accent,
        }}
      >
        <Icon className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        <p
          className="font-display text-[10px] uppercase tracking-[0.24em]"
          style={{ color: accent }}
        >
          {label}
        </p>
        <div className="mt-1.5 transition-colors group-hover:text-ember">
          {children}
        </div>
      </div>

      <ArrowUpRight className="h-4 w-4 shrink-0 self-center text-white/25 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember" />

      <ChromeSweep />
    </motion.a>
  );
}
