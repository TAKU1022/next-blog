import { client } from '../libs/client';

const Home = (props: any) => {
  const { articleList } = props;

  return (
    <ul>
      {articleList.map((article: any) => (
        <li key={article.id}>
          <p>{article.title}</p>
          <p>{article.category.name}</p>
          <div>
            {article.tags.map((tag: any) => (
              <span key={tag.id}>{tag.name}</span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Home;

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: 'blog' });

  return {
    props: {
      articleList: blog.contents,
    },
  };
};
