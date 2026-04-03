type SkillsGridProps = {
  skills: string[];
};

export function SkillsGrid({ skills }: SkillsGridProps) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-panel/75 p-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Focus areas</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
