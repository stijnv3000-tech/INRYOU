"use client";

import { useMemo, useState } from "react";
import { Search, Pin, Close } from "@/components/ui/icons";
import { retailers } from "@/lib/retailers";

const typeColor: Record<string, string> = {
  Biowinkel: "bg-sage-soft text-sage-deep",
  Supermarkt: "bg-orange-soft text-orange-deep",
  Speciaalzaak: "bg-cranberry-soft text-cranberry-deep",
  Horeca: "bg-beige text-charcoal-soft",
};

export function StoreLocator({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return retailers;
    return retailers.filter(
      (r) =>
        r.city.toLowerCase().includes(q) ||
        r.postcode.includes(q) ||
        r.name.toLowerCase().includes(q)
    );
  }, [query]);

  const shown = compact ? results.slice(0, 4) : results;

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoek op stad of postcode…"
          aria-label="Zoek een verkooppunt"
          className="w-full rounded-full border border-charcoal/15 bg-white py-4 pl-13 pr-12 text-charcoal outline-none transition focus:border-orange focus:ring-2 focus:ring-orange/20 placeholder:text-muted"
          style={{ paddingLeft: "3.25rem" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Wissen"
            className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-charcoal/5"
          >
            <Close className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-muted">
        {results.length === 0
          ? "Geen verkooppunten gevonden — probeer een andere stad of postcode."
          : `${results.length} verkooppunt${results.length === 1 ? "" : "en"} gevonden`}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((r) => (
          <div
            key={r.name}
            className="flex gap-4 rounded-2xl bg-white/70 p-5 ring-1 ring-charcoal/5"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cream-deep text-orange-deep">
              <Pin className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="truncate font-display text-lg leading-tight">
                  {r.name}
                </h3>
              </div>
              <p className="mt-0.5 text-sm text-ink">{r.address}</p>
              <p className="text-sm text-muted">
                {r.postcode} {r.city}
              </p>
              <span
                className={`mt-3 inline-block rounded-full px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.1em] ${
                  typeColor[r.type] ?? "bg-beige text-charcoal-soft"
                }`}
              >
                {r.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
