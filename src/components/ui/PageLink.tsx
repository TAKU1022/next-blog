import { ReactNode, VFC } from 'react';
import Link from 'next/link';
import styles from '../../styles/components/ui/PageLink.module.scss';

type Props = {
  path: string;
  children: ReactNode;
};

export const PageLink: VFC<Props> = (props: Props) => {
  const { path, children } = props;

  return (
    <Link href={path}>
      <a className={styles.link}>{children}</a>
    </Link>
  );
};
