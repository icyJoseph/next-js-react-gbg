import { Scene } from "components/CaptureScene";
import { PokeBall } from "components/PokeBall";
import { Capture } from "components/WildPokemon";

export default async function CapturePage() {
  return (
    <Scene>
      <Capture PokeBall={PokeBall} />
    </Scene>
  );
}
