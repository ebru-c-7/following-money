import { store } from "../store/store";
import { Provider as ProviderAuth } from "next-auth/client";
import { Provider as ProviderRedux } from "react-redux";

import "../styles/globals.css";
import Layout from "../components/shared/layout";

function MyApp({ Component, pageProps }) {
  return (
    <ProviderAuth session={pageProps.session}>
      <ProviderRedux store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProviderRedux>
    </ProviderAuth>
  );
}

export default MyApp;
