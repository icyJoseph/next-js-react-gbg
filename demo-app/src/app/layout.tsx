import "nes.css/css/nes.min.css";
import "design-system/global.css";

import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

import { Navigation } from "components/Navigation";
import appStyle from "design-system/app.module.css";

const pressStart2P = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Home | Poké Adventure",
  description: "Catch pokemon, while learning Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        <header className={appStyle.header}>
          <Navigation />
        </header>
        <main className={appStyle.content}>{children}</main>
      </body>
    </html>
  );
}
