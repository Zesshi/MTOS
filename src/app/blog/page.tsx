import type { Metadata } from "next";
import { ArchiveBrowser } from "@/components/archive-browser";
import { Container } from "@/components/container";
import { SectionHeader } from "@/components/section-header";
import { getAllPosts, getPostTaxonomy } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Archive",
  description: "All posts, notes, writeups, and guides collected in one place.",
};

export const dynamic = "force-static";

export default async function BlogPage() {
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
      />
    </Container>
  );
}
