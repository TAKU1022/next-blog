import { VFC } from 'react';
import Link from 'next/link';
import { ArticleCategory } from '../../types/microCMS';
import styles from '../../styles/components/ui/CategoryCard.module.scss';

type Props = {
  category: ArticleCategory;
};

export const CategoryCard: VFC<Props> = (props: Props) => {
  const { category } = props;

  return (
    <Link href="/category/[slug]" as={`/category/${category.id}`}>
      <a className={styles.category}>
        <span className={styles.category__text}>{category.name}</span>
      </a>
    </Link>
  );
};
