import Link from "next/link";

type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  if (!tags.length) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`/blog?tag=${encodeURIComponent(tag)}`}
            className="inline-flex rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-muted transition-colors hover:border-accent/40 hover:text-copy"
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
