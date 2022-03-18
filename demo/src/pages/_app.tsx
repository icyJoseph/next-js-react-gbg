import "nes.css/css/nes.min.css";
import type { AppProps } from "next/app";

import { AppContent } from "components/AppContent";
import { AppHeader } from "components/AppHeader";
import { Navigation } from "components/Navigation";
import { GlobalStyle } from "styles/global";

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />

      <AppHeader>
        <Navigation />
      </AppHeader>

      <AppContent>
        <Component {...pageProps} />
      </AppContent>
    </>
  );
}

export default CustomApp;
