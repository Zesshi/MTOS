import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/blog", label: "Archive" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/feed.xml", label: "RSS" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/90 shadow-[0_18px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href="/" className="group flex min-w-0 flex-col">
          <span className="font-mono text-lg font-semibold uppercase tracking-[0.3em] text-accent transition-colors group-hover:text-copy sm:text-xl">
            {siteConfig.brandMark}
          </span>
          <span className="mt-0.5 text-xs uppercase tracking-[0.22em] text-muted transition-colors group-hover:text-accent sm:text-[0.78rem]">
            {siteConfig.brandTitle}
          </span>
        </Link>
        <nav aria-label="Primary" className="flex items-center gap-5 text-sm text-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-copy">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
