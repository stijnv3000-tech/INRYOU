import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { StoreLocator } from "@/components/StoreLocator";
import { ArrowRight, Pin } from "@/components/ui/icons";
import { retailerCount, cityCount } from "@/lib/retailers";

export function WhereToBuy() {
  return (
    <section className="bg-cream-deep">
      <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <span className="flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-ink ring-1 ring-charcoal/10">
              <Pin className="h-4 w-4 text-orange-deep" />
              {retailerCount}+ verkooppunten · {cityCount} steden
            </span>
          </Reveal>
          <Reveal delay={1}>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Ook <span className="italic text-orange-deep">bij jou</span> in de buurt.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 max-w-xl text-pretty text-lg text-ink">
              Vind INRYOU in een winkel of horecazaak in je buurt — of laat het
              gewoon thuisbezorgen.
            </p>
          </Reveal>
        </div>

        <div className="mt-12">
          <StoreLocator compact />
        </div>

        <Reveal delay={1}>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/waar-te-koop" variant="outline">
              Alle verkooppunten
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
