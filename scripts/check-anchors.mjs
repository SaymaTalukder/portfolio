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
await new Promise((r) => setTimeout(r, 3000));

// The nav sits over the page, so its own height is what matters here.
const navBottom = await page.evaluate(() => {
  const nav = document.querySelector('header nav');
  const r = nav.getBoundingClientRect();
  return Math.round(r.bottom);
});
console.log('nav bottom edge:', navBottom, 'px');

const sections = ['about', 'skills', 'projects', 'experience', 'education', 'contact'];

for (const id of sections) {
  await page.evaluate((s) => {
    document.getElementById(s)?.scrollIntoView({ behavior: 'instant', block: 'start' });
  }, id);
  await new Promise((r) => setTimeout(r, 700));

  const info = await page.evaluate((sid) => {
    const section = document.getElementById(sid);
    const heading = section?.querySelector('h2');
    const sr = section.getBoundingClientRect();
    const hr = heading?.getBoundingClientRect();
    return {
      headingTop: hr ? Math.round(hr.top) : null,
      headingBottom: hr ? Math.round(hr.bottom) : null,
      sectionTop: Math.round(sr.top),
    };
  }, id);

  const clear = info.headingTop !== null && info.headingTop > navBottom;
  console.log(
    `${id.padEnd(11)} headingTop=${String(info.headingTop).padStart(5)} ` +
      `navBottom=${navBottom}  ${clear ? 'CLEAR' : 'OVERLAPPED'}`
  );
}

console.log('ERRORS:', errors.length ? [...new Set(errors)].join('\n  ') : 'none');
await browser.close();
