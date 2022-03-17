import "nes.css/css/nes.min.css";
import "styles/globals.css";
import type { AppProps } from "next/app";
import { Navigation } from "components/Navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="header">
        <Navigation />
      </header>

      <main className="content">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default MyApp;
