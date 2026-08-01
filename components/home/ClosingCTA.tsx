import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { ArrowRight, Truck, Recycle, Heart } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

const perks = [
  { icon: Truck, label: "Gratis levering vanaf €35" },
  { icon: Recycle, label: "CO₂-neutraal & recycleerbaar" },
  { icon: Heart, label: "Abonneer & bespaar 15%" },
];

export function ClosingCTA() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-wine px-6 py-16 text-cream sm:px-12 lg:px-16 lg:py-20">
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full opacity-40 blur-[10px]"
          style={{
            background:
              "radial-gradient(circle, rgba(224,124,58,0.55), transparent 65%)",
          }}
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="eyebrow text-orange">Jouw dagelijkse balans</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance text-4xl leading-[1.02] text-cream sm:text-5xl lg:text-6xl">
                Drink je <span className="italic text-orange">balans.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-md text-pretty text-lg text-cream/70">
                Begin met een Proefpakket en vind je smaak, of abonneer je en
                bespaar 15% — pauzeer, sla over of annuleer wanneer je wil.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/shop" size="lg">
                  Ontdek het assortiment
                  <ArrowRight className="h-5 w-5" />
                </ButtonLink>
                <ButtonLink
                  href="/shop#bundle"
                  variant="dark"
                  size="lg"
                  className="bg-cream/10 text-cream ring-1 ring-cream/20 hover:bg-cream/15"
                >
                  Probeer het Proefpakket
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {perks.map((perk) => (
                  <li
                    key={perk.label}
                    className="flex items-center gap-2 text-sm text-cream/75"
                  >
                    <perk.icon className="h-4 w-4 text-sage" />
                    {perk.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={2} as="div">
            <div className="rounded-3xl bg-cream/[0.06] p-7 ring-1 ring-cream/15 backdrop-blur">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream/10">
                  <Image
                    src={asset("/images/can-cranberry.png")}
                    alt="INRYOU blik"
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="font-display text-xl text-cream">
                    Mis nooit een aanbieding
                  </p>
                  <p className="text-sm text-cream/65">
                    15% korting op je eerste bestelling.
                  </p>
                </div>
              </div>
              <NewsletterForm variant="dark" />
              <p className="mt-3 text-xs text-cream/45">
                Alleen rustige inbox-energie. Uitschrijven wanneer je wil.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
