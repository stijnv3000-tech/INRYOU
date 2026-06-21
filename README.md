# INRYOU

A polished, multi-page e-commerce website for **INRYOU** — a Belgian brand of
functional, natural sparkling drinks. *natural balance, made effortless.*

Static site, **no build step** — open `index.html` or host the files anywhere.

## Pages

| File | Page |
|------|------|
| `index.html` | Home |
| `shop.html` | Shop (all three flavours) |
| `product-cranberry.html` · `product-ginger-citrus.html` · `product-vanille.html` | Product pages |
| `story.html` | Our story |
| `balance.html` | Natural Balance (functional ingredients + comparison) |
| `faq.html` | FAQ (accordion) |
| `contact.html` | Contact (stubbed form) |
| `cart.html` | Full cart |

## Architecture

- **One** stylesheet (`styles.css`) and **one** script (`app.js`), linked by every page.
- The **header, footer, cart drawer, product grids and all UI text** are injected
  from `app.js`, so they are identical on every page and there is zero duplication.
- **Trilingual** (Dutch default · French · English). All copy lives in a single
  translations dictionary in `app.js`; the chosen language persists in `localStorage`
  and applies across the whole site.
- **Cart** is custom and fully working (add / quantity / remove / live subtotal /
  header badge), persisted in `localStorage`, with both a slide-in drawer and the
  dedicated `cart.html` page.
- The signature **sun-and-grain motif** is recreated in pure CSS (radial-gradient
  disc + SVG `feTurbulence` noise masked to dissolve into speckles).

## Assets (`assets/`)

`logo.png`, `can-cranberry.png`, `can-ginger-citrus.png`, `can-in-hand.jpg`.

> **Note:** `can-vanille.png` (Kweepeer & Vanille) has **not been supplied yet**.
> The site degrades gracefully to a styled sage-green placeholder with the wordmark.
> Drop a `can-vanille.png` into `assets/` and it appears automatically.

The original uploads are kept in `design-reference/` (homepage mockup) for context.

## Placeholders to fill in later

Prices and nutrition facts are unknown, so they are clearly marked:

- **Prices** live in one place at the top of `app.js` (`PRICE_PER_CAN`,
  `PRICE_PER_PACK`) — flagged as placeholders. The cart maths are real; swap the
  numbers and every price updates. Pack pricing shows as `[prijs per pak]` in copy.
- Nutrition / regulatory copy uses bracketed placeholders, e.g. `[suikergehalte]`,
  `[calorieën]`, `[mg magnesium]`, `[verzendinfo]`, `[retourbeleid]`.

## Checkout

The **"Proceed to payment"** button is intentionally **non-functional**. Search
`app.js` for `CHECKOUT STUB` to find where to wire a payment provider
(Snipcart / Stripe / Shopify).

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
npx http-server .
```
