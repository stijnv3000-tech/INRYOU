import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Your cart",
  description: "Review your INRYOU order and check out.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <CartPage />;
}
