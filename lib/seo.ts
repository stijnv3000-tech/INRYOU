import { products } from "./products";

const siteUrl = "https://inryou.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "INRYOU",
  url: siteUrl,
  slogan: "Natuurlijke balans, moeiteloos.",
  description:
    "INRYOU is een premium merk van functionele bruisende dranken — echte vruchten, functionele mineralen en amper suiker.",
  brand: "INRYOU",
};

export const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: `INRYOU ${p.name}`,
      url: `${siteUrl}/products/${p.slug}`,
      description: p.shortDescription,
      offers: {
        "@type": "Offer",
        price: p.price,
        priceCurrency: "EUR",
        availability: p.available
          ? "https://schema.org/InStock"
          : "https://schema.org/PreOrder",
      },
    },
  })),
};

export function productSchema(slug: string) {
  const p = products.find((x) => x.slug === slug);
  if (!p) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `INRYOU ${p.name}`,
    image: `${siteUrl}${p.image}`,
    description: p.description,
    brand: { "@type": "Brand", name: "INRYOU" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating,
      reviewCount: p.reviewCount,
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/products/${p.slug}`,
      price: p.price,
      priceCurrency: "EUR",
      availability: p.available
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
    },
  };
}

export function articleSchema(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "INRYOU" },
    url: `${siteUrl}/journal/${post.slug}`,
  };
}
