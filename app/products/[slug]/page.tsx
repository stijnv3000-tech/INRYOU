import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Stars } from "@/components/ui/Stars";
import { ProductCard } from "@/components/product/ProductCard";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { productSchema } from "@/lib/seo";
import { Check, Leaf, Drop, Sparkle } from "@/components/ui/icons";
import { getProduct, products } from "@/lib/products";
import { asset } from "@/lib/asset";
import { reviews } from "@/lib/reviews";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.shortDescription,
    openGraph: {
      title: `INRYOU ${product.name}`,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

const faqs = [
  {
    q: "How much sugar is in a can?",
    a: "Under 2g per can — a fraction of the 35–40g in a typical soft drink. The sweetness comes from real fruit and a touch of stevia leaf, never refined sugar or artificial sweeteners.",
  },
  {
    q: "What are the functional minerals for?",
    a: "Every can carries a measured dose of magnesium and potassium — electrolytes that support normal muscle and nerve function and everyday hydration. We use citrate forms for better absorption.",
  },
  {
    q: "Is it suitable for daily drinking?",
    a: "Absolutely — that's exactly what it's made for. It's a clean, low-sugar, low-calorie drink designed to replace soda in your daily routine without any compromise on taste.",
  },
  {
    q: "How does the subscription work?",
    a: "Choose Subscribe & Save to get 15% off and free delivery on every order, sent every four weeks. You're always in control — pause, skip a delivery, change your flavour or cancel anytime, no questions asked.",
  },
];

const benefitIcons = [Leaf, Drop, Sparkle];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug);
  const productReviews = reviews
    .filter((r) => r.flavor === product.name)
    .concat(reviews.filter((r) => r.flavor !== product.name))
    .slice(0, 3);

  return (
    <>
      <JsonLd data={productSchema(product.slug)} />

      {/* Breadcrumb */}
      <div className="container-px mx-auto max-w-7xl pt-6">
        <nav className="text-sm text-muted">
          <Link href="/" className="hover:text-charcoal">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-charcoal">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-charcoal">{product.name}</span>
        </nav>
      </div>

      {/* Hero / buy box */}
      <section className="container-px mx-auto max-w-7xl py-8 lg:py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div
              className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[2rem]"
              style={{ backgroundColor: product.accentSoft }}
            >
              <div
                className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
                style={{ background: product.accent, opacity: 0.18 }}
              />
              <Image
                src={asset(product.image)}
                alt={`INRYOU ${product.name} can`}
                width={420}
                height={760}
                priority
                className="animate-float-slow relative h-[82%] w-auto object-contain drop-shadow-[0_36px_44px_rgba(32,29,26,0.26)]"
              />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Sugar", value: product.sugar },
                { label: "Calories", value: `${product.calories} kcal` },
                { label: "Per pack", value: `${product.packSize} cans` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-cream-deep px-4 py-3 text-center"
                >
                  <p className="font-display text-xl">{stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.12em] text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <PurchasePanel product={product} />
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-cream-deep">
        <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
          <Reveal>
            <p className="eyebrow">Why you'll love it</p>
            <h2 className="mt-3 max-w-xl text-balance text-3xl sm:text-4xl">
              {product.tagline}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {product.benefits.map((b, i) => {
              const Icon = benefitIcons[i % benefitIcons.length];
              return (
                <Reveal key={b.title} delay={i} as="div">
                  <div className="flex h-full flex-col rounded-3xl bg-cream p-7 ring-1 ring-charcoal/5">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-soft text-orange-deep">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 text-xl">{b.title}</h3>
                    <p className="mt-2 text-pretty text-ink">{b.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ingredients + minerals */}
      <section className="container-px mx-auto max-w-7xl py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <p className="eyebrow">Full transparency</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">What's inside</h2>
              <p className="mt-4 max-w-md text-pretty text-ink">
                A short, honest ingredient list. If you can't pronounce it, it's
                probably not in here.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <ul className="mt-7 space-y-3">
                {product.ingredients.map((ing) => (
                  <li
                    key={ing}
                    className="flex items-center gap-3 border-b border-charcoal/10 pb-3 text-charcoal-soft"
                  >
                    <Check className="h-4 w-4 shrink-0 text-sage-deep" />
                    {ing}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <p className="eyebrow">Functional profile</p>
              <h2 className="mt-3 text-3xl sm:text-4xl">Per 250ml can</h2>
            </Reveal>
            <Reveal delay={1}>
              <div className="mt-7 space-y-4">
                {product.functionalMinerals.map((m) => (
                  <div
                    key={m.name}
                    className="rounded-2xl bg-cream-deep px-6 py-5"
                  >
                    <p className="font-display text-xl">{m.name}</p>
                    <p className="text-sm text-ink">{m.detail}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-2xl bg-sage-soft/60 px-6 py-4 text-sm text-charcoal-soft">
                <span className="font-medium">Pairs well with:</span>{" "}
                {product.pairings}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-cream-deep">
        <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Loved by drinkers</p>
                <h2 className="mt-3 text-3xl sm:text-4xl">
                  What people are saying
                </h2>
              </div>
              <div className="flex items-center gap-3">
                <Stars rating={product.rating} />
                <span className="text-sm text-ink">
                  {product.rating} from {product.reviewCount} reviews
                </span>
              </div>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {productReviews.map((r, i) => (
              <Reveal key={r.name + r.title} delay={i} as="div">
                <div className="flex h-full flex-col rounded-3xl bg-cream p-7 ring-1 ring-charcoal/5">
                  <Stars rating={r.rating} size={14} />
                  <h3 className="mt-3 text-lg">{r.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-ink">
                    {r.body}
                  </p>
                  <p className="mt-4 text-sm font-medium text-charcoal">
                    {r.name}{" "}
                    <span className="font-normal text-muted">· {r.location}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px mx-auto max-w-3xl py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow text-center">Good to know</p>
          <h2 className="mt-3 text-center text-3xl sm:text-4xl">
            Questions, answered
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <div className="mt-10">
            <Accordion items={faqs} />
          </div>
        </Reveal>
      </section>

      {/* Cross-sell */}
      <section className="container-px mx-auto max-w-7xl pb-20 lg:pb-28">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl">Complete your range</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
