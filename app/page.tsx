import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/ui/Marquee";
import { ValueProps } from "@/components/home/ValueProps";
import { Comparison } from "@/components/home/Comparison";
import { Minerals } from "@/components/home/Minerals";
import { ShopPreview } from "@/components/home/ShopPreview";
import { Lifestyle } from "@/components/home/Lifestyle";
import { Testimonials } from "@/components/home/Testimonials";
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
      <ValueProps />
      <Comparison />
      <ShopPreview />
      <Minerals />
      <Lifestyle />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}
