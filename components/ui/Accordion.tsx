"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "./icons";

export interface AccordionItem {
  q: string;
  a: string;
}

export function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  defaultOpen?: number;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-lg font-medium text-charcoal">{item.q}</span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-charcoal/15 transition-transform duration-300 ${
                  isOpen ? "rotate-45 bg-charcoal text-cream" : "text-charcoal"
                }`}
              >
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-6 text-pretty leading-relaxed text-ink">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
