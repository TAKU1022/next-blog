import { VFC } from 'react';
import { GetStaticProps } from 'next';
import { client } from '../libs/client';
import {
  Article,
  ArticleCategory,
  ArticleTag,
  BlogField,
  CategoryField,
  TagField,
} from '../types/microCMS';
import { Home } from '../components/page/Home';

type Props = {
  articleList: Article[];
  categoryList: ArticleCategory[];
  tagList: ArticleTag[];
};

const HomePage: VFC<Props> = (props: Props) => {
  const { articleList, categoryList, tagList } = props;

  return (
    <Home
      articleList={articleList}
      categoryList={categoryList}
      tagList={tagList}
    />
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: 6, orders: '-publishedAt' },
  });
  const CategoryData = await client.get<CategoryField>({
    endpoint: 'categories',
    queries: { limit: 1000, orders: '-publishedAt' },
  });
  const TagData = await client.get<TagField>({
    endpoint: 'tags',
    queries: { limit: 1000, orders: '-publishedAt' },
  });

  return {
    props: {
      articleList: blogData.contents,
      categoryList: CategoryData.contents,
      tagList: TagData.contents,
    },
  };
};
