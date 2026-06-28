import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = "https://inryou.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "INRYOU — Natural balance, made effortless",
    template: "%s · INRYOU",
  },
  description:
    "INRYOU is a premium functional sparkling beverage — real fruit, functional minerals and almost no sugar. A calmer, healthier alternative to soda. Natural balance, made effortless.",
  keywords: [
    "functional beverage",
    "healthy soda alternative",
    "sparkling water with minerals",
    "low sugar drink",
    "magnesium drink",
    "INRYOU",
  ],
  openGraph: {
    title: "INRYOU — Natural balance, made effortless",
    description:
      "A premium functional sparkling beverage. Real fruit, functional minerals, almost no sugar.",
    url: siteUrl,
    siteName: "INRYOU",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "INRYOU — Natural balance, made effortless",
    description:
      "A premium functional sparkling beverage. Real fruit, functional minerals, almost no sugar.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        <CartProvider>
          <AnnouncementBar />
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
