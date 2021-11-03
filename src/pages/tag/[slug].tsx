import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
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

export const getStaticProps: GetStaticProps = async (context) => {
  const tagId = context.params?.slug as string;
  const tag = await client.get<ArticleTag>({
    endpoint: 'tags',
    contentId: tagId,
  });
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { filters: `tags[contains]${tagId}` },
  });

  return {
    props: {
      tag,
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
