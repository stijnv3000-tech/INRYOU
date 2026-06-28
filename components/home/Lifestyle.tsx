import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/icons";

export function Lifestyle() {
  return (
    <section className="container-px mx-auto max-w-7xl py-20 lg:py-28">
      <div className="max-w-2xl">
        <Reveal>
          <p className="eyebrow">A way of living</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
            Balance, wherever life{" "}
            <span className="italic text-cranberry">takes you.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-5 text-pretty text-lg text-ink">
            INRYOU isn't a detox or a deprivation. It's a small, daily upgrade —
            the calm choice that fits into a full, modern life rather than
            asking you to step out of it.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 sm:auto-rows-[230px] lg:grid-cols-4">
        {/* Feature photo */}
        <Reveal as="div" className="relative col-span-2 row-span-2 overflow-hidden rounded-[1.75rem]">
          <Image
            src="/images/can-in-hand.jpg"
            alt="Holding an INRYOU Cranberry can against a clear sky"
            fill
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/45 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-cream">
            <p className="font-display text-2xl">Made for the everyday</p>
            <p className="mt-1 text-sm text-cream/80">
              From morning rituals to the afternoon reset.
            </p>
          </div>
        </Reveal>

        <Reveal
          as="div"
          className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-orange-soft p-6"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-orange-deep">
            Calm energy
          </span>
          <p className="font-display text-2xl leading-tight text-charcoal">
            A clean lift, without the crash.
          </p>
        </Reveal>

        <Reveal
          as="div"
          className="relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-sage-soft p-6"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sage-deep">
            Wellbeing
          </span>
          <p className="font-display text-2xl leading-tight text-charcoal">
            Minerals that work quietly in the background.
          </p>
        </Reveal>

        <Reveal
          as="div"
          className="relative col-span-2 flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-charcoal p-6 text-cream"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-orange">
            The philosophy
          </span>
          <div className="flex items-end justify-between gap-4">
            <p className="font-display text-2xl leading-tight">
              Wellbeing should be the easy choice.
            </p>
            <ButtonLink href="/our-story" variant="primary" size="sm" className="shrink-0">
              Our story
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
