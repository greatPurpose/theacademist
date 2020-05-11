import Document, { Head, Main, NextScript } from "next/document";
import { getServerSideToken, getUserScript } from "../lib/auth";
//import '../font-awesome.css';
import '../main.css'
export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const isProduction = process.env.NODE_ENV === 'production';
    const props = await Document.getInitialProps(ctx);
    const userData = await getServerSideToken(ctx.req);

    return { ...props, ...userData, isProduction  };
  }

  // Function will be called below to inject
  // script contents onto page
  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-XXXXXXXX-X');
      `
    }
  };
    setStripe(){
      return {
        __html: `
        <script src="https://js.stripe.com/v3/" />
        `
      }
  };

  render() {
    const { user = {}, isProduction } = this.props;

    return (
        <html lang="en-US">
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
          />
           <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossOrigin="anonymous"></link>
           </Head>
        <body style={{width: "100%!important"}}>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: getUserScript(user) }} />
          <NextScript />
           {/* We only want to add the scripts if in production */}
           
            <React.Fragment>
              <script src="https://js.stripe.com/v3/" />
              <script
                async
                src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXXXXX-X"
              />
              {/* We call the function above to inject the contents of the script tag */}
              <script dangerouslySetInnerHTML={this.setGoogleTags()} />
              <script dangerouslySetInnerHTML={this.setStripe()} />
            </React.Fragment>
          
        </body>
      </html>
    );
  }
}
