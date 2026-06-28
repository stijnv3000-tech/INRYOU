import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger } from "@/components/ui/Reveal";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { ArrowRight } from "@/components/ui/icons";
import { posts } from "@/lib/blog";
import { themeBg, themeText } from "@/lib/themeStyles";

export const metadata: Metadata = {
  title: "The Journal",
  description:
    "Ideas on wellbeing, healthy alternatives to soda, functional ingredients and the art of everyday balance — from the team behind INRYOU.",
};

export default function JournalPage() {
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="container-px mx-auto max-w-7xl py-16 text-center lg:py-20">
        <Reveal>
          <p className="eyebrow">The Journal</p>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="mx-auto mt-4 max-w-3xl text-balance text-5xl leading-[1.02] sm:text-6xl">
            Notes on balance, wellbeing &{" "}
            <span className="italic text-orange-deep">better choices.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-lg text-ink">
            Honest, useful reading on healthier alternatives to soda, functional
            ingredients, and living a little more in balance.
          </p>
        </Reveal>
      </section>

      {/* Featured */}
      <section className="container-px mx-auto max-w-7xl pb-12">
        <Reveal as="div">
          <Link
            href={`/journal/${featured.slug}`}
            className="group grid overflow-hidden rounded-[2rem] ring-1 ring-charcoal/5 transition-shadow duration-500 hover:shadow-[0_30px_60px_-32px_rgba(32,29,26,0.3)] lg:grid-cols-2"
          >
            <div
              className={`relative flex min-h-[260px] flex-col justify-between p-8 lg:p-12 ${themeBg[featured.theme]}`}
            >
              <span
                className={`text-xs font-semibold uppercase tracking-[0.16em] ${themeText[featured.theme]}`}
              >
                Featured · {featured.category}
              </span>
              <div>
                <span className="font-display text-7xl text-charcoal/10">
                  01
                </span>
              </div>
            </div>
            <div className="flex flex-col justify-center bg-white/60 p-8 lg:p-12">
              <p className="text-xs uppercase tracking-[0.14em] text-muted">
                {featured.displayDate} · {featured.readingTime}
              </p>
              <h2 className="mt-3 text-balance text-3xl leading-tight sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-pretty text-ink">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium text-orange-deep">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="container-px mx-auto max-w-7xl pb-20">
        <Stagger className="grid gap-6 md:grid-cols-3">
          {rest.map((post) => (
            <Reveal key={post.slug} as="div">
              <Link
                href={`/journal/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white/60 ring-1 ring-charcoal/5 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(32,29,26,0.3)]"
              >
                <div
                  className={`flex h-40 items-end p-6 ${themeBg[post.theme]}`}
                >
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.16em] ${themeText[post.theme]}`}
                  >
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">
                    {post.displayDate} · {post.readingTime}
                  </p>
                  <h3 className="mt-2 text-balance text-xl leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-pretty text-sm text-ink">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-charcoal">
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </Stagger>
      </section>

      {/* Newsletter */}
      <section className="container-px mx-auto max-w-7xl pb-20 lg:pb-28">
        <div className="rounded-[2rem] bg-charcoal px-8 py-14 text-center text-cream lg:px-16">
          <h2 className="mx-auto max-w-xl text-balance text-3xl text-cream sm:text-4xl">
            Balance, delivered to your inbox.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-cream/70">
            New articles, occasional offers, and 15% off your first order.
          </p>
          <div className="mx-auto mt-7 max-w-md">
            <NewsletterForm variant="dark" />
          </div>
        </div>
      </section>
    </>
  );
}
