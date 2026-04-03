import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-sans-ui",
  weight: ["400", "500", "600", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-ui",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.brandMark} - ${siteConfig.brandTitle}`,
    template: `%s | ${siteConfig.brandMark}`,
  },
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-ink-950 text-copy antialiased">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-copy focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        <div className="relative isolate min-h-screen overflow-x-clip">
          <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(circle_at_top_left,rgba(110,231,200,0.12),transparent_30%),radial-gradient(circle_at_top_right,rgba(30,41,59,0.4),transparent_35%)]" />
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
