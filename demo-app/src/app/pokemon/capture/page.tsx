import type { Metadata } from "next";

import { PokemonCapture } from "app/pokemon/capture/capture";

export const metadata: Metadata = {
  title: "Capture | Poké Adventure",
};

const CapturePage = () => {
  return <PokemonCapture />;
};

export default CapturePage;
