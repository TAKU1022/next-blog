import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { client } from '../../libs/client';
import { Article, ArticleTag, BlogField, TagField } from '../../types/microCMS';

type Props = {
  articleList: Article[];
};

const Tag: VFC<Props> = (props: Props) => {
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

export default Tag;

export const getStaticProps: GetStaticProps = async (context) => {
  const tagId = context.params?.slug as string;
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { filters: `tags[contains]${tagId}` },
  });

  return {
    props: {
      articleList: blogData.contents,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagData = await client.get<TagField>({ endpoint: 'tags' });
  const paths = tagData.contents.map((tag: ArticleTag) => `/tag/${tag.id}`);

  return {
    paths,
    fallback: false,
  };
};
