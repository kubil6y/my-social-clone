import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <a
            className='github-fork-ribbon'
            href='https://github.com/kubil6y/my-social-clone'
            data-ribbon='GitHub'
            title='GitHub'
            target='_blank'
            rel='noopener noreferrer'
          >
            GitHub
          </a>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
