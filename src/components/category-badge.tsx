import Link from "next/link";
import { cn } from "@/lib/utils";

type CategoryBadgeProps = {
  category: string;
  href?: string;
  className?: string;
};

export function CategoryBadge({ category, href, className }: CategoryBadgeProps) {
  const content = (
    <span
      className={cn(
        "inline-flex rounded-full border border-accent/20 bg-accent/8 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-accent",
        className,
      )}
    >
      {category}
    </span>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}
