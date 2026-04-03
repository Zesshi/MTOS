type ExperienceItem = {
  title: string;
  period: string;
  summary: string;
};

type ExperienceListProps = {
  items: ExperienceItem[];
};

export function ExperienceList({ items }: ExperienceListProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-panel/75 p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Experience</p>
      <div className="mt-5 space-y-5">
        {items.map((item) => (
          <article key={`${item.title}-${item.period}`} className="border-t border-white/8 pt-5 first:border-none first:pt-0">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h3 className="text-lg font-semibold text-copy">{item.title}</h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">{item.period}</p>
            </div>
            <p className="mt-2 text-sm leading-7 text-muted">{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
