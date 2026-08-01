import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";

export const metadata: Metadata = {
  title: "Winkelmandje",
  description: "Bekijk je INRYOU-bestelling en reken af.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <CartPage />;
}
