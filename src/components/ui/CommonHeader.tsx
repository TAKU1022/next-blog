import { VFC } from 'react';
import Link from 'next/link';
import styles from '../../styles/components/ui/CommonHeader.module.scss';

export const CommonHeader: VFC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a aria-label="トップページへ">
          <h1 className={styles.header__logo}>TECH BLOG</h1>
        </a>
      </Link>
    </header>
  );
};
