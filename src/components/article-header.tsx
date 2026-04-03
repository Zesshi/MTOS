import { CategoryBadge } from "@/components/category-badge";
import { ArticleMeta } from "@/components/article-meta";
import type { PostRecord } from "@/lib/posts";

type ArticleHeaderProps = {
  post: PostRecord;
};

export function ArticleHeader({ post }: ArticleHeaderProps) {
  return (
    <header className="border-b border-white/10 pb-10">
      <CategoryBadge
        category={post.metadata.category}
        href={`/blog?category=${post.metadata.category}`}
      />
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-copy sm:text-5xl">
        {post.metadata.title}
      </h1>
      <p className="mt-5 max-w-[78ch] text-base leading-8 text-muted sm:text-lg">
        {post.metadata.description}
      </p>
      <ArticleMeta post={post.metadata} readingMinutes={post.readingMinutes} />
    </header>
  );
}
