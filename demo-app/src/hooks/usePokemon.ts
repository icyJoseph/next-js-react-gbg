import { assert } from "superstruct";
import useSWRImmutable from "swr/immutable";

import { pokeEp } from "lib/constants";
import { Pokemon } from "types";

export type Poke = Omit<Pokemon, "captureRate">;

const fetcher = async (id: string | number): Promise<Poke> => {
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

  const { captureRate: _captureRate, ...poke } = data;

  return poke;
};

export const usePokemon = (id: string | number) => {
  return useSWRImmutable(
    ["pokemon", id],
    ([_key, id]: [_key: string, id: string | number]) => fetcher(id)
  );
};
