import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Everything you need to know about INRYOU — ingredients, nutrition, subscriptions, delivery and returns.",
};

const groups = [
  {
    title: "Product & ingredients",
    items: [
      {
        q: "What exactly is INRYOU?",
        a: "INRYOU is a premium functional sparkling beverage — lightly carbonated spring water with real fruit, functional minerals like magnesium and potassium, and almost no sugar. Think of it as a calmer, cleaner alternative to soda.",
      },
      {
        q: "How much sugar and how many calories?",
        a: "Under 2g of sugar and roughly 12–18 kcal per 250ml can, depending on the flavour. Sweetness comes from real fruit and a touch of stevia leaf — never refined sugar or artificial sweeteners.",
      },
      {
        q: "Is it suitable for vegans?",
        a: "Yes. All INRYOU flavours are 100% plant-based and contain no animal-derived ingredients.",
      },
      {
        q: "Does it contain caffeine?",
        a: "No. INRYOU is caffeine-free by design. The gentle lift comes from hydration, minerals and natural brightness — not stimulants.",
      },
    ],
  },
  {
    title: "Subscriptions",
    items: [
      {
        q: "How does Subscribe & Save work?",
        a: "Choose a subscription on any product to save 15% and get free delivery on every order, sent every four weeks. You can pause, skip, swap flavours or cancel anytime from your account — no lock-in, no awkward phone calls.",
      },
      {
        q: "Can I change my flavours each delivery?",
        a: "Absolutely. Your subscription is fully flexible — switch flavours or quantities before each delivery whenever you like.",
      },
    ],
  },
  {
    title: "Delivery & returns",
    items: [
      {
        q: "How much is delivery?",
        a: "Delivery is a flat €3.95, and free on all orders over €35 and on every subscription order. We ship carbon-neutral.",
      },
      {
        q: "How quickly will my order arrive?",
        a: "Most orders are delivered within 2–4 working days. You'll receive tracking as soon as your cans leave us.",
      },
      {
        q: "What's your returns policy?",
        a: "We offer a 30-day happiness guarantee. If you're not delighted, get in touch and we'll make it right — refund or replacement, your choice.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <section className="container-px mx-auto max-w-3xl py-16 text-center lg:py-20">
        <Reveal>
          <p className="eyebrow">Help centre</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
            Questions, answered.
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-lg text-ink">
            Can't find what you're looking for? We're always happy to help.
          </p>
        </Reveal>
      </section>

      <section className="container-px mx-auto max-w-3xl pb-16">
        {groups.map((group, gi) => (
          <Reveal key={group.title} delay={gi} as="div" className="mb-12">
            <h2 className="mb-4 text-2xl">{group.title}</h2>
            <Accordion items={group.items} defaultOpen={-1} />
          </Reveal>
        ))}
      </section>

      <section className="container-px mx-auto max-w-7xl pb-20 lg:pb-28">
        <div className="rounded-[2rem] bg-cream-deep px-8 py-14 text-center">
          <h2 className="text-3xl sm:text-4xl">Still curious?</h2>
          <p className="mx-auto mt-3 max-w-md text-pretty text-ink">
            Our team is real, human and quick to reply. Drop us a line.
          </p>
          <div className="mt-7 flex justify-center">
            <ButtonLink href="/contact">
              Contact us
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
