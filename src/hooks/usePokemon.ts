import useSWRImmutable from "swr/immutable";
import { assert } from "superstruct";
import { Pokemon } from "types";

import { pokeEp } from "lib/pokemon";

export type Poke = Omit<Pokemon, "captureRate">;

const fetcher = async (_: string, id: string | number): Promise<Poke> => {
  const res = await fetch(`${pokeEp}/${id}`);

  if (!res.ok) throw new Error("Failed to get pokemon");

  const pokeData = await res.json();

  const data = {
    id: pokeData?.id,
    name: pokeData?.name,
    order: pokeData?.order,
    sprites: {
      frontDefault: pokeData?.sprites?.front_default,
    },
    weight: pokeData?.weight,
    height: pokeData?.height,
    captureRate: 0,
    description: "",
  };

  assert(data, Pokemon);

  const { captureRate, ...poke } = data;

  return poke;
};

export const usePokemon = (id: string | number) => {
  return useSWRImmutable(["pokemon", id], fetcher);
};
