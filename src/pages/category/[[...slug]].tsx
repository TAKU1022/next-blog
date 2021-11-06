import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
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
  pageCount: number;
  currentPage: number;
};

const CategoryPage: VFC<Props> = (props: Props) => {
  const { category, articleList, pageCount, currentPage } = props;

  return (
    <Category
      category={category}
      articleList={articleList}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

export default CategoryPage;

const perPage = 12;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug as string[];
  const [categoryId, _, page] = slug;
  const currentPage = page ? parseInt(page) : 1;

  const category = await client.get<ArticleCategory>({
    endpoint: 'categories',
    contentId: categoryId,
  });
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: {
      limit: perPage,
      offset: (currentPage - 1) * perPage,
      filters: `category[equals]${categoryId}`,
    },
  });
  const pageCount = Math.ceil(blogData.totalCount / perPage);

  return {
    props: {
      category,
      articleList: blogData.contents,
      pageCount,
      currentPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categoryData = await client.get<CategoryField>({
    endpoint: 'categories',
    queries: { limit: 1000 },
  });

  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: 1000 },
  });

  const paths: string[] = [];

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  categoryData.contents.forEach((category: ArticleCategory) => {
    const categoryId = category.id;
    const articleList = blogData.contents.filter(
      (article: Article) => article.category.id === categoryId
    );

    paths.push(`/category/${categoryId}`);
    range(1, Math.ceil(articleList.length / perPage)).forEach(
      (number: number) => {
        paths.push(`/category/${categoryId}/page/${number}`);
      }
    );
  });

  return {
    paths,
    fallback: false,
  };
};
