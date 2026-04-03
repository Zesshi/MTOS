"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useDeferredValue } from "react";
import { PostList } from "@/components/post-list";
import type { PostSummary } from "@/lib/post-types";
import { cn } from "@/lib/utils";

type ArchiveBrowserProps = {
  posts: PostSummary[];
  categories: string[];
  tags: string[];
};

function FilterListButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full rounded-2xl border px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] transition-colors",
        active
          ? "border-accent/35 bg-accent/[0.08] text-copy"
          : "border-white/8 bg-white/[0.02] text-muted hover:border-accent/25 hover:bg-white/[0.04] hover:text-copy",
      )}
    >
      {label}
    </button>
  );
}

function ArchiveFilters({
  query,
  category,
  tag,
  categories,
  tags,
  onQueryChange,
  onCategoryChange,
  onTagChange,
  onClear,
}: {
  query: string;
  category: string;
  tag: string;
  categories: string[];
  tags: string[];
  onQueryChange: (nextValue: string) => void;
  onCategoryChange: (nextValue: string) => void;
  onTagChange: (nextValue: string) => void;
  onClear: () => void;
}) {
  const hasActiveFilters = Boolean(category || tag || query.trim());

  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-panel/65 p-6">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Filters
        </p>
        {hasActiveFilters ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-medium text-accent transition-colors hover:text-copy"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div className="mt-6">
        <label
          htmlFor="archive-search"
          className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent"
        >
          Search
        </label>
        <input
          id="archive-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search posts"
          className="mt-3 w-full rounded-2xl border border-white/10 bg-ink-900/85 px-4 py-3 text-sm text-copy outline-none transition-colors placeholder:text-muted focus:border-accent/40"
        />
      </div>

      <div className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
          Categories
        </p>
        <div className="mt-3 space-y-2">
          <FilterListButton
            active={!category}
            label="All categories"
            onClick={() => onCategoryChange("")}
          />
          {categories.map((item) => (
            <FilterListButton
              key={item}
              active={category === item}
              label={item}
              onClick={() => onCategoryChange(item)}
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent">Tags</p>
        <div className="mt-3 max-h-[22rem] space-y-2 overflow-y-auto pr-1">
          <FilterListButton active={!tag} label="All tags" onClick={() => onTagChange("")} />
          {tags.map((item) => (
            <FilterListButton
              key={item}
              active={tag === item}
              label={`#${item}`}
              onClick={() => onTagChange(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ArchiveBrowser({
  posts,
  categories,
  tags,
}: ArchiveBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? "";
  const tag = searchParams.get("tag") ?? "";
  const query = searchParams.get("q") ?? "";
  const deferredQuery = useDeferredValue(query.trim().toLowerCase());
  const currentQueryString = searchParams.toString();

  const replaceFilters = (nextValues: {
    category?: string;
    tag?: string;
    query?: string;
  }) => {
    const params = new URLSearchParams();
    const nextCategory = nextValues.category ?? category;
    const nextTag = nextValues.tag ?? tag;
    const nextQuery = nextValues.query ?? query;

    if (nextCategory) {
      params.set("category", nextCategory);
    }

    if (nextTag) {
      params.set("tag", nextTag);
    }

    if (nextQuery.trim()) {
      params.set("q", nextQuery.trim());
    }

    const nextQueryString = params.toString();

    if (nextQueryString === currentQueryString) {
      return;
    }

    startTransition(() => {
      router.replace(nextQueryString ? `${pathname}?${nextQueryString}` : pathname, {
        scroll: false,
      });
    });
  };

  const filteredPosts = posts.filter((post) => {
    if (category && post.category !== category) {
      return false;
    }

    if (tag && !post.tags.includes(tag)) {
      return false;
    }

    if (!deferredQuery) {
      return true;
    }

    const haystack = [post.title, post.description, post.category, post.tags.join(" ")]
      .join(" ")
      .toLowerCase();

    return haystack.includes(deferredQuery);
  });

  const clearFilters = () => {
    replaceFilters({ category: "", tag: "", query: "" });
  };

  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
      <aside className="lg:self-start">
        <div className="lg:sticky lg:top-28">
          <ArchiveFilters
            query={query}
            category={category}
            tag={tag}
            categories={categories}
            tags={tags}
            onQueryChange={(nextValue) => replaceFilters({ query: nextValue })}
            onCategoryChange={(nextValue) => replaceFilters({ category: nextValue })}
            onTagChange={(nextValue) => replaceFilters({ tag: nextValue })}
            onClear={clearFilters}
          />
        </div>
      </aside>

      <section className="min-w-0">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
            Showing {filteredPosts.length} of {posts.length} posts
          </p>
          {(category || tag || query.trim()) && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-medium text-accent transition-colors hover:text-copy"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredPosts.length ? (
          <PostList posts={filteredPosts} />
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-white/15 bg-panel/40 p-10 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
              No matches
            </p>
            <p className="mt-4 text-sm leading-7 text-muted">
              No posts matched the current search and filter combination. Try broadening the query
              or clearing one of the active filters.
            </p>
            <Link
              href="/blog"
              className="mt-6 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:border-accent/30 hover:text-copy"
            >
              Reset the archive
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
