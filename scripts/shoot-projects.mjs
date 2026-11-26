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

await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
await new Promise((r) => setTimeout(r, 3500));

// Scroll slowly through the projects section so each plate is revealed.
await page.evaluate(() => {
  const el = document.getElementById('projects');
  if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
});
await new Promise((r) => setTimeout(r, 1200));

const plates = await page.$$('#projects article');
console.log('project plates found:', plates.length);

for (let i = 0; i < plates.length; i++) {
  await plates[i].scrollIntoView();
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `shots/proj-${i + 1}.png` });
}

// The education "beyond syllabus" panel — the fixed bug.
const panel = await page.evaluate(() => {
  const el = [...document.querySelectorAll('#education p')].find((p) =>
    p.textContent.includes('Two years of marketing')
  );
  if (!el) return { found: false };
  const r = el.getBoundingClientRect();
  const parent = el.closest('.chrome-border')?.getBoundingClientRect();
  return {
    found: true,
    textWidth: Math.round(r.width),
    textHeight: Math.round(r.height),
    panelWidth: parent ? Math.round(parent.width) : null,
    lines: Math.round(r.height / 40),
  };
});
console.log('beyond-syllabus panel:', JSON.stringify(panel));

console.log('ERRORS:', errors.length ? [...new Set(errors)].join('\n  ') : 'none');
await browser.close();
