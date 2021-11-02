import { VFC } from 'react';
import Link from 'next/link';
import styles from '../../styles/components/ui/CommonHeader.module.scss';

export const CommonHeader: VFC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.header__logo} aria-label="トップページへ">
          <h1>TECH BLOG</h1>
        </a>
      </Link>
    </header>
  );
};
