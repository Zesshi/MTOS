type WorkItem = {
  title: string;
  summary: string;
  href?: string;
};

type SelectedWorkListProps = {
  items: WorkItem[];
};

export function SelectedWorkList({ items }: SelectedWorkListProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-panel/75 p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Selected work</p>
      <div className="mt-5 grid gap-4">
        {items.map((item) => (
          <article key={item.title} className="rounded-2xl border border-white/8 bg-white/[0.02] p-5">
            <h3 className="text-lg font-semibold text-copy">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-muted">{item.summary}</p>
            {item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex text-sm font-medium text-accent transition-colors hover:text-copy"
              >
                Visit reference
              </a>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
