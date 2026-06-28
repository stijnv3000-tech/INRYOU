"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { Minus, Plus, Truck, Check, Recycle, Heart } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

const FREE_SHIPPING = 35;

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
        <h1 className="mt-6 text-4xl">Order confirmed</h1>
        <p className="mt-3 text-pretty text-ink">
          Thank you — your balance is on its way. This is a demo checkout, so no
          payment was taken and no cans were harmed.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-charcoal px-7 py-3.5 font-medium text-cream transition hover:bg-charcoal-soft"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-px mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center py-20 text-center">
        <h1 className="text-4xl">Your cart is calm and empty</h1>
        <p className="mt-3 text-pretty text-ink">
          Nothing here yet. Explore the range and find your balance.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-orange px-7 py-3.5 font-medium text-white transition hover:bg-orange-deep"
        >
          Shop the range
        </Link>
      </div>
    );
  }

  return (
    <div className="container-px mx-auto max-w-7xl py-12 lg:py-16">
      <h1 className="text-4xl sm:text-5xl">Your cart</h1>
      <p className="mt-2 text-ink">
        {count} {count === 1 ? "item" : "items"}
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
                  <Image
                    src={asset(item.image)}
                    alt={item.name}
                    fill
                    sizes="96px"
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-display text-xl">{item.name}</p>
                      <p className="text-sm text-muted">{item.flavorLine}</p>
                    </div>
                    <p className="font-medium">
                      €{(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center gap-4 rounded-full border border-charcoal/15 px-3 py-1.5">
                      <button
                        onClick={() => setQty(item.slug, item.qty - 1)}
                        aria-label="Decrease quantity"
                        className="text-charcoal/70 hover:text-charcoal"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-5 text-center text-sm font-medium">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => setQty(item.slug, item.qty + 1)}
                        aria-label="Increase quantity"
                        className="text-charcoal/70 hover:text-charcoal"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item.slug)}
                      className="text-sm text-muted hover:text-cranberry"
                    >
                      Remove
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
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-cream-deep p-7">
            <h2 className="font-display text-2xl">Order summary</h2>

            {remaining > 0 ? (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-ink">
                <Truck className="h-4 w-4 text-orange" />
                €{remaining.toFixed(2)} from free delivery
              </p>
            ) : (
              <p className="mt-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm text-sage-deep">
                <Check className="h-4 w-4" /> Free delivery unlocked
              </p>
            )}

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink">Subtotal</dt>
                <dd className="font-medium">€{subtotal.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink">Delivery</dt>
                <dd className="font-medium">
                  {shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}
                </dd>
              </div>
              <div className="flex justify-between border-t border-charcoal/10 pt-3">
                <dt className="font-display text-lg">Total</dt>
                <dd className="font-display text-lg">€{total.toFixed(2)}</dd>
              </div>
            </dl>

            <button
              onClick={() => setPlaced(true)}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-orange px-8 py-4 font-medium text-white transition hover:bg-orange-deep"
            >
              Checkout · €{total.toFixed(2)}
            </button>

            <ul className="mt-6 space-y-2.5 text-sm text-ink">
              <li className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-sage-deep" /> Carbon-neutral
                delivery
              </li>
              <li className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-sage-deep" /> 30-day happiness
                guarantee
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
