# INRYOU — Natural balance, made effortless

A modern, premium ecommerce website for **INRYOU**, a functional sparkling
beverage brand positioned as a calmer, healthier alternative to soda.

The experience is designed to maximise conversion while building trust — every
section gently guides visitors toward purchasing, balanced with enough
storytelling and education to feel like a lifestyle brand rather than just
another drink.

## Tech stack

- **Next.js 15** (App Router, React 19, TypeScript) — static-generated for SEO
- **Tailwind CSS v4** — CSS-first theming with the brand palette as design tokens
- **Framer Motion** — subtle, premium scroll and interaction animations
- **next/font** — Fraunces (editorial serif display) + Inter (clean UI sans)

No external services are required — products, blog posts and reviews are local
data, and the cart is a client-side context persisted to `localStorage`.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (fully static)
npm run start      # serve the production build
```

## What's included

**Commerce**
- Home page — hero, value props, vs-soda comparison, range preview, ingredients,
  lifestyle gallery, testimonials and conversion CTAs
- Shop with the full range and a best-value Discovery Pack bundle
- Product detail pages with subscribe-and-save, quantity, tasting notes,
  benefits, full ingredients/nutrition, reviews, FAQ and cross-sell
- Slide-out cart drawer + full cart/checkout page with free-shipping progress
  and an order-confirmation state

**Brand & content (SEO)**
- Our Story, The Science (ingredients & wellness), Journal (blog) with articles
  on healthy alternatives to soda, functional minerals and the INRYOU philosophy
- FAQ, Contact, Sustainability, Shipping & Returns, Privacy, Terms
- JSON-LD structured data (Organization, Product, Article), `sitemap.xml`,
  `robots.txt`, Open Graph metadata and a generated favicon

## Design direction

Warm cream and off-white backgrounds, soft beige neutrals, charcoal typography,
and warm orange / muted cranberry / soft sage accents — echoing the brand's
rising-sun mark. Generous white space, editorial serif headlines with italic
accents, and restrained motion communicate understated, modern wellness.

## Project structure

```
app/                Routes (home, shop, products, journal, info & legal pages)
components/
  cart/             Cart provider, drawer, add-to-cart, cart/checkout page
  home/             Home page sections
  layout/           Header, footer, announcement bar
  product/          Product card, bundle card, purchase panel
  ui/               Buttons, icons, reveal animations, accordion, etc.
  seo/              JSON-LD helper
lib/                Product, blog, review data, SEO + theme helpers
public/images/      Brand and product imagery
```

## Notes

INRYOU offers three flavours — Cranberry and Ginger & Citrus use the brand's
product photography; Quince & Vanilla rounds out the range as a representative
flavour. Checkout is a demonstration flow (no payment is processed).

Original brand assets remain in [`resources/`](resources/) and the repository root.
