import type { Metadata } from "next";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ProductCard } from "@/components/product/ProductCard";
import { BundleCard } from "@/components/product/BundleCard";
import { Marquee } from "@/components/ui/Marquee";
import { Stars } from "@/components/ui/Stars";
import { Truck, Recycle, Heart, Leaf } from "@/components/ui/icons";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Shop de INRYOU functionele bruisende dranken — Cranberry, Ginger & Citrus en Kweepeer & Vanille. Echte vruchten, functionele mineralen, minder dan 2g suiker. Gratis levering vanaf €35.",
};

const perks = [
  { icon: Truck, label: "Gratis levering vanaf €35" },
  { icon: Heart, label: "Abonneer & bespaar 15%" },
  { icon: Leaf, label: "Niets kunstmatigs" },
  { icon: Recycle, label: "Recycleerbaar aluminium" },
];

export default function ShopPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-7xl pt-14 pb-6 text-center lg:pt-20">
        <Reveal>
          <p className="eyebrow">De shop</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-5xl leading-[1.02] sm:text-6xl">
            Vind jouw <span className="accent text-orange-deep">balans.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink">
            Elke smaak deelt dezelfde belofte: echte vruchten, functionele
            mineralen en amper suiker. Kies één smaak, of begin met het
            Proefpakket.
          </p>
        </Reveal>
        <Reveal delay={3}>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Stars rating={5} />
            <span className="text-sm text-ink">4,9/5 · 1.300+ beoordelingen</span>
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
