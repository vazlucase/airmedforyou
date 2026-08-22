import { chromium } from "playwright";

const BASE = "http://localhost:3000";
const CHROME_PATH = String.raw`C:\Users\aveel\AppData\Local\ms-playwright\chromium-1234\chrome-win64\chrome.exe`;
const OUT_DIR = String.raw`C:\Users\aveel\Desktop\airmedplan\.claude\audit-shots`;

const ROUTES = [
  "/",
  "/uti-aerea",
  "/voos-executivos",
  "/clubmed",
  "/cote-seu-voo",
  "/sobre",
  "/conhecer-mais",
  "/contato",
  "/faq",
  "/politica-de-privacidade",
];

const VIEWPORTS = [
  { name: "320x568", width: 320, height: 568 },
  { name: "360x800", width: 360, height: 800 },
  { name: "390x844", width: 390, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "820x1180", width: 820, height: 1180 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
];

const fs = await import("fs");
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await chromium.launch({
  executablePath: CHROME_PATH,
  headless: true,
});

const results = [];

for (const vp of VIEWPORTS) {
  const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(err.message));

  for (const route of ROUTES) {
    const slug = route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "__");
    const fname = `${vp.name}__${slug}.png`;
    try {
      await page.goto(`${BASE}${route}`, { waitUntil: "networkidle", timeout: 30000 });
      await page.screenshot({ path: `${OUT_DIR}/${fname}`, fullPage: true });

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        const docWidth = document.documentElement.scrollWidth;
        const viewWidth = window.innerWidth;
        const overflows = [];
        if (docWidth > viewWidth + 1) {
          overflows.push(`doc:${docWidth}>viewport:${viewWidth}`);
        }
        // Check all visible elements for overflow
        const els = document.querySelectorAll("p,a,button,h1,h2,h3,h4,span,li,td,th,div,label");
        for (const el of els) {
          const r = el.getBoundingClientRect();
          if (r.right > viewWidth + 1 && r.width > 0 && el.textContent?.trim()) {
            const tag = el.tagName.toLowerCase();
            const text = el.textContent.slice(0, 40);
            overflows.push(`${tag}:"${text}" r=${Math.round(r.right)}`);
            if (overflows.length > 5) break;
          }
        }
        return overflows;
      });

      results.push({
        viewport: vp.name,
        route,
        overflow,
        consoleErrors: [...consoleErrors],
      });
    } catch (e) {
      results.push({
        viewport: vp.name,
        route,
        error: String(e).slice(0, 200),
        consoleErrors: [...consoleErrors],
      });
    }
    consoleErrors.length = 0;
  }
  await context.close();
}

await browser.close();

// Write report
fs.writeFileSync(`${OUT_DIR}/report.json`, JSON.stringify(results, null, 2));

// Print summary
const issues = results.filter((r) => r.overflow?.length || r.consoleErrors?.length || r.error);
console.log(`\n=== AUDIT: ${results.length} screenshots taken ===`);
console.log(`Issues found in ${issues.length}/${results.length} route/viewports:`);
for (const issue of issues) {
  console.log(`\n[${issue.viewport}] ${issue.route}`);
  if (issue.error) console.log(`  ERROR: ${issue.error}`);
  if (issue.overflow?.length) console.log(`  OVERFLOW: ${issue.overflow.join("; ")}`);
  if (issue.consoleErrors?.length) console.log(`  CONSOLE: ${issue.consoleErrors.join("; ")}`);
}
if (!issues.length) console.log("  No issues found!");
