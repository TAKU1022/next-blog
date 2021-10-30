import { VFC } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import { client } from '../libs/client';
import {
  Article,
  ArticleCategory,
  ArticleTag,
  BlogField,
  CategoryField,
  TagField,
} from '../types/microCMS';

type Props = {
  articleList: Article[];
  categoryList: ArticleCategory[];
  tagList: ArticleTag[];
};

const Home: VFC<Props> = (props: Props) => {
  const { articleList, categoryList, tagList } = props;

  return (
    <div>
      <ul>
        {articleList.map((article: Article) => (
          <li key={article.id}>
            <Link href="/posts/[slug]" as={`/posts/${article.id}`} passHref>
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
      <ul>
        {categoryList.map((category: ArticleCategory) => (
          <li key={category.id}>
            <Link
              href="/category/[slug]"
              as={`/category/${category.id}`}
              passHref
            >
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {tagList.map((tag: ArticleTag) => (
          <li key={tag.id}>
            <Link href="/tag/[slug]" as={`/tag/${tag.id}`} passHref>
              <a>{tag.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const blogData = await client.get<BlogField>({ endpoint: 'blog' });
  const CategoryData = await client.get<CategoryField>({
    endpoint: 'categories',
  });
  const TagData = await client.get<TagField>({ endpoint: 'tags' });

  return {
    props: {
      articleList: blogData.contents,
      categoryList: CategoryData.contents,
      tagList: TagData.contents,
    },
  };
};
