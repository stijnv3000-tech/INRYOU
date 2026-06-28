import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/privacy", "/terms"],
    },
    sitemap: "https://inryou.com/sitemap.xml",
  };
}
