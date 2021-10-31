import { VFC } from 'react';
import styles from '../../styles/components/ui/CommonFooter.module.scss';

export const CommonFooter: VFC = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footer__text}>
        <small className={styles.footer__corporate} lang="en" translate="no">
          &copy;TAKU
        </small>
      </p>
    </footer>
  );
};
