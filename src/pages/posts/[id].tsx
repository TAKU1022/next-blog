import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../../libs/client';

const PostDetail = (props: any) => {
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
  const id = context.params?.id as string;
  const blogData = await client.get({ endpoint: 'blog', contentId: id });

  return {
    props: {
      article: blogData,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const blogData = await client.get({ endpoint: 'blog' });
  const paths = blogData.contents.map((article: any) => `/posts/${article.id}`);

  return {
    paths,
    fallback: false,
  };
};
