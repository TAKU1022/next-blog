import { VFC } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { client } from '../../libs/client';
import { Article, BlogField } from '../../types/microCMS';
import { Search } from '../../components/page/Search';

type Props = {
  slug: string;
  articleList: Article[];
};

const SearchPage: VFC<Props> = (props: Props) => {
  const { slug, articleList } = props;

  return <Search slug={slug} articleList={articleList} />;
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const slug = context.params?.slug as string;
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: 1000, q: slug },
  });

  return {
    props: {
      slug,
      articleList: blogData.contents,
    },
  };
};
