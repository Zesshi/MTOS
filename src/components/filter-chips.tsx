import Link from "next/link";
import { cn } from "@/lib/utils";

type FilterChipsProps = {
  categories: string[];
  tags: string[];
  currentCategory?: string;
  currentTag?: string;
};

function buildBlogHref(category?: string, tag?: string) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (tag) {
    params.set("tag", tag);
  }

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}

function FilterChip({
  href,
  label,
  active = false,
}: {
  href: string;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
        active
          ? "border-accent/40 bg-accent/10 text-accent"
          : "border-white/10 text-muted hover:border-accent/30 hover:text-copy",
      )}
    >
      {label}
    </Link>
  );
}

export function FilterChips({
  categories,
  tags,
  currentCategory,
  currentTag,
}: FilterChipsProps) {
  return (
    <div className="space-y-6 rounded-[1.75rem] border border-white/10 bg-panel/65 p-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">Categories</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip href={buildBlogHref(undefined, currentTag)} label="All" active={!currentCategory} />
          {categories.map((category) => (
            <FilterChip
              key={category}
              href={buildBlogHref(category, currentTag)}
              label={category}
              active={currentCategory === category}
            />
          ))}
        </div>
      </div>
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">Tags</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip href={buildBlogHref(currentCategory, undefined)} label="All" active={!currentTag} />
          {tags.map((tag) => (
            <FilterChip
              key={tag}
              href={buildBlogHref(currentCategory, tag)}
              label={`#${tag}`}
              active={currentTag === tag}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
