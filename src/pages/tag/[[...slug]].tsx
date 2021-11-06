import { VFC } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { client } from '../../libs/client';
import { Article, ArticleTag, BlogField, TagField } from '../../types/microCMS';
import { Tag } from '../../components/page/Tag';

type Props = {
  tag: ArticleTag;
  articleList: Article[];
  pageCount: number;
  currentPage: number;
};

const TagPage: VFC<Props> = (props: Props) => {
  const { tag, articleList, pageCount, currentPage } = props;

  return (
    <Tag
      tag={tag}
      articleList={articleList}
      pageCount={pageCount}
      currentPage={currentPage}
    />
  );
};

export default TagPage;

const perPage = 12;

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug as string[];
  const [tagId, _, page] = slug;
  const currentPage = page ? parseInt(page) : 1;

  const tag = await client.get<ArticleTag>({
    endpoint: 'tags',
    contentId: tagId,
  });
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: {
      limit: 1000,
      offset: (currentPage - 1) * perPage,
      filters: `tags[contains]${tagId}`,
    },
  });
  const pageCount = Math.ceil(blogData.totalCount / perPage);

  return {
    props: {
      tag,
      articleList: blogData.contents,
      pageCount,
      currentPage,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const tagData = await client.get<TagField>({
    endpoint: 'tags',
    queries: { limit: 1000 },
  });
  const tagIds = tagData.contents.map((tag: ArticleTag) => tag.id);
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: 1000 },
  });

  const paths: string[] = [];

  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  tagIds.forEach((tagId: string) => {
    const articleList = blogData.contents.filter((article: Article) =>
      article.tags.map((tag: ArticleTag) => tag.id).includes(tagId)
    );

    paths.push(`/tag/${tagId}`);
    range(1, Math.ceil(articleList.length / perPage)).forEach(
      (number: number) => {
        paths.push(`/tag/${tagId}/page/${number}`);
      }
    );
  });

  return {
    paths,
    fallback: false,
  };
};
