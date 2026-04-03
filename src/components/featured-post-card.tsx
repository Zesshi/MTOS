import Image from "next/image";
import Link from "next/link";
import { CategoryBadge } from "@/components/category-badge";
import { TagList } from "@/components/tag-list";
import { formatPostDate, type PostSummary } from "@/lib/post-types";

type FeaturedPostCardProps = {
  post: PostSummary;
};

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-panel shadow-[0_30px_100px_rgba(0,0,0,0.24)]">
      {post.coverImage ? (
        <div className="relative h-64 border-b border-white/10 bg-ink-900 sm:h-80">
          <Image
            src={post.coverImage}
            alt={post.coverAlt ?? post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />
        </div>
      ) : null}
      <div className="p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
            Featured writing
          </p>
          <CategoryBadge category={post.category} href={`/blog?category=${post.category}`} />
        </div>
        <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-copy sm:text-5xl">
          <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-accent">
            {post.title}
          </Link>
        </h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">{post.description}</p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
            {formatPostDate(post.publishedAt)} / {post.readingMinutes} min
          </p>
          <TagList tags={post.tags.slice(0, 3)} />
        </div>
        <div className="mt-8">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/15 hover:text-copy"
          >
            Read the article
          </Link>
        </div>
      </div>
    </article>
  );
}
