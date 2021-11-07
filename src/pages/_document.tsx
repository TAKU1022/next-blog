import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDcocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta
            name="description"
            content="Next.jsとmicroCMSで開発したテックブログサイトです。"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDcocument;
