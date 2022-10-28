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
        <link
          href="https://fonts.googleapis.com/css?family=Press+Start+2P&display=block"
          rel="stylesheet"
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
