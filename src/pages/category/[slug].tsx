import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../../libs/client';
import {
  Article,
  ArticleCategory,
  BlogField,
  CategoryField,
} from '../../types/microCMS';
import { Category } from '../../components/page/Category';

type Props = {
  category: ArticleCategory;
  articleList: Article[];
};

const CategoryPage: VFC<Props> = (props: Props) => {
  const { category, articleList } = props;

  return <Category category={category} articleList={articleList} />;
};

export default CategoryPage;

export const getStaticProps: GetStaticProps = async (context) => {
  const categoryId = context.params?.slug as string;
  const category = await client.get<ArticleCategory>({
    endpoint: 'categories',
    contentId: categoryId,
  });
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { filters: `category[equals]${categoryId}` },
  });

  return {
    props: {
      category,
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
