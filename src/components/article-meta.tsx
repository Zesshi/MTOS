import { TagList } from "@/components/tag-list";
import { formatPostDate, type PostSummary } from "@/lib/post-types";

type ArticleMetaProps = {
  post: Pick<PostSummary, "publishedAt" | "updatedAt" | "tags">;
  readingMinutes: number;
};

export function ArticleMeta({ post, readingMinutes }: ArticleMetaProps) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-muted">
          <span className="uppercase">Published</span>
          <span className="text-copy/90">{formatPostDate(post.publishedAt)}</span>
        </span>
        {post.updatedAt ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-muted">
            <span className="uppercase">Updated</span>
            <span className="text-copy/90">{formatPostDate(post.updatedAt)}</span>
          </span>
        ) : null}
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] tracking-[0.18em] text-muted">
          <span className="uppercase">Read time</span>
          <span className="text-copy/90">{readingMinutes} min</span>
        </span>
      </div>
      <TagList tags={post.tags} />
    </div>
  );
}
