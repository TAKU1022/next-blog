import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { client } from '../../libs/client';
import { Article, ArticleTag, BlogField, TagField } from '../../types/microCMS';
import { Tag } from '../../components/page/Tag';

type Props = {
  tag: ArticleTag;
  articleList: Article[];
};

const TagPage: VFC<Props> = (props: Props) => {
  const { tag, articleList } = props;

  return <Tag tag={tag} articleList={articleList} />;
};

export default TagPage;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const tagId = context.params?.slug as string;
  const tag = await client.get<ArticleTag>({
    endpoint: 'tags',
    contentId: tagId,
  });
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: 1000, filters: `tags[contains]${tagId}` },
  });

  return {
    props: {
      tag,
      articleList: blogData.contents,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagData = await client.get<TagField>({
    endpoint: 'tags',
    queries: { limit: 1000 },
  });
  const paths = tagData.contents.map((tag: ArticleTag) => `/tag/${tag.id}`);

  return {
    paths,
    fallback: false,
  };
};
