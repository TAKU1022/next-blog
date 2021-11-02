import { VFC } from 'react';
import { Article } from '../../types/microCMS';
import { ArticleCard } from '../ui/ArticleCard';
import styles from '../../styles/components/page/Posts.module.scss';

type Props = {
  articleList: Article[];
};

export const Posts: VFC<Props> = (props: Props) => {
  const { articleList } = props;

  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.section__title}>
          <span className={styles.section__text}>記事一覧</span>
        </h2>
        <ul className={styles.list}>
          {articleList.map((article: Article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
