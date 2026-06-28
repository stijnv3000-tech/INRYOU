import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema } from "@/lib/seo";
import { ArrowRight } from "@/components/ui/icons";
import { getPost, posts, type Block } from "@/lib/blog";
import { themeBg, themeText } from "@/lib/themeStyles";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="mt-12 text-3xl leading-tight">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-10 border-l-2 border-orange pl-6 font-display text-2xl italic leading-relaxed text-charcoal"
        >
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} className="my-6 space-y-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-ink">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
              <span className="text-lg leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return (
        <p key={i} className="mt-5 text-lg leading-relaxed text-ink">
          {block.text}
        </p>
      );
  }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema(post)} />

      <article>
        {/* Header */}
        <header className={`${themeBg[post.theme]}`}>
          <div className="container-px mx-auto max-w-3xl py-16 lg:py-20">
            <nav className="text-sm text-charcoal/50">
              <Link href="/journal" className="hover:text-charcoal">
                Journal
              </Link>
              <span className="mx-2">/</span>
              <span className="text-charcoal/80">{post.category}</span>
            </nav>
            <Reveal>
              <span
                className={`mt-6 inline-block text-xs font-semibold uppercase tracking-[0.16em] ${themeText[post.theme]}`}
              >
                {post.category}
              </span>
            </Reveal>
            <Reveal delay={1}>
              <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
                {post.title}
              </h1>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-6 flex items-center gap-3 text-sm text-charcoal/70">
                <span className="font-medium text-charcoal">{post.author}</span>
                <span>·</span>
                <span>{post.authorRole}</span>
              </div>
              <p className="mt-1 text-sm text-charcoal/50">
                {post.displayDate} · {post.readingTime}
              </p>
            </Reveal>
          </div>
        </header>

        {/* Body */}
        <div className="container-px mx-auto max-w-3xl py-14 lg:py-20">
          <p className="text-xl leading-relaxed text-charcoal-soft">
            {post.excerpt}
          </p>
          <div className="mt-2">{post.body.map(renderBlock)}</div>

          <div className="mt-14 rounded-3xl bg-cream-deep p-8 text-center">
            <h2 className="text-2xl">Ready to taste the balance?</h2>
            <p className="mx-auto mt-2 max-w-md text-pretty text-ink">
              Real fruit, functional minerals, almost no sugar. Find your
              flavour.
            </p>
            <div className="mt-6 flex justify-center">
              <ButtonLink href="/shop">
                Shop the range
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </div>
      </article>

      {/* More */}
      <section className="border-t border-charcoal/10">
        <div className="container-px mx-auto max-w-7xl py-16 lg:py-20">
          <h2 className="text-3xl sm:text-4xl">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {more.map((p) => (
              <Link
                key={p.slug}
                href={`/journal/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white/60 ring-1 ring-charcoal/5 transition-shadow duration-500 hover:shadow-[0_24px_50px_-30px_rgba(32,29,26,0.3)] sm:flex-row"
              >
                <div className={`flex items-end p-6 sm:w-2/5 ${themeBg[p.theme]}`}>
                  <span
                    className={`text-xs font-semibold uppercase tracking-[0.16em] ${themeText[p.theme]}`}
                  >
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-balance text-xl leading-snug">{p.title}</h3>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-medium text-charcoal">
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-md text-center">
            <h3 className="text-2xl">Join the list</h3>
            <p className="mt-2 text-sm text-ink">
              15% off your first order, and the occasional good idea.
            </p>
            <div className="mt-5">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
