import { VFC } from 'react';
import Head from 'next/head';
import { ArticleCard } from '../ui/ArticleCard';
import { Article } from '../../types/microCMS';
import styles from '../../styles/components/page/Posts.module.scss';

type Props = {
  slug: string;
  articleList: Article[];
};

export const Search: VFC<Props> = (props: Props) => {
  const { slug, articleList } = props;

  return (
    <>
      <Head>
        <title>
          「{slug}」の検索結果（{articleList.length}件）｜TEHC BLOG
        </title>
      </Head>

      <section className={styles.section}>
        <div className="container">
          <h2 className={styles.section__title}>
            <span className={styles.section__text}>
              「{slug}」<br className={styles.section__br} />
              の検索結果（{articleList.length}件）
            </span>
          </h2>

          {articleList.length === 0 ? (
            <p className={styles.noneText}>該当する記事はありませんでした。</p>
          ) : (
            <ul className={styles.list}>
              {articleList.map((article: Article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
};
