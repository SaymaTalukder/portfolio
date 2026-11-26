import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.argv[2] || 'http://localhost:4173/';

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
await new Promise((r) => setTimeout(r, 2500));

// Scroll the QA Testing chip into view so Framer Motion has revealed it.
await page.evaluate(() => {
  const chip = [...document.querySelectorAll('a')].find((a) =>
    a.textContent.includes('QA Testing')
  );
  chip?.scrollIntoView({ block: 'center' });
});
await new Promise((r) => setTimeout(r, 1200));

const chip = await page.evaluate(() => {
  const a = [...document.querySelectorAll('a')].find((x) =>
    x.textContent.includes('QA Testing')
  );
  if (!a) return { found: false };
  const r = a.getBoundingClientRect();
  return {
    found: true,
    href: a.getAttribute('href'),
    text: a.textContent.trim(),
    width: Math.round(r.width),
    height: Math.round(r.height),
    visible: r.width > 0 && r.height > 0,
  };
});
console.log('chip:', JSON.stringify(chip));

// Clicking the chip must land on the Puku spotlight, clear of the nav.
await page.evaluate(() => {
  const a = [...document.querySelectorAll('a')].find((x) =>
    x.textContent.includes('QA Testing')
  );
  a?.click();
});
await new Promise((r) => setTimeout(r, 1800));

const target = await page.evaluate(() => {
  const panel = document.querySelector('#puku-qa');
  if (!panel) return { found: false };
  const r = panel.getBoundingClientRect();
  const nav = document.querySelector('nav');
  const navRect = nav?.getBoundingClientRect();
  return {
    found: true,
    top: Math.round(r.top),
    navBottom: navRect ? Math.round(navRect.bottom) : null,
    clear: navRect ? r.top >= navRect.bottom : true,
    logoVisible: !!panel.querySelector('img[src*="puku-logo"]'),
  };
});
console.log('target:', JSON.stringify(target));

await page.screenshot({ path: 'shots/qa-chip-jump.png' });

console.log('ERRORS:', errors.length ? [...new Set(errors)].join('\n  ') : 'none');
await browser.close();
