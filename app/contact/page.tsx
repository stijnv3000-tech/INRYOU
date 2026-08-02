import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met het INRYOU-team. We zijn echt, menselijk en snel met antwoorden — vragen, groothandel, pers en alles daartussenin.",
};

const channels = [
  { label: "Klantendienst", value: "hello@inryou.com" },
  { label: "Groothandel & verkooppunten", value: "trade@inryou.com" },
  { label: "Pers & partnerships", value: "press@inryou.com" },
];

export default function ContactPage() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="eyebrow">Contact</p>
          </Reveal>
          <Reveal delay={1}>
            <h1 className="mt-4 text-balance text-5xl leading-[1.02] sm:text-6xl">
              Laten we praten over{" "}
              <span className="accent text-orange-deep">balans.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 max-w-md text-pretty text-lg text-ink">
              Of het nu gaat om een vraag over een bestelling, een idee voor een
              smaak, of een winkel die ons wil verkopen — we horen graag van je.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <ul className="mt-10 space-y-6">
              {channels.map((c) => (
                <li key={c.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    {c.label}
                  </p>
                  <a
                    href={`mailto:${c.value}`}
                    className="mt-1 inline-block font-display text-xl text-charcoal link-underline"
                  >
                    {c.value}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={4}>
            <p className="mt-10 text-sm text-muted">
              INRYOU · De Lage Landen · We antwoorden binnen één werkdag.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2} as="div">
          <div className="rounded-[2rem] bg-cream-deep p-7 sm:p-10">
            <h2 className="text-2xl">Stuur een bericht</h2>
            <p className="mt-1 text-sm text-ink">
              Vul het formulier in en we komen snel bij je terug.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
