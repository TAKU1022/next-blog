import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../../libs/client';
import {
  Article,
  ArticleCategory,
  BlogField,
  CategoryField,
} from '../../types/microCMS';

type Props = {
  articleList: Article[];
};

const CategoryPage: VFC<Props> = (props: Props) => {
  const { articleList } = props;

  return (
    <div>
      <ul>
        {articleList.map((article: Article) => (
          <li key={article.id}>
            <p>{article.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const categoryId = context.params?.slug as string;
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { filters: `category[equals]${categoryId}` },
  });

  return {
    props: {
      articleList: blogData.contents,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryData = await client.get<CategoryField>({
    endpoint: 'categories',
  });
  const paths = categoryData.contents.map(
    (category: ArticleCategory) => `/category/${category.id}`
  );

  return {
    paths,
    fallback: false,
  };
};
