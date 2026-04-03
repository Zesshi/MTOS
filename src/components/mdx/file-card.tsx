type FileCardProps = {
  href: string;
  label: string;
  description?: string;
};

export function FileCard({ href, label, description }: FileCardProps) {
  return (
    <a
      href={href}
      className="my-8 flex items-start justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-panel/80 p-5 no-underline transition-colors hover:border-accent/35"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Attachment</p>
        <p className="mt-2 text-base font-semibold text-copy">{label}</p>
        {description ? <p className="mt-2 text-sm leading-7 text-muted">{description}</p> : null}
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Open file</span>
    </a>
  );
}
