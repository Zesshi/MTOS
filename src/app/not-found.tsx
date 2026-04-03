import Link from "next/link";
import { Container } from "@/components/container";

export default function NotFound() {
  return (
    <Container className="py-24">
      <div className="rounded-[2rem] border border-dashed border-white/15 bg-panel/45 p-10 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">404</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-copy">Page not found</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          That route does not exist in the current archive. The main blog index is the best place
          to jump back in.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/blog"
            className="rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/15 hover:text-copy"
          >
            Open blog
          </Link>
          <Link
            href="/"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-muted transition-colors hover:border-accent/30 hover:text-copy"
          >
            Back home
          </Link>
        </div>
      </div>
    </Container>
  );
}
