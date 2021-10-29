import { GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from '../libs/client';

const Home = (props: any) => {
  const { articleList } = props;

  return (
    <ul>
      {articleList.map((article: any) => (
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
  const blogData = await client.get({ endpoint: 'blog' });

  return {
    props: {
      articleList: blogData.contents,
    },
  };
};
