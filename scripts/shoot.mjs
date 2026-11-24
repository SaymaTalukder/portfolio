import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CHROME =
  process.env.CHROME_PATH ||
  (process.platform === 'win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome');
const URL = process.argv[2] || 'http://localhost:5173/';
const OUT = resolve(ROOT, 'shots');

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
});

const SECTIONS = ['home', 'about', 'skills', 'experience', 'projects', 'toc', 'education', 'contact'];

async function shoot(name, width, height, dsf, mobile) {
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: dsf,
    isMobile: mobile,
    hasTouch: mobile,
  });
  // 'load' rather than 'networkidle0': the Vite dev server holds an HMR
  // websocket open, so the network never goes idle and networkidle0 hangs.
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  await new Promise((r) => setTimeout(r, 1800));

  for (const id of SECTIONS) {
    await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, id);
    await new Promise((r) => setTimeout(r, 700));
    await page.screenshot({ path: `${OUT}/${name}-${id}.png` });
  }
  await page.close();
}

await shoot('se', 375, 667, 2, true);
await shoot('ip12', 390, 844, 3, true);
await shoot('ipad', 768, 1024, 2, true);

await browser.close();
console.log('done');
