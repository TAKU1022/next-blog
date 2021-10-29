export type Article = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  thumbnail: {
    width: number;
    height: number;
    url: string;
  };
  body: string;
  category: ArticleCategory;
  tags: ArticleTag[];
};

export type ArticleCategory = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type ArticleTag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type BlogField = {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type CategoryField = {
  contents: ArticleCategory[];
  totalCount: number;
  offset: number;
  limit: number;
};
