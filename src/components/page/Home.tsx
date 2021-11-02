import { VFC } from 'react';
import Head from 'next/head';
import { Article, ArticleCategory, ArticleTag } from '../../types/microCMS';
import { ArticleCard } from '../ui/ArticleCard';
import { PageLink } from '../ui/PageLink';
import styles from '../../styles/components/page/Home.module.scss';

type Props = {
  articleList: Article[];
  categoryList: ArticleCategory[];
  tagList: ArticleTag[];
};

export const Home: VFC<Props> = (props: Props) => {
  const { articleList } = props;

  return (
    <>
      <Head>
        <title>TEHC BLOG</title>
      </Head>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.section__title}>
            <span className={styles.section__text}>最新の記事</span>
          </h2>
          <ul className={styles.articleList}>
            {articleList.map((article: Article) => (
              <li key={article.id}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
          <div className={styles.linkWrapper}>
            <PageLink path="/posts">もっとみる</PageLink>
          </div>
        </div>
      </section>
    </>
  );
};
