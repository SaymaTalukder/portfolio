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

await page.setViewport({
  width: 390,
  height: 844,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));
await page.screenshot({ path: 'shots/m-home.png' });

for (const id of ['about', 'skills', 'projects', 'experience', 'education', 'contact']) {
  await page.evaluate((s) => {
    const el = document.getElementById(s);
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, id);
  await new Promise((r) => setTimeout(r, 1000));
  await page.screenshot({ path: `shots/m-${id}.png` });
}

// Open the mobile navigation sheet.
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 600));
await page.click('button[aria-label="Open menu"]');
await new Promise((r) => setTimeout(r, 700));
await page.screenshot({ path: 'shots/m-nav.png' });

console.log('ERRORS:', errors.length ? [...new Set(errors)].join(' | ') : 'none');
await browser.close();
