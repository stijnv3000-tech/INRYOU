import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Accordion } from "@/components/ui/Accordion";
import { Check, Close, ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "The science",
  description:
    "How INRYOU works: functional minerals like magnesium and potassium, real fruit, natural sweetness from stevia leaf, and almost no sugar. The science of a calmer soda alternative.",
};

const minerals = [
  {
    name: "Magnesium citrate",
    dose: "75mg per can",
    text: "Involved in over 300 enzyme reactions, from energy production to muscle and nerve function. We use the citrate form for superior absorption.",
  },
  {
    name: "Potassium citrate",
    dose: "120mg per can",
    text: "Works with sodium to maintain fluid balance and normal blood pressure — part of why a well-formulated sparkling drink can be genuinely hydrating.",
  },
  {
    name: "B-vitamins & L-theanine",
    dose: "Flavour-dependent",
    text: "Selected flavours add B-vitamins for energy metabolism, or L-theanine for relaxed focus — calm energy without caffeine or sugar.",
  },
];

const principles = [
  {
    title: "Dose honestly",
    text: "Minerals only matter at meaningful, absorbable amounts. We tell you exactly how much is in every can — no fairy dust.",
  },
  {
    title: "Sweeten naturally",
    text: "Sweetness comes from real fruit and a touch of stevia leaf. No refined sugar, no aspartame, no sucralose.",
  },
  {
    title: "Keep it short",
    text: "If an ingredient isn't doing real work — for your body or the taste — it doesn't make the recipe.",
  },
];

const compare = [
  { label: "Sugar", inryou: "Under 2g", soda: "35–40g" },
  { label: "Sweetener", inryou: "Stevia leaf", soda: "Sugar / HFCS" },
  { label: "Minerals", inryou: "Mg + K", soda: "None" },
  { label: "Calories", inryou: "12–18 kcal", soda: "140+ kcal" },
  { label: "Additives", inryou: "None", soda: "Colours, etc." },
];

const faqs = [
  {
    q: "Are stevia and steviol glycosides safe?",
    a: "Yes. Steviol glycosides are extracted from the leaf of the stevia plant and are approved as a sweetener across the EU and beyond. They provide clean sweetness with no calories and no impact on blood sugar.",
  },
  {
    q: "Will the minerals actually do anything?",
    a: "Our doses are set at levels that contribute meaningfully to your daily intake — 75mg magnesium and 120mg potassium per can — in highly absorbable citrate forms. They support normal muscle, nerve and hydration function as part of a balanced diet.",
  },
  {
    q: "Is INRYOU hydrating?",
    a: "Yes. It's sparkling spring water at its base, with added electrolytes that help your body hold on to fluid. It's a genuinely hydrating way to enjoy a flavoured, fizzy drink.",
  },
  {
    q: "Is it suitable for a low-sugar or keto lifestyle?",
    a: "With under 2g of sugar and 12–18 kcal per can, INRYOU fits comfortably into low-sugar and low-calorie ways of eating. As always, check the full label against your specific needs.",
  },
];

export default function SciencePage() {
  return (
    <>
      <section className="container-px mx-auto max-w-3xl py-20 text-center lg:py-24">
        <Reveal>
          <p className="eyebrow">The science</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
            Functional, not{" "}
            <span className="italic text-sage-deep">fanciful.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink">
            We're allergic to wellness theatre. Here's exactly what goes into
            every INRYOU can, why it's there, and the thinking behind it.
          </p>
        </Reveal>
      </section>

      {/* Minerals */}
      <section className="container-px mx-auto max-w-7xl pb-8">
        <div className="grid gap-6 md:grid-cols-3">
          {minerals.map((m, i) => (
            <Reveal key={m.name} delay={i} as="div">
              <div className="flex h-full flex-col rounded-3xl bg-cream-deep p-7">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-deep">
                  {m.dose}
                </span>
                <h3 className="mt-3 text-2xl">{m.name}</h3>
                <p className="mt-3 text-pretty text-ink">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="container-px mx-auto max-w-7xl py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow">How we formulate</p>
          <h2 className="mt-3 max-w-xl text-balance text-4xl sm:text-5xl">
            Three rules we won't break.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i} as="div">
              <span className="font-display text-5xl text-orange/30">
                0{i + 1}
              </span>
              <h3 className="mt-4 text-xl">{p.title}</h3>
              <p className="mt-2 text-pretty text-ink">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Compare */}
      <section className="bg-charcoal text-cream">
        <div className="container-px mx-auto max-w-4xl py-20 lg:py-24">
          <Reveal>
            <h2 className="text-balance text-4xl text-cream sm:text-5xl">
              The numbers don't lie.
            </h2>
            <p className="mt-4 text-cream/70">
              A typical 250ml serving, side by side.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-10 overflow-hidden rounded-3xl ring-1 ring-cream/15">
              <div className="grid grid-cols-3 bg-cream/5 text-sm font-medium uppercase tracking-[0.12em]">
                <div className="px-5 py-4 text-cream/45 sm:px-7">Metric</div>
                <div className="border-l border-cream/10 px-5 py-4 text-center text-cream sm:px-7">
                  INRYOU
                </div>
                <div className="border-l border-cream/10 px-5 py-4 text-center text-cream/45 sm:px-7">
                  Soda
                </div>
              </div>
              {compare.map((row, i) => (
                <div
                  key={row.label}
                  className={`grid grid-cols-3 items-center ${
                    i % 2 ? "bg-cream/[0.03]" : ""
                  }`}
                >
                  <div className="px-5 py-4 text-cream/80 sm:px-7">
                    {row.label}
                  </div>
                  <div className="flex items-center justify-center gap-2 border-l border-cream/10 px-5 py-4 sm:px-7">
                    <Check className="h-4 w-4 text-sage" />
                    <span className="font-medium text-cream">{row.inryou}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 border-l border-cream/10 px-5 py-4 text-cream/45 sm:px-7">
                    <Close className="h-4 w-4 text-cranberry" />
                    <span>{row.soda}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px mx-auto max-w-3xl py-16 lg:py-24">
        <Reveal>
          <h2 className="text-center text-3xl sm:text-4xl">The fine print</h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-12 text-center">
            <ButtonLink href="/shop" size="lg">
              Taste the difference
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
