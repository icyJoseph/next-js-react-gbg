import type { Metadata } from "next";
import { revalidatePath } from "next/cache";

import { PokemonCapture } from "app/pokemon/capture/capture";

export const metadata: Metadata = {
  title: "Capture | Poké Adventure",
};

const CapturePage = () => {
  async function updateCollection() {
    "use server";
    revalidatePath("/collection");
  }
  return <PokemonCapture updateCollection={updateCollection} />;
};

export default CapturePage;
