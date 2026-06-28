import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "@/components/ui/icons";
import { products } from "@/lib/products";

export function ShopPreview() {
  return (
    <section id="shop" className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Reveal>
            <p className="eyebrow">The range</p>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Three flavours.{" "}
              <span className="italic text-orange-deep">One balance.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={2}>
          <ButtonLink href="/shop" variant="outline">
            View all
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
      </div>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </Stagger>
    </section>
  );
}
