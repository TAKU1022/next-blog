import { VFC } from 'react';
import Head from 'next/head';
import { Article, ArticleCategory } from '../../types/microCMS';
import { ArticleCard } from '../ui/ArticleCard';
import { PageLink } from '../ui/PageLink';
import styles from '../../styles/components/page/Posts.module.scss';

type Props = {
  category: ArticleCategory;
  articleList: Article[];
};

export const Category: VFC<Props> = (props: Props) => {
  const { category, articleList } = props;

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
          <div className={styles.linkWrapper}>
            <PageLink path="/posts">記事一覧ページへ戻る</PageLink>
          </div>
        </div>
      </section>
    </>
  );
};
