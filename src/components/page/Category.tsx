import { VFC } from 'react';
import Head from 'next/head';
import { Article, ArticleCategory } from '../../types/microCMS';
import { ArticleCard } from '../ui/ArticleCard';
import { Pagination } from '../ui/Pagination';
import { PageLink } from '../ui/PageLink';
import styles from '../../styles/components/page/Posts.module.scss';

type Props = {
  category: ArticleCategory;
  articleList: Article[];
  pageCount: number;
  currentPage: number;
};

export const Category: VFC<Props> = (props: Props) => {
  const { category, articleList, pageCount, currentPage } = props;

  return (
    <>
      <Head>
        <title>{category.name}に関する記事一覧｜TEHC BLOG</title>
      </Head>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.section__title}>
            <span className={styles.section__text}>{category.name}</span>
          </h2>
          <ul className={styles.list}>
            {articleList.map((article: Article) => (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>

          {pageCount > 1 && (
            <div className={styles.pagination}>
              <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                path={`/category/[[...slug]]`}
                asPath={`/category/${category.id}`}
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
