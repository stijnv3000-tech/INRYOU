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
    default: "INRYOU — Natuurlijke balans, moeiteloos",
    template: "%s · INRYOU",
  },
  description:
    "INRYOU is een premium functionele bruisende drank — echte vruchten, functionele mineralen en amper suiker. Een rustiger, gezonder alternatief voor frisdrank. Natuurlijke balans, moeiteloos.",
  keywords: [
    "functionele drank",
    "gezond alternatief voor frisdrank",
    "bruisend water met mineralen",
    "drank weinig suiker",
    "magnesiumdrank",
    "INRYOU",
  ],
  openGraph: {
    title: "INRYOU — Natuurlijke balans, moeiteloos",
    description:
      "Een premium functionele bruisende drank. Echte vruchten, functionele mineralen, amper suiker.",
    url: siteUrl,
    siteName: "INRYOU",
    type: "website",
    locale: "nl_BE",
  },
  twitter: {
    card: "summary_large_image",
    title: "INRYOU — Natuurlijke balans, moeiteloos",
    description:
      "Een premium functionele bruisende drank. Echte vruchten, functionele mineralen, amper suiker.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${fraunces.variable} ${inter.variable}`}>
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
