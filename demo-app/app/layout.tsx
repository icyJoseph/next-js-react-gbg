import "nes.css/css/nes.min.css";
import "design-system/global.css";

import type { ReactNode } from "react";

import { Navigation } from "components/Navigation";
import app from "design-system/App.module.css";
import navigation from "design-system/Navigation.module.css";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
          name="viewport"
        />

        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=block"
          rel="stylesheet"
          /* @ts-ignore precedence */
          precedence="default"
        />
      </head>

      <body>
        <div id="__next">
          <header className={app.header}>
            <Navigation
              navClassName={navigation.navigation}
              listClassName={navigation.navigationList}
            />
          </header>

          <main className={app.content}>{children}</main>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
