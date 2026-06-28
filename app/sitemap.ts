import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { posts } from "@/lib/blog";

const base = "https://inryou.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/our-story",
    "/science",
    "/journal",
    "/faq",
    "/contact",
    "/sustainability",
    "/shipping",
  ].map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const postRoutes = posts.map((p) => ({
    url: `${base}/journal/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...postRoutes];
}
