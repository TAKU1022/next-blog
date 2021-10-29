export type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type Tag = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

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
  category: Category;
  tags: Tag[];
};

export type BlogField = {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
};
