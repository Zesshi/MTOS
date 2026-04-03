import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { z } from "zod";
import type { PostMetadata, PostSummary } from "@/lib/post-types";
import { postCategories, type PostCategory } from "@/lib/site";

const postsDirectory = path.join(process.cwd(), "src", "content", "posts");

const attachmentSchema = z.object({
  label: z.string(),
  href: z.string(),
  description: z.string().optional(),
});

const externalLinkSchema = z.object({
  label: z.string(),
  href: z.string().url(),
});

export const postMetadataSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  updatedAt: z.string().optional(),
  category: z.enum(postCategories),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  coverImage: z.string().optional(),
  coverAlt: z.string().optional(),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  attachments: z.array(attachmentSchema).default([]),
  externalLinks: z.array(externalLinkSchema).default([]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  noindex: z.boolean().default(false),
});

export type PostRecord = {
  slug: string;
  metadata: PostMetadata;
  readingMinutes: number;
  Component: React.ComponentType<Record<string, never>>;
};

type PostFilters = {
  category?: string;
  tag?: string;
};

function countWords(source: string) {
  return source
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function getReadingMinutes(source: string) {
  return Math.max(1, Math.round(countWords(source) / 150));
}

function sortByPublishDate(posts: PostSummary[]) {
  return posts.sort(
    (left, right) =>
      new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime(),
  );
}

function normalizeQueryValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

async function readPostFileNames() {
  const entries = await fs.readdir(postsDirectory);
  return entries.filter((entry) => entry.endsWith(".mdx"));
}

async function loadPostSummary(fileName: string): Promise<PostSummary> {
  const slug = fileName.replace(/\.mdx$/, "");
  const fullPath = path.join(postsDirectory, fileName);
  const source = await fs.readFile(fullPath, "utf8");
  const mod = await import(`@/content/posts/${slug}.mdx`);
  const metadata = postMetadataSchema.parse(mod.metadata) as PostMetadata;

  return {
    slug,
    readingMinutes: getReadingMinutes(source),
    ...metadata,
  };
}

export const getAllPosts = cache(async (filters?: PostFilters) => {
  const files = await readPostFileNames();
  const posts = await Promise.all(files.map(loadPostSummary));
  const category = normalizeQueryValue(filters?.category);
  const tag = normalizeQueryValue(filters?.tag);

  return sortByPublishDate(posts)
    .filter((post) => !post.draft)
    .filter((post) => !category || post.category === category)
    .filter((post) => !tag || post.tags.includes(tag));
});

export const getPost = cache(async (slug: string): Promise<PostRecord> => {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const source = await fs.readFile(fullPath, "utf8");
  const mod = await import(`@/content/posts/${slug}.mdx`);
  const metadata = postMetadataSchema.parse(mod.metadata) as PostMetadata;

  if (metadata.draft) {
    throw new Error(`Post "${slug}" is marked as draft.`);
  }

  return {
    slug,
    metadata,
    readingMinutes: getReadingMinutes(source),
    Component: mod.default,
  };
});

export const getFeaturedPost = cache(async () => {
  const posts = await getAllPosts();
  return posts.find((post) => post.featured) ?? posts[0] ?? null;
});

export const getPostTaxonomy = cache(async () => {
  const posts = await getAllPosts();
  const categoryOrder = new Map<PostCategory, number>(
    postCategories.map((category, index) => [category, index]),
  );
  const categories = Array.from(new Set(posts.map((post) => post.category))).sort(
    (left, right) => (categoryOrder.get(left) ?? 99) - (categoryOrder.get(right) ?? 99),
  );
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags))).sort((left, right) =>
    left.localeCompare(right),
  );

  return { categories, tags };
});

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
