"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { Minus, Plus, Truck, Check, Recycle, Heart } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

const FREE_SHIPPING = 35;
const eur = (n: number) => `€${n.toFixed(2).replace(".", ",")}`;

export function CartPage() {
  const { items, setQty, remove, subtotal, count } = useCart();
  const [placed, setPlaced] = useState(false);

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : 3.95;
  const total = subtotal + shipping;

  if (placed) {
    return (
      <div className="container-px mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sage-soft text-sage-deep">
          <Check className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-4xl">Bestelling bevestigd</h1>
        <p className="mt-3 text-pretty text-ink">
          Bedankt — je balans is onderweg. Dit is een demo-checkout, dus er werd
          geen betaling uitgevoerd en geen blikje geopend.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-charcoal px-7 py-3.5 font-medium text-cream transition hover:bg-charcoal-soft"
        >
          Verder winkelen
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl">Je mandje is rustig en leeg</h1>
        <p className="mt-3 text-pretty text-ink">
          Nog niets hier. Ontdek het assortiment en vind jouw balans.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-orange px-7 py-3.5 font-medium text-white transition hover:bg-orange-deep"
        >
          Ontdek het assortiment
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-7xl py-12 lg:py-16">
      <h1 className="text-4xl sm:text-5xl">Winkelmandje</h1>
      <p className="mt-2 text-ink">
        {count} {count === 1 ? "artikel" : "artikelen"}
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        {/* Items */}
        <div>
          <ul className="divide-y divide-charcoal/10 border-y border-charcoal/10">
            {items.map((item) => (
              <li key={item.slug} className="flex gap-5 py-6">
                <div
                  className="relative h-28 w-24 shrink-0 overflow-hidden rounded-2xl"
                  style={{ backgroundColor: item.accentSoft }}
                >
                  {item.image && (
                    <Image
                      src={asset(item.image)}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-contain p-2"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-display text-xl">{item.name}</p>
                      <p className="text-sm text-muted">{item.flavorLine}</p>
                    </div>
                    <p className="font-medium">{eur(item.price * item.qty)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4 rounded-full border border-charcoal/15 px-3 py-1.5">
                      <button
                        onClick={() => setQty(item.slug, item.qty - 1)}
                        aria-label="Aantal verlagen"
                        className="text-charcoal/70 hover:text-charcoal"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-5 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => setQty(item.slug, item.qty + 1)}
                        aria-label="Aantal verhogen"
                        className="text-charcoal/70 hover:text-charcoal"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.slug)}
                      className="text-sm text-muted hover:text-cranberry"
                    >
                      Verwijderen
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href="/shop"
            className="mt-6 inline-flex text-sm font-medium text-charcoal link-underline"
          >
            ← Verder winkelen
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-cream-deep p-7">
            <h2 className="font-display text-2xl">Overzicht</h2>

            {remaining > 0 ? (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-ink">
                <Truck className="h-4 w-4 text-orange" />
                Nog {eur(remaining)} tot gratis levering
              </p>
            ) : (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-sage-deep">
                <Check className="h-4 w-4" /> Gratis levering ontgrendeld
              </p>
            )}

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink">Subtotaal</dt>
                <dd className="font-medium">{eur(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink">Levering</dt>
                <dd className="font-medium">
                  {shipping === 0 ? "Gratis" : eur(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-charcoal/10 pt-3">
                <dt className="font-display text-lg">Totaal</dt>
                <dd className="font-display text-lg">{eur(total)}</dd>
              </div>
            </dl>

            <button
              onClick={() => setPlaced(true)}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-orange px-8 py-4 font-medium text-white transition hover:bg-orange-deep"
            >
              Afrekenen · {eur(total)}
            </button>

            <ul className="mt-6 space-y-2.5 text-sm text-ink">
              <li className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-sage-deep" /> CO₂-neutrale
                levering
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-sage-deep" /> 30 dagen
                tevredenheidsgarantie
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
