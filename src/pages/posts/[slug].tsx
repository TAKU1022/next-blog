import { useMemo, VFC } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { client } from '../../libs/client';
import { Article, ArticleTag, BlogField } from '../../types/microCMS';
import styles from '../../styles/components/page/PostDetail.module.scss';
import { PageLink } from '../../components/ui/PageLink';

type Props = {
  article: Article;
};

const PostDetail: VFC<Props> = (props: Props) => {
  const { article } = props;

  const description = article.body.replace(/<p>|<\/p>/g, '');
  const newDescription =
    description.length > 117 ? `${description.substr(0, 117)}...` : description;

  const date = useMemo(
    () => new Date(article.publishedAt).toLocaleDateString(),
    [article.publishedAt]
  );

  return (
    <>
      <Head>
        <title>{article.title}｜TEHC BLOG</title>
        <meta name="description" content={newDescription} />
      </Head>

      <article className={styles.article}>
        <div className="container">
          <h2 className={styles.article__title}>{article.title}</h2>
          <p className={styles.article__date}>
            <time dateTime={article.publishedAt}>{date}</time>
          </p>
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
          <div className={styles.article__imageWrapper}>
            <img
              className={styles.article__thumbnail}
              src={article.thumbnail.url}
              alt={article.title}
              loading="lazy"
            />
          </div>
          <div
            className={styles.article__body}
            dangerouslySetInnerHTML={{ __html: article.body }}
          ></div>

          <div className={styles.linkWrapper}>
            <PageLink path="/posts">記事一覧ページへ戻る</PageLink>
          </div>
        </div>
      </article>
    </>
  );
};

export default PostDetail;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const articleId = context.params?.slug as string;
  const article = await client.get<Article>({
    endpoint: 'blog',
    contentId: articleId,
  });

  return {
    props: {
      article,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: 1000 },
  });
  const paths = blogData.contents.map(
    (article: Article) => `/posts/${article.id}`
  );

  return {
    paths,
    fallback: false,
  };
};
