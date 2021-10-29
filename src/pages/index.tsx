import { VFC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from '../libs/client';
import { Article, BlogField } from '../types/microCMS';

type Props = {
  articleList: Article[];
};

const Home: VFC<Props> = (props: Props) => {
  const { articleList } = props;

  return (
    <ul>
      {articleList.map((article: Article) => (
        <li key={article.id}>
          <Link href="/posts/[id]" as={`/posts/${article.id}`} passHref>
            <a>
              <p>{article.title}</p>
              <p>{article.category.name}</p>
              <div>
                {article.tags.map((tag: any) => (
                  <span key={tag.id}>{tag.name}</span>
                ))}
              </div>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const blogData = await client.get<BlogField>({ endpoint: 'blog' });

  return {
    props: {
      articleList: blogData.contents,
    },
  };
};
