import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-white/8 py-12">
      <Container className="grid gap-10 md:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
            {siteConfig.brandMark}
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-copy">
            {siteConfig.brandTitle}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
            I come from an application development background, moved into DevOps, and later into
            coaching and vocational training. Security was always part of that path, but I wanted
            to go deeper into analysis and cybersecurity, earned the diploma, and built this place
            to keep learning in public and share that process with others.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Navigate
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
              <Link href="/blog" className="transition-colors hover:text-copy">
                Archive
              </Link>
              <Link href="/portfolio" className="transition-colors hover:text-copy">
                Portfolio
              </Link>
              <Link href="/feed.xml" className="transition-colors hover:text-copy">
                RSS
              </Link>
            </div>
          </div>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              Elsewhere
            </p>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-copy"
              >
                GitHub
              </a>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-copy"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
