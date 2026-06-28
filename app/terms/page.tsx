import type { Metadata } from "next";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that govern your use of the INRYOU website and store.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Terms of service"
      intro="These terms govern your use of the INRYOU website and the purchase of our products. This is a template and should be reviewed by legal counsel before launch."
      sections={[
        {
          heading: "Orders",
          paragraphs: [
            "All orders are subject to acceptance and availability. Prices are shown in euros and include applicable taxes unless stated otherwise.",
          ],
        },
        {
          heading: "Subscriptions",
          paragraphs: [
            "Subscription orders renew automatically at the interval you select until paused or cancelled. You can manage, pause or cancel your subscription at any time from your account.",
          ],
        },
        {
          heading: "Returns & refunds",
          paragraphs: [
            "Our 30-day happiness guarantee applies as described on our Shipping & Returns page. Statutory consumer rights are unaffected.",
          ],
        },
        {
          heading: "Liability",
          paragraphs: [
            "INRYOU is a food product and not a medicine. Nutritional and functional statements are provided for information and are not intended to diagnose, treat or prevent any condition. Always read the label.",
          ],
        },
      ]}
      footnote="Last updated: this is placeholder content for demonstration purposes."
    />
  );
}
