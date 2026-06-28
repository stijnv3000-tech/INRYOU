"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "@/components/cart/CartProvider";
import { Stars } from "@/components/ui/Stars";
import { Plus } from "@/components/ui/icons";
import { pricePerCan, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      }}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white/70 ring-1 ring-charcoal/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-32px_rgba(32,29,26,0.35)]"
    >
      <Link
        href={`/products/${product.slug}`}
        className="relative flex aspect-[4/5] items-center justify-center overflow-hidden"
        style={{ backgroundColor: product.accentSoft }}
      >
        {product.bestSeller && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-charcoal/85 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cream">
            Bestseller
          </span>
        )}
        <Image
          src={product.image}
          alt={`INRYOU ${product.name} can`}
          width={320}
          height={420}
          className="h-[78%] w-auto object-contain drop-shadow-[0_22px_28px_rgba(32,29,26,0.18)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2 group-hover:scale-[1.04]"
        />
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-2xl leading-none">{product.name}</h3>
          <Stars rating={product.rating} size={14} />
        </div>
        <p className="mt-1.5 text-xs uppercase tracking-[0.16em] text-muted">
          {product.flavorLine}
        </p>
        <p className="mt-3 text-pretty text-sm text-ink">
          {product.shortDescription}
        </p>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <p className="font-display text-xl">€{product.price}</p>
            <p className="text-xs text-muted">
              {product.packSize}-pack · €{pricePerCan(product.price, product.packSize)}/can
            </p>
          </div>
          <button
            onClick={() =>
              add({
                slug: product.slug,
                name: product.name,
                flavorLine: product.flavorLine,
                price: product.price,
                image: product.image,
                accentSoft: product.accentSoft,
              })
            }
            aria-label={`Add ${product.name} to cart`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-charcoal text-cream transition-all duration-300 hover:scale-105 hover:bg-orange"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
