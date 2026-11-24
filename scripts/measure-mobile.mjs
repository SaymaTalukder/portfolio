import puppeteer from 'puppeteer-core';

const CHROME =
  process.env.CHROME_PATH ||
  (process.platform === 'win32'
    ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
    : process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome');
const URL = process.argv[2] || 'http://localhost:5173/';

const DEVICES = [
  { name: 'iPhone SE', width: 375, height: 667, dsf: 2, mobile: true },
  { name: 'iPhone 12', width: 390, height: 844, dsf: 3, mobile: true },
  { name: 'iPhone 14 Pro Max', width: 430, height: 932, dsf: 3, mobile: true },
  { name: 'iPad mini', width: 768, height: 1024, dsf: 2, mobile: true },
  { name: 'iPad Pro 11', width: 834, height: 1194, dsf: 2, mobile: true },
];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

for (const d of DEVICES) {
  const page = await browser.newPage();
  await page.setViewport({
    width: d.width,
    height: d.height,
    deviceScaleFactor: d.dsf,
    isMobile: d.mobile,
    hasTouch: d.mobile,
  });

  const errors = [];
  page.on('pageerror', (e) => errors.push(String(e.message)));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push('console: ' + m.text());
  });

  // 'load' rather than 'networkidle0': the Vite dev server holds an HMR
  // websocket open, so the network never goes idle and networkidle0 hangs.
  await page.goto(URL, { waitUntil: 'load', timeout: 60000 });
  // let fonts and framer-motion settle
  await new Promise((r) => setTimeout(r, 2000));

  const report = await page.evaluate((vpWidth) => {
    const docW = document.documentElement.scrollWidth;
    const bodyW = document.body.scrollWidth;

    const offenders = [];
    const seen = new Set();

    document.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;

      const overRight = r.right - vpWidth;
      const overLeft = -r.left;

      if (overRight > 1 || overLeft > 1) {
        // Only report the outermost offenders, skip if a parent is already reported
        const cs = getComputedStyle(el);
        if (cs.position === 'fixed') return;
        const key = el.tagName + '|' + el.className.toString().slice(0, 60);
        if (seen.has(key)) return;
        seen.add(key);

        offenders.push({
          tag: el.tagName.toLowerCase(),
          cls: el.className.toString().slice(0, 110),
          left: Math.round(r.left),
          right: Math.round(r.right),
          width: Math.round(r.width),
          overRight: Math.round(overRight),
          overLeft: Math.round(overLeft),
          text: (el.textContent || '').trim().slice(0, 45),
        });
      }
    });

    offenders.sort((a, b) => b.overRight - a.overRight || b.overLeft - a.overLeft);

    // find any element taller than the viewport causing huge scroll
    const tall = [];
    document.querySelectorAll('section, main > *, header, footer').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height > window.innerHeight * 3) {
        tall.push({ tag: el.tagName.toLowerCase(), id: el.id, h: Math.round(r.height) });
      }
    });

    return { docW, bodyW, vpWidth, offenders: offenders.slice(0, 18), tall };
  }, d.width);

  console.log('\n' + '='.repeat(72));
  console.log(`${d.name}  ${d.width}x${d.height} @${d.dsf}x`);
  console.log('='.repeat(72));
  console.log(`  viewport:      ${report.vpWidth}`);
  console.log(`  documentWidth: ${report.docW}`);
  console.log(`  bodyWidth:     ${report.bodyW}`);
  console.log(
    `  HORIZONTAL OVERFLOW: ${report.docW > report.vpWidth ? 'YES (' + (report.docW - report.vpWidth) + 'px)' : 'no'}`
  );
  if (report.offenders.length) {
    console.log('  --- elements past the right edge ---');
    report.offenders.forEach((o) => {
      console.log(
        `    <${o.tag}> over=${o.overRight}px  w=${o.width}  L=${o.left} R=${o.right}`
      );
      console.log(`       class: ${o.cls}`);
      if (o.text) console.log(`       text:  "${o.text}"`);
    });
  }
  if (report.tall.length) {
    console.log('  --- unusually tall blocks ---');
    report.tall.forEach((t) => console.log(`    <${t.tag} id=${t.id}> h=${t.h}`));
  }
  if (errors.length) {
    console.log('  --- JS errors ---');
    [...new Set(errors)].forEach((e) => console.log('    ' + e));
  }

  await page.close();
}

await browser.close();
