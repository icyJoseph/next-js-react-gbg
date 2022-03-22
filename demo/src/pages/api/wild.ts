import type { NextApiRequest, NextApiResponse } from "next";

import { SUPPORTED_POKEMON } from "lib/constants";
import { fetchPokemon } from "lib/pokemon";
import type { Pokemon, Message } from "types";

export async function wildPokemon(
  _req: NextApiRequest,
  res: NextApiResponse<Pokemon | Message>
) {
  try {
    const id = 1 + Math.floor(Math.random() * SUPPORTED_POKEMON);

    const data = await fetchPokemon(id);

    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default wildPokemon;
