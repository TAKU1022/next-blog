import { VFC } from 'react';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { client } from '../../libs/client';
import { Article, BlogField } from '../../types/microCMS';
import { Search } from '../../components/page/Search';

type Props = {
  keyword: string;
  articleList: Article[];
};

const SearchPage: VFC<Props> = (props: Props) => {
  const { keyword, articleList } = props;

  return <Search keyword={keyword} articleList={articleList} />;
};

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const keyword = context.query.q as string;
  const blogData = await client.get<BlogField>({
    endpoint: 'blog',
    queries: { limit: 1000, q: keyword },
  });

  return {
    props: {
      keyword,
      articleList: blogData.contents,
    },
  };
};
