/* =============================================================================
   build-preview.mjs — bundle the multi-page INRYOU site into ONE self-contained
   HTML file (inline CSS + JS, images as base64), openable with no server.

   Run:  node build-preview.mjs
   Out:  inryou-preview.html

   The multi-page site stays the source of truth. This script inlines everything
   and adds a tiny client-side router so the separate pages become "routes"
   inside the single file (so internal links keep working from file://).
   ============================================================================= */
import { readFileSync, writeFileSync } from "node:fs";

const PAGES = [
  "index.html", "shop.html",
  "product-cranberry.html", "product-ginger-citrus.html", "product-vanille.html",
  "story.html", "balance.html", "faq.html", "contact.html", "cart.html",
];

// Per-route accent so the highlight colour is correct on each product route.
const ACCENT = {
  "product-ginger-citrus.html": "#E89A3C",
  "product-vanille.html": "#9DAE8C",
};
const DEFAULT_ACCENT = "#C8503F";

// 1. Images → base64 data URIs (can-vanille.png intentionally absent → the
//    site already degrades to a styled placeholder).
const IMG = {
  "assets/logo.png": "image/png",
  "assets/can-cranberry.png": "image/png",
  "assets/can-ginger-citrus.png": "image/png",
  "assets/can-in-hand.jpg": "image/jpeg",
};
const dataUris = {};
for (const [path, mime] of Object.entries(IMG)) {
  dataUris[path] = `data:${mime};base64,${readFileSync(path).toString("base64")}`;
}
function inlineAssets(str) {
  for (const [path, uri] of Object.entries(dataUris)) {
    str = str.split(path).join(uri);
  }
  return str;
}

// 2. Inline CSS + JS (with the image paths swapped inside app.js too).
const css = readFileSync("styles.css", "utf8");
const js = inlineAssets(readFileSync("app.js", "utf8"));

// 3. Extract each page's <main> inner content → a route block.
const routes = PAGES.map((file) => {
  const html = readFileSync(file, "utf8");
  const m = html.match(/<main id="main">([\s\S]*?)<\/main>/);
  if (!m) { throw new Error(`No <main> found in ${file}`); }
  const inner = inlineAssets(m[1]);
  return `<div class="route" data-route="${file}">${inner}</div>`;
}).join("\n");

// 4. Client-side router (runs after app.js has injected header/footer/drawer).
const router = `
(function () {
  var ACCENT = ${JSON.stringify(ACCENT)};
  var DEFAULT_ACCENT = ${JSON.stringify(DEFAULT_ACCENT)};
  function closeDrawer() {
    var d = document.querySelector('[data-drawer]');
    if (d && d.classList.contains('is-open')) {
      d.classList.remove('is-open'); d.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('drawer-open');
      var ov = document.querySelector('[data-drawer-overlay]'); if (ov) ov.hidden = true;
    }
  }
  function show(route) {
    var routes = document.querySelectorAll('.route'), found = false;
    routes.forEach(function (r) {
      var on = r.getAttribute('data-route') === route;
      r.classList.toggle('is-active', on); if (on) { found = true; }
    });
    if (!found) { route = 'index.html'; var home = document.querySelector('.route[data-route="index.html"]'); if (home) home.classList.add('is-active'); }
    document.body.setAttribute('data-page', route);
    document.documentElement.style.setProperty('--page-accent', ACCENT[route] || DEFAULT_ACCENT);
    document.querySelectorAll('.nav__link').forEach(function (a) {
      if (a.getAttribute('href') === route) { a.setAttribute('aria-current', 'page'); }
      else { a.removeAttribute('aria-current'); }
    });
    // re-run scroll-reveal for the now-visible route
    if (window.__inryouObserveReveal) { window.__inryouObserveReveal(); }
    window.scrollTo(0, 0);
    // recalc pinned/scrubbed sections for the freshly-shown route
    if (window.ScrollTrigger) { setTimeout(function () { window.ScrollTrigger.refresh(); }, 60); }
  }
  // Intercept internal links (capture phase, before app.js handlers).
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href$=".html"]');
    if (!a) { return; }
    e.preventDefault();
    var route = a.getAttribute('href');
    try { history.replaceState(null, '', location.pathname + '#' + route); } catch (err) {}
    var h = document.querySelector('[data-header]'); if (h) { h.classList.remove('nav-open'); }
    closeDrawer();
    show(route);
  }, true);
  function start() { show((location.hash || '').replace('#', '') || 'index.html'); }
  if (document.readyState !== 'loading') { start(); } else { document.addEventListener('DOMContentLoaded', start); }
  window.addEventListener('hashchange', function () { show((location.hash || '').replace('#', '') || 'index.html'); });
})();
`;

// 5. Compose the single file.
const out = `<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>INRYOU — preview</title>
  <meta name="description" content="INRYOU — natural balance, made effortless. Self-contained preview." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet" />
  <style>
${css}
/* --- single-file preview: route switching --- */
.route { display: none; }
.route.is-active { display: block; }
  </style>
</head>
<body data-page="index.html">
  <main id="main">
${routes}
  </main>
  <script>
${js}
  </script>
  <script>
${router}
  </script>
</body>
</html>
`;

writeFileSync("inryou-preview.html", out);
const kb = (Buffer.byteLength(out) / 1024).toFixed(0);
console.log(`Wrote inryou-preview.html (${kb} KB, ${PAGES.length} routes, ${Object.keys(IMG).length} images inlined)`);
