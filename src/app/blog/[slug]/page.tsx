import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleHeader } from "@/components/article-header";
import { ArticleProse } from "@/components/article-prose";
import { CategoryBadge } from "@/components/category-badge";
import { GiscusComments } from "@/components/giscus-comments";
import { PostCard } from "@/components/post-card";
import { formatPostDate, getAllPosts, getPost } from "@/lib/posts";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await getPost(slug);
    const canonical = post.metadata.canonicalUrl ?? `${siteConfig.url}/blog/${slug}`;
    const ogImage = post.metadata.ogImage ?? `/blog/${slug}/opengraph-image`;

    return {
      title: post.metadata.seoTitle ?? post.metadata.title,
      description: post.metadata.seoDescription ?? post.metadata.description,
      alternates: { canonical },
      robots: post.metadata.noindex ? { index: false, follow: false } : undefined,
      openGraph: {
        type: "article",
        title: post.metadata.title,
        description: post.metadata.description,
        url: canonical,
        images: [{ url: ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.metadata.title,
        description: post.metadata.description,
        images: [ogImage],
      },
    };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getAllPosts({ category: post.metadata.category }))
    .filter((item) => item.slug !== slug)
    .slice(0, 3);

  const Article = post.Component;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.metadata.title,
    description: post.metadata.description,
    datePublished: post.metadata.publishedAt,
    dateModified: post.metadata.updatedAt ?? post.metadata.publishedAt,
    url: `${siteConfig.url}/blog/${slug}`,
    keywords: post.metadata.tags.join(", "),
    articleSection: post.metadata.category,
    inLanguage: "en",
    author: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <div className="mx-auto w-full max-w-[96rem] px-6 py-16">
      <div className="grid gap-12 2xl:grid-cols-[minmax(0,1fr)_17rem]">
        <article className="min-w-0">
          <ArticleHeader post={post} />
          <ArticleProse>
            <Article />
          </ArticleProse>
          {post.metadata.attachments.length ? (
            <section className="mt-12 rounded-[1.75rem] border border-white/10 bg-panel/65 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
                Files and artifacts
              </p>
              <div className="mt-4 grid gap-3">
                {post.metadata.attachments.map((attachment) => (
                  <a
                    key={attachment.href}
                    href={attachment.href}
                    className="rounded-2xl border border-white/10 px-4 py-3 transition-colors hover:border-accent/35"
                  >
                    <p className="font-medium text-copy">{attachment.label}</p>
                    {attachment.description ? (
                      <p className="mt-1 text-sm text-muted">{attachment.description}</p>
                    ) : null}
                  </a>
                ))}
              </div>
            </section>
          ) : null}
          {post.metadata.externalLinks.length ? (
            <section className="mt-8 rounded-[1.75rem] border border-white/10 bg-panel/65 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
                References
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {post.metadata.externalLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors hover:border-accent/35 hover:text-copy"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          ) : null}
          <GiscusComments />
          {relatedPosts.length ? (
            <section className="mt-16">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
                    Continue reading
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-copy">
                    More from {post.metadata.category}
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-medium text-accent transition-colors hover:text-copy"
                >
                  Back to archive
                </Link>
              </div>
              <div className="mt-8 grid gap-4">
                {relatedPosts.map((relatedPost) => (
                  <PostCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </section>
          ) : null}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        </article>
        <aside className="space-y-4 2xl:sticky 2xl:top-28 2xl:self-start">
          <div className="rounded-[1.75rem] border border-white/10 bg-panel/55 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.26em] text-accent">
              Filed under
            </p>
            <div className="mt-4">
              <CategoryBadge
                category={post.metadata.category}
                href={`/blog?category=${post.metadata.category}`}
              />
            </div>
            <div className="mt-5 border-t border-white/8 pt-4 text-sm text-muted">
              <p>{formatPostDate(post.metadata.publishedAt)}</p>
              <p className="mt-2">{post.readingMinutes} min read</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
