import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ||
  (process.platform === 'win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome');
const URL = process.argv[2] || 'http://localhost:5173/';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox'],
});

const page = await browser.newPage();
await page.setViewport({
  width: 375,
  height: 667,
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});

// 'load' rather than 'networkidle0': the Vite dev server holds an HMR
// websocket open, so the network never goes idle and networkidle0 hangs.
await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
await new Promise((r) => setTimeout(r, 2000));

const detail = await page.evaluate(() => {
  const pick = (sel, label) => {
    const el = document.querySelector(sel);
    if (!el) return `${label}: NOT FOUND`;
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return (
      `${label}\n` +
      `   rect: L=${Math.round(r.left)} R=${Math.round(r.right)} W=${Math.round(r.width)}\n` +
      `   display=${cs.display} gridTemplateColumns="${cs.gridTemplateColumns}" minWidth=${cs.minWidth} overflowX=${cs.overflowX}`
    );
  };

  const out = [];
  out.push(pick('#home .shell', 'hero .shell'));
  out.push(pick('#home .shell > div.relative.mt-10', 'hero subtitle grid'));
  out.push(pick('#home .shell > div.relative.mt-10 > div', 'hero col-span-7 item'));
  out.push(pick('#home h1', 'hero h1'));
  out.push(pick('#home .shell > div.relative.flex.items-start', 'hero top strip'));

  // which element establishes the 720px width
  const wide = [];
  document.querySelectorAll('#home *').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 400) {
      const cs = getComputedStyle(el);
      wide.push(
        `<${el.tagName.toLowerCase()}> w=${Math.round(r.width)} display=${cs.display} minW=${cs.minWidth} ` +
          `cls="${el.className.toString().slice(0, 70)}"`
      );
    }
  });
  out.push('--- elements wider than 400px inside #home ---');
  out.push(...wide.slice(0, 14));

  return out.join('\n');
});

console.log(detail);
await browser.close();
