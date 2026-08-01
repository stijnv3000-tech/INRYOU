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
            Functionele bruisende dranken
          </motion.div>

          <motion.h1
            custom={1}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-6 text-balance text-5xl leading-[0.98] sm:text-6xl lg:text-[4.6rem]"
          >
            Natuurlijke balans,
            <br />
            <span className="italic text-orange-deep">moeiteloos.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink"
          >
            Een premium bruisende drank met echte vruchten, functionele
            mineralen en amper suiker. Alles wat je lekker vindt aan frisdrank —
            rustig, verfijnd, beter.
          </motion.p>

          <motion.div
            custom={3}
            variants={fade}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <ButtonLink href="/shop" size="lg">
              Ontdek het assortiment
              <ArrowRight className="h-5 w-5" />
            </ButtonLink>
            <ButtonLink href="/our-story" variant="outline" size="lg">
              Ons verhaal
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
                <span className="font-semibold text-charcoal">4,9/5</span> uit
                1.300+ beoordelingen
              </span>
            </div>
            <div className="h-8 w-px bg-charcoal/10" />
            <div className="text-sm text-ink">
              <span className="font-semibold text-charcoal">&lt; 2g</span> suiker
              · <span className="font-semibold text-charcoal">15 kcal</span>
            </div>
          </motion.div>
        </div>

        {/* Cans */}
        <div className="relative z-10 flex h-[440px] items-center justify-center sm:h-[540px] lg:h-[620px]">
          {/* Rising sun arc behind the cans */}
          <div
            aria-hidden
            className="absolute bottom-[16%] left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full sm:h-[380px] sm:w-[380px] lg:h-[440px] lg:w-[440px]"
            style={{
              background:
                "radial-gradient(circle at 50% 60%, #eec27f 0%, #e07c3a 42%, #b23a4b 74%, rgba(178,58,75,0) 78%)",
              maskImage: "linear-gradient(to bottom, black 62%, transparent 62%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 62%, transparent 62%)",
              filter: "blur(2px)",
              opacity: 0.9,
            }}
          />
          {/* Soft ambient glow */}
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(224,124,58,0.35), rgba(178,58,75,0.12) 55%, transparent 72%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-end justify-center"
          >
            {/* Ginger can (back) */}
            <div className="animate-float-slower relative z-0 -mr-10 mb-6">
              <Image
                src={asset("/images/can-ginger-citrus.png")}
                alt="INRYOU Ginger & Citrus bruisende drank"
                width={260}
                height={560}
                priority
                className="h-[330px] w-auto rotate-[-6deg] object-contain drop-shadow-[0_34px_40px_rgba(60,23,27,0.35)] sm:h-[400px] lg:h-[470px]"
              />
              <span
                aria-hidden
                className="absolute inset-x-6 bottom-[-30px] h-9 rounded-[100%] bg-charcoal/25 blur-xl"
              />
            </div>

            {/* Cranberry can (front) with reflection */}
            <div className="animate-float-slow relative z-10">
              <Image
                src={asset("/images/can-cranberry.png")}
                alt="INRYOU Cranberry bruisende drank"
                width={300}
                height={640}
                priority
                className="h-[380px] w-auto object-contain drop-shadow-[0_44px_50px_rgba(60,23,27,0.42)] sm:h-[460px] lg:h-[540px]"
              />
              {/* Reflection */}
              <Image
                src={asset("/images/can-cranberry.png")}
                alt=""
                aria-hidden
                width={300}
                height={640}
                className="absolute left-0 top-full h-[380px] w-auto -scale-y-100 object-contain opacity-25 sm:h-[460px] lg:h-[540px]"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 42%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 42%)",
                }}
              />
              <span
                aria-hidden
                className="absolute inset-x-4 bottom-[-26px] h-10 rounded-[100%] bg-charcoal/30 blur-xl"
              />
            </div>
          </motion.div>

          {/* Floating spec chip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-3 right-0 z-20 hidden rounded-2xl bg-white px-5 py-4 shadow-[0_20px_40px_-20px_rgba(60,23,27,0.55)] ring-1 ring-charcoal/10 md:block lg:-right-2"
          >
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              Elk blik
            </p>
            <p className="mt-1 font-display text-lg leading-tight">
              Magnesium · Kalium
            </p>
            <p className="text-sm text-ink">Functionele mineralen, echte vruchten</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
