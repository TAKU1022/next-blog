import { useMemo, VFC } from 'react';
import Link from 'next/link';
import { Article, ArticleTag } from '../../types/microCMS';
import styles from '../../styles/components/ui/ArticleCard.module.scss';

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
    <article className={styles.article}>
      <Link href="/posts/[slug]" as={`/posts/${article.id}`}>
        <a className={styles.article__imageLink}>
          <img
            className={styles.article__thumbnail}
            src={article.thumbnail.url}
            alt={`${article.title}のサムネイル`}
            loading="lazy"
          />
        </a>
      </Link>
      <p className={styles.article__date}>{date}</p>
      <Link href="/posts/[slug]" as={`/posts/${article.id}`}>
        <a className={styles.article__title}>
          <h3>{article.title}</h3>
        </a>
      </Link>
      <Link href="/category/[slug]" as={`/category/${article.category.id}`}>
        <a className={styles.article__category}>{article.category.name}</a>
      </Link>
      <ul className={styles.list}>
        {article.tags.map((tag: ArticleTag) => (
          <li className={styles.list__item} key={tag.id}>
            <Link href="/tag/[slug]" as={`/tag/${tag.id}`}>
              <a className={styles.list__link}>#{tag.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
};
