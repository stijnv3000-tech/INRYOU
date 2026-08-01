import Link from "next/link";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "Alle dranken" },
      { href: "/products/cranberry", label: "Cranberry" },
      { href: "/products/ginger-citrus", label: "Ginger & Citrus" },
      { href: "/products/quince-vanilla", label: "Kweepeer & Vanille" },
      { href: "/shop#bundle", label: "Proefpakket" },
    ],
  },
  {
    title: "Merk",
    links: [
      { href: "/our-story", label: "Ons verhaal" },
      { href: "/science", label: "De wetenschap" },
      { href: "/journal", label: "Journal" },
      { href: "/sustainability", label: "Duurzaamheid" },
    ],
  },
  {
    title: "Hulp",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/contact", label: "Contact" },
      { href: "/waar-te-koop", label: "Waar te koop" },
      { href: "/shipping", label: "Verzending & retour" },
      { href: "/cart", label: "Winkelmandje" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream/80">
      <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-sans text-2xl font-semibold tracking-[0.06em] text-cream">
              INRYOU
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.32em] text-cream/50">
              natural balance
            </p>
            <p className="mt-6 max-w-sm text-pretty text-cream/65">
              Functionele bruisende dranken voor dagelijkse balans. Echte
              vruchten, functionele mineralen, amper suiker — moeiteloos.
            </p>
            <div className="mt-8 max-w-sm">
              <p className="mb-3 text-sm font-medium text-cream">
                Schrijf je in bij INRYOU
              </p>
              <NewsletterForm variant="dark" />
              <p className="mt-3 text-xs text-cream/45">
                15% korting op je eerste bestelling. Uitschrijven wanneer je wil.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-cream/50">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-cream/75 transition hover:text-orange"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-cream/10 pt-8 text-xs text-cream/50 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} INRYOU. Alle rechten voorbehouden.</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/privacy" className="hover:text-cream">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-cream">
              Voorwaarden
            </Link>
            <Link href="/faq" className="hover:text-cream">
              Ingrediënten & voeding
            </Link>
            <span>Met balans gemaakt in België</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
