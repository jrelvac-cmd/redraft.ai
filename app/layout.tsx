import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Redraft.AI - Générateur de Landing Pages SaaS",
    template: "%s | Redraft.AI",
  },
  description:
    "Créez des landing pages haute performance pour votre SaaS en quelques minutes avec l'IA. Code Next.js/Tailwind exportable, copywriting optimisé par Claude 3.5 Sonnet.",
  keywords: [
    "landing page",
    "générateur",
    "SaaS",
    "IA",
    "Next.js",
    "Tailwind",
    "copywriting",
    "conversion",
  ],
  authors: [{ name: "Redraft.AI" }],
  creator: "Redraft.AI",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Redraft.AI - Générateur de Landing Pages SaaS",
    description:
      "Créez des landing pages haute performance pour votre SaaS en quelques minutes avec l'IA",
    siteName: "Redraft.AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Redraft.AI - Générateur de Landing Pages SaaS",
    description:
      "Créez des landing pages haute performance pour votre SaaS en quelques minutes avec l'IA",
    creator: "@redraft_ai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
