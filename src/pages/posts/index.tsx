import { VFC } from 'react';
import { GetStaticProps } from 'next';
import { Posts } from '../../components/page/Posts';
import { client } from '../../libs/client';
import { Article, BlogField } from '../../types/microCMS';

type Props = {
  articleList: Article[];
};

const PostsPage: VFC<Props> = (props: Props) => {
  const { articleList } = props;

  return <Posts articleList={articleList} />;
};

export default PostsPage;

export const getStaticProps: GetStaticProps = async () => {
  const blogData = await client.get<BlogField>({ endpoint: 'blog' });

  return {
    props: {
      articleList: blogData.contents,
    },
  };
};
