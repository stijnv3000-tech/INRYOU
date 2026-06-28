"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "@/components/ui/Logo";
import { CartIcon, Close } from "@/components/ui/icons";
import { useCart } from "@/components/cart/CartProvider";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/our-story", label: "Our Story" },
  { href: "/science", label: "The Science" },
  { href: "/journal", label: "Journal" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const { count, openCart } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_0_rgba(32,29,26,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="container-px mx-auto flex h-[68px] max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(true)}
            className="-ml-1 flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition hover:bg-charcoal/5 lg:hidden"
            aria-label="Open menu"
          >
            <span className="flex flex-col gap-[5px]">
              <span className="block h-[1.5px] w-5 bg-current" />
              <span className="block h-[1.5px] w-5 bg-current" />
              <span className="block h-[1.5px] w-3.5 bg-current" />
            </span>
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`link-underline text-sm font-medium tracking-wide transition-colors ${
                pathname.startsWith(item.href)
                  ? "text-charcoal"
                  : "text-ink hover:text-charcoal"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Link
            href="/shop"
            className="hidden rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal-soft sm:inline-flex"
          >
            Shop now
          </Link>
          <button
            onClick={openCart}
            aria-label={`Open cart, ${count} items`}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-charcoal transition hover:bg-charcoal/5"
          >
            <CartIcon className="h-5 w-5" />
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-orange px-1 text-[10px] font-semibold text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-charcoal/30 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.45 }}
              className="fixed inset-y-0 left-0 z-50 flex w-[82%] max-w-sm flex-col bg-cream px-7 py-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-charcoal/5"
                >
                  <Close className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-10 flex flex-col gap-1">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className="block border-b border-charcoal/10 py-4 font-display text-2xl text-charcoal"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto">
                <Link
                  href="/shop"
                  className="flex w-full items-center justify-center rounded-full bg-orange px-6 py-4 font-medium text-white"
                >
                  Shop the range
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
