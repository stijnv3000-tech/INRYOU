"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { Check } from "@/components/ui/icons";
import { bundle } from "@/lib/products";
import { asset } from "@/lib/asset";

const includes = ["4 × Cranberry", "4 × Ginger & Citrus", "4 × Quince & Vanilla"];

export function BundleCard() {
  const { add } = useCart();

  return (
    <div
      id="bundle"
      className="grid scroll-mt-28 overflow-hidden rounded-[2rem] bg-charcoal text-cream lg:grid-cols-2"
    >
      <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden bg-gradient-to-br from-cranberry/30 via-orange/20 to-sage/20 p-8">
        <div className="flex items-end gap-2">
          <Image
            src={asset("/images/can-cranberry.png")}
            alt="Cranberry"
            width={120}
            height={260}
            className="h-48 w-auto rotate-[-6deg] object-contain drop-shadow-2xl sm:h-60"
          />
          <Image
            src={asset("/images/can-ginger-citrus.png")}
            alt="Ginger & Citrus"
            width={130}
            height={280}
            className="z-10 h-56 w-auto object-contain drop-shadow-2xl sm:h-72"
          />
          <Image
            src={asset("/images/can-cranberry.png")}
            alt="Quince & Vanilla"
            width={120}
            height={260}
            className="h-48 w-auto rotate-[6deg] object-contain opacity-90 drop-shadow-2xl sm:h-60"
          />
        </div>
        <span className="absolute left-6 top-6 rounded-full bg-orange px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white">
          Best value
        </span>
      </div>

      <div className="flex flex-col justify-center p-8 lg:p-12">
        <p className="eyebrow text-orange">Start here</p>
        <h3 className="mt-3 font-display text-3xl text-cream sm:text-4xl">
          {bundle.name}
        </h3>
        <p className="mt-3 text-pretty text-cream/70">{bundle.description}</p>
        <ul className="mt-6 space-y-2">
          {includes.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-cream/85">
              <Check className="h-4 w-4 text-sage" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex items-center gap-3">
          <span className="font-display text-3xl text-cream">€{bundle.price}</span>
          <span className="text-lg text-cream/40 line-through">
            €{bundle.comparePrice}
          </span>
          <span className="rounded-full bg-sage/20 px-2.5 py-1 text-xs font-medium text-sage">
            Save €{(bundle.comparePrice - bundle.price).toFixed(0)}
          </span>
        </div>
        <button
          onClick={() =>
            add({
              slug: bundle.slug,
              name: bundle.name,
              flavorLine: "Mixed 12-pack",
              price: bundle.price,
              image: "/images/can-cranberry.png",
              accentSoft: "var(--color-orange-soft)",
            })
          }
          className="mt-7 flex w-full items-center justify-center rounded-full bg-orange px-8 py-4 font-medium text-white transition hover:bg-orange-deep sm:w-auto"
        >
          Add Discovery Pack · €{bundle.price}
        </button>
      </div>
    </div>
  );
}
