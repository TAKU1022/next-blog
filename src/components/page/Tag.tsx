import { VFC } from 'react';
import Head from 'next/head';
import { Article, ArticleTag } from '../../types/microCMS';
import { ArticleCard } from '../ui/ArticleCard';
import { Pagination } from '../ui/Pagination';
import { PageLink } from '../ui/PageLink';
import styles from '../../styles/components/page/Posts.module.scss';

type Props = {
  tag: ArticleTag;
  articleList: Article[];
  pageCount: number;
  currentPage: number;
};

export const Tag: VFC<Props> = (props: Props) => {
  const { tag, articleList, pageCount, currentPage } = props;

  return (
    <>
      <Head>
        <title>{tag.name}に関する記事一覧｜TEHC BLOG</title>
      </Head>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.section__title}>
            <span className={styles.section__text}>{tag.name}</span>
          </h2>
          <ul className={styles.list}>
            {articleList.map((article: Article) => (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>

          {pageCount === 1 || (
            <div className={styles.pagination}>
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                path={`/tag/[[...slug]]`}
                asPath={`/tag/${tag.id}`}
              />
            </div>
          )}

          <div className={styles.linkWrapper}>
            <PageLink path="/posts">記事一覧ページへ戻る</PageLink>
          </div>
        </div>
      </section>
    </>
  );
};
