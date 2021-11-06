import { VFC } from 'react';
import { PageLink } from '../components/ui/PageLink';
import styles from '../styles/components/page/404.module.scss';

const Custom404: VFC = () => {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>
          <span className={styles.title__text}>404 NotFound</span>
        </h2>
        <div className={styles.description}>
          <p className={styles.description__text}>ページが見つかりません。</p>
          <p className={styles.description__text}>
            入力されたURLをご確認ください。
          </p>
        </div>
        <div className={styles.linkWrapper}>
          <PageLink path="/">トップへ戻る</PageLink>
        </div>
      </div>
    </section>
  );
};

export default Custom404;
