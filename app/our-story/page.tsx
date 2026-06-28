import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, Leaf, Drop, Heart, Sparkle } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "INRYOU was born from a simple belief: wellbeing should be the easy choice. Meet the brand behind natural balance, made effortless.",
};

const values = [
  {
    icon: Heart,
    title: "Balance over extremes",
    text: "We don't believe in deprivation or hard rules. Sustainable wellbeing is about choosing a little better, a little more often.",
  },
  {
    icon: Leaf,
    title: "Honesty, always",
    text: "Short ingredient lists, real doses, and labels you can actually trust. No fine print, no marketing minerals.",
  },
  {
    icon: Sparkle,
    title: "Beauty as standard",
    text: "Something you reach for every day should be a pleasure to hold and to drink. Design is not a luxury here — it's the point.",
  },
  {
    icon: Drop,
    title: "Genuinely functional",
    text: "Every can earns its place: real fruit, functional minerals, and a recipe that tastes good enough to drink daily.",
  },
];

export default function OurStoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cream to-cream-deep" />
          <div
            className="absolute left-1/2 top-0 h-[460px] w-[460px] -translate-x-1/2 rounded-full opacity-50 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(224,124,58,0.28), transparent 65%)",
            }}
          />
        </div>
        <div className="container-px mx-auto max-w-3xl py-20 text-center lg:py-28">
          <Reveal>
            <p className="eyebrow">Our story</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
              Wellbeing should be the{" "}
              <span className="italic text-orange-deep">easy choice.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink">
              INRYOU began with a small, daily frustration — and a belief that
              the better option should also be the most beautiful, most natural
              one to reach for.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Narrative */}
      <section className="container-px mx-auto max-w-7xl py-12 lg:py-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal as="div" className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src={asset("/images/can-in-hand.jpg")}
              alt="An INRYOU Cranberry can held against the sky"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>
          <div className="max-w-lg">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl">It started in the fridge</h2>
            </Reveal>
            <Reveal delay={1}>
              <div className="mt-6 space-y-4 text-pretty text-lg leading-relaxed text-ink">
                <p>
                  Every drink that was good for us seemed to shout about it. And
                  every drink that actually tasted good seemed to quietly work
                  against us — too much sugar, too many additives, a sugar crash
                  waiting on the other side.
                </p>
                <p>
                  We wanted something in between. A drink with the lift and the
                  ritual of a great soda, but the clean conscience of a glass of
                  water. Calm, beautiful, and genuinely good for you.
                </p>
                <p>
                  So we made it ourselves — pressing real fruit, adding
                  functional minerals at honest doses, and sweetening gently with
                  stevia leaf. The result is INRYOU: natural balance, made
                  effortless.
                </p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 border-l-2 border-orange pl-5">
                <p className="font-display text-xl italic text-charcoal">
                  "We're not here to fix you. You're not broken. We just make the
                  better choice a little easier to reach."
                </p>
                <p className="mt-3 text-sm text-muted">
                  Sofie Vermeer · Founder
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-charcoal text-cream">
        <div className="container-px mx-auto max-w-7xl py-20 lg:py-28">
          <Reveal>
            <p className="eyebrow text-orange">What we believe</p>
            <h2 className="mt-4 max-w-2xl text-balance text-4xl leading-[1.05] text-cream sm:text-5xl">
              Four principles, in every can.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i} as="div" className="flex gap-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream/10 text-orange">
                  <v.icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-xl text-cream">{v.title}</h3>
                  <p className="mt-2 text-pretty text-cream/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-px mx-auto max-w-3xl py-20 text-center lg:py-28">
        <Reveal>
          <h2 className="text-balance text-4xl leading-[1.05] sm:text-5xl">
            Find your balance.
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="mx-auto mt-5 max-w-md text-pretty text-lg text-ink">
            Three flavours, one philosophy. Start with whichever calls to you.
          </p>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-8 flex justify-center">
            <ButtonLink href="/shop" size="lg">
              Shop the range
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
