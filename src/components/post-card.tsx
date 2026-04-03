import Link from "next/link";
import { CategoryBadge } from "@/components/category-badge";
import { TagList } from "@/components/tag-list";
import { formatPostDate, type PostSummary } from "@/lib/post-types";

type PostCardProps = {
  post: PostSummary;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-[1.75rem] border border-white/10 bg-panel/75 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all hover:border-accent/35 hover:bg-panel-strong/80">
      <div className="flex flex-wrap items-center gap-3">
        <CategoryBadge category={post.category} href={`/blog?category=${post.category}`} />
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
          {formatPostDate(post.publishedAt)} / {post.readingMinutes} min
        </p>
      </div>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy transition-colors group-hover:text-accent">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">{post.description}</p>
      <div className="mt-5">
        <TagList tags={post.tags} />
      </div>
    </article>
  );
}
