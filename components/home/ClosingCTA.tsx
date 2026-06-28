import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { ArrowRight, Truck, Recycle, Heart } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

const perks = [
  { icon: Truck, label: "Free delivery over €35" },
  { icon: Recycle, label: "Carbon-neutral & recyclable" },
  { icon: Heart, label: "Subscribe & save 15%" },
];

export function ClosingCTA() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-charcoal px-6 py-16 text-cream sm:px-12 lg:px-16 lg:py-20">
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
              <p className="eyebrow text-orange">Your daily balance</p>
            </Reveal>
            <Reveal delay={1}>
              <h2 className="mt-4 text-balance text-4xl leading-[1.02] text-cream sm:text-5xl lg:text-6xl">
                Drink your{" "}
                <span className="italic text-orange">balance.</span>
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="mt-5 max-w-md text-pretty text-lg text-cream/70">
                Start with a Discovery Pack and find your flavour, or subscribe
                and save 15% — pause, skip or cancel anytime.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/shop" size="lg">
                  Shop the range
                  <ArrowRight className="h-5 w-5" />
                </ButtonLink>
                <ButtonLink
                  href="/shop#bundle"
                  variant="dark"
                  size="lg"
                  className="bg-cream/10 text-cream ring-1 ring-cream/20 hover:bg-cream/15"
                >
                  Try the Discovery Pack
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
                    alt="INRYOU can"
                    fill
                    sizes="80px"
                    className="object-contain p-2"
                  />
                </div>
                <div>
                  <p className="font-display text-xl text-cream">
                    Never miss a deal
                  </p>
                  <p className="text-sm text-cream/65">
                    15% off your first order when you join.
                  </p>
                </div>
              </div>
              <NewsletterForm variant="dark" />
              <p className="mt-3 text-xs text-cream/45">
                Calm inbox energy only. Unsubscribe whenever you like.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
