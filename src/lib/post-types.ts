import type { PostCategory } from "@/lib/site";

export type PostMetadata = {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: PostCategory;
  tags: string[];
  featured: boolean;
  draft: boolean;
  coverImage?: string;
  coverAlt?: string;
  ogImage?: string;
  canonicalUrl?: string;
  attachments: Array<{
    label: string;
    href: string;
    description?: string;
  }>;
  externalLinks: Array<{
    label: string;
    href: string;
  }>;
  seoTitle?: string;
  seoDescription?: string;
  noindex: boolean;
};

export type PostSummary = PostMetadata & {
  slug: string;
  readingMinutes: number;
};

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
