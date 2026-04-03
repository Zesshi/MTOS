"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { giscusConfig, hasGiscusConfig } from "@/lib/giscus";

export function GiscusComments() {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasGiscusConfig()) {
      return;
    }

    const container = containerRef.current;

    if (!container) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", giscusConfig.repo);
    script.setAttribute("data-repo-id", giscusConfig.repoId);
    script.setAttribute("data-category", giscusConfig.category);
    script.setAttribute("data-category-id", giscusConfig.categoryId);
    script.setAttribute("data-mapping", giscusConfig.mapping);
    script.setAttribute("data-strict", giscusConfig.strict);
    script.setAttribute("data-reactions-enabled", giscusConfig.reactionsEnabled);
    script.setAttribute("data-emit-metadata", giscusConfig.emitMetadata);
    script.setAttribute("data-input-position", giscusConfig.inputPosition);
    script.setAttribute("data-theme", giscusConfig.theme);
    script.setAttribute("data-lang", giscusConfig.lang);

    container.appendChild(script);
  }, [pathname]);

  if (!hasGiscusConfig()) {
    return null;
  }

  return (
    <section className="mt-14 rounded-[1.75rem] border border-white/10 bg-panel/65 p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
        Discussion
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-copy">
        Comments
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
        Responses are powered by GitHub Discussions through giscus.
      </p>
      <div ref={containerRef} className="mt-6 giscus-shell" />
    </section>
  );
}
