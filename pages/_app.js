import Layout from "../components/Layout";
import store from "../store/store";
import "../styles/globals.css";
import { Provider } from "react-redux";
// import { AuthProvider } from "../firebase";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        {/* <AuthProvider> */}
        <Component {...pageProps} />
        {/* </AuthProvider> */}
      </Layout>
    </Provider>
  );
}

export default MyApp;
