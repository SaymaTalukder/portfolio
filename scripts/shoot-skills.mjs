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

await page.evaluate(() => {
  document.querySelector('#skills')?.scrollIntoView({ block: 'start' });
});
await new Promise((r) => setTimeout(r, 1500));

// Hover the QA Testing chip so the accent treatment is visible in the shot.
await page.evaluate(() => {
  const chip = [...document.querySelectorAll('a')].find((a) =>
    a.textContent.includes('QA Testing')
  );
  chip?.scrollIntoView({ block: 'center' });
});
await new Promise((r) => setTimeout(r, 1200));

const chipBox = await page.evaluate(() => {
  const chip = [...document.querySelectorAll('a')].find((a) =>
    a.textContent.includes('QA Testing')
  );
  if (!chip) return null;
  const r = chip.getBoundingClientRect();
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
});

if (chipBox) {
  await page.mouse.move(chipBox.x, chipBox.y);
  await new Promise((r) => setTimeout(r, 700));
}

await page.screenshot({ path: 'shots/skills-qa-chip.png' });

const style = await page.evaluate(() => {
  const chip = [...document.querySelectorAll('a')].find((a) =>
    a.textContent.includes('QA Testing')
  );
  if (!chip) return null;
  const cs = getComputedStyle(chip);
  return {
    borderColor: cs.borderColor,
    background: cs.backgroundColor,
    color: cs.color,
    tag: chip.tagName,
  };
});
console.log('chip style:', JSON.stringify(style));
console.log('ERRORS:', errors.length ? [...new Set(errors)].join('\n  ') : 'none');
await browser.close();
