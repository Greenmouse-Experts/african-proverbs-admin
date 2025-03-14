import React from 'react';
import Document, {
  Html, Main, NextScript,Head
} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

export default class MyDocument extends Document {
 
  render() {
    return (
      <Html lang="en">
        <body data-sidebar="dark"> 
          <Head/>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}


MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
  
  const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });
     
    const initialProps = await Document.getInitialProps(ctx);
  
    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};