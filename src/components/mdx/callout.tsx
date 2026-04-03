type CalloutProps = {
  title?: string;
  children: React.ReactNode;
};

export function Callout({ title, children }: CalloutProps) {
  return (
    <aside className="my-8 rounded-[1.5rem] border border-accent/25 bg-accent/8 p-5">
      {title ? (
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">{title}</p>
      ) : null}
      <div className="mt-3 text-sm leading-7 text-copy/85">{children}</div>
    </aside>
  );
}
