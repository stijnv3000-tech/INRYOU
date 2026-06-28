import type { Metadata } from "next";
import { ProsePage } from "@/components/ui/ProsePage";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How INRYOU collects, uses and protects your personal data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <ProsePage
      eyebrow="Legal"
      title="Privacy policy"
      intro="Your trust matters to us. This policy explains, in plain language, what data we collect and how we use it. This is a template and should be reviewed by legal counsel before launch."
      sections={[
        {
          heading: "What we collect",
          paragraphs: [
            "When you place an order or sign up to our list, we collect the information you provide — such as your name, email address, delivery address and order details — along with basic, anonymised analytics about how our site is used.",
          ],
        },
        {
          heading: "How we use it",
          list: [
            "To process and deliver your orders",
            "To manage subscriptions and customer care",
            "To send updates and offers, if you've opted in",
            "To improve our website and products",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "You can access, correct or delete your personal data, and unsubscribe from marketing at any time. To exercise any of these rights, contact hello@inryou.com.",
          ],
        },
        {
          heading: "Cookies",
          paragraphs: [
            "We use essential cookies to run the store and optional analytics cookies to understand usage. You can control non-essential cookies through your browser settings.",
          ],
        },
      ]}
      footnote="Last updated: this is placeholder content for demonstration purposes."
    />
  );
}
