/**
 * Browser smoke test for the production build, driven by a real Edge (or any
 * Chromium) via Playwright.
 *
 *   1. bun run build
 *   2. bun run start          # serves on http://localhost:3000
 *   3. bun run check:browser  # in another shell
 *
 * Env: BASE_URL, BROWSER_CHANNEL (default msedge), HEADED=1 to watch it.
 * Screenshots land in build/browser-check/.
 */
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright-core";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000/";
const SHOTS = new URL("../build/browser-check/", import.meta.url).pathname;

const results = [];
function check(name, ok, detail = "") {
  const result = { name, ok: !!ok, detail: String(detail).slice(0, 300) };
  results.push(result);
  console.log(
    `${result.ok ? "PASS" : "FAIL"}  ${result.name}${result.detail ? `   [${result.detail}]` : ""}`,
  );
}

try {
  const res = await fetch(BASE_URL).catch(() => null);
  if (!res?.ok) {
    console.error(
      `${BASE_URL} is not serving. Run "bun run build && bun run start" first.`,
    );
    process.exit(2);
  }
} catch {
  console.error(`cannot reach ${BASE_URL}`);
  process.exit(2);
}

await mkdir(SHOTS, { recursive: true });

const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL ?? "msedge",
  headless: !process.env.HEADED,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});

/** Collects console errors and uncaught exceptions for one page. */
function watchErrors(page) {
  const errors = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  return errors;
}

// --- theme: the inline script and the provider must agree, with no flash ----
// The class log records every value documentElement.className takes, so a
// transient wrong class (a flash of the wrong theme) fails the check.
async function themeRun(colorScheme, stored) {
  const ctx = await browser.newContext({
    colorScheme,
    viewport: { width: 1280, height: 800 },
  });
  const page = await ctx.newPage();
  const errors = watchErrors(page);
  await page.addInitScript(
    ({ key, value }) => {
      if (value) localStorage.setItem(key, value);
      else localStorage.removeItem(key);
      // documentElement does not exist yet at document_start, so install on the
      // first frame; every later class change is recorded in order.
      window.__classLog = [];
      const install = () => {
        const el = document.documentElement;
        if (!el) {
          requestAnimationFrame(install);
          return;
        }
        window.__classLog.push(el.className);
        new MutationObserver(() =>
          window.__classLog.push(el.className),
        ).observe(el, { attributes: true, attributeFilter: ["class"] });
      };
      install();
    },
    { key: "vite-ui-theme", value: stored ?? "" },
  );
  await page.goto(BASE_URL, { waitUntil: "load" });
  await page.waitForTimeout(700);
  const log = await page.evaluate(() => window.__classLog);
  const final = await page.evaluate(() => document.documentElement.className);
  await ctx.close();
  return { log, final, errors };
}

for (const [label, colorScheme, stored, want, unwanted] of [
  ["OS light, no stored key", "light", null, "light", "dark"],
  ["OS dark, no stored key", "dark", null, "dark", "light"],
  ["stored light, OS dark", "dark", "light", "light", "dark"],
  ["stored dark, OS light", "light", "dark", "dark", "light"],
]) {
  const { log, final, errors } = await themeRun(colorScheme, stored);
  const has = (cls) => final.split(/\s+/).includes(cls);
  const ever = (cls) => log.some((c) => c.split(/\s+/).includes(cls));
  check(
    `theme: ${label} -> ${want}, never ${unwanted}`,
    has(want) && !ever(unwanted),
    `class="${final}" log=${JSON.stringify(log)}`,
  );
  check(
    `theme: ${label} raises no errors`,
    errors.length === 0,
    errors.join(" | "),
  );
}

// --- reduced motion: the CSS owns scroll-behavior --------------------------
for (const [setting, expected] of [
  ["reduce", "auto"],
  ["no-preference", "smooth"],
]) {
  const ctx = await browser.newContext({
    reducedMotion: setting,
    viewport: { width: 1280, height: 800 },
  });
  const page = await ctx.newPage();
  await page.goto(BASE_URL, { waitUntil: "load" });
  const behavior = await page.evaluate(
    () => getComputedStyle(document.documentElement).scrollBehavior,
  );
  await ctx.close();
  check(
    `scroll: prefers-reduced-motion ${setting} -> scroll-behavior:${expected}`,
    behavior === expected,
    `got ${behavior}`,
  );
}

// --- mobile drawer, lazy chunk, and the early-tap race ---------------------
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  const errors = watchErrors(page);
  await page.goto(BASE_URL, { waitUntil: "load" });

  const preloads = await page.evaluate(() =>
    [...document.querySelectorAll('link[rel="modulepreload"]')].map(
      (l) => l.href,
    ),
  );
  check(
    "bundle: the mobile-nav chunk is not preloaded in the initial HTML",
    !preloads.some((h) => h.includes("mobile-nav")),
    preloads.map((h) => h.split("/").pop()).join(", "),
  );

  const menu = page.locator('button[aria-label="Menu"]');
  const sheet = page.locator('[data-slot="sheet-content"]');
  const menuVisible = await menu
    .waitFor({ state: "visible", timeout: 5000 })
    .then(() => true)
    .catch(() => false);
  check("drawer: hamburger rendered at mobile width", menuVisible);

  // Tap as soon as the button exists, which is before the drawer chunk arrives:
  // the tap must still open it.
  await menu.click();
  let opened = true;
  try {
    await sheet.waitFor({ state: "visible", timeout: 10_000 });
  } catch {
    opened = false;
  }
  check("drawer: opens on a tap that beats the chunk (no lost tap)", opened);
  check(
    "drawer: react-aria renders it as a modal dialog",
    (await page.locator('[role="dialog"]').count()) > 0,
  );

  // Let the enter transition settle: a stuck data-entering state would leave the
  // drawer at opacity 0, which a DOM-presence check alone would not catch.
  await page.waitForTimeout(500);
  const drawerStyle = await page.evaluate(() => {
    const el = document.querySelector('[data-slot="sheet-content"]');
    const cs = getComputedStyle(el);
    return {
      opacity: cs.opacity,
      entering: el.hasAttribute("data-entering"),
      width: Math.round(el.getBoundingClientRect().width),
    };
  });
  check(
    "drawer: settles visible after its enter transition",
    Number(drawerStyle.opacity) > 0.95 && !drawerStyle.entering,
    JSON.stringify(drawerStyle),
  );
  await page.screenshot({ path: `${SHOTS}mobile-drawer.png` });

  // Sampled only now: a resource timing entry appears once the fetch finishes.
  const resources = await page.evaluate(() =>
    performance
      .getEntriesByType("resource")
      .filter((r) => r.name.endsWith(".js"))
      .map((r) => ({
        file: r.name.split("/").pop(),
        start: Math.round(r.startTime),
      })),
  );
  const drawerChunk = resources.find((r) => r.file.startsWith("mobile-nav"));
  const entryChunk = resources.find((r) => r.file.startsWith("entry.client"));
  check(
    "bundle: the mobile-nav chunk loads on demand, after the entry chunk",
    !!drawerChunk && !!entryChunk && drawerChunk.start > entryChunk.start,
    `entry@${entryChunk?.start}ms drawer@${drawerChunk?.start}ms`,
  );

  await page.locator('[data-slot="sheet-content"] a[href="#projects"]').click();
  await page.waitForTimeout(1200);
  const scrolled = await page.evaluate(() => Math.round(window.scrollY));
  check(
    "drawer: closes after picking a link",
    !(await sheet.isVisible().catch(() => false)),
  );
  check(
    "drawer: the link navigated to the section",
    scrolled > 100,
    `scrollY=${scrolled}`,
  );
  check("drawer: no errors", errors.length === 0, errors.join(" | "));
  await ctx.close();
}

// --- scroll reveal, stat count-up, scroll spy -----------------------------
{
  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    reducedMotion: "reduce",
  });
  const page = await ctx.newPage();
  const errors = watchErrors(page);
  await page.goto(BASE_URL, { waitUntil: "load" });
  await page.waitForSelector("h1");

  check(
    "reveal: hero content is visible on load",
    (await page.evaluate(
      () => getComputedStyle(document.querySelector("h1")).visibility,
    )) === "visible",
  );

  await page.evaluate(() => document.getElementById("about").scrollIntoView());
  await page.waitForSelector("#about .tabular-nums");
  await page.waitForTimeout(600);
  const stat = await page.evaluate(() => {
    const el = document.querySelector("#about .tabular-nums");
    return el
      ? { text: el.textContent, visibility: getComputedStyle(el).visibility }
      : null;
  });
  check(
    "reveal: about section reveals and the stat shows its final value",
    stat?.visibility === "visible" && stat?.text === "~5",
    JSON.stringify(stat),
  );

  await page.evaluate(() =>
    document.getElementById("projects").scrollIntoView(),
  );
  await page.waitForTimeout(700);
  const active = await page.evaluate(() =>
    [...document.querySelectorAll("header ul a")]
      .filter((a) => a.classList.contains("text-primary"))
      .map((a) => a.getAttribute("href")),
  );
  check(
    "scroll spy: only #projects is highlighted once scrolled there",
    active.length === 1 && active[0] === "#projects",
    JSON.stringify(active),
  );

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${SHOTS}desktop-top.png` });
  await page.evaluate(() => document.getElementById("about").scrollIntoView());
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${SHOTS}desktop-about.png` });
  check("page: no errors on desktop", errors.length === 0, errors.join(" | "));
  await ctx.close();
}

await browser.close();

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
