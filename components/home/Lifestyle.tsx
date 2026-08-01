import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

export function Lifestyle() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="max-w-2xl">
        <Reveal>
          <p className="eyebrow">Een manier van leven</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
            Balans, waar het leven je ook{" "}
            <span className="italic text-cranberry">brengt.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-5 text-pretty text-lg text-ink">
            INRYOU is geen detox of ontbering. Het is een kleine, dagelijkse
            upgrade — de rustige keuze die past in een vol, modern leven in
            plaats van je te vragen eruit te stappen.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[230px] lg:grid-cols-4">
        <Reveal as="div" className="relative col-span-2 row-span-2 overflow-hidden rounded-[1.75rem]">
          <Image
            src={asset("/images/can-in-hand.jpg")}
            alt="Een INRYOU Cranberry blik tegen een heldere lucht"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-cream">
            <p className="font-display text-2xl">Gemaakt voor elke dag</p>
            <p className="mt-1 text-sm text-cream/80">
              Van ochtendrituelen tot de reset in de namiddag.
            </p>
          </div>
        </Reveal>

        <Reveal
          as="div"
          className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-orange-soft p-6"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-deep">
            Rustige energie
          </span>
          <p className="font-display text-2xl leading-tight text-charcoal">
            Een schone lift, zonder de crash.
          </p>
        </Reveal>

        <Reveal
          as="div"
          className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-sage-soft p-6"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
            Welzijn
          </span>
          <p className="font-display text-2xl leading-tight text-charcoal">
            Mineralen die stil op de achtergrond werken.
          </p>
        </Reveal>

        <Reveal
          as="div"
          className="relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-wine p-6 text-cream"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
            De filosofie
          </span>
          <div className="flex items-end justify-between gap-4">
            <p className="font-display text-2xl leading-tight">
              Welzijn zou de makkelijke keuze moeten zijn.
            </p>
            <ButtonLink href="/our-story" variant="primary" size="sm" className="shrink-0">
              Ons verhaal
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
