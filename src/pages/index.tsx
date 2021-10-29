import { VFC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from '../libs/client';
import {
  Article,
  ArticleCategory,
  BlogField,
  CategoryField,
} from '../types/microCMS';

type Props = {
  articleList: Article[];
  categoryList: ArticleCategory[];
};

const Home: VFC<Props> = (props: Props) => {
  const { articleList, categoryList } = props;

  return (
    <div>
      <ul>
        {articleList.map((article: Article) => (
          <li key={article.id}>
            <Link href="/posts/[slug]" as={`/posts/${article.id}`} passHref>
              <a>
                <p>{article.title}</p>
                <p>{article.category.name}</p>
                <div>
                  {article.tags.map((tag: any) => (
                    <span key={tag.id}>{tag.name}</span>
                  ))}
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {categoryList.map((category: ArticleCategory) => (
          <li key={category.id}>
            <Link
              href="/category/[slug]"
              as={`/category/${category.id}`}
              passHref
            >
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const blogData = await client.get<BlogField>({ endpoint: 'blog' });
  const CategoryData = await client.get<CategoryField>({
    endpoint: 'categories',
  });

  return {
    props: {
      articleList: blogData.contents,
      categoryList: CategoryData.contents,
    },
  };
};
