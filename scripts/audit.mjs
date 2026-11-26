import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.argv[2] || 'http://localhost:5173/';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e.message)));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});
page.on('requestfailed', (r) =>
  errors.push('requestfailed: ' + r.url() + ' ' + r.failure()?.errorText)
);

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));

const report = await page.evaluate(() => {
  const out = {};

  // --- Anchors: every internal href must resolve to an existing id ---
  const anchorLinks = [...document.querySelectorAll('a[href^="#"]')].map(
    (a) => a.getAttribute('href')
  );
  out.anchors = {
    total: anchorLinks.length,
    broken: anchorLinks.filter((h) => h !== '#' && !document.getElementById(h.slice(1))),
  };

  // --- External links ---
  out.external = [...document.querySelectorAll('a[href^="http"]')].map((a) => ({
    href: a.href,
    text: (a.textContent || '').trim().slice(0, 40),
    target: a.getAttribute('target'),
    rel: a.getAttribute('rel'),
  }));

  // --- Mailto ---
  out.mailto = [...document.querySelectorAll('a[href^="mailto:"]')].map(
    (a) => a.getAttribute('href')
  );

  // --- Images: alt text + loaded ---
  out.images = [...document.querySelectorAll('img')].map((i) => ({
    src: i.getAttribute('src'),
    alt: i.getAttribute('alt'),
    loaded: i.complete && i.naturalWidth > 0,
  }));

  // --- Buttons need an accessible name ---
  out.buttonsWithoutName = [...document.querySelectorAll('button')]
    .filter(
      (b) =>
        !b.textContent.trim() &&
        !b.getAttribute('aria-label') &&
        !b.getAttribute('title')
    )
    .map((b) => b.className.toString().slice(0, 70));

  // --- Form inputs need labels ---
  out.unlabelledInputs = [...document.querySelectorAll('input, textarea')].filter(
    (el) => {
      if (el.getAttribute('aria-label')) return false;
      if (el.id && document.querySelector(`label[for="${el.id}"]`)) return false;
      return !el.closest('label');
    }
  ).map((el) => el.getAttribute('name') || el.tagName);

  // --- Heading outline ---
  out.headings = [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => ({
    level: h.tagName,
    text: (h.textContent || '').trim().slice(0, 55),
  }));

  // --- Section ids present for nav targets ---
  out.sectionIds = ['home','about','skills','projects','experience','education','contact','toc']
    .map((id) => ({ id, exists: !!document.getElementById(id) }));

  // --- SEO ---
  out.seo = {
    title: document.title,
    description:
      document.querySelector('meta[name="description"]')?.getAttribute('content')?.length || 0,
    ogTitle: !!document.querySelector('meta[property="og:title"]'),
    lang: document.documentElement.lang,
    h1Count: document.querySelectorAll('h1').length,
  };

  // --- Skip link present ---
  out.skipLink = !!document.querySelector('a[href="#main"]');

  return out;
});

console.log(JSON.stringify(report, null, 2));
console.log('\nJS/RESET ERRORS:', errors.length ? [...new Set(errors)].join('\n  ') : 'none');

await browser.close();
