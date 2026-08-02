"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import { Close, Minus, Plus, Truck, Check } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

const FREE_SHIPPING = 35;

export function CartDrawer() {
  const { items, isOpen, closeCart, setQty, remove, subtotal, count } =
    useCart();

  const remaining = Math.max(0, FREE_SHIPPING - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING) * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-charcoal/40 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-6 py-5">
              <h2 className="font-display text-xl">
                Winkelmandje{" "}
                <span className="text-muted">({count})</span>
              </h2>
              <button
                onClick={closeCart}
                aria-label="Mandje sluiten"
                className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-charcoal/5"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>

            {/* Free shipping progress */}
            {items.length > 0 && (
              <div className="border-b border-charcoal/10 bg-cream-deep px-6 py-4">
                <p className="flex items-center gap-2 text-sm text-ink">
                  {remaining > 0 ? (
                    <>
                      <Truck className="h-4 w-4 text-orange" />
                      Nog{" "}
                      <span className="font-semibold text-charcoal">
                        €{remaining.toFixed(2).replace(".", ",")}
                      </span>{" "}
                      tot gratis levering
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 text-sage-deep" />
                      Je hebt gratis CO₂-neutrale levering ontgrendeld
                    </>
                  )}
                </p>
                <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-beige">
                  <motion.div
                    className="h-full rounded-full bg-orange"
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                  />
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto px-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-display text-2xl text-charcoal">
                    Je mandje is rustig en leeg
                  </p>
                  <p className="mt-2 max-w-xs text-sm text-muted">
                    Voeg wat balans toe aan je dag — ontdek het assortiment.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="mt-6 rounded-full bg-orange px-6 py-3 text-sm font-medium text-white transition hover:bg-orange-deep"
                  >
                    Ontdek het assortiment
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-charcoal/10">
                  {items.map((item) => (
                    <li key={item.slug} className="flex gap-4 py-5">
                      <div
                        className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl"
                        style={{ backgroundColor: item.accentSoft }}
                      >
                        <Image
                          src={asset(item.image)}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="font-display text-lg leading-tight">
                              {item.name}
                            </p>
                            <p className="text-xs text-muted">
                              {item.flavorLine}
                            </p>
                          </div>
                          <p className="font-medium">
                            €{(item.price * item.qty).toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center gap-3 rounded-full border border-charcoal/15 px-2 py-1">
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
                            className="text-xs text-muted underline-offset-2 hover:text-cranberry hover:underline"
                          >
                            Verwijderen
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-charcoal/10 px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink">Subtotaal</span>
                  <span className="font-display text-2xl">
                    €{subtotal.toFixed(2).replace(".", ",")}
                  </span>
                </div>
                <p className="mt-1 text-xs text-muted">
                  Btw en eventuele verzendkosten worden berekend bij het
                  afrekenen.
                </p>
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="mt-4 flex w-full items-center justify-center rounded-full bg-orange px-6 py-4 font-medium text-white transition hover:bg-orange-deep"
                >
                  Afrekenen
                </Link>
                <button
                  onClick={closeCart}
                  className="mt-2 w-full py-2 text-center text-sm text-ink hover:text-charcoal"
                >
                  Verder winkelen
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
