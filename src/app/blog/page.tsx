import type { Metadata } from "next";
import { ArchiveBrowser } from "@/components/archive-browser";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import { getAllPosts, getPostTaxonomy } from "@/lib/posts";

type BlogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Archive",
  description: "All posts, notes, writeups, and guides collected in one place.",
};

function firstValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const currentCategory = firstValue(params.category);
  const currentTag = firstValue(params.tag);
  const currentQuery = firstValue(params.q);
  const [posts, taxonomy] = await Promise.all([getAllPosts(), getPostTaxonomy()]);

  return (
    <Container className="py-16">
      <SectionHeader
        eyebrow="Archive"
        title="All posts."
        description="Everything published so far, from quick notes to longer writeups."
      />
      <ArchiveBrowser
        posts={posts}
        categories={taxonomy.categories}
        tags={taxonomy.tags}
        initialCategory={currentCategory}
        initialTag={currentTag}
        initialQuery={currentQuery}
      />
    </Container>
  );
}
