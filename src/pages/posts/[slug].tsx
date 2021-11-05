import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../../libs/client';
import { Article, BlogField } from '../../types/microCMS';

type Props = {
  article: Article;
};

const PostDetail: VFC<Props> = (props: Props) => {
  const { article } = props;

  return (
    <div>
      <p>{article.title}</p>
      <img src={article.thumbnail.url} alt={`${article.title}のサムネイル`} />
      <div dangerouslySetInnerHTML={{ __html: article.body }}></div>
    </div>
  );
};

export default PostDetail;

export const getStaticProps: GetStaticProps = async (context) => {
  const articleId = context.params?.slug as string;
  const blogData = await client.get<Article>({
    endpoint: 'blog',
    contentId: articleId,
  });

  return {
    props: {
      article: blogData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: 1000 },
  });
  const paths = blogData.contents.map(
    (article: Article) => `/posts/${article.id}`
  );

  return {
    paths,
    fallback: false,
  };
};
