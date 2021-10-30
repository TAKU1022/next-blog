import { VFC } from 'react';
import Link from 'next/link';
import styles from '../../styles/components/ui/CommonHeader.module.scss';

const CommonHeader: VFC = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a className={styles.header__link} aria-label="トップページへ">
          BLOG
        </a>
      </Link>
    </header>
  );
};

export default CommonHeader;
