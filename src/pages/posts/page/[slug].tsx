import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { Posts } from '../../../components/page/Posts';
import { client } from '../../../libs/client';
import { Article, BlogField } from '../../../types/microCMS';

type Props = {
  articleList: Article[];
  pageCount: number;
  currentPage: number;
};

const PostPagination: VFC<Props> = (props: Props) => {
  const { articleList, pageCount, currentPage } = props;

  return (
    <Posts
      articleList={articleList}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

export default PostPagination;

const perPage = 12;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const currentPage = parseInt(context.params?.slug as string);
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: {
      limit: perPage,
      offset: (currentPage - 1) * perPage,
      orders: '-publishedAt',
    },
  });
  const pageCount = Math.ceil(blogData.totalCount / blogData.limit);

  return {
    props: {
      articleList: blogData.contents,
      pageCount,
      currentPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogData = await client.get<BlogField>({ endpoint: 'blog' });

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(1, Math.ceil(blogData.totalCount / perPage)).map(
    (number: number) => `/posts/page/${number}`
  );

  return {
    paths,
    fallback: false,
  };
};
