import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDcocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDcocument;
