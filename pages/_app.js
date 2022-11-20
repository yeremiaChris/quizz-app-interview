import Layout from "../components/Layout";
import "../styles/globals.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { pathToTitle } from "../helpers/pathToTitle";
function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  const route = useRouter();
  const title = pathToTitle(route.pathname);
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="This is meta description of quizz app"></meta>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="robots" content="index, follow" />
      </Head>
      {/* <AuthProvider> */}
      <Component {...pageProps} />
      {/* </AuthProvider> */}
    </Layout>
  );
}

export default MyApp;
