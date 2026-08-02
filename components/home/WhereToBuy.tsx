import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Pin, Search } from "@/components/ui/icons";
import { retailerCount, cityCount } from "@/lib/retailers";

// A few headline cities as quick entry points
const cities = ["Antwerpen", "Gent", "Brussel", "Leuven", "Brugge", "Hasselt"];

export function WhereToBuy() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-blush px-6 py-14 ring-1 ring-charcoal/5 sm:px-12 lg:px-16 lg:py-20">
        {/* decorative pin dots */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1.5px 1.5px, rgba(56,22,26,0.9) 1.5px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-[360px] w-[360px] rounded-full opacity-40 blur-[10px]"
          style={{
            background:
              "radial-gradient(circle, rgba(224,124,58,0.4), transparent 65%)",
          }}
        />

        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium tracking-wide text-charcoal ring-1 ring-charcoal/10">
              <Pin className="h-4 w-4 text-orange-deep" />
              {retailerCount}+ verkooppunten · {cityCount} steden
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Vind INRYOU ook{" "}
              <span className="accent text-orange-deep">bij jou</span> in de buurt.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-4 max-w-md text-pretty text-lg text-ink">
              In de winkel of horecazaak om de hoek — of gewoon thuisbezorgd.
            </p>
          </Reveal>

          {/* City quick-picks */}
          <Reveal delay={3}>
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {cities.map((c) => (
                <Link
                  key={c}
                  href="/waar-te-koop"
                  className="rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal ring-1 ring-charcoal/10 transition hover:bg-orange hover:text-white hover:ring-orange"
                >
                  {c}
                </Link>
              ))}
              <Link
                href="/waar-te-koop"
                className="rounded-full px-4 py-2 text-sm font-medium text-muted underline-offset-2 hover:text-charcoal hover:underline"
              >
                + meer
              </Link>
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <ButtonLink href="/waar-te-koop" size="lg">
                <Search className="h-5 w-5" />
                Zoek een verkooppunt
              </ButtonLink>
              <ButtonLink href="/shop" variant="outline" size="lg">
                Of bestel online
                <ArrowRight className="h-5 w-5" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
