type AccordionSectionProps = {
  eyebrow: string;
  title: string;
  summary: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function AccordionSection({
  eyebrow,
  title,
  summary,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  return (
    <details
      open={defaultOpen}
      className="group rounded-[1.75rem] border border-white/10 bg-panel/75 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
    >
      <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">{eyebrow}</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-copy">{title}</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{summary}</p>
          </div>
          <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-muted transition-all duration-200 group-open:border-accent/30 group-open:text-accent">
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </summary>
      <div className="mt-6 border-t border-white/8 pt-6">{children}</div>
    </details>
  );
}
