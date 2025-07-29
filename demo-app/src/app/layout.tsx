import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "nes.css/css/nes.min.css";
import "./globals.css";

import { AppContent } from "../components/AppContent";
import { AppHeader } from "../components/AppHeader";
import { Navigation } from "../components/Navigation";
import { StyledComponentsRegistry } from "../lib/styled-components-registry";

export const metadata: Metadata = {
  title: "Poké Adventure",
  description: "Catch pokemon, while learning Next.js",
};

const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: ["400"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pressStart.className}>
        <div id="__next">
          <StyledComponentsRegistry>
            <AppHeader>
              <Navigation />
            </AppHeader>

            <AppContent>{children}</AppContent>
          </StyledComponentsRegistry>
        </div>
      </body>
    </html>
  );
}
