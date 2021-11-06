import { VFC } from 'react';
import Link from 'next/link';
import styles from '../../styles/components/ui/Pagination.module.scss';

type Props = {
  pageCount: number;
  currentPage: number;
  path: string;
};

export const Pagination: VFC<Props> = (props: Props) => {
  const { pageCount, currentPage, path } = props;

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  return (
    <nav className={styles.pagination}>
      <ul className={styles.pagination__list}>
        {currentPage === 1 || (
          <li className={styles.pagination__item}>
            <Link
              href={currentPage === 2 ? `/${path}` : `/${path}/page/[slug]`}
              as={
                currentPage === 2
                  ? `/${path}`
                  : `/${path}/page/${currentPage - 1}`
              }
            >
              <a className={styles.pagination__link} rel="prev">
                <svg
                  className={styles.pagination__arrow}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="前へ"
                >
                  <polyline points="14 18 8 12 14 6 14 6" />
                </svg>
              </a>
            </Link>
          </li>
        )}

        {range(1, pageCount).map((number: number) => (
          <li className={styles.pagination__item} key={number}>
            <Link
              href={number === 1 ? `/${path}` : `/${path}/page/[slug]`}
              as={number === 1 ? `/${path}` : `/${path}/page/${number}`}
            >
              <a
                className={styles.pagination__link}
                aria-current={number === currentPage ? 'page' : undefined}
              >
                {number}
              </a>
            </Link>
          </li>
        ))}

        {currentPage === pageCount || (
          <li className={styles.pagination__item}>
            <Link
              href={`/${path}/page/[slug]`}
              as={`/${path}/page/${currentPage + 1}`}
            >
              <a className={styles.pagination__link} rel="next">
                <svg
                  className={styles.pagination__arrow}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="次へ"
                >
                  <polyline points="10 6 16 12 10 18 10 18" />
                </svg>
              </a>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
