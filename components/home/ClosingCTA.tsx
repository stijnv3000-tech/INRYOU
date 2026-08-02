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
      <div className="relative overflow-hidden rounded-[2.5rem] bg-blush px-6 py-16 ring-1 ring-charcoal/5 sm:px-12 lg:px-16 lg:py-20">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full opacity-50 blur-[10px]"
          style={{
            background:
              "radial-gradient(circle, rgba(224,124,58,0.35), transparent 65%)",
          }}
        />
        <div className="relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="eyebrow">Jouw dagelijkse balans</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
                Drink je <span className="accent text-orange-deep">balans.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="measure mt-5 text-pretty text-lg text-ink">
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
                <ButtonLink href="/shop#bundle" variant="outline" size="lg">
                  Probeer het Proefpakket
                </ButtonLink>
              </div>
            </Reveal>
            <Reveal delay={4}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
                {perks.map((perk) => (
                  <li
                    key={perk.label}
                    className="flex items-center gap-2 text-sm text-ink"
                  >
                    <perk.icon className="h-4 w-4 text-sage-deep" />
                    {perk.label}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={2} as="div">
            <div className="rounded-3xl bg-white p-7 ring-1 ring-charcoal/10">
              <div className="mb-6 flex items-center gap-4">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-cream-deep">
                  <Image
                    src={asset("/images/can-cranberry.png")}
                    alt="INRYOU blik"
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="font-display text-xl text-charcoal">
                    Mis nooit een aanbieding
                  </p>
                  <p className="text-sm text-ink">
                    15% korting op je eerste bestelling.
                  </p>
                </div>
              </div>
              <NewsletterForm />
              <p className="mt-3 text-xs text-muted">
                Alleen rustige inbox-energie. Uitschrijven wanneer je wil.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
