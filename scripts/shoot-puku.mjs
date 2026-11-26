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
await new Promise((r) => setTimeout(r, 3200));

// Scroll to the Puku spotlight and capture it.
await page.evaluate(() => {
  const img = document.querySelector('img[src*="puku-logo"]');
  img?.closest('div.chrome-border')?.scrollIntoView({ block: 'center' });
});
await new Promise((r) => setTimeout(r, 1400));
await page.screenshot({ path: 'shots/puku-panel.png' });

// Verify the logo actually loaded and has real dimensions.
const logo = await page.evaluate(() => {
  const img = document.querySelector('img[src*="puku-logo"]');
  if (!img) return { found: false };
  const r = img.getBoundingClientRect();
  return {
    found: true,
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt'),
    loaded: img.complete && img.naturalWidth > 0,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    renderedWidth: Math.round(r.width),
    renderedHeight: Math.round(r.height),
  };
});
console.log('logo:', JSON.stringify(logo));

// The panel's own link target.
const link = await page.evaluate(() => {
  const a = [...document.querySelectorAll('a')].find((x) =>
    x.textContent.includes('View product')
  );
  return a ? { href: a.href, target: a.target, rel: a.rel } : null;
});
console.log('panel link:', JSON.stringify(link));

console.log('ERRORS:', errors.length ? [...new Set(errors)].join('\n  ') : 'none');
await browser.close();
