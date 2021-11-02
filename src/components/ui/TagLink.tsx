import { VFC } from 'react';
import Link from 'next/link';
import { ArticleTag } from '../../types/microCMS';
import styles from '../../styles/components/ui/TagLink.module.scss';

type Props = {
  tag: ArticleTag;
};

export const TagLink: VFC<Props> = (props: Props) => {
  const { tag } = props;

  return (
    <Link href="/tag/[slug]" as={`/tag/${tag.id}`}>
      <a className={styles.tag}>#{tag.name}</a>
    </Link>
  );
};
