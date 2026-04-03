import type { PostSummary } from "@/lib/post-types";
import { PostCard } from "@/components/post-card";

type PostListProps = {
  posts: PostSummary[];
};

export function PostList({ posts }: PostListProps) {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
