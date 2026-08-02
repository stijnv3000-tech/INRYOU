import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { Rooted } from "@/components/home/Rooted";
import { ShopPreview } from "@/components/home/ShopPreview";
import { Comparison } from "@/components/home/Comparison";
import { Lifestyle } from "@/components/home/Lifestyle";
import { Testimonials } from "@/components/home/Testimonials";
import { WhereToBuy } from "@/components/home/WhereToBuy";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, productListSchema } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={productListSchema} />
      <Hero />
      <Marquee />
      <Rooted />
      <ShopPreview />
      <Comparison />
      <Lifestyle />
      <Testimonials />
      <WhereToBuy />
      <ClosingCTA />
    </>
  );
}
