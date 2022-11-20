import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  // const router = useRouter();

  return (
    <Layout>
      {/* <AuthProvider> */}
      <Component {...pageProps} />
      {/* </AuthProvider> */}
    </Layout>
  );
}

export default MyApp;
