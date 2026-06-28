import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the INRYOU team. We're real, human and quick to reply — questions, wholesale, press and everything in between.",
};

const channels = [
  { label: "Customer care", value: "hello@inryou.com" },
  { label: "Wholesale & stockists", value: "trade@inryou.com" },
  { label: "Press & partnerships", value: "press@inryou.com" },
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
              Let's talk{" "}
              <span className="italic text-orange-deep">balance.</span>
            </h1>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-5 max-w-md text-pretty text-lg text-ink">
              Whether it's a question about an order, an idea for a flavour, or a
              shop that wants to stock us — we'd love to hear from you.
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
              INRYOU · The Low Countries · We reply within one working day.
            </p>
          </Reveal>
        </div>

        <Reveal delay={2} as="div">
          <div className="rounded-[2rem] bg-cream-deep p-7 sm:p-10">
            <h2 className="text-2xl">Send a message</h2>
            <p className="mt-1 text-sm text-ink">
              Fill in the form and we'll get right back to you.
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
