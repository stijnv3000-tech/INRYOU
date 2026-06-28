import type { Metadata } from "next";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description:
    "INRYOU shipping and returns: free delivery over €35, carbon-neutral shipping, and a 30-day happiness guarantee.",
};

export default function ShippingPage() {
  return (
    <ProsePage
      eyebrow="Help"
      title="Shipping & returns"
      intro="Getting your balance to you should be as effortless as drinking it. Here's how delivery and returns work."
      sections={[
        {
          heading: "Delivery",
          list: [
            "Flat-rate delivery of €3.95 across mainland Europe",
            "Free delivery on all orders over €35",
            "Free delivery on every subscription order",
            "Most orders arrive within 2–4 working days",
            "All shipments are carbon-neutral",
          ],
        },
        {
          heading: "Tracking your order",
          paragraphs: [
            "As soon as your cans leave us, you'll receive an email with tracking so you can follow your order to the door.",
          ],
        },
        {
          heading: "30-day happiness guarantee",
          paragraphs: [
            "If you're not delighted with your INRYOU, let us know within 30 days and we'll make it right — a replacement or a full refund, whichever you prefer. No need to return the cans.",
          ],
        },
        {
          heading: "Need a hand?",
          paragraphs: [
            "Email hello@inryou.com and a real human will reply within one working day.",
          ],
        },
      ]}
    />
  );
}
