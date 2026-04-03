import type { ComponentPropsWithoutRef } from "react";

type ExternalLinkProps = ComponentPropsWithoutRef<"a">;

export function ExternalLink({ children, rel, target, ...props }: ExternalLinkProps) {
  return (
    <a
      rel={rel ?? "noreferrer"}
      target={target ?? "_blank"}
      {...props}
      className="font-medium text-accent underline underline-offset-4 transition-colors hover:text-copy"
    >
      {children}
    </a>
  );
}
