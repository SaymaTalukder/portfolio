import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = process.argv[2] || 'http://localhost:4173/';
const PREFIX = process.argv[3] || 'v3';

const SECTIONS = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'toc',
  'education',
  'contact',
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
});

const errors = [];

async function shoot(name, width, height, dsf, mobile) {
  const page = await browser.newPage();
  page.on('pageerror', (e) => errors.push(`${name}: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`${name} console: ${m.text()}`);
  });

  await page.setViewport({
    width,
    height,
    deviceScaleFactor: dsf,
    isMobile: mobile,
    hasTouch: mobile,
  });
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 3800));

  for (const id of SECTIONS) {
    await page.evaluate((s) => {
      const el = document.getElementById(s);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, id);
    await new Promise((r) => setTimeout(r, 1000));
    await page.screenshot({ path: `shots/${PREFIX}-${name}-${id}.png` });
  }
  await page.close();
}

await shoot('desktop', 1440, 900, 1, false);
await shoot('mobile', 390, 844, 2, true);

console.log('ERRORS:', errors.length ? [...new Set(errors)].join('\n  ') : 'none');
await browser.close();
