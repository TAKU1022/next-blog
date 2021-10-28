import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: 'next-blog-taku',
  apiKey: process.env.API_KEY as string,
});
