"use client";

import { useState } from "react";
import { useCart } from "./CartProvider";
import { Check, Plus, Minus } from "@/components/ui/icons";
import type { Product } from "@/lib/products";

export function AddToCart({
  product,
  withQuantity = false,
  className = "",
  label = "Add to cart",
}: {
  product: Product;
  withQuantity?: boolean;
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(
      {
        slug: product.slug,
        name: product.name,
        flavorLine: product.flavorLine,
        price: product.price,
        image: product.image,
        accentSoft: product.accentSoft,
      },
      qty
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className={`flex flex-col gap-4 sm:flex-row sm:items-stretch ${className}`}>
      {withQuantity && (
        <div className="flex items-center justify-between gap-4 rounded-full border border-charcoal/15 px-4 py-3 sm:justify-center">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="text-charcoal/70 transition hover:text-charcoal"
          >
            <Minus className="h-5 w-5" />
          </button>
          <span className="w-6 text-center font-medium tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="text-charcoal/70 transition hover:text-charcoal"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      )}
      <button
        onClick={handleAdd}
        disabled={!product.available}
        className="group relative flex flex-1 items-center justify-center gap-2 overflow-hidden rounded-full bg-orange px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-orange-deep disabled:opacity-50"
      >
        <span
          className={`flex items-center gap-2 transition-all duration-300 ${
            added ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {product.available ? label : "Coming soon"}
          {product.available && (
            <span className="text-white/80">· €{product.price}</span>
          )}
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center gap-2 transition-all duration-300 ${
            added ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <Check className="h-5 w-5" /> Added
        </span>
      </button>
    </div>
  );
}
