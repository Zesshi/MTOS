import { Container } from "@/components/container";
import { FeaturedPostCard } from "@/components/featured-post-card";
import { PostCard } from "@/components/post-card";
import { siteConfig } from "@/lib/site";
import { getAllPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await getAllPosts();
  const [leadPost, ...remainingPosts] = posts;
  const spotlightPosts = remainingPosts.slice(0, 2);
  const archivePosts = remainingPosts.slice(2);

  return (
    <div className="pb-20">
      <Container className="pt-16">
        <div className="max-w-4xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
            {siteConfig.name}
          </p>
          <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em] text-copy sm:text-6xl">
            Security notes, guides, writeups, and research.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-muted sm:text-lg">
            Practical writing on secure software, threat-aware engineering, technical learning, and
            experiments worth documenting.
          </p>
        </div>
      </Container>

      {leadPost ? (
        <Container className="mt-12">
          <div className="grid gap-5 lg:grid-cols-[1.25fr,0.75fr]">
            <FeaturedPostCard post={leadPost} />
            <div className="grid gap-5">
              {spotlightPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </Container>
      ) : null}

      {archivePosts.length ? (
        <Container className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-accent">
                More articles
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-copy">
                Recent archive additions
              </h2>
            </div>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {archivePosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </Container>
      ) : null}
    </div>
  );
}
