import { VFC } from 'react';
import Head from 'next/head';
import { Article, ArticleCategory, ArticleTag } from '../../types/microCMS';
import { ArticleCard } from '../ui/ArticleCard';
import { PageLink } from '../ui/PageLink';
import styles from '../../styles/components/page/Home.module.scss';
import { CategoryCard } from '../ui/CategoryCard';
import { TagLink } from '../ui/TagLink';

type Props = {
  articleList: Article[];
  categoryList: ArticleCategory[];
  tagList: ArticleTag[];
};

export const Home: VFC<Props> = (props: Props) => {
  const { articleList, categoryList, tagList } = props;

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

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.section__title}>
            <span className={styles.section__text}>カテゴリー</span>
          </h2>
          <ul className={styles.categoryList}>
            {categoryList.map((category: ArticleCategory) => (
              <li key={category.id}>
                <CategoryCard category={category} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.section__title}>
            <span className={styles.section__text}>タグ</span>
          </h2>
          <ul className={styles.tagList}>
            {tagList.map((tag: ArticleTag) => (
              <li className={styles.tagList__item} key={tag.id}>
                <TagLink tag={tag} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};
