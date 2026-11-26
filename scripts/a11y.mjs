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
await page.setViewport({ width: 1440, height: 900 });
await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
await new Promise((r) => setTimeout(r, 3000));

const snapshot = await page.accessibility.snapshot();

const walk = (node, depth = 0) => {
  if (!node) return [];
  let out = [];
  if (['heading', 'link', 'button', 'image', 'textbox'].includes(node.role)) {
    out.push(`${'  '.repeat(depth)}${node.role}: ${(node.name || '').slice(0, 75)}`);
  }
  (node.children || []).forEach((c) => {
    out = out.concat(walk(c, depth + 1));
  });
  return out;
};

const lines = walk(snapshot).filter((l) =>
  /^(heading|link|button|image|textbox):/.test(l)
);

if (lines.length) {
  console.log(lines.join('\n'));
} else {
  // Fall back to reading computed accessible names straight from the DOM.
  console.log('--- accessible names via DOM ---');
  const names = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll('h1,h2,h3,a,button,img').forEach((el) => {
      const label =
        el.getAttribute('aria-label') ||
        (el.getAttribute('aria-labelledby')
          ? document.getElementById(el.getAttribute('aria-labelledby'))?.textContent
          : null) ||
        el.textContent?.trim() ||
        el.getAttribute('alt') ||
        '';
      out.push(
        `${el.tagName.toLowerCase()}: ${label.replace(/\s+/g, ' ').slice(0, 80)}`
      );
    });
    return out;
  });
  console.log(names.join('\n'));
}
await browser.close();
