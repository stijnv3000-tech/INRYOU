"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { ArrowRight } from "@/components/ui/icons";
import { asset } from "@/lib/asset";

const fade = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Warm rising-sun backdrop, echoing the logo */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream to-cream-deep" />
        <div
          className="absolute left-1/2 top-[42%] h-[680px] w-[680px] -translate-x-1/2 rounded-full opacity-70 blur-[20px]"
          style={{
            background:
              "radial-gradient(circle at center, rgba(224,124,58,0.30) 0%, rgba(178,58,75,0.14) 38%, rgba(251,247,239,0) 68%)",
          }}
        />
        <div className="absolute inset-0 grain opacity-60" />
      </div>

      <div className="container-px mx-auto grid max-w-7xl items-center gap-12 pb-16 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <motion.div
            custom={0}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-ink ring-1 ring-charcoal/10 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-sage-deep" />
            Functional sparkling beverages
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-6 text-balance text-5xl leading-[0.98] sm:text-6xl lg:text-[4.6rem]"
          >
            Natural balance,
            <br />
            made{" "}
            <span className="italic text-orange-deep">effortless.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink"
          >
            A premium sparkling drink with real fruit, functional minerals and
            almost no sugar. Everything you love about soda — quietly, beautifully
            better.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/shop" size="lg">
              Shop the range
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/our-story" variant="outline" size="lg">
              Our story
            </ButtonLink>
          </motion.div>

          <motion.div
            custom={4}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          >
            <div className="flex items-center gap-3">
              <Stars rating={5} />
              <span className="text-sm text-ink">
                <span className="font-semibold text-charcoal">4.9/5</span> from
                1,300+ reviews
              </span>
            </div>
            <div className="h-8 w-px bg-charcoal/10" />
            <div className="text-sm text-ink">
              <span className="font-semibold text-charcoal">Under 2g</span> sugar
              · <span className="font-semibold text-charcoal">15 kcal</span>
            </div>
          </motion.div>
        </div>

        {/* Cans */}
        <div className="relative z-10 flex h-[420px] items-center justify-center sm:h-[520px] lg:h-[600px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-end justify-center"
          >
            <div className="animate-float-slower relative z-0 -mr-10 mb-6">
              <Image
                src={asset("/images/can-ginger-citrus.png")}
                alt="INRYOU Ginger & Citrus sparkling drink"
                width={260}
                height={560}
                priority
                className="h-[330px] w-auto rotate-[-6deg] object-contain drop-shadow-[0_34px_40px_rgba(32,29,26,0.22)] sm:h-[400px] lg:h-[470px]"
              />
            </div>
            <div className="animate-float-slow relative z-10">
              <Image
                src={asset("/images/can-cranberry.png")}
                alt="INRYOU Cranberry sparkling drink"
                width={300}
                height={640}
                priority
                className="h-[380px] w-auto object-contain drop-shadow-[0_40px_46px_rgba(32,29,26,0.28)] sm:h-[460px] lg:h-[540px]"
              />
            </div>
          </motion.div>

          {/* Floating spec chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-4 right-0 hidden rounded-2xl bg-white/80 px-5 py-4 ring-1 ring-charcoal/10 backdrop-blur md:block lg:right-2"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              Every can
            </p>
            <p className="mt-1 font-display text-lg leading-tight">
              Magnesium · Potassium
            </p>
            <p className="text-sm text-ink">Functional minerals, real fruit</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
