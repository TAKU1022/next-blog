import { useMemo, VFC } from 'react';
import Link from 'next/link';
import { Article, ArticleTag } from '../../types/microCMS';

type Props = {
  article: Article;
};

export const ArticleCard: VFC<Props> = (props: Props) => {
  const { article } = props;
  const date = useMemo(
    () => new Date(article.publishedAt).toLocaleDateString(),
    [article.publishedAt]
  );

  return (
    <article>
      <Link href="/posts/[slug]" as={`/posts/${article.id}`}>
        <a>
          <img
            src={article.thumbnail.url}
            alt={`${article.title}のサムネイル`}
          />
        </a>
      </Link>
      <p>{date}</p>
      <Link href="/posts/[slug]" as={`/posts/${article.id}`}>
        <a>{article.title}</a>
      </Link>
      <Link href="/category/[slug]" as={`/category/${article.category.id}`}>
        <a>{article.category.name}</a>
      </Link>
      <ul>
        {article.tags.map((tag: ArticleTag) => (
          <li key={tag.id}>
            <Link href="/tag/[slug]" as={`/tag/${tag.id}`}>
              <a>{tag.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};
