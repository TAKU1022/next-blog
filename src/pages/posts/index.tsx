import { VFC } from 'react';
import { GetStaticProps } from 'next';
import { Posts } from '../../components/page/Posts';
import { client } from '../../libs/client';
import { Article, BlogField } from '../../types/microCMS';

type Props = {
  articleList: Article[];
  pageCount: number;
  currentPage: number;
};

const PostsPage: VFC<Props> = (props: Props) => {
  const { articleList, pageCount, currentPage } = props;

  return (
    <Posts
      articleList={articleList}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const perPage = 12;
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: perPage, orders: '-publishedAt' },
  });
  const pageCount = Math.ceil(blogData.totalCount / perPage);

  return {
    props: {
      articleList: blogData.contents,
      pageCount,
      currentPage: 1,
    },
  };
};
