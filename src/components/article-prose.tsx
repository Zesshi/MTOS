type ArticleProseProps = {
  children: React.ReactNode;
};

export function ArticleProse({ children }: ArticleProseProps) {
  return <div className="article-prose mt-10 w-full">{children}</div>;
}
