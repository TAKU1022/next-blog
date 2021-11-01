import { VFC } from 'react';
import Link from 'next/link';
import styles from '../../styles/components/ui/CommonHeader.module.scss';

export const CommonHeader: VFC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__logo}>
        <Link href="/">
          <a aria-label="トップページへ">TECH BLOG</a>
        </Link>
      </h1>
    </header>
  );
};
