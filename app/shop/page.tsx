import type { Metadata } from "next";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { BundleCard } from "@/components/product/BundleCard";
import { Marquee } from "@/components/ui/Marquee";
import { Stars } from "@/components/ui/Stars";
import { Truck, Recycle, Heart, Leaf } from "@/components/ui/icons";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop the range",
  description:
    "Shop INRYOU functional sparkling beverages — Cranberry, Ginger & Citrus and Quince & Vanilla. Real fruit, functional minerals, under 2g sugar. Free delivery over €35.",
};

const perks = [
  { icon: Truck, label: "Free delivery over €35" },
  { icon: Heart, label: "Subscribe & save 15%" },
  { icon: Leaf, label: "No artificial anything" },
  { icon: Recycle, label: "Recyclable aluminium" },
];

export default function ShopPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-14 pb-6 text-center lg:pt-20">
        <Reveal>
          <p className="eyebrow">The shop</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-5xl leading-[1.02] sm:text-6xl">
            Find your{" "}
            <span className="italic text-orange-deep">balance.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink">
            Every flavour shares the same promise: real fruit, functional
            minerals and almost no sugar. Choose a single flavour, or start with
            the Discovery Pack.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Stars rating={5} />
            <span className="text-sm text-ink">4.9/5 · 1,300+ reviews</span>
          </div>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl py-10">
        <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </Stagger>

        <div className="mt-8">
          <BundleCard />
        </div>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-8">
        <div className="grid grid-cols-2 gap-4 rounded-3xl bg-cream-deep p-6 sm:grid-cols-4 sm:p-8">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-orange-deep">
                <perk.icon className="h-5 w-5" />
              </span>
              <span className="text-sm font-medium text-charcoal">
                {perk.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-8">
        <Marquee />
      </div>
    </>
  );
}
