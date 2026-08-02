import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StoreLocator } from "@/components/StoreLocator";
import { ArrowRight } from "@/components/ui/icons";
import { retailerCount, cityCount } from "@/lib/retailers";

export const metadata: Metadata = {
  title: "Waar te koop",
  description:
    "Vind INRYOU bij een verkooppunt in je buurt. Zoek op stad of postcode en ontdek waar je onze functionele bruisende dranken kunt kopen.",
};

export default function WhereToBuyPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-3xl py-16 text-center lg:py-20">
        <Reveal>
          <p className="eyebrow">Waar te koop</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
            Vind INRYOU <span className="accent text-orange-deep">in je buurt.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink">
            Al verkrijgbaar bij {retailerCount}+ zorgvuldig gekozen verkooppunten
            in {cityCount} Belgische steden. Liever thuisbezorgd? Bestel dan
            gewoon online.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-7xl pb-16">
        <StoreLocator />
      </section>

      {/* Stockist CTA */}
      <section className="container-px mx-auto max-w-7xl pb-20 lg:pb-28">
        <div className="grid items-center gap-8 rounded-[2rem] bg-charcoal px-8 py-12 text-cream sm:grid-cols-[1.4fr_1fr] lg:px-14">
          <div>
            <p className="eyebrow text-orange">Voor handelaars</p>
            <h2 className="mt-3 text-balance text-3xl text-cream sm:text-4xl">
              INRYOU verkopen in jouw zaak?
            </h2>
            <p className="mt-3 max-w-md text-pretty text-cream/70">
              Word verkooppunt en zet een premium, functionele frisdrank op je
              rekken. We denken graag met je mee.
            </p>
          </div>
          <div className="flex sm:justify-end">
            <ButtonLink href="/contact">
              Word verkooppunt
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
