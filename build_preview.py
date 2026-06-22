#!/usr/bin/env python3
"""
Build digital-impression-preview.html from the 3-file production version.

It inlines styles.css and script.js, embeds every referenced image as a base64
data URI, and drops the external Google-Fonts <link> (the CSS font stack already
falls back to system fonts) so the result is a single, fully offline file that
runs by double-click. Keeping this as a script means the preview never drifts
out of sync with the production files.
"""
import base64
import re
import pathlib

ROOT = pathlib.Path(__file__).parent
html = (ROOT / "index.html").read_text(encoding="utf-8")
css = (ROOT / "styles.css").read_text(encoding="utf-8")
js = (ROOT / "script.js").read_text(encoding="utf-8")

# Images that actually have files. can-vanille.png intentionally has no file so
# the in-app onerror handler degrades to a styled accent placeholder.
IMAGES = {
    "images/can-cranberry.png": "image/png",
    "images/can-ginger-citrus.png": "image/png",
    "images/can-in-hand.jpg": "image/jpeg",
}

def data_uri(path, mime):
    raw = (ROOT / path).read_bytes()
    b64 = base64.b64encode(raw).decode("ascii")
    return f"data:{mime};base64,{b64}"

# 1. Inline CSS (replace the stylesheet link)
html = html.replace(
    '<link rel="stylesheet" href="styles.css" />',
    "<style>\n" + css + "\n</style>",
)

# 2. Drop the external font links/preconnects for a zero-dependency offline file.
html = re.sub(
    r'\s*<link rel="preconnect"[^>]*>\s*', "\n", html
)
html = re.sub(
    r'\s*<link href="https://fonts\.googleapis\.com[^>]*>\s*', "\n", html
)

# 3. Inline JS (replace the script src)
html = html.replace(
    '<script src="script.js"></script>',
    "<script>\n" + js + "\n</script>",
)

# 4. Embed images as base64 data URIs everywhere they appear.
for path, mime in IMAGES.items():
    html = html.replace(path, data_uri(path, mime))

# 5. Mark it as the preview build in the title comment.
html = html.replace(
    "<title>INRYOU",
    "<!-- Self-contained offline preview. Generated from index.html + styles.css + script.js. -->\n  <title>INRYOU",
)

out = ROOT / "digital-impression-preview.html"
out.write_text(html, encoding="utf-8")
size_mb = out.stat().st_size / (1024 * 1024)
print(f"Wrote {out.name} ({size_mb:.2f} MB)")
