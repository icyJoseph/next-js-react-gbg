import { assert } from "superstruct";
import crypto from "crypto";

import { Pokemon } from "types";

export const specieEP = "https://pokeapi.co/api/v2/pokemon-species";
export const pokeEp = "https://pokeapi.co/api/v2/pokemon";

export const catchPokemon = async (id: number | string) => {
  const specie = await fetch(`${specieEP}/${id}`);
  const specieData = await specie.json();

  const coin = crypto.randomBytes(1)[0];

  const captureRate = Number(specieData?.capture_rate);

  if (Number.isNaN(captureRate))
    throw new Error("Capture rate is not a number");

  return coin < captureRate;
};

export const fetchPokemon = async (id: number | string) => {
  const [specie, poke] = await Promise.all([
    fetch(`${specieEP}/${id}`),
    fetch(`${pokeEp}/${id}`),
  ]);

  const specieData = await specie.json();
  const pokeData = await poke.json();

  const data = {
    id: pokeData?.id,
    name: pokeData?.name,
    order: pokeData?.order,
    sprites: {
      frontDefault: pokeData?.sprites?.front_default,
    },
    weight: pokeData?.weight,
    height: pokeData?.height,
    captureRate: specieData?.capture_rate,
    description: specieData?.flavor_text_entries?.[0]?.flavor_text,
  };

  assert(data, Pokemon);

  return data;
};
