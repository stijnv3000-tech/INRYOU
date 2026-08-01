"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Stars } from "@/components/ui/Stars";
import { Check, Minus, Plus, Truck, Recycle } from "@/components/ui/icons";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { pricePerCan, type Product } from "@/lib/products";

type Plan = "once" | "subscribe";

const eur = (n: number) => `€${n.toFixed(2).replace(".", ",")}`;

export function PurchasePanel({ product }: { product: Product }) {
  const { add } = useCart();
  const [plan, setPlan] = useState<Plan>("subscribe");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const unitPrice = useMemo(
    () => (plan === "subscribe" ? product.price * 0.85 : product.price),
    [plan, product.price]
  );

  const handleAdd = () => {
    add(
      {
        slug: plan === "subscribe" ? `${product.slug}-sub` : product.slug,
        name:
          plan === "subscribe" ? `${product.name} (Abonnement)` : product.name,
        flavorLine: product.flavorLine,
        price: Number(unitPrice.toFixed(2)),
        image: product.image,
        accentSoft: product.accentSoft,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <Stars rating={product.rating} />
        <span className="text-sm text-ink">
          {product.rating.toString().replace(".", ",")} · {product.reviewCount}{" "}
          beoordelingen
        </span>
        {product.bestSeller && (
          <span className="rounded-full bg-orange-soft px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-orange-deep">
            Bestseller
          </span>
        )}
      </div>

      <h1 className="mt-4 text-balance text-4xl leading-[1.02] sm:text-5xl">
        {product.name}
      </h1>
      <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
        {product.flavorLine}
      </p>
      <p className="mt-5 text-pretty text-lg leading-relaxed text-ink">
        {product.description}
      </p>

      {/* Tasting notes */}
      <div className="mt-6 flex flex-wrap gap-2">
        {product.tastingNotes.map((note) => (
          <span
            key={note}
            className="rounded-full bg-charcoal/5 px-3.5 py-1.5 text-sm text-charcoal-soft"
          >
            {note}
          </span>
        ))}
      </div>

      {!product.available ? (
        <div className="mt-8 rounded-2xl border border-charcoal/15 bg-cream-deep p-6">
          <p className="font-display text-xl">Binnenkort beschikbaar</p>
          <p className="mt-2 text-sm text-ink">
            {product.name} is er bijna. Laat je e-mail achter en je bent er als
            eerste bij.
          </p>
          <div className="mt-4">
            <NewsletterForm />
          </div>
        </div>
      ) : (
        <>
          {/* Plan selector */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => setPlan("subscribe")}
              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                plan === "subscribe"
                  ? "border-orange bg-orange-soft/40"
                  : "border-charcoal/15 hover:border-charcoal/30"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  plan === "subscribe"
                    ? "border-orange bg-orange text-white"
                    : "border-charcoal/30"
                }`}
              >
                {plan === "subscribe" && <Check className="h-3 w-3" />}
              </span>
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-medium text-charcoal">
                    Abonneer & bespaar 15%
                  </span>
                  <span className="font-display text-lg">
                    {eur(product.price * 0.85)}
                  </span>
                </span>
                <span className="mt-0.5 block text-sm text-ink">
                  Elke 4 weken geleverd. Pauzeer, sla over of annuleer wanneer je
                  wil.
                </span>
              </span>
            </button>

            <button
              onClick={() => setPlan("once")}
              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition ${
                plan === "once"
                  ? "border-orange bg-orange-soft/40"
                  : "border-charcoal/15 hover:border-charcoal/30"
              }`}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  plan === "once"
                    ? "border-orange bg-orange text-white"
                    : "border-charcoal/30"
                }`}
              >
                {plan === "once" && <Check className="h-3 w-3" />}
              </span>
              <span className="flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-medium text-charcoal">
                    Eenmalige aankoop
                  </span>
                  <span className="font-display text-lg">{eur(product.price)}</span>
                </span>
                <span className="mt-0.5 block text-sm text-ink">
                  Eén {product.packSize}-pack. Geen verplichting.
                </span>
              </span>
            </button>
          </div>

          <p className="mt-4 text-sm text-muted">
            {product.packSize} blikken · {product.volume} per stuk · €
            {pricePerCan(unitPrice, product.packSize)} per blik
          </p>

          {/* Quantity + add */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <div className="flex items-center justify-between gap-4 rounded-full border border-charcoal/15 px-5 py-3.5 sm:justify-center">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Aantal verlagen"
                className="text-charcoal/70 hover:text-charcoal"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="w-6 text-center font-medium tabular-nums">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Aantal verhogen"
                className="text-charcoal/70 hover:text-charcoal"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="group relative flex flex-1 items-center justify-center overflow-hidden rounded-full bg-orange px-8 py-4 font-medium text-white transition hover:bg-orange-deep"
            >
              <span
                className={`flex items-center gap-2 transition-all duration-300 ${
                  added ? "-translate-y-8 opacity-0" : ""
                }`}
              >
                In mandje · {eur(unitPrice * qty)}
              </span>
              <span
                className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
                  added ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                <Check className="h-5 w-5" /> Toegevoegd aan mandje
              </span>
            </button>
          </div>
        </>
      )}

      {/* Trust */}
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
        <span className="flex items-center gap-2">
          <Truck className="h-4 w-4 text-sage-deep" /> Gratis levering vanaf €35
        </span>
        <span className="flex items-center gap-2">
          <Recycle className="h-4 w-4 text-sage-deep" /> CO₂-neutraal &
          recycleerbaar
        </span>
      </div>
    </div>
  );
}
