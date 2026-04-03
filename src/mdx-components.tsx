/* eslint-disable @next/next/no-img-element */
import type { MDXComponents } from "mdx/types";
import type { ComponentPropsWithoutRef } from "react";
import { ExternalLink } from "@/components/external-link";
import { Callout } from "@/components/mdx/callout";
import { FileCard } from "@/components/mdx/file-card";
import { YouTubeEmbed } from "@/components/mdx/youtube-embed";

function Anchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("http")) {
    return (
      <ExternalLink href={href} {...props}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <a
      href={href}
      {...props}
      className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-copy"
    >
      {children}
    </a>
  );
}

const components: MDXComponents = {
  a: Anchor,
  img: ({ alt = "", ...props }) => (
    <img
      {...props}
      alt={alt}
      className="my-8 rounded-[1.5rem] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.16)]"
    />
  ),
  Callout,
  FileCard,
  YouTubeEmbed,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
